module aeon_custody::transaction {


    use std::vector;
    use sui::tx_context::{Self,TxContext};
    use sui::object::{Self, ID, UID};
    use sui::bag::{Self,Bag};
    use sui::event::{Self};
    use std::string::{Self,String};
    use sui::vec_map::{Self,VecMap};
    use sui::vec_set::{Self, VecSet};


    use std::option::{Self,Option};
    use aeon_custody::vault::{Self,Vaults, VaultProfile};
    use aeon_custody::user::{Self,Users,Role,User,UserGroup,UserCap, RegistrationHolder};
    use aeon_custody::address_book::{Self, AddressBook};
    use aeon_custody::policy::{Self,Policy, PolicyRule, PolicyResult};
    use aeon_custody::proposal::{Self, Proposal};
    use aeon_custody::module_interface::{Self, ModuleActionRequest, ModuleActionResult,TxEffectsResult,TxEffects, InitVaultContainerRequest};
    use aeon_custody::settings::{Self, WorkspaceSettings};
    use aeon_custody::errors::{Self};
    use aeon_custody::library::{Self};



    public struct ConfigTx has store {
        initiator: u16,
        status: ConfigTxStatus,
        txns: vector<ConfigTxType>,
        cancellations: VecSet<u16>,
    }

    // todo: put the two tx together? Makes handling easier? Does this work with the status and tx signable?
    public struct MpcTransaction<A : copy + store + drop> has store {
        initiator: u16,
        network_id: String,
        status: MpcTxStatus,
        vault_id: u16, 
        module_action: A, // needs to be passed the module so it can be properly assembled
        chain_module_id: ID, // module that is responsible to assemble the signable tx
        memo: String,
        cancellations: VecSet<u16>,
    }



    // TODO do we need this Approved {required-module-ids: vector<u64>},
    public enum MpcTxStatus has store, copy, drop {
        Blocked,
        PendingApproval {proposal: Proposal},
        AutoApproved, 
        // ProposalApproved,
        ProposalRejected,
        ReadySigning {tx_signable: vector<vector<u8>>},
        SigningRequested,
        Cancelled
    }

    // replace these PendingApproval with PendingApproval
    public enum ConfigTxStatus has store, copy, drop {
        PendingApproval {proposal: Proposal},
        DirectApproval,
        Rejected,
        Executed,
        Cancelled
    }

    public struct Transactions has store {
        transactions: Bag,
        transaction_id_counter: u64,
    }


    // Events
    public struct MpcTxStatusUpdated has copy, store, drop {
        workspace_id: ID,
        tx_id: u64,
        new_status: MpcTxStatus,
    }

    public struct ConfigTxStatusUpdated has copy, store, drop {
        workspace_id: ID,
        tx_id: u64,
        new_status: ConfigTxStatus,
    }



    public(package) fun is_config_tx(transactions: &Transactions, tx_id: u64): bool {
        bag::contains_with_type<u64, ConfigTx>(&transactions.transactions, tx_id)
    }


    public(package) fun create_config_tx_pending_approval_quorum(workspace_id:ID, transactions: &mut Transactions, txns: vector<ConfigTxType>, initiator: u16): u64 {
        
        let proposal = proposal::create_config_proposal_quorum(
                workspace_id, //object::uid_to_inner(&workspace.id),
                0,
        );
        create_config_tx_internal(transactions, txns, ConfigTxStatus::PendingApproval{proposal: proposal}, initiator)
    }

    // create tx direct approval
    public(package) fun create_config_tx_direct_approval(transactions: &mut Transactions, txns: vector<ConfigTxType>, initiator: u16): u64 {
        create_config_tx_internal(transactions, txns, ConfigTxStatus::DirectApproval, initiator)
    }


    public(package) fun create_config_tx_internal(transactions: &mut Transactions, txns: vector<ConfigTxType>, status: ConfigTxStatus, initiator: u16): u64 {
        let config_tx =  ConfigTx {
                                        status: status,
                                        txns: txns,
                                        cancellations: vec_set::empty(),
                                        initiator: initiator,

                                    };

        let tx_id = transactions.transaction_id_counter;
        transactions.transaction_id_counter = tx_id + 1;
        
        bag::add(&mut transactions.transactions, tx_id, config_tx); 
        tx_id
    }


    public(package) fun update_config_tx_status_internal(transaction: &mut Transactions, tx_id:u64, new_status: ConfigTxStatus, workspace_id:ID): ConfigTxStatus {
        let tx = bag::borrow_mut<u64, ConfigTx>(&mut transaction.transactions, tx_id);
        let status_old = tx.status;
        tx.status = new_status;

        event::emit(ConfigTxStatusUpdated{workspace_id: workspace_id, tx_id: tx_id, new_status: new_status});

        status_old
    }

    // update executed 
    public(package) fun update_config_tx_status_executed(transaction: &mut Transactions, users: &mut Users, tx_id:u64, workspace_id:ID,) {
        let status_old = update_config_tx_status_internal(transaction, tx_id, ConfigTxStatus::Executed, workspace_id);
        let valid = match (status_old) {
            ConfigTxStatus::PendingApproval{proposal: mut proposal} => proposal::is_proposal_approved(&mut proposal, users),
            ConfigTxStatus::DirectApproval => true,
            _ => false,
        };
        assert!(valid, 2353454);
    }

