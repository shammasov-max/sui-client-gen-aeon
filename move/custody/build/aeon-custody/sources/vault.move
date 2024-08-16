// TODO should we rename this to VaultGroup
module aeon_custody::vault {
    use std::vector;
    use sui::table::{Self,Table};
    use sui::object::{Self,ID,UID};
    use std::string::{Self,String};
    use std::option::{Self,Option};
    use sui::vec_map::{Self,VecMap};
    use sui::tx_context::{Self,TxContext};
    use sui::transfer::{Self};
    // use std::vector::{Self};
    use sui::event;

    use sui_state_proof::dwallet_cap::{Self, DWalletCap};

    use aeon_custody::module_interface::{Self, InitVaultContainerRequest};
    use aeon_custody::library::{Self, NetworkAddress};


    // allows to constrain which network ids are allowed by a vault module
    public struct NamespaceInfo has copy, drop, store {
        chain_ids: vector<String>, //TODOX do we even use this?
        tx_effect_module_ids: vector<ID>,
        tx_assemble_module_id: vector<ID>,
        tx_update_module_ids: vector<ID>,
    }

    // allow configuration of several vault profiles
    public struct VaultProfile has copy, drop, store {
        namespaces: VecMap<String, NamespaceInfo>,
    }

    public struct Vault has store {
        name: String,
        vault_group_id: u16,
        vault_profile_id: String,
        dwallet_cap: DWalletCap,
    }

    public struct VaultGroup has store {
        name: String,
        vaults: vector<u16>,
    }

    public struct Vaults has store {
        vaults: VecMap<u16, Vault>, // vaults are mapped over vault_id
        vault_groups: VecMap<u16, VaultGroup>, // vault_groups are mapped over vault_group_id
        vault_id_by_address: VecMap<NetworkAddress, u16>,
        vault_group_vault_id_counter: u16,
        vault_profiles: VecMap<String, VaultProfile>,
    }


        // Events
    public struct UserShareEvent has copy, drop {
        workspace_id: ID,
        vault_id: u16,
        public_key: vector<u8>,
        encrypted_user_share: vector<u8>,
    }


    public struct VaultCreated has copy, drop {
        workspace_id: ID,
        vault_id: u16,
        dwallet_cap_id: ID,
        // namespaces: vector<String>,
        // chain_ids: vector<vector<String>>,
        // addresses: vector<vector<u8>>,
    }



    public(package) fun is_tx_authorized_vault(vaults: &Vaults, tx_vault_id: u16, tx_network_id: String, tx_effects_module_id: ID, tx_assemble_module_id: ID):bool {

        let vault_profile_id = vaults.vaults.get(&tx_vault_id).vault_profile_id;
        let vault_profile = vaults.vault_profiles.get(&vault_profile_id);

        let (tx_namespace, tx_chain_id) = library::parse_namespace_colon_chain_id(tx_network_id);

        let namespace_info = vault_profile.namespaces.get(&tx_namespace);

        if (namespace_info.chain_ids.contains(&tx_chain_id)) {
            return true;
        };

        if (!namespace_info.tx_effect_module_ids.contains(&tx_effects_module_id)) {
            return true;
        };

        if (!namespace_info.tx_assemble_module_id.contains(&tx_assemble_module_id)) {
            return true;
        };

        if (!namespace_info.tx_update_module_ids.contains(&tx_assemble_module_id)) {
            return true;
        };

        false
    }

    public fun create_namespace_info(chain_ids: vector<String>, action_module_ids: vector<ID>, tx_assemble_module_id: vector<ID>, update_module_ids: vector<ID>): NamespaceInfo {
        NamespaceInfo{chain_ids: chain_ids, tx_effect_module_ids: action_module_ids, tx_assemble_module_id: tx_assemble_module_id, tx_update_module_ids: update_module_ids}
    }

    public fun create_vault_profile(namespaces: vector<String>, infos: vector<NamespaceInfo>): VaultProfile {
        VaultProfile{namespaces: vec_map::from_keys_values(namespaces, infos)}
    }



    public(package) fun execute_config_add_vault_profile(vaults: &mut Vaults, profile_name: String, vault_profile: VaultProfile,) {
        // insert already ensures that the key is not present
        vec_map::insert(&mut vaults.vault_profiles, profile_name, vault_profile);
    }

    public(package) fun execute_config_edit_vault_profile(vaults: &mut Vaults, profile_name: String, vault_profile: VaultProfile) {
        vec_map::remove(&mut vaults.vault_profiles, &profile_name);
        vec_map::insert(&mut vaults.vault_profiles, profile_name, vault_profile);
    }

