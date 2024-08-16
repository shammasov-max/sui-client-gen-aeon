module aeon_custody::policy {
    use std::vector;
    use std::string::{Self,String};
    use std::option::{Self,Option};
    use sui::object::{ID, UID};
    use sui::math;
    use sui::vec_map::{Self,VecMap};
    use sui::table::{Self,Table};
    use sui::tx_context::{Self,TxContext};
    use sui::event;


    use aeon_custody::vault::{Self,Vaults};
    use aeon_custody::address_book::{Self,AddressBook};
    use aeon_custody::user::{Self,Users};
    use aeon_custody::module_interface::{Self, BalanceChange, TxEffects};
    use aeon_custody::library::{Self, NetworkAddress};
    use aeon_custody::settings::{Self,WorkspaceSettings};


    public struct Policy has store {
        policy_rules: vector<PolicyRule>,
    }
    
    public struct PolicyRule has store, copy, drop{
        id: u64, //id used for indexing and moving policy rules
        name: String,
        initiator_rule: AllowedInitiators, //vector of user group ids OR user ids this rule applies to
        source_rule: AllowedSource, //if none, then applies to all vault_group_ids, if some, it lists all allowed vault_group_ids
        action_rule: AllowedActions, //todo @alexanderludwig fix this as said above with any //contact id OR contact group id -> this might implicitly enforce chain id, uses id of addressbook
        asset_amount_rule: AllowedAmountAsset,
        follow_action: FollowAction,         
    }

    public enum AllowedInitiators has store, copy, drop {
        Any,
        Specific {group_ids: vector<u16>, user_ids: vector<u16>},
    }

    public enum AllowedSource has store, copy, drop {
        Any,
        Specific {vault_group_ids: vector<u16>, vault_ids: vector<u16>},
    }

    // we have to bundle action_module_id, recipient, and interaction -> bc the user always specifies them together
    public enum AllowedActionModules has store, copy, drop {
        Any,
        Specific {allowed_action_effect_ids: vector<ID>, allowed_action_groups: vector<u16>},
    }

    public enum AllowedInteractionAddresses has store, copy, drop{
        Any,
        Specific {interactions: vector<NetworkAddress>},
    }

    public enum AllowedRecipient has store, copy, drop{
        Any,
        Specific {address_book_ids: vector<u16>, address_book_group_ids: vector<u16>, vault_ids: vector<u16>, vault_group_ids: vector<u16>},
    }

    public struct AllowedAction has store, copy, drop{
        action: AllowedActionModules,
        allowed_interactions: AllowedInteractionAddresses,
        allowed_recipients: AllowedRecipient,
    }

    public enum AllowedActions has store, copy, drop {
        Any,
        Specific {actions: vector<AllowedAction>},
    }

    public enum AllowedAsset has store,copy,drop {
        Any,
        Specific {assets: vector<NetworkAddress>},
    }

    public enum AllowedAmount has store,copy,drop {
        Any, 
        AmountNative {amount_native: u256},
        AmountDollar {amount_dollar: u256},
    }

    public struct AllowedAmountAsset has store,copy,drop {
        rule_amount: AllowedAmount,
        rule_asset: AllowedAsset,
    }

    public enum FollowAction has store,copy,drop {
        Approve, 
        ApproverRoleApprovalRequired {threshold: u16}, // anyone with the PERMISSION_APPROVE_TX can approve
        QuorumApprovalRequired, 
        SpecificApprovalRequired {require_approval_users: vector<u16>, require_approval_groups: vector<u16>, threshold: u16},
        Block,
    }

    public enum PolicyResult has store,copy,drop {
        AutoApproved,
        QuorumApprovalRequired,
        SpecificApprovalRequired {require_approval_users: vector<u16>, threshold: u16}, 
        Blocked,
    }

    // TODO 
    // is_enum_auto_approve
    public(package) fun is_policy_result_auto_approve(policy_result: &PolicyResult) : bool {
        match (policy_result) {
            PolicyResult::AutoApproved => true,
            _ => false,
        }
    }

    public(package) fun is_policy_result_quorum_approval_required(policy_result: &PolicyResult) : bool {
        match (policy_result) {
            PolicyResult::QuorumApprovalRequired => true,
            _ => false,
        }
    }

    public(package) fun is_policy_result_specific_approval_required(policy_result: &PolicyResult) : bool {
        match (policy_result) {
            PolicyResult::SpecificApprovalRequired {require_approval_users: _, threshold: _} => true,
            _ => false,
        }
    }

    public(package) fun is_policy_result_block(policy_result: &PolicyResult) : bool {
        match (policy_result) {
            PolicyResult::Blocked => true,
            _ => false,
        }
    }

    public(package) fun policy_result_get_params_specific_approval(policy_result: &PolicyResult) : (vector<u16>, u16) {
        match (policy_result) {
            PolicyResult::SpecificApprovalRequired {require_approval_users, threshold} => (*require_approval_users, *threshold),
            _ => (vector::empty<u16>(), 0),
        }
    }

    // Events
    public struct MatchedPolicyEvent has copy, store, drop {
        matched_policy_index: u64,
        follow_action: FollowAction
    }
    
    public(package) fun init_policy() : Policy {        
        return Policy {
            policy_rules: vector::empty<PolicyRule>(),
        }
    }

    public(package) fun apply_policy<A: copy + drop>(
        vaults: &Vaults,
        users: &Users,
        address_book: &AddressBook,
        settings: &WorkspaceSettings,
        policy: &Policy,
        tx_effects: &TxEffects<A>,
        tx_user_id: u16,
        tx_vault_id: u16, // originating vault id
    ): PolicyResult {

        // let (effects_module_id, further_required_module_id, is_valid, network, from_address, interaction_address, balance_changes, action, task_auth) = module_interface::view_tx_effects<A>(tx_effects);

        let mut follow_action_opt = option::none(); 
        let mut i = 0;

        while (i < vector::length(&policy.policy_rules)) {
            let rule = vector::borrow(&policy.policy_rules,i);
            follow_action_opt = check_policy_rule_internal(vaults, users, address_book, settings, rule, tx_effects, tx_user_id, tx_vault_id);
            
            if (option::is_some(&follow_action_opt)) {
                event::emit(MatchedPolicyEvent {matched_policy_index: i, follow_action: *follow_action_opt.borrow()});
                break;
            } else {
                i = i + 1;
            }            
        };
        
        let policy_result;
        // TOOD now convert the follow action into a proper polcy result 
        if (follow_action_opt.is_none()) {
            policy_result = PolicyResult::Blocked;
        }
        else {
            let follow_action = option::extract(&mut follow_action_opt);
            policy_result = match (follow_action) {
                FollowAction::Approve => PolicyResult::AutoApproved,
                FollowAction::ApproverRoleApprovalRequired {threshold} => {
                    let signing_users = user::get_members_by_permission(users, user::get_vote_proposal_permission()[0]);
                    PolicyResult::SpecificApprovalRequired {require_approval_users: signing_users, threshold}
                }, 
                FollowAction::QuorumApprovalRequired => {
                    PolicyResult::QuorumApprovalRequired
                },
                FollowAction::SpecificApprovalRequired {require_approval_users, require_approval_groups, threshold} => {

                    let mut users_approval_required_static = user::get_distinct_users_in_group_ids(users, require_approval_groups);
                    let mut i = 0;
                    // add require_approval_users to users_approval_required if not exists
                    while (i < vector::length(&require_approval_users)){
                        let user_id = *vector::borrow(&require_approval_users, i);
                        if (!vector::contains(&users_approval_required_static, &user_id)){
                            vector::push_back(&mut users_approval_required_static, user_id);
                        };
                        i = i + 1;
                    };
                    PolicyResult::SpecificApprovalRequired {require_approval_users: users_approval_required_static, threshold: threshold}
                }, // get here all the specific users together
                FollowAction::Block => PolicyResult::Blocked,
            };
        };
        policy_result
    }

    fun check_policy_rule_internal<A: copy + drop>(
        vaults: &Vaults,
        users: &Users,
        address_book: &AddressBook,
        settings: &WorkspaceSettings,
        policy_rule: &PolicyRule,
        tx_effects: &TxEffects<A>,
        tx_user_id: u16,
        tx_vault_id: u16, // originating vault id
    ) : Option<FollowAction>
    {
        // TODO what do we do with further_required_module_id
        let (tx_effects_module_id, _, tx_network_id, interaction_address_opt, balance_changes, _) = module_interface::view_tx_effects<A>(tx_effects);

        // CHECK INITITOR
        let initiator_matches = check_initiator(users, tx_user_id, &policy_rule.initiator_rule);
        if (!initiator_matches) {
            return option::none()
        };

        // CHECK SOURCE
        let source_matches = check_source(vaults, tx_vault_id, &policy_rule.source_rule);
        if (!source_matches) {
            return option::none()
        };

        // CHECK RULE ACTIONS
        let recipient_addressess = module_interface::parse_recipients(balance_changes);
        let recipients_matches = check_policy_action_rules<A>(
                vaults,
                users,
                address_book,
                settings,
                &policy_rule.action_rule,
                tx_network_id,
                interaction_address_opt,
                recipient_addressess,
                tx_effects_module_id
            );
        if (!recipients_matches) {
            return option::none()
        };

        // CHECK ASSET + AMOUNT
        let amount_matches = check_policy_asset_amount(&policy_rule.asset_amount_rule, balance_changes);        
        if (!amount_matches) {
            return option::none()
        };

        return option::some(policy_rule.follow_action)
    }

    // valid 
    public(package) fun check_policy_asset_amount(
        rule: &AllowedAmountAsset,
        balance_changes: vector<BalanceChange>,
    ) : bool {

        let assets_allowed = match (rule.rule_asset) {
                AllowedAsset::Any => true,
                AllowedAsset::Specific {assets: assets} => {

                let mut assets_allowed = true;
                // check involved assets
                let mut i = 0;
                while (i < vector::length(&balance_changes)) {
                    let change = vector::borrow(&balance_changes, i);
                    let (asset_address, counterparty, network, amount, amount_dollar) = module_interface::view_balance_change(change);
                    if (!library::is_address_in_vector(&library::create_network_address(network, asset_address), &assets)) {
                        assets_allowed = false;
                        break;
                    };
                    i = i + 1;
                };
                assets_allowed
            }
        };

        if (!assets_allowed) {
            return false;
        };

        // TOOD add here aggregation for values as well
        let amounts_allowed = match (rule.rule_amount) {
                AllowedAmount::Any => true,
                AllowedAmount::AmountNative {amount_native: amount_native} => {
                    
                    assert!(balance_changes.length() == 1, 298357);
                    let (asset_address, counterparty, network, change_amount, amount_dollar) = module_interface::view_balance_change(&balance_changes[0]);

                    if (change_amount <= amount_native) {
                        return true
                    };
                    false
                },
                AllowedAmount::AmountDollar {amount_dollar: amount_dollar} => {
                    let mut sum_amount_dollar = 0;
                    let mut i = 0;
                    while (i < vector::length(&balance_changes)) {
                        let balance_change = vector::borrow(&balance_changes, i);
                        let (asset_address, counterparty, network, amount, amount_dollar) = module_interface::view_balance_change(balance_change);
                        sum_amount_dollar = sum_amount_dollar + amount_dollar;
                        i=i+1;
                    };
                    if (sum_amount_dollar <= amount_dollar) {
                        return true;
                    };
                    false
                }
            };

        if (amounts_allowed) {
            return true;
        };

        false
    }

    public(package) fun check_policy_action_rules<A: copy + drop>(
        vaults: &Vaults,
        users: &Users,
        address_book: &AddressBook,
        settings: &WorkspaceSettings,
        action_rules: &AllowedActions,
        tx_network_id: String,
        tx_interaction_opt: Option<vector<u8>>,
        tx_recipient_addressess: vector<NetworkAddress>,
        tx_effects_module_id: ID,
    ) : bool {
        match (action_rules) {
            AllowedActions::Specific{actions: actions} => {
                let mut i = 0;
                while (i < actions.length()) {
                    let action_rule_matches =  check_policy_action_rule(
                                                vaults,
                                                    users,
                                                    address_book,
                                                    settings,
                                                    *actions.borrow(i),
                                                    tx_network_id,
                                                    tx_interaction_opt,
                                                    tx_recipient_addressess,
                                                    tx_effects_module_id
                                            );
                    if (action_rule_matches) {
                        return true
                    };
                };
                false
            },
            AllowedActions::Any => true,
        }
    }

    public(package) fun check_policy_action_rule(
        vaults: &Vaults,
        users: &Users,
        address_book: &AddressBook,
        settings: &WorkspaceSettings,
        rule_action: AllowedAction,
        network: String,
        tx_interaction_opt: Option<vector<u8>>,
        tx_recipient_addressess: vector<NetworkAddress>,
        tx_effects_module_id: ID,
    ): bool {
        // must be in allowed actions or in an action group
        let action_kind_matches = check_action_kind_matches( settings, &rule_action.action, tx_effects_module_id);
        if (!action_kind_matches) {
            return false
        };

        let mut interaction_matches = false;
        // must be in allowed interactions if specified
        if (option::is_some(&tx_interaction_opt)) {
            let interaction_address = option::borrow(&tx_interaction_opt);

            interaction_matches =  match (rule_action.allowed_interactions) {
                AllowedInteractionAddresses::Any => true,
                AllowedInteractionAddresses::Specific {interactions: interactions} => {
                    let interaction_network_address = library::create_network_address(network, *interaction_address);
                    library::is_address_in_vector(&interaction_network_address, &interactions)}
            }
        } else {
            interaction_matches=true
        };

        let mut recipient_matches = true;
        let mut i = 0;
        while (i < vector::length(&tx_recipient_addressess)) {
            let recipient = *vector::borrow(&tx_recipient_addressess, i);
            recipient_matches = check_recipient(vaults, users, address_book, &rule_action.allowed_recipients, recipient);
            if (recipient_matches) {
                break;
            };
            i = i + 1;
        };

        return (interaction_matches && recipient_matches)
    }


    public(package) fun check_action_kind_matches(
        settings: &WorkspaceSettings,
        allowed_action_modules: &AllowedActionModules,
        tx_action_module_id: ID,
    ) : bool {
        match (allowed_action_modules) {
            AllowedActionModules::Any => true,
            AllowedActionModules::Specific {allowed_action_effect_ids, allowed_action_groups} => {
                if (allowed_action_effect_ids.contains(&tx_action_module_id)) {
                    return true
                };

                let action_group_ids = settings::get_group_ids_by_action_id(settings, tx_action_module_id);
                let mut i = 0;
                while (i < vector::length(&action_group_ids)) {
                    let action_group_id = vector::borrow(&action_group_ids, i);
                    if (allowed_action_groups.contains(action_group_id)) {
                        return true
                    } else {
                        i = i + 1;
                    }
                };
                false
            },
        }
    }


    // TODO what if a trasnaction has several recipients??
    fun check_recipient(
        vaults: &Vaults,
        users: &Users,
        address_book: &AddressBook,
        rule_recipients: &AllowedRecipient,
        tx_recipient_address: NetworkAddress,
    ) : bool
    {
        match (rule_recipients) {
                AllowedRecipient::Any => true,
                AllowedRecipient::Specific {address_book_ids: address_book_ids, address_book_group_ids: address_book_group_ids, vault_ids: vault_ids, vault_group_ids: vault_group_ids} => {
 
                    let mut recipient_ids_opt: Option<vector<u16>> = address_book::get_entry_ids_by_address(address_book, tx_recipient_address);
            
                    // check if address is in the address book is part of the rule
                    if (recipient_ids_opt.is_some()){
                        let recipient_ids = option::extract(&mut recipient_ids_opt);

                        //check whether the address is part of the address_book_ids
                        let is_in_address_book = recipient_ids.any!(|id| { address_book_ids.contains(id) });

                        // check whether the address is part of address_book_group_ids
                        let mut group_ids = vector::empty();
                        recipient_ids.do!(|id| { 
                            group_ids.append(address_book::get_address_group_ids(address_book, id));
                        });                            
                        let is_in_address_group = group_ids.any!(|id| { vector::contains(address_book_group_ids, id) });
                        
                        if (is_in_address_book || is_in_address_group) {
                            return true;
                        };                    
                    };

                    // check if address is one of our vaults and whitelisted by the rule
                    let mut vault_id_opt = vault::get_vault_id_by_address(vaults, tx_recipient_address);
                    if (option::is_some(&vault_id_opt)) {
                        let vault_id = option::extract(&mut vault_id_opt);
                        if (vault_ids.contains(&vault_id)) {
                            return true;
                        };

                        let vault_group_id = vaults.borrow_vault(vault_id).view_vault_group_id();
                        if (vault_group_ids.contains(&vault_group_id)) {
                            return true;
                        };
                    };

                    false

            }
        }
    }

    // TOOD think this is how we would need to represent addresses
    fun check_initiator(
        users: &Users,
        tx_user_id: u16,
        rule_initiator: &AllowedInitiators,
    ) : bool
    {
        match (rule_initiator) {
                AllowedInitiators::Any => true,
                AllowedInitiators::Specific {group_ids: group_ids, user_ids: user_ids} => {
                    if (user_ids.contains(&tx_user_id)) {
                        return true;
                    };
                    // check if user is in the group
                    group_ids.any!(|group_id| { users.is_user_in_group(tx_user_id, *group_id) });

                    false
                }
        }
    }

     fun check_source(
        vaults: &Vaults,
        tx_vault_id: u16,
        rule_source: &AllowedSource,
    ) : bool
    {
        match (rule_source) {
                AllowedSource::Any => true,
                AllowedSource::Specific {vault_group_ids: vault_group_ids, vault_ids: vault_ids} => {
                    // check if any vault is allowed
                    if (vault_ids.contains(&tx_vault_id)) {
                        return true;
                    };

                    // check if vault_group of vault is allowed
                    let vault = vaults.borrow_vault(tx_vault_id);
                    let tx_vault_group_id = vault.view_vault_group_id();
                    if(vault_group_ids.contains(&tx_vault_group_id)) {
                        return true;
                    };

                    false
                }
            }
    }

    public(package) fun execute_edit_policy_config(
        policy: &mut Policy,
        new_policy_rules: vector<PolicyRule>,
    ) {
        policy.policy_rules = new_policy_rules;
    }

    public(package) fun is_user_in_any_policy_rule(
        policy: &Policy,
        user_id: u16,
    ) : bool {
        let mut i = 0;
        while (i < vector::length(&policy.policy_rules)) {
            let rule = vector::borrow(&policy.policy_rules, i);
            if (is_user_in_policy_rule(rule, user_id)) {
                return true
            };
            i = i + 1;
        };
        false
    }

    // check if user is represented in the policy rule as an initiator or in follow action as an approver
    public(package) fun is_user_in_policy_rule(
        policy_rule: &PolicyRule,
        user_id: u16,
    ) : bool {

        let is_user_initiator =  match (policy_rule.initiator_rule) {
                AllowedInitiators::Any => false,
                AllowedInitiators::Specific {group_ids: _, user_ids: user_ids} => {
                    if (user_ids.contains(&user_id)) {
                        return true
                    };
                    false
                }
        };

        if (is_user_initiator) {
            return true
        };

        let is_user_approver = match (policy_rule.follow_action) {
                FollowAction::SpecificApprovalRequired {require_approval_users: require_approval_users, require_approval_groups: _, threshold: _} => {
                    if (require_approval_users.contains(&user_id)) {
                        return true
                    };
                    false
                },
                _ => false
        };
        if (is_user_approver) {
            return true
        };

        false
    }

    public(package) fun is_user_group_in_any_policy_rule(
        policy: &Policy,
        user_group_id: u16,
    ) : bool {
        let mut i = 0;
        while (i < vector::length(&policy.policy_rules)) {
            let rule = vector::borrow(&policy.policy_rules, i);
            if (is_user_group_in_policy_rule(rule, user_group_id)) {
                return true
            };
            i = i + 1;
        };
        false
    }

    public(package) fun is_user_group_in_policy_rule(
        policy_rule: &PolicyRule,
        user_group_id: u16,
    ) : bool {
        let is_group_initiator = match (policy_rule.initiator_rule) {
                AllowedInitiators::Any => false,
                AllowedInitiators::Specific {group_ids: group_ids, user_ids: _} => {
                    if (group_ids.contains(&user_group_id)) {
                        return true
                    };
                    false
                }
        };

        if (is_group_initiator) {
            return true
        };

        let is_group_approver = match (policy_rule.follow_action) {
                FollowAction::SpecificApprovalRequired {require_approval_users: _, require_approval_groups: require_approval_groups, threshold: _} => {
                    if (require_approval_groups.contains(&user_group_id)) {
                        return true
                    };
                    false
                },
                _ => false
        };

        if (is_group_approver) {
            return true
        };
        false
    }

    public(package) fun is_address_in_any_policy_rule(
        policy: &Policy,
        address_id: u16,
    ) : bool {
        let mut i = 0;
        while (i < vector::length(&policy.policy_rules)) {
            let rule = vector::borrow(&policy.policy_rules, i);
            if (is_address_in_policy_rule(rule, address_id)) {
                return true
            };
            i = i + 1;
        };
        false
    }

    // check if address is represented in the policy rule as a recipient
    public(package) fun is_address_in_policy_rule(
        policy_rule: &PolicyRule,
        address_id: u16,
    ) : bool {

        // iterate over all rule actions
        match (policy_rule.action_rule) {
            AllowedActions::Specific{actions: actions} => {
                let mut i = 0;
                while (i < actions.length()) {
                    let allowed_recipients = actions.borrow(i).allowed_recipients;
                    let recipient_mateches = match (allowed_recipients) {
                        AllowedRecipient::Specific {address_book_ids: address_book_ids, address_book_group_ids: _, vault_ids: _, vault_group_ids: _} => {
                            if (address_book_ids.contains(&address_id)) {
                                return true;
                            };
                        false
                        },
                        _ => false
                    };
                    
                    if (recipient_mateches) {
                        return true;
                    };
                    
                    i = i + 1;                
                };
                false
            },  
            _ => false
        }
    }

    public(package) fun is_action_group_in_any_policy_rule(
        policy: &Policy,
        action_group_id: u16,
    ) : bool {
        let mut i = 0;
        while (i < vector::length(&policy.policy_rules)) {
            let rule = vector::borrow(&policy.policy_rules, i);
            if (is_action_group_in_policy_rule(rule, action_group_id)) {
                return true
            };
            i = i + 1;
        };
        false
    }

    public(package) fun is_action_group_in_policy_rule(
        policy_rule: &PolicyRule,
        action_group_id: u16,
    ) : bool {
        // iterate over all rule actions
        match (policy_rule.action_rule) {
            AllowedActions::Specific { actions } => {
                actions.any!(|action| {
                    match (action.action) {
                        AllowedActionModules::Any => false,
                        AllowedActionModules::Specific { allowed_action_effect_ids: _, allowed_action_groups } => {
                            allowed_action_groups.contains(&action_group_id)
                        }
                    }
                })
            },
            _ => false,
        }
    }


    public(package) fun is_address_group_in_any_policy_rule(
        policy: &Policy,
        address_group_id: u16,
    ) : bool {
        let mut i = 0;
        while (i < vector::length(&policy.policy_rules)) {
            let rule = vector::borrow(&policy.policy_rules, i);
            if (is_address_group_in_policy_rule(rule, address_group_id)) {
                return true
            };
            i = i + 1;
        };
        false
    }

    public(package) fun is_address_group_in_policy_rule(
        policy_rule: &PolicyRule,
        address_group_id: u16,
    ) : bool {
        // iterate over all rule actions
        match (policy_rule.action_rule) {
            AllowedActions::Specific{actions: actions} => {
                let mut i = 0;
                while (i < actions.length()) {
                    let allowed_recipients = actions.borrow(i).allowed_recipients;
                    let recipient_mateches = match (allowed_recipients) {
                        AllowedRecipient::Specific {address_book_ids: _, address_book_group_ids: address_book_group_ids, vault_ids: _, vault_group_ids: _} => {
                            if (address_book_group_ids.contains(&address_group_id)) {
                                return true;
                            };
                        false
                        },
                        _ => false
                    };
                    
                    if (recipient_mateches) {
                        return true;
                    };
                    
                    i = i + 1;                
                };
                false
            },  
            _ => false
        }
    }

    // AllowedInitiators Enum Creation Functions
    public fun create_allowed_initiators_any(): AllowedInitiators {
        AllowedInitiators::Any
    }

    public fun create_allowed_initiators_specific(group_ids: vector<u16>, user_ids: vector<u16>): AllowedInitiators {
        AllowedInitiators::Specific { group_ids, user_ids }
    }

    // AllowedSource Enum Creation Functions
    public fun create_allowed_source_any(): AllowedSource {
        AllowedSource::Any
    }

    public fun create_allowed_source_specific(vault_group_ids: vector<u16>, vault_ids: vector<u16>): AllowedSource {
        AllowedSource::Specific { vault_group_ids, vault_ids }
    }

    // AllowedActionModules Enum Creation Functions
    public fun create_allowed_action_modules_any(): AllowedActionModules {
        AllowedActionModules::Any
    }

    public fun create_allowed_action_modules_specific(allowed_action_effect_ids: vector<ID>, allowed_action_groups: vector<u16>): AllowedActionModules {
        AllowedActionModules::Specific { allowed_action_effect_ids, allowed_action_groups }
    }

    // AllowedInteractionAddresses Enum Creation Functions
    public fun create_allowed_interaction_addresses_any(): AllowedInteractionAddresses {
        AllowedInteractionAddresses::Any
    }

    public fun create_allowed_interaction_addresses_specific(interactions: vector<NetworkAddress>): AllowedInteractionAddresses {
        AllowedInteractionAddresses::Specific { interactions }
    }

    // AllowedRecipient Enum Creation Functions
    public fun create_allowed_recipient_any(): AllowedRecipient {
        AllowedRecipient::Any
    }

    public fun create_allowed_recipient_specific(address_book_ids: vector<u16>, address_book_group_ids: vector<u16>, vault_ids: vector<u16>, vault_group_ids: vector<u16>): AllowedRecipient {
        AllowedRecipient::Specific { address_book_ids, address_book_group_ids, vault_ids, vault_group_ids }
    }

    // AllowedActions Enum Creation Functions
    public fun create_allowed_actions_any(): AllowedActions {
        AllowedActions::Any
    }

    public fun create_allowed_actions_specific(actions: vector<AllowedAction>): AllowedActions {
        AllowedActions::Specific { actions }
    }

    // AllowedAsset Enum Creation Functions
    public fun create_allowed_asset_any(): AllowedAsset {
        AllowedAsset::Any
    }

    public fun create_allowed_asset_specific(assets: vector<NetworkAddress>): AllowedAsset {
        AllowedAsset::Specific { assets }
    }

    // AllowedAmount Enum Creation Functions
    public fun create_allowed_amount_any(): AllowedAmount {
        AllowedAmount::Any
    }

    public fun create_allowed_amount_native(amount_native: u256): AllowedAmount {
        AllowedAmount::AmountNative { amount_native }
    }

    public fun create_allowed_amount_dollar(amount_dollar: u256): AllowedAmount {
        AllowedAmount::AmountDollar { amount_dollar }
    }

    // FollowAction Enum Creation Functions
    public fun create_follow_action_approve(): FollowAction {
        FollowAction::Approve
    }

    public fun create_follow_action_approver_role_approval_required(threshold: u16): FollowAction {
        FollowAction::ApproverRoleApprovalRequired { threshold }
    }

    public fun create_follow_action_quorum_approval_required(): FollowAction {
        FollowAction::QuorumApprovalRequired
    }

    public fun create_follow_action_specific_approval_required(require_approval_users: vector<u16>, require_approval_groups: vector<u16>, threshold: u16): FollowAction {
        FollowAction::SpecificApprovalRequired { require_approval_users, require_approval_groups, threshold }
    }

    public fun create_follow_action_block(): FollowAction {
        FollowAction::Block
    }

    // PolicyResult Enum Creation Functions
    public fun create_policy_result_auto_approved(): PolicyResult {
        PolicyResult::AutoApproved
    }

    public fun create_policy_result_quorum_approval_required(): PolicyResult {
        PolicyResult::QuorumApprovalRequired
    }

    public fun create_policy_result_specific_approval_required(require_approval_users: vector<u16>, threshold: u16): PolicyResult {
        PolicyResult::SpecificApprovalRequired { require_approval_users, threshold }
    }

    public fun create_policy_result_blocked(): PolicyResult {
        PolicyResult::Blocked
    }

}