    // update_config_tx_status_cancelled
    public(package) fun update_config_tx_status_cancelled(transaction: &mut Transactions, tx_id:u64, workspace_id:ID,) {
        let status_old = update_config_tx_status_internal(transaction, tx_id, ConfigTxStatus::Cancelled, workspace_id);
        let valid = match (status_old) {
            ConfigTxStatus::PendingApproval{proposal: proposal} => true,
            ConfigTxStatus::DirectApproval => true,
            _ => false,
        };
        assert!(valid, 2353454);
    }

    // VIEW FUNCTIONS
    public(package) fun view_config_tx(transactions: &Transactions, tx_id: u64): (ConfigTxStatus, vector<ConfigTxType>) {
        let tx = bag::borrow<u64, ConfigTx>(&transactions.transactions, tx_id);
        return (tx.status, tx.txns)
    }

    public(package) fun init_transactions(ctx: &mut TxContext): Transactions {
        Transactions {
            transactions: bag::new(ctx),
            transaction_id_counter: 0,
        }
    }

    public(package) fun update_mpc_tx_status_internal<A: store + copy + drop>(workspace_id:ID,transaction: &mut Transactions, tx_id:u64, new_status: MpcTxStatus): MpcTxStatus {
        let tx = bag::borrow_mut<u64, MpcTransaction<A>>(&mut transaction.transactions, tx_id);
        
        let status_old = tx.status;
        tx.status = new_status;

        //todo: we would need to emit this here.
        event::emit(MpcTxStatusUpdated{workspace_id: workspace_id, tx_id: tx_id, new_status: new_status});
        status_old
    }

    public(package) fun update_mpc_tx_status_ready_signing<A: store + copy + drop>(transactions: &mut Transactions, users: &mut Users, tx_id:u64, tx_signable: vector<vector<u8>>, workspace_id:ID) {
        let status_before = update_mpc_tx_status_internal<A>(workspace_id, transactions, tx_id, MpcTxStatus::ReadySigning{tx_signable: tx_signable});
        
        let valid = match (status_before) {
            MpcTxStatus::PendingApproval{proposal: mut proposal} => proposal::is_proposal_approved(&mut proposal, users),
            MpcTxStatus::AutoApproved => true,
            _ => false,
        };
        assert!(valid, 2353454);        
    }


    public(package) fun update_mpc_tx_status_signing_requested<A: store + copy + drop>(transactions: &mut Transactions, tx_id:u64, workspace_id:ID) {
        let status_before = update_mpc_tx_status_internal<A>(workspace_id, transactions, tx_id, MpcTxStatus::SigningRequested);
        let matches = match (status_before) {
            MpcTxStatus::ReadySigning{tx_signable: _} => true,
            _ => false,
        };
        assert!(matches, 35253564);
    }

    // update_mpc_tx_status_cancelled
    public(package) fun update_mpc_tx_status_cancelled<A: store + copy + drop>(transactions: &mut Transactions, tx_id:u64, workspace_id:ID,) {
        let status_before = update_mpc_tx_status_internal<A>(workspace_id, transactions, tx_id, MpcTxStatus::Cancelled);
        let matches = match (status_before) {
            MpcTxStatus::ReadySigning{tx_signable: _} => true,
            _ => false,
        };
        assert!(matches, 35253564);
    }

    public(package) fun view_mpc_ready_signing_tx_signable<A: store + copy + drop>(transactions: &Transactions, tx_id: u64): vector<vector<u8>> {
        let tx = bag::borrow<u64, MpcTransaction<A>>(&transactions.transactions, tx_id);
        let tx_signable: vector<vector<u8>> = match (tx.status) {
            MpcTxStatus::ReadySigning{tx_signable: tx_signable} => {
                return tx_signable
            },
            _ => return vector::empty<vector<u8>>()
        };
        assert!(tx_signable.length() > 0, 23984234);
        tx_signable
    }




    public(package) fun view_mpc_transaction<A: copy + store + drop>(transactions: &Transactions, tx_id: u64): (u16, String, MpcTxStatus, u16, A, ID) {
        let tx = bag::borrow<u64, MpcTransaction<A>>(&transactions.transactions, tx_id);
        (tx.initiator, tx.network_id, tx.status, tx.vault_id, tx.module_action, tx.chain_module_id)
    }


    public(package) fun create_mpc_transaction_auto_approved<A: copy + store + drop>(transactions: &mut Transactions, initiator: u16, network_id: String, vault_id: u16, module_action: A, chain_module_id: ID, memo: String): (u64, MpcTxStatus) {
        create_mpc_transaction_internal(transactions, initiator, network_id, MpcTxStatus::AutoApproved, vault_id, module_action, chain_module_id, memo)
    }

    public(package) fun create_mpc_transaction_pending_approval_quorum<A: copy + store + drop>(transactions: &mut Transactions, workspace_id: ID, initiator: u16, network_id: String, vault_id: u16, module_action: A, chain_module_id: ID, memo: String): (u64, MpcTxStatus) {
        
        let proposal = proposal::create_mpc_tx_proposal_quorum(
                workspace_id, //object::uid_to_inner(&workspace.id),
                initiator,
        );
        create_mpc_transaction_internal(transactions, initiator, network_id, MpcTxStatus::PendingApproval {proposal}, vault_id, module_action, chain_module_id, memo)
    }