    // TODO what are the necessary checks here??
    public(package) fun execute_config_delete_vault_profile(vaults: &mut Vaults, profile_name: String) {
        vec_map::remove(&mut vaults.vault_profiles, &profile_name);
    }


    // retireve from all values in VaultProfile the sign_module id
    public(package) fun get_tx_assemble_module_ids(vaults: &Vaults, profile: String): vector<ID> { 
        let mut tx_assemble_module_ids = vector::empty<ID>();

        let vault_profile = vaults.vault_profiles.get(&profile);        
        let (_, vals) = vault_profile.namespaces.into_keys_values();
        
        vals.do!(|namespace_info| {
            tx_assemble_module_ids.append(namespace_info.tx_assemble_module_id)
        });
        
        tx_assemble_module_ids
    }

    public(package) fun is_valid_vault_profile(vaults: &Vaults, profile_name: &String): bool {
        vec_map::contains(&vaults.vault_profiles, profile_name)
    }


    public(package) fun get_vault_ids(vaults: &Vaults): vector<u16> {
        vec_map::keys(&vaults.vaults)
    }  


    public(package) fun borrow_vault(vaults: &Vaults, vault_id: u16): &Vault {
        let idx = vec_map::get_idx(&vaults.vaults, &vault_id);
        let (_, vault) = vec_map::get_entry_by_idx(&vaults.vaults, idx);
        vault
    }



    public(package) fun execute_config_share_user_shares_user (
        vaults: &Vaults,
        workspace_id:ID, 
        user_public_key: vector<u8>, 
        vaults_encrypted_user_shares_map: VecMap<u16, vector<u8>>) {

        // to ensure that we share the user shares with all vaults
        let all_vault_ids = get_vault_ids(vaults);

        let mut i = 0;
        while (i < vector::length(&all_vault_ids)){
            let vault_id = *vector::borrow(&all_vault_ids, i);
            let encrypted_user_share = *vec_map::get(&vaults_encrypted_user_shares_map, &vault_id);
            share_user_share_internal(workspace_id, user_public_key, vault_id, encrypted_user_share);
            i = i + 1;
        };
    }


     fun share_user_share_internal(
        workspace_id:ID, 
        public_key: vector<u8>, 
        vault_id:u16,
        encrypted_user_share: vector<u8>) {
        
        event::emit(UserShareEvent {
                workspace_id: workspace_id,
                vault_id: vault_id,
                public_key: public_key,
                encrypted_user_share: encrypted_user_share,
            });
    }


    // CONFIG
    const VAULT_GROUP_DEFAULT_ID: u16 = 0;

    public(package) fun init_vaults(): Vaults {
        let default_group = VaultGroup {
            name: string::utf8(b"Default"),
            vaults: vector::empty(),
        };
        let mut vault_groups= vec_map::empty();
        vec_map::insert(&mut vault_groups, VAULT_GROUP_DEFAULT_ID, default_group);

        Vaults {
            vaults: vec_map::empty(),
            vault_groups,
            vault_id_by_address: vec_map::empty(),
            vault_group_vault_id_counter: VAULT_GROUP_DEFAULT_ID+1,
            vault_profiles: vec_map::empty(),
        }
    }


    // namepsace
    // chain id
    // network_id

