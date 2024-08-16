module aeon_custody::user {
    use std::vector;
    use std::option::{Self,Option};
    use std::hash as std_hash;
    use std::string::{Self,String};
    use sui::object::{Self,ID,UID};
    use sui::bag::{Self,Bag};
    use sui::transfer;
    use sui::table::{Self,Table};
    use sui::tx_context::{Self,TxContext};
    use sui::vec_map::{Self,VecMap};
    use sui::vec_set::{Self,VecSet};
    use sui::address;
    use sui::ecdsa_k1;
    use sui::hash;
    use sui::event::{Self};
    use sui::hex;


    use aeon_custody::registration;


    /* friend aeon_custody::workspace; */
    /* friend aeon_custody::policy; */


    // Errors
    const ENotAuthorized: u64=0;
    const EInvalidPointer: u64=1;
    const EInvalidExecution: u64=2;
    const EInvalidQuorum: u64=3;


    // TODOX think through permissions holistically, go through all config actions and check if we should add a permission
    // TODOX add init config tx/ add execute config tx
    // TOODX add permissions for the recovery of the user
    const PERMISSION_ADMIN_QUORUM: u8 = 0; // Can vote and change admin quorum
    const PERMISSION_INIT_MPC_TX: u8 = 1;
    const PERMISSION_SIGN_MPC_TX: u8 = 2;
    const PERMISSION_VOTE_PROPOSAL: u8 = 3;
    const PERMISSION_APPROVE_TASK: u8 = 4;
    const PERMISSION_RECOVERY: u8 = 5;





    const EVM_ED_WALLET : u8 = 0;
    const ADMIN_ROLE_ID: u16 = 0;


    public struct UserCap has key,store {
        id: UID,
        workspace_id: ID, //we store the workspace ID for easier offchain handling
    }


    public struct Recovery has store, drop {
        cap_id: ID,
        recovery_public_key: vector<u8>,
    }

    public struct User has store {
        name: String,
        role_id: u16, 
        init_tx_caps: vector<ID>,
        approve_cap: ID,
        approve_public_key_opt: Option<vector<u8>>, //has to be option as we dont have it on signup
        group_ids: VecSet<u16>,
        recovery_opt: Option<Recovery>,
        // TODOX encapsulate properly in enum type 
        registration_address_type: u8,
        registration_address: vector<u8>, // stored so we do not need to pass it later
    }

    public struct RegistrationHolder has key, store {
        id: UID, 
        user_id: u16, 
        user_address_type: u8,
        user_address: vector<u8>, 
        init_cap_opt: Option<UserCap>,
        approve_cap_opt: Option<UserCap>,
    }



    public struct UserGroup has store {
        name: String,
        user_ids: VecSet<u16>,
    }

    public enum Role has store, copy, drop {
        Admin,
        Custom {role_identifier: String, permissions: vector<u8>},
    }

    public struct Users has store {
        admin_quorum_threshold: u16, // TODO should we move this to the workspace?
        roles: VecMap<u16, Role>,
        users: VecMap<u16,User>,
        user_groups: VecMap<u16,UserGroup>,
        external_signers: vector<vector<u8>>,
        id_counter: u16, //used to generate group and user ids; starts with index 1 as the first two groups are reserved
        //its important that this is unique across all users and groups as required in policy initiator
    }


    // EVENTS 
    // public struct RetrievedUserCapsEvent has copy, store, drop {
    //     registration_holder:ID,
    //     user_address_type: u8, // TODO make dynamic
    //     user_address: vector<u8>,
    //     approve_cap_holder_address_opt:Option<address>
    // } 

    public struct RetrievedUserCapsEvent has copy, store, drop {
        registration_holder:ID,
        user_address_type: u8, // TODO make dynamic
        user_address: vector<u8>,
        approve_cap_holder_address_opt:Option<address>
    } 


    public struct CreatedRegistrationHolderEvent has copy, store, drop {
        workspace_id: ID,
        registration_holder:ID,
        user_address_type: u8,
        user_address: vector<u8>,
    }

    public struct AddedCapEvent has copy, store, drop {
        workspace_id: ID,
        user_cap_id: ID,
        is_init: bool
    }

    // public struct CreatedRegistrationHolderEvent has copy, store, drop {
    //     workspace_id: ID,
    //     registration_holder:ID,
    //     user_address_type: u8,
    //     user_address: vector<u8>,
    // }


    public(package) fun add_init_cap_users(users: &mut Users,workspace_id:ID, user_id: u16,  ctx: &mut TxContext): UserCap {
        let user = vec_map::get_mut(&mut users.users, &user_id);

        let user_cap=create_cap_internal(workspace_id, false, ctx);

        vector::push_back(&mut user.init_tx_caps, object::id(&user_cap));

        return user_cap
    }


    fun create_cap_internal(workspace_id:ID, is_approve: bool, ctx: &mut TxContext): UserCap {
        let user_cap_uid = object::new(ctx);

        event::emit(
            AddedCapEvent{
                workspace_id: workspace_id,
                user_cap_id: *object::uid_as_inner(&user_cap_uid),
                is_init: !is_approve,
            }
        );

        let user_cap = UserCap{
            id: user_cap_uid,
            workspace_id: workspace_id,
        };

        return user_cap
    }
    

    public(package) fun init_users(admin_quorum_threshold: u16, ctx: &mut TxContext): Users {
        let mut roles = vec_map::empty();
        roles.insert(ADMIN_ROLE_ID, Role::Admin);
        let users = Users{
            admin_quorum_threshold: admin_quorum_threshold,
            roles: roles,
            users: vec_map::empty(),
            user_groups: vec_map::empty(),
            external_signers: vector::empty(),
            id_counter: 1,
        };

        users
    }


    public(package) fun is_user_in_group(users: &Users, user_id: u16, group_id: u16): bool {
        let user_group = vec_map::get(&users.user_groups, &group_id);        
        return user_group.user_ids.contains(&user_id)
    }



    // only used for adding the first member to directly create and send the caps to the user
    // TODO revisit why we need an extra function for this
    public(package) fun add_first_admin(
        users: &mut Users,
        workspace_id: ID,
        name: String, 
        init_address: address, 
        approve_address: address,
        approve_public_key: vector<u8>,
        admin_registration_address: vector<u8>,
        ctx: &mut TxContext,
    ): (u16, UserCap, ID) {
        //create init cap
        let user_cap=create_cap_internal(workspace_id, false, ctx);
        let user_cap_id = *object::uid_as_inner(&user_cap.id);

        // create approve cap 
        let approve_cap=create_cap_internal(workspace_id, true, ctx);
        let approve_cap_id = *object::uid_as_inner(&approve_cap.id);
        transfer::public_transfer(approve_cap, approve_address);


        let user = User{
            name: name,
            role_id: ADMIN_ROLE_ID,
            // permissions: permissions,
            init_tx_caps: vector::singleton(user_cap_id),
            approve_cap: approve_cap_id,
            approve_public_key_opt: option::some(approve_public_key),
            group_ids: vec_set::empty(),
            recovery_opt: option::none(),
            registration_address_type: EVM_ED_WALLET, // TODO make this dynamic?
            registration_address: admin_registration_address,
        };
        let user_id = users.id_counter;
        users.id_counter=users.id_counter+1;


        vec_map::insert(&mut users.users,user_id,user);        
        return (user_id, user_cap, approve_cap_id)
    }



    public fun execute_config_add_role(users: &mut Users, role: Role) {
        // checks
        match (role) {
            Role::Admin => {
                abort 234343;
            },
            // TODO is this really necessary
            Role::Custom {role_identifier: _ , permissions} => {
                assert!(vector::length(&permissions) > 0, 9867986);
            },
        };

        let role_id = users.roles.size() as u16;
        users.roles.insert(role_id, role);
    }


    public(package) fun add_external_signer(users: &mut Users, public_key: vector<u8>) {
        vector::push_back(&mut users.external_signers, public_key);
    }



    public(package) fun execute_config_add_user(
        users: &mut Users,
        workspace_id: ID,
        name: String, 
        registration_address_type: u8, 
        registration_address: vector<u8>, 
        user_role_id: u16,
        groups_to_add_to: vector<u16>,
        ctx: &mut TxContext,
    ) {
        let user_id = users.id_counter;
        users.id_counter=users.id_counter+1;

        let (registration_holder_id, mut approve_cap_id_opt, mut init_cap_id_opt) = issue_new_caps_internal(workspace_id, user_id, true,true,registration_address_type, registration_address, ctx);
        
        let init_cap_id = option::extract(&mut init_cap_id_opt);
        let approve_cap_id = option::extract(&mut approve_cap_id_opt);
        
    
        assert!(is_role_valid(users, user_role_id), 9867986);
        let user = User{
            name: name,
            role_id: user_role_id,
            init_tx_caps: vector::singleton(init_cap_id),
            approve_cap: approve_cap_id,
            approve_public_key_opt: option::none(),
            group_ids: vec_set::from_keys(groups_to_add_to), 
            recovery_opt: option::none(),
            registration_address_type: registration_address_type,
            registration_address: registration_address,
        };

    
        vec_map::insert(&mut users.users,user_id,user);
    }

    public(package) fun quorum_approves(users: &Users, quorum_votes: &VecSet<u16>): bool {
        let valid_votes_quorum_count = quorum_votes.keys().count!(|user_id| { is_user_authorized(users, *user_id, get_admin_quorum_permission()) }) as u16;

        (valid_votes_quorum_count >= users.get_admin_quorum_threshold())
    }


    public(package) fun is_admin_quorum_valid(users: &Users): bool {
        let admin_count = get_admin_quorum_count(users);
        let admin_quorum_threshold = get_admin_quorum_threshold(users);
        (admin_quorum_threshold <= admin_count) && (admin_quorum_threshold >= 1)
    }

    public(package) fun is_valid_role_id(roles: VecMap<u16, Role>, role_id: u16): bool {
        let role = roles.try_get(&role_id);
        option::is_some(&role)
    }
    

    // TODO do checks here 
    public(package) fun execute_config_user_edit(
        users: &mut Users,
        user_id: u16, 
        new_name_opt: Option<String>, 
        new_role_id_opt: Option<u16>, 
    ) {      
        let user = users.users.get_mut(&user_id);
        
        if (option::is_some(&new_name_opt)) {
            user.name = *new_name_opt.borrow();
        };

        // ensure that removal from admin group does not violate quorum threshold 
        if (new_role_id_opt.is_some()){   
            let new_role_id = *new_role_id_opt.borrow();
            assert!(is_valid_role_id(users.roles, new_role_id), 3433343);
            user.role_id = new_role_id;
            assert!(is_admin_quorum_valid(users), 34345);
        };     
    }

    public(package) fun execute_config_user_delete(
        users: &mut Users,
        user_id: u16, 
    ) {
        let (_, user) = vec_map::remove(&mut users.users, &user_id);
        let User {name, role_id, init_tx_caps, approve_cap, approve_public_key_opt, group_ids, recovery_opt, registration_address_type, registration_address} = user;
        
        (*group_ids.keys()).do!(|group_id| {
            let group = vec_map::get_mut(&mut users.user_groups, &group_id);
            vec_set::remove(&mut group.user_ids, &user_id);
        });
    }

    public(package) fun execute_config_user_reset_init_cap(
        users: &mut Users, 
        workspace_id: ID,
        user_id: u16, 
        new_registration_address_type: u8, 
        new_registration_address: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let user = vec_map::get_mut(&mut users.users, &user_id);

        user.registration_address_type = new_registration_address_type;
        user.registration_address = new_registration_address;

        let (registration_holder_id, approve_cap_id_opt, mut init_cap_id_opt) = issue_new_caps_internal(workspace_id, user_id, false,true,user.registration_address_type, user.registration_address, ctx);

        let init_cap_id = option::extract(&mut init_cap_id_opt);
        user.init_tx_caps = vector::singleton(init_cap_id);
    }


    // reset the cap that is used for the mobile signer
    public(package) fun execute_config_user_reset(
        users: &mut Users, 
        workspace_id: ID,
        user_id: u16,
        reset_init_cap: bool,
        new_registration_address_type: Option<u8>,
        new_registration_address: Option<vector<u8>>,
        ctx: &mut TxContext,
    ) {
        let user = vec_map::get_mut(&mut users.users, &user_id);
        if (reset_init_cap) {
            user.registration_address_type = *option::borrow(&new_registration_address_type);
            user.registration_address = *option::borrow(&new_registration_address);
        };
        let (registration_holder_id, mut approve_cap_id_opt, mut init_cap_id_opt) = issue_new_caps_internal(workspace_id, user_id, true, reset_init_cap ,user.registration_address_type, user.registration_address, ctx);
        
        let approve_cap_id = option::extract(&mut approve_cap_id_opt);
        user.approve_cap = approve_cap_id;

        if (reset_init_cap) {
            let init_cap_id = option::extract(&mut init_cap_id_opt);
            user.init_tx_caps = vector::singleton(init_cap_id);
        };
    }


    // TOOD refactor to not have duplicate logic
    public(package) fun issue_new_caps_internal(
        workspace_id: ID,
        user_id: u16,
        issue_approve_cap: bool,
        issue_init_cap: bool,
        registration_address_type: u8, 
        registration_address: vector<u8>, 
        ctx: &mut TxContext,
    ): (ID, Option<ID>, Option<ID>) {

        let mut approve_cap_opt= option::none();
        let mut approve_cap_id_opt = option::none();
        if (issue_approve_cap){
            let approve_cap = create_cap_internal(workspace_id, true, ctx);
            let approve_cap_id = *object::uid_as_inner(&approve_cap.id);
 
            option::fill(&mut approve_cap_opt, approve_cap);
            
            approve_cap_id_opt = option::some(approve_cap_id);
        };
        
        
        let mut init_cap_opt = option::none();
        let mut init_cap_id_opt = option::none();
        if (issue_init_cap) {
            let user_cap = create_cap_internal(workspace_id, false, ctx);
            let init_cap_id = *object::uid_as_inner(&user_cap.id);
     
            option::fill(&mut init_cap_opt, user_cap);
            init_cap_id_opt = option::some(init_cap_id);
        };

        
        let holder = RegistrationHolder{
            id: object::new(ctx),
            user_id: user_id, 
            user_address_type: registration_address_type,
            user_address: registration_address,
            init_cap_opt: init_cap_opt,
            approve_cap_opt: approve_cap_opt,
        };
        let registration_holder_id = object::uid_to_inner(&holder.id);

        transfer::share_object(holder);



        event::emit(CreatedRegistrationHolderEvent {
                workspace_id: workspace_id,
                registration_holder: registration_holder_id,
                user_address_type: registration_address_type,
                user_address: registration_address,
            });




        (registration_holder_id, approve_cap_id_opt, init_cap_id_opt)
    }


    public(package) fun execute_config_user_create_group(
        users: &mut Users,
        name: String,
        user_ids: vector<u16>, 
    ) {
        let group = UserGroup{
            name: name,
            user_ids: vec_set::from_keys(user_ids),
        };

        let group_id = users.id_counter;
        users.id_counter=users.id_counter+1;

        users.user_groups.insert(group_id, group);
        // add the group id to the respective users
        user_ids.do!(|user_id| {
            users.users.get_mut(&user_id).group_ids.insert(group_id);
        })


    }

    public(package) fun execute_config_user_edit_group(
        users: &mut Users,
        group_id: u16, 
        name_new_opt: Option<String>, 
        user_ids_add: vector<u16>, 
        user_ids_delete: vector<u16>
    ) {
        let group = users.user_groups.get_mut(&group_id);
        
        if (option::is_some(&name_new_opt)) {
            group.name = *name_new_opt.borrow();
        };

        user_ids_add.do!(|user_id| {
            add_user_to_group_internal(users, user_id, group_id);
        });

        // remove users
        user_ids_delete.do!(|user_id| {
            delete_user_from_group_internal(users, user_id, group_id);
        });
    }


    public(package) fun execute_config_user_delete_group(
        users: &mut Users,
        group_id: u16,
    ) {
        let (_, group) = vec_map::remove(&mut users.user_groups, &group_id);
        let UserGroup {name, mut user_ids} = group;
        
        // remove the group from all users
        (*user_ids.keys()).do!(|user_id| {
            users.users.get_mut(&user_id).group_ids.remove(&group_id);
        });
    }


    fun add_user_to_group_internal(users: &mut Users, user_id: u16, group_id: u16) {
        // add the group to the user + ensures that the user exists
        users.users.get_mut(&user_id).group_ids.insert(group_id);

        // add the user to the group
        users.user_groups.get_mut(&group_id).user_ids.insert(user_id);
    }

    fun delete_user_from_group_internal(users: &mut Users, user_id: u16, group_id: u16) {
        // remove the group from the user
        users.users.get_mut(&user_id).group_ids.remove(&group_id);

        // remove the user from the group
        users.user_groups.get_mut(&group_id).user_ids.remove(&user_id);
    }



    
    // TOODX why is this not being used encrypted_user_shares_map
    public(package) fun execute_config_register_recovery(
                                                    users: &mut Users, 
                                                    workspace_id: ID, 
                                                    user_id: u16,
                                                    recovery_address: address,
                                                    public_key: vector<u8>,
                                                    ctx: &mut TxContext) {
        let user = vec_map::get_mut(&mut users.users, &user_id);
        
        // TODO from security perspective would the user first need to delete it before registreing another one?
        assert!(!option::is_some(&user.recovery_opt), 43);

        let user_cap = create_cap_internal(workspace_id, false, ctx);

        let recovery = Recovery{
            cap_id: object::id(&user_cap),
            recovery_public_key: public_key,
        };

        user.recovery_opt = option::some(recovery);

        transfer::public_transfer(user_cap, recovery_address);
    }



    public(package) fun execute_config_revoke_recovery(users: &mut Users, user_id: u16,) {
        let user = vec_map::get_mut(&mut users.users, &user_id);
        user.recovery_opt = option::none();
    }


    // TOOD refactor to not have duplicate logic, same as reset_init_cap
    // need to be able to reset this as well in case user loses access to everything
    public(package) fun execute_config_recover_account(users: &mut Users, workspace_id: ID, user_id: u16, new_mobile_signer_address: address, ctx: &mut TxContext) {
        let user = vec_map::get_mut(&mut users.users, &user_id);
        let user_cap = create_cap_internal(workspace_id, true, ctx);

        user.approve_cap = object::id(&user_cap);
        transfer::transfer(user_cap, new_mobile_signer_address);
    }


    public(package) fun execute_config_edit_workspace_quorum(users: &mut Users, updated_quorum_value: u16) {
        users.admin_quorum_threshold = updated_quorum_value;
        assert!(is_admin_quorum_valid(users), EInvalidQuorum);
    }



    public(package) fun is_authorized_recovery(users: &Users, user_id: u16, calling_user_cap_id: ID): bool {
        let user = vec_map::get(&users.users, &user_id);
        let recovery = option::borrow(&user.recovery_opt);
        calling_user_cap_id == recovery.cap_id
    }

    public(package) fun get_count_quorum_members_from_list(users: &Users, users_check: vector<u16>): u16 {
        let active_quorum_members = get_members_by_permission(users, PERMISSION_ADMIN_QUORUM);
        
        users_check.count!(|user_id| {
            if (active_quorum_members.contains(user_id)) {
                true
            }
            else {
                false
            }
        }) as u16
    }


    public(package) fun retrieve_user_caps_internal(
        users: &mut Users,
        holder: RegistrationHolder,
        init_cap_holder_address_opt: Option<address>,
        mut approve_cap_holder_address_opt: Option<address>,
        approve_cap_holder_public_key_opt: Option<vector<u8>>,
        signature: vector<u8>
    ) {
        let RegistrationHolder {id, user_id, user_address_type, user_address, mut init_cap_opt, mut approve_cap_opt} = holder;

        event::emit(RetrievedUserCapsEvent {
            registration_holder: object::uid_to_inner(&id),
            user_address_type: user_address_type,
            user_address: user_address,
            approve_cap_holder_address_opt: approve_cap_holder_address_opt,
        });

        object::delete(id);

        let dispense_approve_cap = option::is_some(&approve_cap_opt);
        let dispense_init_cap = option::is_some(&init_cap_opt);

        if (user_address_type == EVM_ED_WALLET) {
            let signature_valid = registration::verify_signature_evm(user_address, init_cap_holder_address_opt, approve_cap_holder_address_opt, approve_cap_holder_public_key_opt, &signature);
            assert!(signature_valid, 2222222);
        }
        else {
            abort 3434343;
        };

        if (dispense_approve_cap) {
            let approve_cap_holder_address = option::extract(&mut approve_cap_holder_address_opt);
            let approve_cap = option::extract(&mut approve_cap_opt);
            transfer::public_transfer(approve_cap, approve_cap_holder_address);

            // Update the user with the approve cap public key
            let user = users.users.get_mut(&user_id);
            user.approve_public_key_opt = approve_cap_holder_public_key_opt;

            // Check if the user is onboarded, and if not, add to groups
            if (!is_user_onboarded(user)) {
                (*user.group_ids.keys()).do!(|group_id| {
                    add_user_to_group_internal(users, user_id, group_id);
                });
            }

        };

        if (dispense_init_cap) {
            let init_cap = init_cap_opt.extract();
            transfer::public_transfer(init_cap, *init_cap_holder_address_opt.borrow());
        };

        option::destroy_none(init_cap_opt);
        option::destroy_none(approve_cap_opt);

    }



    // HELPER FUNCTIONS
    public(package) fun get_user_role_id(users: &Users, user_id: u16): u16 {
        let user = vec_map::get(&users.users, &user_id);
        user.role_id
    }


    // return true if approve cap is found
    public(package) fun get_user_by_cap_id(users: &Users, user_cap: &UserCap): Option<u16> {
        let cap_id = object::uid_to_inner(&user_cap.id);
        let user_ids = users.users.keys();
        let mut i = 0;
        while (i < vector::length(&user_ids)) {
            let user_id = user_ids.borrow(i);
            let user = users.users.get(user_id);
            if (user.init_tx_caps.contains(&cap_id) || user.approve_cap == cap_id) {
                return option::some(*user_id);
            };
            i = i + 1;
        };
        option::none()

    }

    public(package) fun get_user_by_recovery_cap_id(users: &Users, user_cap: &UserCap): Option<u16> {
        let user_ids = users.users.keys();
        let mut i = 0;
        while (i < vector::length(&user_ids)) {
            let user_id = user_ids.borrow(i);
            let user = users.users.get(user_id);

            if (option::is_some(&user.recovery_opt)) {
                if (user.recovery_opt.borrow().cap_id == object::id(user_cap)) {
                    return option::some(*user_id);
                };
            };
            i = i + 1;
        };
        option::none()
    }

    
    public(package) fun is_user_onboarded(user: &User): bool {
        return option::is_some(&user.approve_public_key_opt)
    }

    public(package) fun is_user_in_any_group(users: &Users, user_id: u16): bool {
        users.users.get(&user_id).group_ids.size() > 0
    }
    
    // TODO this can be optimised for O(n)
    public(package) fun get_members_by_permission(users: &Users, permission: u8): vector<u16> {
        let mut admin_quorum_members = vector::empty();
        let user_ids= users.users.keys();
        user_ids.do!(|user_id| {
            if (is_user_authorized(users, user_id, vector::singleton(permission))) {
                admin_quorum_members.push_back(user_id);
            };
        });
        admin_quorum_members
    }

    public(package) fun get_admin_quorum_count(users: &Users): u16 {
        (get_members_by_permission(users, PERMISSION_ADMIN_QUORUM).length() as u16)
    }

    public(package) fun get_admin_quorum_threshold(users: &Users): u16 {
        return users.admin_quorum_threshold
    }

    public(package) fun get_approve_public_key(users: &Users, user_id: u16): Option<vector<u8>> {
        let user = vec_map::get(&users.users, &user_id);
        user.approve_public_key_opt
    }

    public(package) fun get_distinct_users_in_group_ids(users: &Users, group_ids: vector<u16>): vector<u16> {
        let mut users_in_group = vector::empty();
        let mut i = 0;
        while (i < vector::length(&group_ids)){
            let users_tmp = *vec_map::get(&users.user_groups, vector::borrow(&group_ids, i)).user_ids.keys();
            let mut j = 0;
            while (j < vector::length(&users_tmp)){
                if (!vector::contains(&users_in_group, vector::borrow(&users_tmp, j))){
                    vector::push_back(&mut users_in_group, *vector::borrow(&users_tmp, j));
                };
                j = j + 1;
            };
            i = i + 1;
        };
        users_in_group
    }



    public(package) fun get_admin_quorum_members(users: &Users): vector<u16> {
        get_members_by_permission(users, PERMISSION_ADMIN_QUORUM)
    }

    public(package) fun get_users_signing_role(users: &Users): vector<u16> {
        get_members_by_permission(users, PERMISSION_SIGN_MPC_TX)
    }

    // View


    public(package) fun is_role_valid(users: &Users, role_id: u16): bool {
        let role = users.roles.try_get(&role_id);
        option::is_some<Role>(&role)
    }


    // we could have a authorize_user_config action that also checks for recovery cap -> if detected we return true 
    // if the recovery cap is detected we have to make sure that the user can only trigger the recovery action
    // have an extra check in the internal function for this
    public(package) fun authorize_user(users: &Users, user_cap: &UserCap, required_permissions: vector<u8>, require_approve_cap: bool): u16 {
        
        // return user if this is the recovery cap
        let user_id = get_user_by_cap_id(users, user_cap).extract();
        
        assert!(is_user_authorized(users, user_id, required_permissions), 3434343);

        if (require_approve_cap) {
            let user = vec_map::get(&users.users, &user_id);
            assert!(user.approve_cap == object::id(user_cap), 3434343);
        };

        user_id
    }

    public(package) fun is_user_authorized(users: &Users, user_id: u16, required_permissions: vector<u8>): bool {
        let user = vec_map::get(&users.users, &user_id);
        let user_role = users.roles.get(&user.role_id);
        let is_role_valid = match (user_role) {
            Role::Admin => {
                true
            },
            Role::Custom {role_identifier: _ , permissions} => {
                required_permissions.all!(|required_permission| {
                    permissions.contains(required_permission)
                })
            },
        };
        is_role_valid
    }



    public(package) fun is_user_valid(users: &Users, user_id: u16): bool {
        vec_map::contains(&users.users, &user_id)
    }


    // returns all public keys of signers + recovery keys if configured
    public(package) fun get_all_public_keys_signers(users: &Users): vector<vector<u8>> {
        let mut public_keys = vector::empty();
        let  mut i = 0;

        let user_ids = vec_map::keys(&users.users);
        while (i < vector::length(&user_ids)) {
            let user_id = *vector::borrow(&user_ids, i);
            let user = vec_map::get(&users.users, &user_id);

            if (is_user_authorized(users, copy user_id, get_sign_mpc_tx_permission())) {
                if (is_user_onboarded(user)) {
                    let public_key = *option::borrow(& user.approve_public_key_opt);
                    vector::push_back(&mut public_keys, public_key);
                }
                else {
                    // if user not onboarded yet, we also skip checking the recovery key
                    continue;
                };
                if (option::is_some(& user.recovery_opt)) {
                    let recovery = option::borrow(& user.recovery_opt);
                    vector::push_back(&mut public_keys, recovery.recovery_public_key);
                }
            };
            i = i + 1;
        };
        public_keys
    }


    public fun get_admin_quorum_permission(): vector<u8> {
        return vector::singleton(PERMISSION_ADMIN_QUORUM)
    }

    public fun get_init_mpc_tx_permission(): vector<u8> {
        return vector::singleton(PERMISSION_INIT_MPC_TX)
    }

    public fun get_sign_mpc_tx_permission(): vector<u8> {
        return vector::singleton(PERMISSION_SIGN_MPC_TX)
    }

    public fun get_vote_proposal_permission(): vector<u8> {
        return vector::singleton(PERMISSION_VOTE_PROPOSAL)
    }

    public fun get_approve_task_permission(): vector<u8> {
        return vector::singleton(PERMISSION_APPROVE_TASK)
    }

    public fun get_recovery_permission(): vector<u8> {
        return vector::singleton(PERMISSION_RECOVERY)
    }


}