    public(package) fun create_mpc_transaction_pending_approval_specific<A: copy + store + drop>(transactions: &mut Transactions, workspace_id: ID, initiator: u16, network_id: String, vault_id: u16, module_action: A, chain_module_id: ID, memo: String, require_approval_users: vector<u16>, threshold: u16): (u64, MpcTxStatus) {
        
        let proposal = proposal::create_mpc_tx_proposal_specific(
                workspace_id, //object::uid_to_inner(&workspace.id),
                initiator,
                require_approval_users, 
                threshold

        );
        create_mpc_transaction_internal(transactions, initiator, network_id, MpcTxStatus::PendingApproval {proposal}, vault_id, module_action, chain_module_id, memo)
    }



    public(package) fun create_mpc_transaction_blocked<A: copy + store + drop>(transactions: &mut Transactions, initiator: u16, network_id: String, vault_id: u16, module_action: A, chain_module_id: ID,  memo: String): (u64, MpcTxStatus) {
        create_mpc_transaction_internal(transactions, initiator, network_id, MpcTxStatus::Blocked, vault_id, module_action, chain_module_id, memo)
    }


    public(package) fun is_mpc_transaction_approved(users: &mut Users, status: MpcTxStatus): bool {
        match (status) {
            MpcTxStatus::PendingApproval{proposal: mut proposal} => proposal::is_proposal_approved(&mut proposal, users),
            MpcTxStatus::AutoApproved => true,
            _ => false,
        }
    }

    public(package) fun is_mpc_transaction_signing_requested(status: MpcTxStatus): bool {
        status == MpcTxStatus::SigningRequested
    }


    public(package) fun get_required_role_config_tx(config_tx: ConfigTxType): vector<u8> {
        match (config_tx) {
            ConfigTxType::VaultConfig(vault_config) => {
                match (vault_config) {
                    VaultConfigTxType::ShareUserShares { .. } => user::get_sign_mpc_tx_permission(),
                    _ => user::get_admin_quorum_permission(),
                }
            },
            ConfigTxType::UserConfig(user_config) => {
                match (user_config) {
                    _ => user::get_admin_quorum_permission(),
                }
            },
            ConfigTxType::OtherConfig(recovery_config) => {
                match (recovery_config) {
                    OtherConfigTxType::RegisterAccountRecovery { .. } => user::get_recovery_permission(),
                    OtherConfigTxType::RevokeRecovery { .. } => user::get_recovery_permission(),
                    _ => user::get_admin_quorum_permission(),
                }
            },
            _ => user::get_admin_quorum_permission(),
        }
    }


    public enum ConfigTxExecutionInput has store, copy, drop{
        None, 
        AddVault {encrypted_user_shares: vector<vector<u8>>, dwltn_dwallet_cap_id: ID},
        AddExternalSigner {vaults_encrypted_user_shares_map: VecMap<u16,vector<u8>>},
        ShareUserShares {vaults_encrypted_user_shares_map: VecMap<u16,vector<u8>>},
    }


    public enum ConfigTxReturnTypes  {
        None, 
        InitVaultContainerRequest{vault_container_req: InitVaultContainerRequest},
    }



    // Refactored ConfigTxType enum with sub-enums
    public enum ConfigTxType has store, copy, drop {
        VaultConfig(VaultConfigTxType),
        UserConfig(UserConfigTxType),
        AddressBookConfig(AddressBookConfigTxType),
        OtherConfig(OtherConfigTxType),
        ActionConfig(ActionConfigTxType),
    }

    // Sub-enum for VaultConfig
    public enum VaultConfigTxType has store, copy, drop {
        AddVault { name: String, vault_group_id: u16, vault_profile_id: String },
        EditVault { vault_id: u16, name_new_opt: Option<String>, vault_group_id_new_opt: Option<u16>, vault_profile_id_new_opt: Option<String> },
        AddVaultGroup { name: String, vault_ids: vector<u16> },
        EditVaultGroup { name_new_opt: Option<String>, vault_group_id: u16, vault_ids_add: vector<u16>, vault_ids_remove: vector<u16> },
        DeleteVaultGroup { vault_group_id: u16 },
        AddExternalSigner { public_key: vector<u8> },
        ShareUserShares { user_id: u16 },
        VaultProfileAdd { profile_name: String, vault_profile: VaultProfile },
        VaultProfileEdit { profile_name: String, vault_profile: VaultProfile },
        VaultProfileDelete { profile_name: String },
    }

    // Sub-enum for UserConfig
    public enum UserConfigTxType has store, copy, drop {
        AddUser { name: String, registration_address_type: u8, registration_address: vector<u8>, role_id: u16, groups_to_add_to: vector<u16> },
        EditUser { user_id: u16, name_new_opt: Option<String>, new_role_id_opt: Option<u16> },
        DeleteUser { user_id: u16 },
        ResetUser { user_id: u16, reset_init_cap: bool, new_registration_address_type: Option<u8>, new_registration_address: Option<vector<u8>> },
        ResetInitCapUser { user_id: u16, new_registration_address_type: u8, new_registration_address: vector<u8> },
        CreateUserGroup { name: String, user_ids: vector<u16> },
        EditUserGroup { group_id: u16, name_new_opt: Option<String>, user_ids_add: vector<u16>, user_ids_delete: vector<u16> },
        DeleteUserGroup { group_id: u16 },
        EditQuorum { new_quorum: u16 },
        AddRole { new_role: Role },
    }