    // CONFIG
    public(package) fun execute_config_add_vault(workspace_id: ID, vaults: &mut Vaults, name: String, vault_group_id: u16, vault_profile_id: String, signer_public_keys: vector<vector<u8>>, encrypted_user_shares: vector<vector<u8>>, dwltn_dwallet_cap_id: ID, ctx: &mut TxContext): InitVaultContainerRequest {        
        let vault_id = vaults.vault_group_vault_id_counter;
        vaults.vault_group_vault_id_counter = vaults.vault_group_vault_id_counter +  1;

        let encrypted_user_shares_vec_map = vec_map::from_keys_values(signer_public_keys, encrypted_user_shares);

        // assert that the used vault profile is valid
        assert!(is_valid_vault_profile(vaults, &vault_profile_id), 2434);
    
        //todo: we have to check that a) pkeys for all users and external signers have been submitted and b) that the pkev has been encrypted for the right publickey using a zkp
        // TODO can we refactor this together with share_user_shares fun?
        // enforce that all the public keys that require an encrypted user share are shared
        let mut i = 0;
        while (i < vector::length(&signer_public_keys)) {
            let public_key = *vector::borrow(&signer_public_keys, i);
            let encrypted_user_share = *vec_map::get(&encrypted_user_shares_vec_map, &public_key);

            event::emit(UserShareEvent {
                workspace_id: workspace_id,
                vault_id: vault_id,
                public_key: public_key,
                encrypted_user_share: encrypted_user_share,
            });

            i=i+1;
        };

        // create the dwallet cap which triggers event to be picked up by dwallet network
        let dwallet_cap = dwallet_cap::create_cap(dwltn_dwallet_cap_id, ctx);
        let dwallet_cap_id = object::id(&dwallet_cap);

        let vault = Vault {
            name: name,
            vault_group_id: vault_group_id,
            vault_profile_id: vault_profile_id,
            dwallet_cap: dwallet_cap,            
        };
        
        // Update the vault group with the new vault id
        let vault_group = vec_map::get_mut(&mut vaults.vault_groups, &vault_group_id);
        vector::push_back(&mut vault_group.vaults, vault_id);

        vec_map::insert(&mut vaults.vaults, vault_id, vault);


        event::emit(VaultCreated{
            workspace_id: workspace_id,
            vault_id: vault_id,
            dwallet_cap_id:dwallet_cap_id,
            // namespaces: module_namespaces,
            // chain_ids: chain_ids,
            // addresses: addresses,
        });


        let required_module_ids = get_tx_assemble_module_ids(vaults, vault_profile_id);


        module_interface::create_init_vault_container_request(workspace_id, vault_id, required_module_ids)
    }


    // // TODO edit addresses missing here??
    public(package) fun execute_config_vault_edit(vaults: &mut Vaults, vault_id: u16, name_new_opt: Option<String>, vault_group_id_new_opt: Option<u16>, vault_profile_id_new_opt: Option<String>) {
        
        if (option::is_some(&vault_profile_id_new_opt)) {
            let vault_profile_id_new = *option::borrow(&vault_profile_id_new_opt);
            assert!(is_valid_vault_profile(vaults, &vault_profile_id_new), 2434);
        };

        let vault = vec_map::get_mut(&mut vaults.vaults, &vault_id);
        if (option::is_some(&name_new_opt)) {
            vault.name = *option::borrow(&name_new_opt);
        };
        if (option::is_some(&vault_profile_id_new_opt)) {
            vault.vault_profile_id = *option::borrow(&vault_profile_id_new_opt);
        };
        if (option::is_some(&vault_group_id_new_opt)) {
            // Assuming remove_vault_from_group_internal does not need to mutate the entire vaults structure
            // but only specific fields, adjust its implementation accordingly
            remove_vault_from_group_internal(vaults, vault_id, *option::borrow(&vault_group_id_new_opt));
        };
    }

    
    public(package) fun execute_config_vault_create_group(vaults: &mut Vaults, name: String, vault_ids: vector<u16>,) {
        let new_vault_group_id = vaults.vault_group_vault_id_counter;
        vaults.vault_group_vault_id_counter = vaults.vault_group_vault_id_counter +  1;

        let vault_group = VaultGroup {
            name: name,
            vaults: vault_ids,
        };

        vec_map::insert(&mut vaults.vault_groups, new_vault_group_id, vault_group);

        // remove the references in other vault groups
        let mut i = 0;
        while(i < vector::length(&vault_ids)) {
            let vault_id_add = *vector::borrow(&vault_ids, i);
            let vault = vec_map::get_mut(&mut vaults.vaults, &vault_id_add);

            // go into vault group and remove this vault from the respective "old" group
            let old_vault_group_id = vault.vault_group_id;
            let old_vault_group_ref = vec_map::get_mut(&mut vaults.vault_groups, &old_vault_group_id);
            let (valid, idx) = vector::index_of(&old_vault_group_ref.vaults, &vault_id_add);
            assert!(valid, 0);
            vector::remove(&mut old_vault_group_ref.vaults, idx);

            vault.vault_group_id = new_vault_group_id;
            i = i + 1;
        }
    }


