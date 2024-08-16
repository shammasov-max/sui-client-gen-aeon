module aeon_custody::module_interface {
    use std::vector;
    use std::option::{Self,Option};

    use sui::object::{Self, ID, UID};
    use sui::table::{Self};
    use sui::vec_map::{Self,VecMap};
    use sui::bag::{Self,Bag};

    use sui::transfer;
    use sui::tx_context::{TxContext};
    use std::string::{Self,String};
    use sui::event::{Self};

    use aeon_custody::library::{Self,NetworkAddress};

    public struct BalanceChange has store, copy, drop {
        token_address: vector<u8>,// address of the token, for native assets we would have "native" as address
        counterparty: vector<u8>,
        network: String,
        amount: u256, //this is in the token unit
        amount_dollar: u256, // TODO should we make this an option
    }


    // TOOD how do we handle is_valid in general?
    public struct TxEffects<A> has store, copy, drop {
        tx_effects_module_id: ID,
        tx_assemble_module_id: ID, // TODO vector??
        network: String, //network the tx was triggered on in case of bridging
        interaction_address_opt: Option<vector<u8>>, // TODO can it be that there are interactions with several contracts?
        balance_changes: vector<BalanceChange>,
        action: A, // we need this so we later know what we need to pass the module for execution
    }
    

    public struct ModuleCap has key, store{
        id: UID
    }

    public struct VaultContainer has key {
        id: UID, // todo how do we store this vault id
        workspace_id: ID,
        vault_id: u16, 
        map_module_id_to_container: Bag, //VecMap<ID, ModuleContainer<S,T>>, // todo: we should specifiy that these are "chain modules"
    }

    // this is used for EVM, Bitcoin, Solana etc
    public struct ModuleContainer<S: store, T: store> has store{
        // module_namespaces: vector<String>,  //todo: not needed??
        // network_ids: vector<String>,
        module_state: S,
        transaction_state: VecMap<u64,T>,
    }


    // potatoes for message passing between workspace and module containers
    public struct InitVaultContainerRequest {
        workspace_id: ID, 
        vault_id: u16, 
        required_module_ids: vector<ID>,
        // module_namespaces: vector<String>,
        // network_ids: vector<vector<String>>,
    }

    public struct InitModuleContainerRequest {
        workspace_id: ID, 
        module_id: ID, 
        // module_namespace: vector<String>,
        // network_ids: vector<String>,
    }

    public struct ModuleActionRequest<A> {
        workspace_id: ID, 
        vault_id: u16,
        module_id: ID, 
        network_id: String,
        tx_id: u64, 
        action: A
    }

    public struct TxEffectsResult<A> { 
        effects: TxEffects<A>, 
    }


    public struct ContainerRegisteredResult {
        workspace_id: ID, 
        container_id: ID, 
    }

    public struct ModuleActionResult<E: store + copy + drop> {
        workspace_id: ID,
        module_id: ID,
        tx_id: u64,
        vault_id: u16,
        network_id: String,
        tx_signable: vector<vector<u8>>, 
        module_event: E
    }


    //EVENTS
    public struct VaultContainerCreated has copy, store, drop {
        vault_container_id: ID,
        workspace_id:ID,
        vault_id: u16,
    }

    public struct ModuleCapCreated has copy, store, drop {
        cap_holder_id: ID,
        cap: ID,
    }

    public struct AddedModuleTransaction<T:store + drop + copy> has copy, store, drop {
        workspace_id: ID,
        vault_id: u16,
        module_id: ID,
        tx_id: u64,
        transaction: T
    }



    public fun create_tx_effects<A>(
        module_cap: &ModuleCap, 
        tx_assemble_module_id: ID, 
        network: String,
        interaction_address_opt: Option<vector<u8>>, 
        balance_changes: vector<BalanceChange>, 
        action: A, 
    ): TxEffectsResult<A> {

        let effects = TxEffects<A>{tx_effects_module_id: get_id_module_cap(module_cap), tx_assemble_module_id, network, interaction_address_opt, balance_changes, action };
        TxEffectsResult{ effects }
    }


    public fun create_balance_change(token_address: vector<u8>, counterparty: vector<u8>, network: String, amount: u256, amount_dollar: u256): BalanceChange {
        BalanceChange{token_address, counterparty, network, amount, amount_dollar}
    }

    public fun create_module_cap(cap_holder_id: ID, ctx: &mut TxContext):  ModuleCap {
        let cap=ModuleCap{id: object::new(ctx)};
        event::emit(ModuleCapCreated{
            cap_holder_id: cap_holder_id,
            cap: object::uid_to_inner(&cap.id),
        });
        return cap
    }

    public fun get_id_module_cap(module_cap: &ModuleCap): ID {
        return object::uid_to_inner(&module_cap.id)
    }


    // potatoe to ensure the container is shared after executing InitModuleContainerRequest
    public struct ShareContainerRequired {
        workspace_id: ID,
        container_id: ID,
    }


    // this is to create the vault container, with the req initiated by the workspace
    public fun init_vault_container(req: InitVaultContainerRequest, ctx: &mut TxContext): (VaultContainer, ShareContainerRequired, vector<InitModuleContainerRequest>){
        // assert!(req.module_id == object::uid_to_inner(&module_cap.id), 0);
        let InitVaultContainerRequest {workspace_id, vault_id, required_module_ids} = req;
        
        // assert!((vector::length(&required_module_ids) ), 0);

        let container = VaultContainer{
            id: object::new(ctx),
            workspace_id: workspace_id,
            vault_id: vault_id, 
            map_module_id_to_container: bag::new(ctx),
        };

        let share_required = ShareContainerRequired{workspace_id, container_id: object::uid_to_inner(&container.id)};

        // create for distinct module_ids InitModuleContainerRequest respectively
        let mut init_module_container_requests = vector::empty<InitModuleContainerRequest>();
        let mut existing_module_ids=vector::empty<ID>();
        let mut i = 0;
        while (i < vector::length(&required_module_ids)) {
            let module_id = *vector::borrow(&required_module_ids, i);
            let (already_added_module,index)=vector::index_of(&existing_module_ids, &module_id);
            if(!already_added_module){
                let init_module_container_request = InitModuleContainerRequest{workspace_id, module_id};
                vector::push_back(&mut init_module_container_requests, init_module_container_request);
                vector::push_back(&mut existing_module_ids, module_id);
            };
            i = i + 1;
        };

        event::emit(VaultContainerCreated{
            vault_container_id: object::uid_to_inner(&container.id),
            workspace_id: container.workspace_id,
            vault_id: container.vault_id,
        });

        (container, share_required, init_module_container_requests)
    }
    
    // this is needed as we need to make sure the vault container is eventually shared. we can't share it immediately as we have to add the module containers first
    public fun share_container(container: VaultContainer, share_required: ShareContainerRequired){
        assert!(container.workspace_id == share_required.workspace_id, 0);
        
        

        transfer::share_object(container);

        // destruct the share_required potato
        let ShareContainerRequired {workspace_id, container_id} = share_required;
    }


    // this is to create the module container, called from with the module to setup
    public fun init_module_container<S: store,T: store>(req: InitModuleContainerRequest, container: &mut VaultContainer, module_cap: &ModuleCap, chain_state: S){
        assert!(container.workspace_id == req.workspace_id, 0);
        assert!(req.module_id == object::uid_to_inner(&module_cap.id), 0);

        let InitModuleContainerRequest {workspace_id, module_id} = req;
        
        let module_container = ModuleContainer<S,T> {
            // network_ids: network_ids,
            module_state: chain_state,
            transaction_state: vec_map::empty<u64,T>() };
    
        bag::add(&mut container.map_module_id_to_container, module_id, module_container);
    }


//todo: should this be friend fun??
    public fun create_init_vault_container_request(workspace_id: ID, vault_id: u16, required_module_ids: vector<ID>): InitVaultContainerRequest {
        return InitVaultContainerRequest{workspace_id, vault_id, required_module_ids}
    }


    


    public fun create_module_action_result<A: drop,E:drop + copy + store> (req: ModuleActionRequest<A>,module_event: E, module_cap: &ModuleCap, tx_signable: vector<vector<u8>>): ModuleActionResult<E>{
        assert!(req.module_id == object::uid_to_inner(&module_cap.id), 0);
        let ModuleActionRequest {workspace_id, vault_id, module_id, network_id, tx_id, action} = req;
        // TODO add vault_id here as 
        return ModuleActionResult{workspace_id, module_id, vault_id,tx_id,network_id, tx_signable,module_event}
    }


    public fun add_transaction<S: store,T: store + copy + drop, A: store>(container: &mut VaultContainer, tx_id: u64, transaction: T, req: &ModuleActionRequest<A>, module_cap: &ModuleCap){
        // check comes from the correct workspace
        assert!(container.workspace_id == req.workspace_id, 0);
        // check the originating vault is authorised to change data for this VaultContainer
        assert!(req.vault_id == container.vault_id, 0);
        // checks the module is authorised to change data for this ModuleContainer
        assert!(req.module_id == object::uid_to_inner(&module_cap.id), 0);

        let module_container = bag::borrow_mut<ID,ModuleContainer<S,T>>(&mut container.map_module_id_to_container, object::uid_to_inner(&module_cap.id));

        event::emit(AddedModuleTransaction {
            workspace_id: req.workspace_id,
            vault_id: req.vault_id,
            module_id: req.module_id,
            tx_id: tx_id,
            transaction: transaction,
        });

        vec_map::insert(&mut module_container.transaction_state, tx_id, transaction);
    }


    public fun get_transaction_borrow_mut<S: store,T: store, A: store>(container: &mut VaultContainer, tx_id: u64, req: &ModuleActionRequest<A>, module_cap: &ModuleCap): &mut T { // req: &ModuleActionRequest<A>,
        // check comes from the correct workspace
        assert!(container.workspace_id == req.workspace_id, 0);
        // check the originating vault is authorised to change data for this VaultContainer
        assert!(req.vault_id == container.vault_id, 0);
        // checks the module is authorised to change data for this ModuleContainer
        assert!(req.module_id == object::uid_to_inner(&module_cap.id), 0);

        let module_container = bag::borrow_mut<ID,ModuleContainer<S,T>>(&mut container.map_module_id_to_container, object::uid_to_inner(&module_cap.id));
        return vec_map::get_mut(&mut module_container.transaction_state, &tx_id)
    }

    public fun get_state_borrow_mut<S: store, T: store, A: store>(container: &mut VaultContainer, req: &ModuleActionRequest<A>, module_cap: &ModuleCap): &mut S{
        
        // check comes from the correct workspace
        assert!(container.workspace_id == req.workspace_id, 0);
        // check the originating vault is authorised to change data for this VaultContainer
        assert!(req.vault_id == container.vault_id, 0);
        // checks the module is authorised to change data for this ModuleContainer
        assert!(req.module_id == object::uid_to_inner(&module_cap.id), 0); 

        let module_container = bag::borrow_mut<ID,ModuleContainer<S,T>>(&mut container.map_module_id_to_container, object::uid_to_inner(&module_cap.id));
        return &mut module_container.module_state
    }


    public(package) fun parse_recipients(balance_changes: vector<BalanceChange>) : vector<NetworkAddress>{
        balance_changes.map!(|balance_change| {
            let (_,counterparty,network, _, _) = view_balance_change(&balance_change); //todo: Alex to fix
            library::create_network_address(network,counterparty)
        })
    }


    public(package) fun create_module_action_request<A>(workspace_id: ID, vault_id: u16, module_id: ID, tx_id: u64, network_id: String, action: A): ModuleActionRequest<A> {
        return ModuleActionRequest{workspace_id, vault_id, module_id, network_id, tx_id, action}
    }

    public(package) fun create_init_module_container_request<S>(workspace_id: ID,  module_id: ID): InitModuleContainerRequest {
        return InitModuleContainerRequest{workspace_id, module_id}
    }


    public(package) fun consume_tx_effect_result<A>(res: TxEffectsResult<A>): (TxEffects<A>) {
        let TxEffectsResult<A> {effects} = res;
        effects
    }

    public(package) fun consume_module_action_result<E: copy + drop +store>(res: ModuleActionResult<E>): (ID, ID, u16,u64, String,vector<vector<u8>>,E) {
        let ModuleActionResult {workspace_id, module_id,vault_id, tx_id, network_id,tx_signable,module_event} = res;
        return (workspace_id, module_id, vault_id,tx_id,network_id, tx_signable,module_event)
    }


    // VIEW functions

    public fun view_init_module_vault_request<S: copy>(req: &InitModuleContainerRequest): (ID, ID) {
        let InitModuleContainerRequest {workspace_id, module_id} = req;
        return (*workspace_id, *module_id)
    }

    public fun view_module_action_request<A: copy>(req: &ModuleActionRequest<A>): (ID, u16, ID, String, u64, A) {
        let ModuleActionRequest {workspace_id, vault_id, module_id, network_id, tx_id, action} = req;
        return (*workspace_id, *vault_id, *module_id, *network_id, *tx_id, *action)
    }

    public fun view_tx_effects<A: copy>(effects: &TxEffects<A>): (ID, ID, String, Option<vector<u8>>, vector<BalanceChange>, A) {
        let TxEffects<A> {tx_effects_module_id,tx_assemble_module_id, network, interaction_address_opt, balance_changes, action} = effects;
        return (*tx_effects_module_id, *tx_assemble_module_id, *network, *interaction_address_opt, *balance_changes, *action)
    }

    public fun view_balance_change(change: &BalanceChange): (vector<u8>,vector<u8>,String, u256, u256) {
        let BalanceChange {token_address,counterparty,network, amount, amount_dollar} = change;
        return (*token_address,*counterparty,*network, *amount, *amount_dollar)
    }


    public fun view_module_cap_id(cap: &ModuleCap): ID {
        return object::uid_to_inner(&cap.id)
    }   


}