    // Sub-enum for AddressBookConfig
    public enum AddressBookConfigTxType has store, copy, drop {
        AddAddress { name: String, network_address: vector<u8>, network_ids: vector<String> },
        EditAddress { address_id: u16, name_new_opt: Option<String>, new_network_ids: Option<vector<String>> },
        DeleteAddress { address_id: u16 },
        AddGroup { name: String, address_ids: vector<u16> },
        EditGroup { group_id: u16, name_new_opt: Option<String>, address_ids_add: vector<u16>, address_ids_delete: vector<u16> },
        DeleteGroup { group_id: u16 },
    }

    // Sub-enum for OtherConfig
    public enum OtherConfigTxType has store, copy, drop {
        EditWorkspaceName { new_workspace_name: String },
        // ApproveTask { task_module_id: ID, authorised_executor_id: ID },
        EditPolicy { new_policy_rules: vector<PolicyRule> },
        RegisterAccountRecovery { user_id: u16, recovery_address: address, public_key: vector<u8>, encrypted_user_shares_map: VecMap<u16, vector<u8>> },
        RevokeRecovery { user_id: u16 },

    }


    // Sub-enum for ActionConfig
    public enum ActionConfigTxType has store, copy, drop {
        AddWhitelistActionModule { module_id: ID },
        RemoveWhitelistActionModule { module_id: ID },
        CreateActionGroup { name: String, module_ids: vector<ID> },
        EditActionGroup { group_id: u16, name_new_opt: Option<String>, module_ids_add: vector<ID>, module_ids_delete: vector<ID> },
        DeleteActionGroup { group_id: u16 },
    }


        // Function to execute configuration transactions
    public fun execute_config_tx_internal(
        users: &mut Users,
        vaults: &mut Vaults,
        policy: &mut Policy,
        address_book: &mut AddressBook,
        settings: &mut WorkspaceSettings,
        workspace_id: ID,
        tx_user_id: u16,
        user_cap_id: ID,
        config_tx: ConfigTxType,
        config_execution_input: ConfigTxExecutionInput,
        ctx: &mut TxContext
    ): ConfigTxReturnTypes {
        match (config_tx) {
            ConfigTxType::VaultConfig(vault_config) => execute_vault_config(vault_config, users, vaults, workspace_id, config_execution_input, ctx),
            ConfigTxType::UserConfig(user_config) => execute_user_config(user_config, users, policy, workspace_id, tx_user_id, ctx),
            ConfigTxType::AddressBookConfig(address_book_config) => execute_address_book_config(address_book_config, address_book, policy),
            ConfigTxType::OtherConfig(other_config) => execute_other_config(other_config, users, vaults, settings, policy, tx_user_id, workspace_id, ctx),
            ConfigTxType::ActionConfig(action_config) => execute_action_config(action_config, settings, policy),
            // ConfigTxType::RecoveryConfig(recovery_config) => execute_recovery_config(recovery_config, users, vaults, workspace_id, tx_user_id, user_cap_id, ctx),
        }
    }


    // Function to execute Vault Config Transactions
    fun execute_vault_config(
        vault_config: VaultConfigTxType,
        users: &mut Users,
        vaults: &mut Vaults,
        workspace_id: ID,
        config_execution_input: ConfigTxExecutionInput,
        ctx: &mut TxContext
    ): ConfigTxReturnTypes {
        match (vault_config) {
            VaultConfigTxType::AddVault { name, vault_group_id, vault_profile_id } => {
                let (encrypted_user_shares, dwltn_dwallet_cap_id) = match (config_execution_input) {
                    ConfigTxExecutionInput::AddVault { encrypted_user_shares, dwltn_dwallet_cap_id } => (encrypted_user_shares, dwltn_dwallet_cap_id),
                    _ => abort 1343242,
                };
                let signer_public_keys = user::get_all_public_keys_signers(users);
                let vault_container_req = vault::execute_config_add_vault(
                    workspace_id,
                    vaults,
                    name,
                    vault_group_id,
                    vault_profile_id,
                    signer_public_keys,
                    encrypted_user_shares,
                    dwltn_dwallet_cap_id,
                    ctx
                );
                return ConfigTxReturnTypes::InitVaultContainerRequest { vault_container_req };
            },
            VaultConfigTxType::EditVault { vault_id, name_new_opt, vault_group_id_new_opt, vault_profile_id_new_opt } => {
                vault::execute_config_vault_edit(vaults, vault_id, name_new_opt, vault_group_id_new_opt, vault_profile_id_new_opt);
            },
            VaultConfigTxType::AddVaultGroup { name, vault_ids } => {
                vault::execute_config_vault_create_group(vaults, name, vault_ids);
            },
            VaultConfigTxType::EditVaultGroup { name_new_opt, vault_group_id, vault_ids_add, vault_ids_remove } => {
                vault::execute_config_edit_vault_group(vaults, name_new_opt, vault_group_id, vault_ids_add, vault_ids_remove);
            },
            VaultConfigTxType::DeleteVaultGroup { vault_group_id } => {
                vault::execute_config_vault_delete_group(vaults, vault_group_id);
            },
            VaultConfigTxType::AddExternalSigner { public_key } => {
                let vaults_encrypted_user_shares_map = match (config_execution_input) {
                    ConfigTxExecutionInput::AddExternalSigner { vaults_encrypted_user_shares_map } => vaults_encrypted_user_shares_map,
                    _ => abort 1343242,
                };
                user::add_external_signer(users, public_key);
                vault::execute_config_share_user_shares_user(vaults, workspace_id, public_key, vaults_encrypted_user_shares_map);
            },
            VaultConfigTxType::ShareUserShares { user_id } => {
                // aborts if approve public key not set so far

                let vaults_encrypted_user_shares_map = match (config_execution_input) {
                    ConfigTxExecutionInput::ShareUserShares { vaults_encrypted_user_shares_map } => vaults_encrypted_user_shares_map,
                    _ => abort 1343242,
                };
                let user_public_key = *option::borrow(&user::get_approve_public_key(users, user_id));
                vault::execute_config_share_user_shares_user(vaults, workspace_id, user_public_key, vaults_encrypted_user_shares_map);
            },
            VaultConfigTxType::VaultProfileAdd { profile_name, vault_profile } => {
                vault::execute_config_add_vault_profile(vaults, profile_name, vault_profile);
            },
            VaultConfigTxType::VaultProfileEdit { profile_name, vault_profile } => {
                vault::execute_config_edit_vault_profile(vaults, profile_name, vault_profile);
            },
            VaultConfigTxType::VaultProfileDelete { profile_name } => {
                vault::execute_config_delete_vault_profile(vaults, profile_name);
                
            },
        };
        ConfigTxReturnTypes::None
    }