    public(package) fun execute_config_edit_vault_group(vaults: &mut Vaults, name_new_opt: Option<String>, vault_group_id: u16, vault_ids_add: vector<u16>, vault_ids_remove: vector<u16>) {
        // Update the name
        let vault_group = vec_map::get_mut(&mut vaults.vault_groups, &vault_group_id);

        if (option::is_some(&name_new_opt)) {
            vault_group.name = *option::borrow(&name_new_opt);
        };

        
        // add vaults and remove vaults accoridinlgy from other vault groups
        let mut i = 0;
        while(i < vector::length(&vault_ids_add)) {
            let vault_id_to_add = *vector::borrow(&vault_ids_add, i);
            let vault_to_add = vec_map::get_mut(&mut vaults.vaults, &vault_id_to_add);

            // go into vault group and remove this vault from the respective "old" group
            let old_vault_group_id = vault_to_add.vault_group_id;
            let old_vault_group_ref = vec_map::get_mut(&mut vaults.vault_groups, &old_vault_group_id);
            let (valid, idx) = vector::index_of(&old_vault_group_ref.vaults, &vault_id_to_add);
            assert!(valid, 0);
            vector::remove(&mut old_vault_group_ref.vaults, idx);
            // Add to the target group
            let target_vault_group = vec_map::get_mut(&mut vaults.vault_groups, &vault_group_id);
            vector::push_back(&mut target_vault_group.vaults, vault_id_to_add);

            vault_to_add.vault_group_id = vault_group_id; // belongs now to the new group
            i = i + 1;
        };


        // remove vaults from the group and add to default group
        let mut i = 0;
        while(i < vector::length(&vault_ids_remove)) {
            let vault_id_remove = *vector::borrow(&vault_ids_remove, i);
            remove_vault_from_group_internal(vaults, vault_id_remove, VAULT_GROUP_DEFAULT_ID);

            let default_group = vec_map::get_mut(&mut vaults.vault_groups, &VAULT_GROUP_DEFAULT_ID);
            vector::push_back(&mut default_group.vaults, vault_id_remove);
            i = i + 1;
        };
    }

    fun remove_vault_from_group_internal(vaults: &mut Vaults, vault_id: u16, new_vault_group_id: u16) {
        let vault_to_remove = vec_map::get_mut(&mut vaults.vaults, &vault_id);
        let vault_group_id = vault_to_remove.vault_group_id;
        let vault_group = vec_map::get_mut(&mut vaults.vault_groups, &vault_group_id);
        let (valid, idx) = vector::index_of(&vault_group.vaults, &vault_id);
        assert!(valid, 0);
        vector::remove(&mut vault_group.vaults, idx);

        // TODO we would need to do asserts that this works correctly??
        vault_to_remove.vault_group_id = new_vault_group_id
    }

    public(package) fun execute_config_vault_delete_group(vaults: &mut Vaults, vault_group_id: u16) {

        let vault_group_id = vault_group_id;
        let (_, vault_group) = vec_map::remove(&mut vaults.vault_groups, &vault_group_id);

        let VaultGroup {name: _, vaults: vault_ids_group}  = vault_group;
        // remove all vaults from the group
        let mut i = 0;
        while(i < vector::length(&vault_ids_group)) {
            let vault_id = *vector::borrow(&vault_ids_group, i);
            let vault = vec_map::get_mut(&mut vaults.vaults, &vault_id);
            vault.vault_group_id = VAULT_GROUP_DEFAULT_ID;
            
            // Add back to the default group
            let default_group = vec_map::get_mut(&mut vaults.vault_groups, &VAULT_GROUP_DEFAULT_ID);
            vector::push_back(&mut default_group.vaults, vault_id);
            
            i = i + 1;
        };
    }


    // mut is not required here though justused as a hack to make move compiler happy
    public(package) fun borrow_dwallet_cap(vaults: &mut Vaults, vault_id: u16): &DWalletCap {
        let vault = vec_map::get_mut(&mut vaults.vaults, &vault_id);
        &vault.dwallet_cap
    }


    public(package) fun get_number_vaults(vaults: &Vaults): u64 {
        vec_map::size(&vaults.vaults)
    }



    // HELPER
    public(package) fun create_network_id(namespace: String, chain_id: String): String {
        let mut res = string::utf8(vector::empty());
        string::append(&mut res, namespace);
        string::append(&mut res, string::utf8(b":"));
        string::append(&mut res, chain_id);
        res
    }


    // VIEW
    public(package) fun view_vault_group_id( vault : &Vault): u16 {
        vault.vault_group_id
    }

    public(package) fun get_vault_id_by_address(vaults: &Vaults, address_chain: NetworkAddress): Option<u16> {
        if (vec_map::contains(&vaults.vault_id_by_address, &address_chain)){
            return option::some(*vec_map::get(&vaults.vault_id_by_address, &address_chain))
        };
        
        option::none<u16>()
    }

}