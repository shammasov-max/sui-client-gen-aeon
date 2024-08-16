module aeon_custody::workspace {
    use std::vector;
    use sui::address;
    use std::option::{Self,Option};
    use std::string::{Self,String};
    use sui::clock::{Self,Clock};
    use sui::object::{Self,ID,UID};
    use sui::object_bag::{Self,ObjectBag};
    use sui::event::{Self};
    use sui::table::{Self,Table};
    use sui::tx_context::{Self,TxContext};
    use sui::transfer::{Self};
    use sui::vec_map::{Self,VecMap};
    use sui::bag::{Self,Bag};



    use aeon_custody::vault::{Self,Vaults, VaultProfile};

    use aeon_custody::user::{Self,Users,User,UserGroup,UserCap, RegistrationHolder};
    use aeon_custody::address_book::{Self, AddressBook};
    use aeon_custody::policy::{Self,Policy, PolicyRule, PolicyResult};
    use aeon_custody::proposal::{Self, Proposal};
    use aeon_custody::transaction::{Self, MpcTransaction, ConfigTx, ConfigTxExecutionInput, ConfigTxReturnTypes, ConfigTxType, MpcTxStatus, Transactions};
    use aeon_custody::module_interface::{Self, ModuleActionRequest, ModuleActionResult,TxEffectsResult,TxEffects, InitVaultContainerRequest};
    use aeon_custody::settings::{Self, WorkspaceSettings};
    // use aeon_custody::tasks::{Self, Tasks, InitTaskRequest};
    use aeon_custody::errors::{Self};
    use aeon_custody::library::{Self};

    use sui_state_proof::dwallet_cap::{Self, DWalletCap};

    public struct Workspace has key{
        id: UID,
        name: String,
        vaults: Vaults,
        users: Users,
        address_book: AddressBook,
        policy: Policy,
        transactions: Transactions,
        settings: WorkspaceSettings,
    }


    // EVENTS
    public struct WorkspaceCreated has copy, store, drop {
        workspace_id:ID,
        browser_address: address,
        mobile_address: address,
        mobile_cap: ID,
    }

    public struct ProposalVote has copy,drop,store {
        workspace_id: ID,
        tx_id: u64,
        user_id: u16,
        isApprove: bool,
    }


    public struct MpcTransactionRequested<A: copy + store + drop> has copy, store, drop {
        workspace_id:ID,
        vault_id: u16,
        tx_id: u64,
        initiator: u16,
        initial_status: MpcTxStatus,
        require_approval_users:vector<u16>,
        // executor: Option<ID>,
        effects: TxEffects<A>,
    }

    public struct ConfigTransactionRequested<A: copy + store + drop> has copy, store, drop {
        workspace_id:ID,
        tx_id: u64,
        tx_types: vector<ConfigTxType>,
        initiator: u16,
        require_approval_users:vector<u16>,
    }

    public struct DwalletSignatureRequest has copy, store, drop {
        workspace_id: ID,
        vault_id: u16,
        tx_id: u64,
        // is_task: bool,
        tx_signable: vector<vector<u8>>,
        // dwallet_address: vector<u8>,
    }

    public struct ProcessedModuleActionResult<E: copy + drop + store> has copy, store, drop {
        workspace_id: ID,
        vault_id: u16,
        tx_id: u64,
        network_id: String,
        module_event: E
    }




    // TODO add fun init_workspace_custom to add custom modules instead of using the registry?
    // TODO instead of passing the configuraion of the workspace, let's just pass the config txs which we want to apply to the workspace at creation
    public fun init_workspace<>(
        initial_user_name : String,
        workspace_name : String,
        admin_mobile_signer_address: address, 
        admin_mobile_signer_public_key: vector<u8>,
        admin_registration_address: vector<u8>,
        init_config_actions: vector<ConfigTxType>,
        init_config_actions_inputs: vector<ConfigTxExecutionInput>,
        ctx: &mut TxContext
    ): (UserCap, vector<ConfigTxReturnTypes>) {
        let admin_quorum_threshold = 1;

        let vault_groups = vault::init_vaults();

        let users = user::init_users(admin_quorum_threshold, ctx);
        let address_book = address_book::init_address_book(ctx);
        let policy = policy::init_policy();
        let transactions = transaction::init_transactions(ctx);
        let settings = settings::init_workspace_settings(workspace_name);


        // add multisig policy
        let mut workspace = Workspace{
            id: object::new(ctx),
            name: workspace_name,
            vaults: vault_groups,
            users: users,
            address_book: address_book,
            policy: policy,
            transactions: transactions,
            settings: settings,
        };

        // we expect that always the calling address would be the users derived SUI address 
        let workspace_id=object::id(&workspace);

        let (user_id,user_cap,approve_cap_id)=user::add_first_admin(&mut workspace.users,workspace_id, initial_user_name, tx_context::sender(ctx), admin_mobile_signer_address,admin_mobile_signer_public_key, admin_registration_address,ctx);


        let mut config_return_results = vector::empty<ConfigTxReturnTypes>();
        vector::zip_do!(init_config_actions, init_config_actions_inputs, |config_action, config_input| { 
            let config_result = transaction::execute_config_tx_internal(&mut workspace.users, &mut workspace.vaults, &mut workspace.policy, &mut workspace.address_book, &mut workspace.settings, workspace_id, user_id, object::id(&user_cap), config_action, config_input, ctx);
                config_return_results.push_back(config_result);
        }
        );

        event::emit(WorkspaceCreated{
            workspace_id: object::id(&workspace),
            browser_address: tx_context::sender(ctx),
            mobile_address: admin_mobile_signer_address,
            mobile_cap: approve_cap_id,
        });

        transfer::share_object(workspace);
        return (user_cap, config_return_results)
    }

    public struct ExecutorCap has key,store {
        id: UID,
    }
    public fun create_executor_cap(ctx: &mut TxContext): ExecutorCap {
        ExecutorCap{
            id: object::new(ctx)
        }
    }


    // Auth: check if the user has PERMISSION_INIT_MPC_TX
    public fun request_mpc_transaction<A:  copy + store + drop>(
        workspace: &mut Workspace,
        vault_id: u16,
        effects_result: TxEffectsResult<A>,
        user_cap: &UserCap,
        memo: String,
    ): u64 {
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, user::get_init_mpc_tx_permission(), false);


        let effects = module_interface::consume_tx_effect_result(effects_result);
        let (tx_effects_module_id, tx_assemble_module_id,network_id, _,_, action) = module_interface::view_tx_effects(&effects);

        let is_allowed_vault = vault::is_tx_authorized_vault(&workspace.vaults, vault_id, network_id, tx_effects_module_id, tx_assemble_module_id);
        assert!(is_allowed_vault, errors::effect_action_for_vault_not_authorized());


        let policy_result = policy::apply_policy<A>(
            &workspace.vaults,
            &workspace.users,
            &workspace.address_book,
            &workspace.settings,
            &workspace.policy,
            &effects,
            authorized_user_id,
            vault_id,
        );

        let workspace_id = object::id(workspace);
        let tx_id;
        let tx_status;
        let mut require_approval_users = vector::empty<u16>();

        if (policy::is_policy_result_auto_approve(&policy_result)){
            (tx_id, tx_status) = transaction::create_mpc_transaction_auto_approved<A>(&mut workspace.transactions, authorized_user_id, network_id, vault_id, action, tx_assemble_module_id, memo);            
        }
        else if (policy::is_policy_result_quorum_approval_required(&policy_result)){
            (tx_id, tx_status) = transaction::create_mpc_transaction_pending_approval_quorum<A>(&mut workspace.transactions, workspace_id, authorized_user_id, network_id, vault_id, action, tx_assemble_module_id, memo);
        }
        else if (policy::is_policy_result_specific_approval_required(&policy_result)){
            let threshold;
            (require_approval_users, threshold) = policy::policy_result_get_params_specific_approval(&policy_result);
            (tx_id, tx_status) = transaction::create_mpc_transaction_pending_approval_specific<A>(&mut workspace.transactions, workspace_id, authorized_user_id, network_id, vault_id, action, tx_assemble_module_id, memo, require_approval_users, threshold);
        }
        else if (policy::is_policy_result_block(&policy_result)){
            (tx_id, tx_status) = transaction::create_mpc_transaction_blocked<A>(&mut workspace.transactions, authorized_user_id, network_id, vault_id,action, tx_assemble_module_id, memo);
        }
        else {
            // make the compiler happy
            abort 123123
        };

        // TOOD revisit event
        event::emit(MpcTransactionRequested<A>{
            workspace_id: object::id(workspace),
            vault_id: vault_id,
            effects: effects,
            tx_id: tx_id,
            initiator: authorized_user_id,
            initial_status: tx_status,
            require_approval_users: require_approval_users,
        });

        return tx_id
    }


    // Auth: only approve cap and iniator can do this + needs PERMISSION_SIGN_MPC_TX 
    public fun finalize_mpc_tx<A:  copy + store + drop>(
        workspace: &mut Workspace,
        tx_id: u64,
        user_cap: &UserCap,
    ) : ModuleActionRequest<A>
    {

        let user_id = user::authorize_user(&workspace.users, user_cap, user::get_sign_mpc_tx_permission(), true);
        assert!(transaction::is_user_initiator<A>(&workspace.transactions, tx_id, user_id), 2828228);

        let (initiator_id, network_id, status, vault_id, action, chain_module_id) = transaction::view_mpc_transaction(&workspace.transactions, tx_id);

    
        assert!(transaction::is_mpc_transaction_approved(&mut workspace.users, status), 0);
        let req = module_interface::create_module_action_request(object::id(workspace), vault_id, chain_module_id, tx_id, network_id, action);
        req
    }


    public fun process_module_action_result<A: copy + store + drop, E: copy + store + drop>(
        workspace: &mut Workspace,
        module_result: ModuleActionResult<E>, 
    ) {

        let (workspace_id, module_id, vault_id,tx_id, network_id,tx_signable,module_event) = module_interface::consume_module_action_result(module_result);
        assert!(object::id(workspace) == workspace_id, 0);
        // TODOX do we need to check the module_id here as well?

        transaction::update_mpc_tx_status_ready_signing<A>(&mut workspace.transactions, &mut workspace.users, tx_id, tx_signable, workspace_id);
        event::emit(ProcessedModuleActionResult<E>{
            workspace_id: workspace_id,
            vault_id: vault_id,
            tx_id: tx_id,
            network_id: network_id,
            module_event: module_event,
        });
    }


    public fun request_update_mpc_transaction<A: copy + store + drop>(
        workspace: &mut Workspace,
        tx_id: u64,
        user_cap: &UserCap,
    ): ModuleActionRequest<A>{
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, user::get_sign_mpc_tx_permission(), true);

        let (initiator_id, network_id, status, vault_id, action, module_id) = transaction::view_mpc_transaction<A>(&workspace.transactions, tx_id);
        assert!(transaction::is_user_initiator<A>(&workspace.transactions, tx_id, authorized_user_id), 2828228);
        assert!(transaction::is_mpc_transaction_signing_requested(status), 35353);

    
        let req = module_interface::create_module_action_request(object::uid_to_inner(&workspace.id), vault_id, module_id, tx_id, network_id, action);
        req
    }


    // TODOX ensure that only the initiator can sign this tx
    public fun sign_mpc_tx<A: copy + store + drop>(
        workspace: &mut Workspace,
        tx_id: u64,
        user_cap: &UserCap,
    ) {
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, user::get_sign_mpc_tx_permission(), true);
        let (initiator, network_id, status, vault_id, module_action, module_id) = transaction::view_mpc_transaction<A>(&workspace.transactions, tx_id);
        assert!(transaction::is_user_initiator<A>(&workspace.transactions, tx_id, authorized_user_id), 2828228);


        let signable_txns = transaction::view_mpc_ready_signing_tx_signable<A>(&workspace.transactions, tx_id);

        transaction::update_mpc_tx_status_signing_requested<A>(&mut workspace.transactions, tx_id, object::uid_to_inner(&workspace.id));
        
        let dwallet_cap = vault::borrow_dwallet_cap(&mut workspace.vaults, vault_id);
                
        signable_txns.do!(|signable| {
            dwallet_cap::approve_message(dwallet_cap, signable);
        });

        event::emit(DwalletSignatureRequest{
            workspace_id: object::id(workspace),
            vault_id: vault_id,
            tx_id: tx_id,
            tx_signable: signable_txns,
        });
    }
    

    // VOTE PROPOSAL
    public fun approve_proposal(workspace: &mut Workspace, tx_id: u64, user_cap: &UserCap) {        
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, user::get_vote_proposal_permission(), true);
        
        transaction::approve_proposal(&mut workspace.users, &workspace.transactions, tx_id, authorized_user_id);
        
        event::emit(ProposalVote{
            workspace_id: object::id(workspace),
            tx_id: tx_id,
            user_id: authorized_user_id,
            isApprove: true,
        });
    }


    public fun reject_proposal(workspace: &mut Workspace, tx_id: u64, user_cap: &UserCap) {
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, user::get_vote_proposal_permission(), true);

        transaction::reject_proposal(&mut workspace.users, &workspace.transactions, tx_id, authorized_user_id);
    
        event::emit(ProposalVote{
            workspace_id: object::id(workspace),
            tx_id: tx_id,
            user_id: authorized_user_id,
            isApprove: false,
        });
    }


    
    // Auth: Etiher the initiator or the admin quorum can cancel a transaction
    public fun cancel_transaction<A: copy + store + drop>(workspace: &mut Workspace, tx_id: u64, user_cap: &UserCap) {
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, user::get_admin_quorum_permission(), true);
        assert!(transaction::is_user_initiator<A>(&workspace.transactions, tx_id, authorized_user_id), 2828228);
        
        transaction::cancel_transaction<A>(&workspace.users, &mut workspace.transactions, tx_id, authorized_user_id, object::uid_to_inner(&workspace.id));
    }

    
    // TOODX ensure that the ledger can call this for recovery
    public fun request_config_transaction<A: copy + store + drop>(workspace: &mut Workspace, config_txns: vector<ConfigTxType>, user_cap: &UserCap): u64 {

        let required_permissions = config_txns.fold!(vector::empty(), |mut vec, config_tx| {
                vec.append(config_tx.get_required_role_config_tx());
                vec
            });
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, required_permissions, false);

        let tx_id;
        if (transaction::is_config_tx_admin_approval_required(config_txns)) {
            tx_id = transaction::create_config_tx_pending_approval_quorum(object::id(workspace), &mut workspace.transactions, config_txns, authorized_user_id);
            
            event::emit(ConfigTransactionRequested<A>{ //todo: add here who is required to approve??
                workspace_id: object::id(workspace),
                tx_types: config_txns,
                tx_id: tx_id,
                require_approval_users: user::get_admin_quorum_members(&workspace.users),
                initiator: authorized_user_id, 
            });
        }
        else {
            tx_id = transaction::create_config_tx_direct_approval(&mut workspace.transactions, config_txns, authorized_user_id);
        };
        return tx_id      
    }



    // EXECUTE CONFIG TRANSACTIONS
    public fun execute_config_tx(workspace: &mut Workspace, tx_id: u64, user_cap: &UserCap, init_config_actions_inputs: vector<ConfigTxExecutionInput>, ctx: &mut TxContext): vector<ConfigTxReturnTypes>{
        let (status, config_txns) = transaction::view_config_tx(&workspace.transactions, tx_id);

        let required_permissions = config_txns.fold!(vector::empty(), |mut vec, config_tx| {
            vec.append(config_tx.get_required_role_config_tx());
            vec
        });
        let authorized_user_id = user::authorize_user(&workspace.users, user_cap, required_permissions, true);
    
        let workspace_id = object::id(workspace);
        transaction::update_config_tx_status_executed(&mut workspace.transactions, &mut workspace.users, tx_id, object::uid_to_inner(&workspace.id));


        let mut config_return_results = vector::empty<ConfigTxReturnTypes>();
        vector::zip_do!(config_txns, init_config_actions_inputs, |config_action, config_input| { {
            let config_result = transaction::execute_config_tx_internal(&mut workspace.users, &mut workspace.vaults, &mut workspace.policy, &mut workspace.address_book, &mut workspace.settings, workspace_id, authorized_user_id, object::id(user_cap), config_action, config_input, ctx);
                config_return_results.push_back(config_result);
            };
        });

        config_return_results    
    }


    public fun execute_recover_account (workspace: &mut Workspace, recovery_cap: &UserCap, new_mobile_signer_address: address, encrypted_user_shares: VecMap<u16,vector<u8>>, public_key: vector<u8>, ctx: &mut TxContext) {
        // fails if the recovery cap is not associated to a user
        let user_id = user::get_user_by_recovery_cap_id(&workspace.users, recovery_cap).extract();

        user::execute_config_recover_account(&mut workspace.users, object::uid_to_inner(&workspace.id), user_id, new_mobile_signer_address, ctx);
        
        vault::execute_config_share_user_shares_user(&workspace.vaults, object::id(workspace), public_key, encrypted_user_shares);
    }


    public fun retrieve_user_caps(
                            workspace: &mut Workspace, 
                            holder: RegistrationHolder, 
                            init_cap_holder_address_opt: Option<address>, 
                            approve_cap_holder_address_opt: Option<address>, 
                            approve_cap_holder_public_key_opt: Option<vector<u8>>,
                            signature: vector<u8>){
        user::retrieve_user_caps_internal(&mut workspace.users, holder, init_cap_holder_address_opt, approve_cap_holder_address_opt, approve_cap_holder_public_key_opt, signature);
    }

    // Issue new init cap with approve cap. This is not a config action as the user doesnt need to confirm the conventional way in their mobile signer
    // For UX purposes dealing with the extenion, ensures that the webapp can request a new init cap for the extension seamlessly

    // Auth: any active user can call this to clone their init caps
    public fun add_init_cap(workspace: &mut Workspace, user_cap: &UserCap, ctx: &mut TxContext):UserCap {
        let auth_user_id = user::get_user_by_cap_id(&workspace.users, user_cap).extract();
        assert!(workspace.users.is_user_valid(auth_user_id), errors::not_authorized());        
        
        let workspace_id=object::id(workspace);
        return user::add_init_cap_users(&mut workspace.users,workspace_id, auth_user_id, ctx)
    }







    // #[test]
    // public fun test_request_mpc_tx() {
    //     use sui::test_scenario;
    //     use std::string;
    //     use aeon_actions::erc20_transfer;

    //     // Create a dummy TxContext for testing
    //     let ctx = tx_context::dummy();


    //     let admin = @0xBABE;
    //     let initial_owner = @0xCAFE;


    //     // setup workspace

    //     // TOOD we would need to add here the vault module as well
    //     let scenario_val = test_scenario::begin(admin);
    //     let scenario = &mut scenario_val;
    //     {
    //         registry::init_registry(test_scenario::ctx(scenario));
    //         erc20_transfer::init_erc20_transfer_module(test_scenario::ctx(scenario));



    //         let registry = test_scenario::take_shared<Registry>(scenario);
    //         init_workspace(string::utf8(b"admin"), string::utf8(b"test"), admin,  vector::empty(),vector::empty(), &mut registry, test_scenario::ctx(scenario));

    //         test_scenario::return_shared<Registry>(registry);
    //     };

    //     // now we execute a mpc transaction e2e
    //     test_scenario::next_tx(scenario, admin);
    //     {

    //         // TODO 
    //         // get_effects_ERC20_transfer(transfer_module, network_id, recipient_address, erc20_token_address, amount,)

    //         // create the sword and transfer it to the initial owner
    //         // request_transaction(&mut workspace, 0, &mut option::none(), test_scenario::session(scenario), test_scenario::ctx(scenario));
    //     };
    // }





}