    // Function to execute User Config Transactions
    fun execute_user_config(
        user_config: UserConfigTxType,
        users: &mut Users,
        policy: &Policy,
        workspace_id: ID,
        tx_user_id: u16,
        ctx: &mut TxContext
    ): ConfigTxReturnTypes {
        match (user_config) {
            UserConfigTxType::AddUser { name, registration_address_type, registration_address, role_id, groups_to_add_to } => {
                user::execute_config_add_user(users, workspace_id, name, registration_address_type, registration_address, role_id, groups_to_add_to, ctx);
            },
            UserConfigTxType::EditUser { user_id, name_new_opt, new_role_id_opt } => {
                user::execute_config_user_edit(users, user_id, name_new_opt, new_role_id_opt);
            },
            UserConfigTxType::DeleteUser { user_id } => {
                //checks that are enforced
                // - user cant be deleted if still part of a user group
                // - user cant be deleted if still part of a policy rule (initiator / approval as part of follow action)
                // - user cant be deleted if admin, and deleting would violate the admin quorum

                assert!(!user::is_user_in_any_group(users, user_id), 0);
                assert!(!policy::is_user_in_any_policy_rule(policy, user_id), 0);
                user::execute_config_user_delete(users, user_id);
                assert!(user::is_admin_quorum_valid(users), 98798);
            },
            UserConfigTxType::ResetUser { user_id, reset_init_cap, new_registration_address_type, new_registration_address } => {
                // requires admin quorum approval always
                // always resets approve cap, optional as well the init cap

                user::execute_config_user_reset(users, workspace_id, user_id, reset_init_cap, new_registration_address_type, new_registration_address, ctx);
            },
            UserConfigTxType::ResetInitCapUser { user_id, new_registration_address_type, new_registration_address } => {
                // checks
                // - ensure that only the calling user can reset its own init cap

                assert!(tx_user_id == user_id, errors::not_authorized());
                user::execute_config_user_reset_init_cap(users, workspace_id, user_id, new_registration_address_type, new_registration_address, ctx);
            },
            UserConfigTxType::CreateUserGroup { name, user_ids } => {
                user::execute_config_user_create_group(users, name, user_ids);
            },
            UserConfigTxType::EditUserGroup { group_id, name_new_opt, user_ids_add, user_ids_delete } => {
                user::execute_config_user_edit_group(users, group_id, name_new_opt, user_ids_add, user_ids_delete);
            },
            UserConfigTxType::DeleteUserGroup { group_id } => {
                // checks
                // - you cannot delete a user group for which there is a public policy in place

                assert!(!policy::is_user_group_in_any_policy_rule(policy, group_id), 325425);
                user::execute_config_user_delete_group(users, group_id);
            },
            UserConfigTxType::EditQuorum { new_quorum } => {
                user::execute_config_edit_workspace_quorum(users, new_quorum);
            },
            UserConfigTxType::AddRole { new_role } => {
                user::execute_config_add_role(users, new_role);
            },
        };
        ConfigTxReturnTypes::None
    }

    // Function to execute Address Book Config Transactions
    fun execute_address_book_config(
        address_book_config: AddressBookConfigTxType,
        address_book: &mut AddressBook,
        policy: &Policy
    ): ConfigTxReturnTypes {
        match (address_book_config) {
            AddressBookConfigTxType::AddAddress { name, network_address, network_ids } => {
                address_book::execute_config_address_book_add_address(address_book, name, network_address, network_ids);
                ConfigTxReturnTypes::None
            },
            AddressBookConfigTxType::EditAddress { address_id, name_new_opt, new_network_ids } => {
                address_book::execute_config_address_book_edit_address(address_book, address_id, name_new_opt, new_network_ids);
                ConfigTxReturnTypes::None
            },
            AddressBookConfigTxType::DeleteAddress { address_id } => {
                //  checks
                // - you cannot delete an address for which there is a public policy in place
                // - You cannot delete an address that is a member of an address group

                assert!(!policy::is_address_in_any_policy_rule(policy, address_id), 0);
                assert!(!address_book::is_address_in_any_group(address_book, address_id), 0);
                address_book::execute_config_address_book_delete_address(address_book, address_id);
                ConfigTxReturnTypes::None
            },
            AddressBookConfigTxType::AddGroup { name, address_ids } => {
                address_book::execute_config_address_book_add_group(address_book, name, address_ids);
                ConfigTxReturnTypes::None
            },
            AddressBookConfigTxType::EditGroup { group_id, name_new_opt, address_ids_add, address_ids_delete } => {
                address_book::execute_config_address_book_edit_group(address_book, group_id, name_new_opt, address_ids_add, address_ids_delete);
                ConfigTxReturnTypes::None
            },
            AddressBookConfigTxType::DeleteGroup { group_id } => {
                // checks
                // - you cannot delete an address group for which there is a public policy in place
                assert!(!policy::is_address_group_in_any_policy_rule(policy, group_id), 0);
                address_book::execute_config_address_book_delete_group(address_book, group_id);
                ConfigTxReturnTypes::None
            },
        }
    }


