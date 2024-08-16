module aeon_custody::settings {


    use sui::table::{Self,Table};
    use std::string::{Self,String};
    use std::vector;
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self,TxContext};
    use sui::vec_map::{Self,VecMap};
    use sui::vec_set::{Self,VecSet};
    // use aeon_custody::registry::{Self, Registry, ActionGroup};


    public struct WorkspaceSettings has store {      
        name: String,
        allowed_tx_effect_module_ids: VecSet<ID>,
        tx_effect_module_groups: VecMap<u16, ActionGroup>,
        id_counter: u16,  
    }

    public struct ActionGroup has copy, store, drop{
        name: String, 
        ids: VecSet<ID>,
    }


    // init workspace setting 
    public(package) fun init_workspace_settings(name: String): WorkspaceSettings {
        WorkspaceSettings{
            name: name, 
            allowed_tx_effect_module_ids: vec_set::empty(), 
            tx_effect_module_groups: vec_map::empty(),
            id_counter: 1,
        }
    }

    public(package) fun execute_config_edit_workspace_name(workspace_settings: &mut WorkspaceSettings, name: String) {
        workspace_settings.name = name;
    }

    public(package) fun execute_config_add_action_module(settings: &mut WorkspaceSettings, action_module: ID) {
        settings.allowed_tx_effect_module_ids.insert(action_module);
    }

    public(package) fun execute_config_remove_action_module(settings: &mut WorkspaceSettings, action_module: ID) {
        settings.allowed_tx_effect_module_ids.remove(&action_module);
    }

    // Create action group
    public(package) fun execute_config_create_action_group(settings: &mut WorkspaceSettings, name: String, ids: vector<ID>) {
        let action_group = ActionGroup {
            name: name,
            ids: vec_set::from_keys(ids),
        };

        let group_id = settings.id_counter;
        settings.id_counter = settings.id_counter + 1;

        settings.tx_effect_module_groups.insert(group_id, action_group);
    }

    // Edit action group
    public(package) fun execute_config_edit_action_group(settings: &mut WorkspaceSettings, group_id: u16, name_new_opt: &mut Option<String>, ids_add: vector<ID>, ids_delete: vector<ID>) {
        let action_group = settings.tx_effect_module_groups.get_mut(&group_id);
        
        if (name_new_opt.is_some()) {
            action_group.name = name_new_opt.extract();
        };

        ids_add.do!(|id| {
            action_group.ids.insert(id);
        });
        ids_delete.do!(|id| {
            action_group.ids.remove(&id);
        });
    }

    // Delete action group
    public(package) fun execute_config_delete_action_group(settings: &mut WorkspaceSettings, group_id: u16) {
        let (_, action_group) = vec_map::remove(&mut settings.tx_effect_module_groups, &group_id);
        let ActionGroup {name, ids} = action_group;
    }

    // TOODX check if implemented correctly
    public(package) fun get_group_ids_by_action_id(settings: &WorkspaceSettings, action_id: ID): vector<u16> {
        let mut group_ids = vector::empty();
        let group_keys = vec_map::keys(&settings.tx_effect_module_groups);
        let mut i = 0;
        while (i < vector::length(&group_keys)) {
            let group_id = *vector::borrow(&group_keys, i);
            let group = vec_map::get(&settings.tx_effect_module_groups, &group_id);
            if (vec_set::contains(&group.ids, &action_id)) {
                vector::push_back(&mut group_ids, group_id);
            };
            i = i + 1;
        };
        group_ids
}

}