    // Function to execute Other Config Transactions
    fun execute_other_config(
        other_config: OtherConfigTxType,
        users: &mut Users,
        vaults: &Vaults,
        settings: &mut WorkspaceSettings,
        policy: &mut Policy,
        tx_user_id: u16,
        workspace_id: ID,
        ctx: &mut TxContext
    ): ConfigTxReturnTypes {
        match (other_config) {
            OtherConfigTxType::EditWorkspaceName { new_workspace_name } => {
                settings::execute_config_edit_workspace_name(settings, new_workspace_name);
                ConfigTxReturnTypes::None
            },
            OtherConfigTxType::EditPolicy { new_policy_rules } => {
                policy::execute_edit_policy_config(policy, new_policy_rules);
                ConfigTxReturnTypes::None
            },
            OtherConfigTxType::RegisterAccountRecovery { 
                        user_id, 
                        recovery_address, //ledger sui address
                        public_key, //pk for sui address generated in memory from evm sign
                        encrypted_user_shares_map } => {
                // checks (TODO??)
                // - you can only register recovery for the user that requests the tx 
                // - you can only register recovery for a user that has signing capabilities ()

                assert!(tx_user_id == user_id, 39583);
                // TOODX add permissions for recovery for the user
                // TODO add zkp verification later here

                user::execute_config_register_recovery(users, workspace_id, user_id, recovery_address, public_key, ctx);
                
                // TOODX refactor into single function??
                let workspace_vault_ids = vault::get_vault_ids(vaults);
                assert!(encrypted_user_shares_map.keys().all!(|vault_id| workspace_vault_ids.contains(vault_id)), 3493853098);
                vault::execute_config_share_user_shares_user(vaults, workspace_id, public_key, encrypted_user_shares_map);
                ConfigTxReturnTypes::None
            },
            OtherConfigTxType::RevokeRecovery { user_id } => {
                // checks
                // - you can only revoke recovery for the user that requests the tx 

                assert!(tx_user_id == user_id, 34345);
                user::execute_config_revoke_recovery(users, user_id);
                ConfigTxReturnTypes::None
            },

        }
    }

    // Function to execute Action Config Transactions
    fun execute_action_config(
        action_config: ActionConfigTxType,
        settings: &mut WorkspaceSettings,
        policy: &Policy
    ): ConfigTxReturnTypes {
        match (action_config) {
            ActionConfigTxType::AddWhitelistActionModule { module_id } => {
                settings::execute_config_add_action_module(settings, module_id);
            },
            ActionConfigTxType::RemoveWhitelistActionModule { module_id } => {
                settings::execute_config_remove_action_module(settings, module_id);
            },
            ActionConfigTxType::CreateActionGroup { name, module_ids } => {
                settings::execute_config_create_action_group(settings, name, module_ids);
            },
            ActionConfigTxType::EditActionGroup { group_id, mut name_new_opt, module_ids_add, module_ids_delete } => {
                settings::execute_config_edit_action_group(settings, group_id, &mut name_new_opt, module_ids_add, module_ids_delete);
            },
            ActionConfigTxType::DeleteActionGroup { group_id } => {
                // checks
                // - you cannot delete an action group which is referenced in a policy rule

                assert!(!policy::is_action_group_in_any_policy_rule(policy, group_id));
                settings::execute_config_delete_action_group(settings, group_id);
            },
        };
        ConfigTxReturnTypes::None

    }

    // Function to check if admin approval is required
    public fun is_config_tx_admin_approval_required(config_txs: vector<ConfigTxType>): bool {
        config_txs.all!(|tx|  {
            match (tx) {
                ConfigTxType::VaultConfig(vault_config) => {
                    match (vault_config) {
                        VaultConfigTxType::ShareUserShares { .. } => false,
                        VaultConfigTxType::AddExternalSigner { .. } => false,
                        VaultConfigTxType::AddVault{ .. } => false,
                        _ => true,
                    }
                },
                ConfigTxType::UserConfig(user_config) => {
                    match (user_config) {
                        UserConfigTxType::ResetInitCapUser { .. } => false,
                        _ => true,
                    }
                },
                ConfigTxType::OtherConfig(recovery_config) => {
                    match (recovery_config) {
                        OtherConfigTxType::RegisterAccountRecovery { .. } => false,
                        OtherConfigTxType::RevokeRecovery { .. } => false,
                        _ => true,
                    }
                },
                _ => true,
            }
        })
    }


    public(package) fun create_mpc_transaction_internal<A: copy + store + drop>(transactions: &mut Transactions, initiator: u16, network_id: String, status: MpcTxStatus, vault_id: u16, module_action: A, chain_module_id: ID, memo: String): (u64, MpcTxStatus) {
        let tx = MpcTransaction<A> {
                    // id: object::new(ctx),
                    initiator: initiator,
                    network_id: network_id,
                    status: status,
                    vault_id: vault_id,
                    module_action: module_action,
                    chain_module_id: chain_module_id, 
                    memo: memo,
                    cancellations: vec_set::empty(),
                };

        let tx_id = transactions.transaction_id_counter;
        transactions.transaction_id_counter = tx_id + 1;

        bag::add(&mut transactions.transactions, tx_id, tx);
        (tx_id, status)
    }




    public(package) fun approve_proposal(users: &mut Users, transactions: &Transactions, tx_id: u64, user_id: u16) {
            let tx = bag::borrow<u64, ConfigTx>(&transactions.transactions, tx_id);        

            match (tx.status) {
                ConfigTxStatus::PendingApproval{proposal: mut proposal} => proposal::approve_proposal(&mut proposal, users, user_id),
                _ => abort 309535035093 // ETxNotPendingApproval
        };

    }

    public(package) fun reject_proposal(users: &mut Users, transactions: &Transactions, tx_id: u64, user_id: u16) {
            let tx = bag::borrow<u64, ConfigTx>(&transactions.transactions, tx_id);        

            match (tx.status) {
                ConfigTxStatus::PendingApproval{proposal: mut proposal} => proposal::reject_proposal(&mut proposal, users, user_id),
                _ => abort 309535035093 // ETxNotPendingApproval
        };
    }


    public(package) fun is_user_initiator<A: copy + store + drop>(transactions: & Transactions, tx_id: u64, user_id: u16): bool {

        // check if the user is the initiator of the tx
        if (bag::contains_with_type<u64, ConfigTx>(&transactions.transactions, tx_id)) {
            let tx = bag::borrow<u64, ConfigTx>(&transactions.transactions, tx_id);
            return tx.initiator == user_id
        }
        else if (bag::contains_with_type<u64, MpcTransaction<A>>(&transactions.transactions, tx_id)) {
            let tx = bag::borrow<u64, MpcTransaction<A>>(&transactions.transactions, tx_id);
            return tx.initiator == user_id
        };
        false
    }


    // cancel_transaction
    // TODOX authorisation missing>
    public(package) fun cancel_transaction<A: copy + store + drop>(users: &Users, transactions: &mut Transactions, tx_id: u64, user_id: u16, workspace_id: ID) {
        
        if (bag::contains_with_type<u64, ConfigTx>(&transactions.transactions, tx_id)) {
            // mark config tx as cancelled
            let tx = bag::borrow_mut<u64, ConfigTx>(&mut transactions.transactions, tx_id);
            tx.cancellations.insert(user_id);
            let is_cancelled = users.quorum_approves(&tx.cancellations);
            
            if (is_cancelled){
                update_config_tx_status_cancelled(transactions, tx_id, workspace_id);
            }

        }
        else if (bag::contains_with_type<u64, MpcTransaction<A>>(&transactions.transactions, tx_id)) {
            let tx = bag::borrow_mut<u64, MpcTransaction<A>>(&mut transactions.transactions, tx_id);
            tx.cancellations.insert(user_id);
            let is_cancelled = users.quorum_approves(&tx.cancellations);
            if (is_cancelled){
                update_mpc_tx_status_cancelled<A>(transactions, tx_id, workspace_id);
            }
        }
    }



    // Vault Config
    public fun create_add_vault_enum(name: String, vault_group_id: u16, vault_profile_id: String): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::AddVault { name, vault_group_id, vault_profile_id })
    }

    public fun create_edit_vault_enum(vault_id: u16, name_new_opt: Option<String>, vault_group_id_new_opt: Option<u16>, vault_profile_id_new_opt: Option<String>): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::EditVault { vault_id, name_new_opt, vault_group_id_new_opt, vault_profile_id_new_opt })
    }

    public fun create_add_vault_group_enum(name: String, vault_ids: vector<u16>): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::AddVaultGroup { name, vault_ids })
    }

    public fun create_edit_vault_group_enum(name_new_opt: Option<String>, vault_group_id: u16, vault_ids_add: vector<u16>, vault_ids_remove: vector<u16>): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::EditVaultGroup { name_new_opt, vault_group_id, vault_ids_add, vault_ids_remove })
    }

    public fun create_delete_vault_group_enum(vault_group_id: u16): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::DeleteVaultGroup { vault_group_id })
    }

    public fun create_add_external_signer_enum(public_key: vector<u8>): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::AddExternalSigner { public_key })
    }

    public fun create_share_user_shares_enum(user_id: u16): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::ShareUserShares { user_id })
    }

    public fun create_vault_profile_add_enum(profile_name: String, vault_profile: VaultProfile): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::VaultProfileAdd { profile_name, vault_profile })
    }

    public fun create_vault_profile_edit_enum(profile_name: String, vault_profile: VaultProfile): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::VaultProfileEdit { profile_name, vault_profile })
    }

    public fun create_vault_profile_delete_enum(profile_name: String): ConfigTxType {
        ConfigTxType::VaultConfig(VaultConfigTxType::VaultProfileDelete { profile_name })
    }

    // User Config
    public fun create_add_user_enum(name: String, registration_address_type: u8, registration_address: vector<u8>, role_id: u16, groups_to_add_to: vector<u16>): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::AddUser { name, registration_address_type, registration_address, role_id, groups_to_add_to })
    }

    public fun create_edit_user_enum(user_id: u16, name_new_opt: Option<String>, new_role_id_opt: Option<u16>): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::EditUser { user_id, name_new_opt, new_role_id_opt })
    }

    public fun create_delete_user_enum(user_id: u16): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::DeleteUser { user_id })
    }

    public fun create_reset_user_enum(user_id: u16, reset_init_cap: bool, new_registration_address_type: Option<u8>, new_registration_address: Option<vector<u8>>): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::ResetUser { user_id, reset_init_cap, new_registration_address_type, new_registration_address })
    }

    public fun create_reset_init_cap_user_enum(user_id: u16, new_registration_address_type: u8, new_registration_address: vector<u8>): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::ResetInitCapUser { user_id, new_registration_address_type, new_registration_address })
    }

    public fun create_create_user_group_enum(name: String, user_ids: vector<u16>): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::CreateUserGroup { name, user_ids })
    }

    public fun create_edit_user_group_enum(group_id: u16, name_new_opt: Option<String>, user_ids_add: vector<u16>, user_ids_delete: vector<u16>): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::EditUserGroup { group_id, name_new_opt, user_ids_add, user_ids_delete })
    }

    public fun create_delete_user_group_enum(group_id: u16): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::DeleteUserGroup { group_id })
    }

    public fun create_edit_quorum_enum(new_quorum: u16): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::EditQuorum { new_quorum })
    }

    public fun create_add_role_enum(new_role: Role): ConfigTxType {
        ConfigTxType::UserConfig(UserConfigTxType::AddRole { new_role })
    }

    // Address Book Config
    public fun create_add_address_enum(name: String, network_address: vector<u8>, network_ids: vector<String>): ConfigTxType {
        ConfigTxType::AddressBookConfig(AddressBookConfigTxType::AddAddress { name, network_address, network_ids })
    }

    public fun create_edit_address_enum(address_id: u16, name_new_opt: Option<String>, new_network_ids: Option<vector<String>>): ConfigTxType {
        ConfigTxType::AddressBookConfig(AddressBookConfigTxType::EditAddress { address_id, name_new_opt, new_network_ids })
    }

    public fun create_delete_address_enum(address_id: u16): ConfigTxType {
        ConfigTxType::AddressBookConfig(AddressBookConfigTxType::DeleteAddress { address_id })
    }

    public fun create_add_address_group_enum(name: String, address_ids: vector<u16>): ConfigTxType {
        ConfigTxType::AddressBookConfig(AddressBookConfigTxType::AddGroup { name, address_ids })
    }

    public fun create_edit_address_group_enum(group_id: u16, name_new_opt: Option<String>, address_ids_add: vector<u16>, address_ids_delete: vector<u16>): ConfigTxType {
        ConfigTxType::AddressBookConfig(AddressBookConfigTxType::EditGroup { group_id, name_new_opt, address_ids_add, address_ids_delete })
    }

    public fun create_delete_address_group_enum(group_id: u16): ConfigTxType {
        ConfigTxType::AddressBookConfig(AddressBookConfigTxType::DeleteGroup { group_id })
    }

    // Other Config
    public fun create_edit_workspace_name_enum(new_workspace_name: String): ConfigTxType {
        ConfigTxType::OtherConfig(OtherConfigTxType::EditWorkspaceName { new_workspace_name })
    }

    public fun create_edit_policy_enum(new_policy_rules: vector<PolicyRule>): ConfigTxType {
        ConfigTxType::OtherConfig(OtherConfigTxType::EditPolicy { new_policy_rules })
    }

    // Action Config
    public fun create_add_whitelist_action_module_enum(module_id: ID): ConfigTxType {
        ConfigTxType::ActionConfig(ActionConfigTxType::AddWhitelistActionModule { module_id })
    }

    public fun create_remove_whitelist_action_module_enum(module_id: ID): ConfigTxType {
        ConfigTxType::ActionConfig(ActionConfigTxType::RemoveWhitelistActionModule { module_id })
    }

    public fun create_create_action_group_enum(name: String, module_ids: vector<ID>): ConfigTxType {
        ConfigTxType::ActionConfig(ActionConfigTxType::CreateActionGroup { name, module_ids })
    }

    public fun create_edit_action_group_enum(group_id: u16, name_new_opt: Option<String>, module_ids_add: vector<ID>, module_ids_delete: vector<ID>): ConfigTxType {
        ConfigTxType::ActionConfig(ActionConfigTxType::EditActionGroup { group_id, name_new_opt, module_ids_add, module_ids_delete })
    }

    public fun create_delete_action_group_enum(group_id: u16): ConfigTxType {
        ConfigTxType::ActionConfig(ActionConfigTxType::DeleteActionGroup { group_id })
    }

    // Recovery Config
    public fun create_register_account_recovery_enum(user_id: u16, recovery_address: address, public_key: vector<u8>, encrypted_user_shares_map: VecMap<u16, vector<u8>>): ConfigTxType {
        ConfigTxType::OtherConfig(OtherConfigTxType::RegisterAccountRecovery { user_id, recovery_address, public_key, encrypted_user_shares_map })
    }

    public fun create_revoke_recovery_enum(user_id: u16): ConfigTxType {
        ConfigTxType::OtherConfig(OtherConfigTxType::RevokeRecovery { user_id })
    }

}