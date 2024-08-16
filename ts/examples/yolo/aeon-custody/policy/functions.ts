import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure, vector} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {NetworkAddress} from "../library/structs";
import {BalanceChange} from "../module-interface/structs";
import {AllowedAction, PolicyRule} from "./structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ApplyPolicyArgs { vaults: TransactionObjectInput; users: TransactionObjectInput; addressBook: TransactionObjectInput; settings: TransactionObjectInput; policy: TransactionObjectInput; txEffects: TransactionObjectInput; txUserId: number | TransactionArgument; txVaultId: number | TransactionArgument }

export function applyPolicy( tx: Transaction, typeArg: string, args: ApplyPolicyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::apply_policy`, typeArguments: [typeArg], arguments: [ obj(tx, args.vaults), obj(tx, args.users), obj(tx, args.addressBook), obj(tx, args.settings), obj(tx, args.policy), obj(tx, args.txEffects), pure(tx, args.txUserId, `u16`), pure(tx, args.txVaultId, `u16`) ], }) }

export interface CheckActionKindMatchesArgs { settings: TransactionObjectInput; allowedActionModules: TransactionObjectInput; txActionModuleId: string | TransactionArgument }

export function checkActionKindMatches( tx: Transaction, args: CheckActionKindMatchesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_action_kind_matches`, arguments: [ obj(tx, args.settings), obj(tx, args.allowedActionModules), pure(tx, args.txActionModuleId, `${ID.$typeName}`) ], }) }

export interface CheckInitiatorArgs { users: TransactionObjectInput; txUserId: number | TransactionArgument; ruleInitiator: TransactionObjectInput }

export function checkInitiator( tx: Transaction, args: CheckInitiatorArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_initiator`, arguments: [ obj(tx, args.users), pure(tx, args.txUserId, `u16`), obj(tx, args.ruleInitiator) ], }) }

export interface CheckPolicyActionRuleArgs { vaults: TransactionObjectInput; users: TransactionObjectInput; addressBook: TransactionObjectInput; settings: TransactionObjectInput; ruleAction: TransactionObjectInput; network: string | TransactionArgument; txInteractionOpt: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null); txRecipientAddressess: Array<TransactionObjectInput> | TransactionArgument; txEffectsModuleId: string | TransactionArgument }

export function checkPolicyActionRule( tx: Transaction, args: CheckPolicyActionRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_policy_action_rule`, arguments: [ obj(tx, args.vaults), obj(tx, args.users), obj(tx, args.addressBook), obj(tx, args.settings), obj(tx, args.ruleAction), pure(tx, args.network, `${String.$typeName}`), pure(tx, args.txInteractionOpt, `${Option.$typeName}<vector<u8>>`), vector(tx, `${NetworkAddress.$typeName}`, args.txRecipientAddressess), pure(tx, args.txEffectsModuleId, `${ID.$typeName}`) ], }) }

export interface CheckPolicyActionRulesArgs { vaults: TransactionObjectInput; users: TransactionObjectInput; addressBook: TransactionObjectInput; settings: TransactionObjectInput; actionRules: TransactionObjectInput; txNetworkId: string | TransactionArgument; txInteractionOpt: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null); txRecipientAddressess: Array<TransactionObjectInput> | TransactionArgument; txEffectsModuleId: string | TransactionArgument }

export function checkPolicyActionRules( tx: Transaction, typeArg: string, args: CheckPolicyActionRulesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_policy_action_rules`, typeArguments: [typeArg], arguments: [ obj(tx, args.vaults), obj(tx, args.users), obj(tx, args.addressBook), obj(tx, args.settings), obj(tx, args.actionRules), pure(tx, args.txNetworkId, `${String.$typeName}`), pure(tx, args.txInteractionOpt, `${Option.$typeName}<vector<u8>>`), vector(tx, `${NetworkAddress.$typeName}`, args.txRecipientAddressess), pure(tx, args.txEffectsModuleId, `${ID.$typeName}`) ], }) }

export interface CheckPolicyAssetAmountArgs { rule: TransactionObjectInput; balanceChanges: Array<TransactionObjectInput> | TransactionArgument }

export function checkPolicyAssetAmount( tx: Transaction, args: CheckPolicyAssetAmountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_policy_asset_amount`, arguments: [ obj(tx, args.rule), vector(tx, `${BalanceChange.$typeName}`, args.balanceChanges) ], }) }

export interface CheckPolicyRuleInternalArgs { vaults: TransactionObjectInput; users: TransactionObjectInput; addressBook: TransactionObjectInput; settings: TransactionObjectInput; policyRule: TransactionObjectInput; txEffects: TransactionObjectInput; txUserId: number | TransactionArgument; txVaultId: number | TransactionArgument }

export function checkPolicyRuleInternal( tx: Transaction, typeArg: string, args: CheckPolicyRuleInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_policy_rule_internal`, typeArguments: [typeArg], arguments: [ obj(tx, args.vaults), obj(tx, args.users), obj(tx, args.addressBook), obj(tx, args.settings), obj(tx, args.policyRule), obj(tx, args.txEffects), pure(tx, args.txUserId, `u16`), pure(tx, args.txVaultId, `u16`) ], }) }

export interface CheckRecipientArgs { vaults: TransactionObjectInput; users: TransactionObjectInput; addressBook: TransactionObjectInput; ruleRecipients: TransactionObjectInput; txRecipientAddress: TransactionObjectInput }

export function checkRecipient( tx: Transaction, args: CheckRecipientArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_recipient`, arguments: [ obj(tx, args.vaults), obj(tx, args.users), obj(tx, args.addressBook), obj(tx, args.ruleRecipients), obj(tx, args.txRecipientAddress) ], }) }

export interface CheckSourceArgs { vaults: TransactionObjectInput; txVaultId: number | TransactionArgument; ruleSource: TransactionObjectInput }

export function checkSource( tx: Transaction, args: CheckSourceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::check_source`, arguments: [ obj(tx, args.vaults), pure(tx, args.txVaultId, `u16`), obj(tx, args.ruleSource) ], }) }

export function createAllowedActionModulesAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_action_modules_any`, arguments: [ ], }) }

export interface CreateAllowedActionModulesSpecificArgs { allowedActionEffectIds: Array<string | TransactionArgument> | TransactionArgument; allowedActionGroups: Array<number | TransactionArgument> | TransactionArgument }

export function createAllowedActionModulesSpecific( tx: Transaction, args: CreateAllowedActionModulesSpecificArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_action_modules_specific`, arguments: [ pure(tx, args.allowedActionEffectIds, `vector<${ID.$typeName}>`), pure(tx, args.allowedActionGroups, `vector<u16>`) ], }) }

export function createAllowedActionsAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_actions_any`, arguments: [ ], }) }

export function createAllowedActionsSpecific( tx: Transaction, actions: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_actions_specific`, arguments: [ vector(tx, `${AllowedAction.$typeName}`, actions) ], }) }

export function createAllowedAmountAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_amount_any`, arguments: [ ], }) }

export function createAllowedAmountDollar( tx: Transaction, amountDollar: bigint | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_amount_dollar`, arguments: [ pure(tx, amountDollar, `u256`) ], }) }

export function createAllowedAmountNative( tx: Transaction, amountNative: bigint | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_amount_native`, arguments: [ pure(tx, amountNative, `u256`) ], }) }

export function createAllowedAssetAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_asset_any`, arguments: [ ], }) }

export function createAllowedAssetSpecific( tx: Transaction, assets: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_asset_specific`, arguments: [ vector(tx, `${NetworkAddress.$typeName}`, assets) ], }) }

export function createAllowedInitiatorsAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_initiators_any`, arguments: [ ], }) }

export interface CreateAllowedInitiatorsSpecificArgs { groupIds: Array<number | TransactionArgument> | TransactionArgument; userIds: Array<number | TransactionArgument> | TransactionArgument }

export function createAllowedInitiatorsSpecific( tx: Transaction, args: CreateAllowedInitiatorsSpecificArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_initiators_specific`, arguments: [ pure(tx, args.groupIds, `vector<u16>`), pure(tx, args.userIds, `vector<u16>`) ], }) }

export function createAllowedInteractionAddressesAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_interaction_addresses_any`, arguments: [ ], }) }

export function createAllowedInteractionAddressesSpecific( tx: Transaction, interactions: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_interaction_addresses_specific`, arguments: [ vector(tx, `${NetworkAddress.$typeName}`, interactions) ], }) }

export function createAllowedRecipientAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_recipient_any`, arguments: [ ], }) }

export interface CreateAllowedRecipientSpecificArgs { addressBookIds: Array<number | TransactionArgument> | TransactionArgument; addressBookGroupIds: Array<number | TransactionArgument> | TransactionArgument; vaultIds: Array<number | TransactionArgument> | TransactionArgument; vaultGroupIds: Array<number | TransactionArgument> | TransactionArgument }

export function createAllowedRecipientSpecific( tx: Transaction, args: CreateAllowedRecipientSpecificArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_recipient_specific`, arguments: [ pure(tx, args.addressBookIds, `vector<u16>`), pure(tx, args.addressBookGroupIds, `vector<u16>`), pure(tx, args.vaultIds, `vector<u16>`), pure(tx, args.vaultGroupIds, `vector<u16>`) ], }) }

export function createAllowedSourceAny( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_source_any`, arguments: [ ], }) }

export interface CreateAllowedSourceSpecificArgs { vaultGroupIds: Array<number | TransactionArgument> | TransactionArgument; vaultIds: Array<number | TransactionArgument> | TransactionArgument }

export function createAllowedSourceSpecific( tx: Transaction, args: CreateAllowedSourceSpecificArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_allowed_source_specific`, arguments: [ pure(tx, args.vaultGroupIds, `vector<u16>`), pure(tx, args.vaultIds, `vector<u16>`) ], }) }

export function createFollowActionApprove( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_follow_action_approve`, arguments: [ ], }) }

export function createFollowActionApproverRoleApprovalRequired( tx: Transaction, threshold: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_follow_action_approver_role_approval_required`, arguments: [ pure(tx, threshold, `u16`) ], }) }

export function createFollowActionBlock( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_follow_action_block`, arguments: [ ], }) }

export function createFollowActionQuorumApprovalRequired( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_follow_action_quorum_approval_required`, arguments: [ ], }) }

export interface CreateFollowActionSpecificApprovalRequiredArgs { requireApprovalUsers: Array<number | TransactionArgument> | TransactionArgument; requireApprovalGroups: Array<number | TransactionArgument> | TransactionArgument; threshold: number | TransactionArgument }

export function createFollowActionSpecificApprovalRequired( tx: Transaction, args: CreateFollowActionSpecificApprovalRequiredArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_follow_action_specific_approval_required`, arguments: [ pure(tx, args.requireApprovalUsers, `vector<u16>`), pure(tx, args.requireApprovalGroups, `vector<u16>`), pure(tx, args.threshold, `u16`) ], }) }

export function createPolicyResultAutoApproved( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_policy_result_auto_approved`, arguments: [ ], }) }

export function createPolicyResultBlocked( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_policy_result_blocked`, arguments: [ ], }) }

export function createPolicyResultQuorumApprovalRequired( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_policy_result_quorum_approval_required`, arguments: [ ], }) }

export interface CreatePolicyResultSpecificApprovalRequiredArgs { requireApprovalUsers: Array<number | TransactionArgument> | TransactionArgument; threshold: number | TransactionArgument }

export function createPolicyResultSpecificApprovalRequired( tx: Transaction, args: CreatePolicyResultSpecificApprovalRequiredArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::create_policy_result_specific_approval_required`, arguments: [ pure(tx, args.requireApprovalUsers, `vector<u16>`), pure(tx, args.threshold, `u16`) ], }) }

export interface ExecuteEditPolicyConfigArgs { policy: TransactionObjectInput; newPolicyRules: Array<TransactionObjectInput> | TransactionArgument }

export function executeEditPolicyConfig( tx: Transaction, args: ExecuteEditPolicyConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::execute_edit_policy_config`, arguments: [ obj(tx, args.policy), vector(tx, `${PolicyRule.$typeName}`, args.newPolicyRules) ], }) }

export function initPolicy( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::init_policy`, arguments: [ ], }) }

export interface IsActionGroupInAnyPolicyRuleArgs { policy: TransactionObjectInput; actionGroupId: number | TransactionArgument }

export function isActionGroupInAnyPolicyRule( tx: Transaction, args: IsActionGroupInAnyPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_action_group_in_any_policy_rule`, arguments: [ obj(tx, args.policy), pure(tx, args.actionGroupId, `u16`) ], }) }

export interface IsActionGroupInPolicyRuleArgs { policyRule: TransactionObjectInput; actionGroupId: number | TransactionArgument }

export function isActionGroupInPolicyRule( tx: Transaction, args: IsActionGroupInPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_action_group_in_policy_rule`, arguments: [ obj(tx, args.policyRule), pure(tx, args.actionGroupId, `u16`) ], }) }

export interface IsAddressGroupInAnyPolicyRuleArgs { policy: TransactionObjectInput; addressGroupId: number | TransactionArgument }

export function isAddressGroupInAnyPolicyRule( tx: Transaction, args: IsAddressGroupInAnyPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_address_group_in_any_policy_rule`, arguments: [ obj(tx, args.policy), pure(tx, args.addressGroupId, `u16`) ], }) }

export interface IsAddressGroupInPolicyRuleArgs { policyRule: TransactionObjectInput; addressGroupId: number | TransactionArgument }

export function isAddressGroupInPolicyRule( tx: Transaction, args: IsAddressGroupInPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_address_group_in_policy_rule`, arguments: [ obj(tx, args.policyRule), pure(tx, args.addressGroupId, `u16`) ], }) }

export interface IsAddressInAnyPolicyRuleArgs { policy: TransactionObjectInput; addressId: number | TransactionArgument }

export function isAddressInAnyPolicyRule( tx: Transaction, args: IsAddressInAnyPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_address_in_any_policy_rule`, arguments: [ obj(tx, args.policy), pure(tx, args.addressId, `u16`) ], }) }

export interface IsAddressInPolicyRuleArgs { policyRule: TransactionObjectInput; addressId: number | TransactionArgument }

export function isAddressInPolicyRule( tx: Transaction, args: IsAddressInPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_address_in_policy_rule`, arguments: [ obj(tx, args.policyRule), pure(tx, args.addressId, `u16`) ], }) }

export function isPolicyResultAutoApprove( tx: Transaction, policyResult: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_policy_result_auto_approve`, arguments: [ obj(tx, policyResult) ], }) }

export function isPolicyResultBlock( tx: Transaction, policyResult: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_policy_result_block`, arguments: [ obj(tx, policyResult) ], }) }

export function isPolicyResultQuorumApprovalRequired( tx: Transaction, policyResult: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_policy_result_quorum_approval_required`, arguments: [ obj(tx, policyResult) ], }) }

export function isPolicyResultSpecificApprovalRequired( tx: Transaction, policyResult: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_policy_result_specific_approval_required`, arguments: [ obj(tx, policyResult) ], }) }

export interface IsUserGroupInAnyPolicyRuleArgs { policy: TransactionObjectInput; userGroupId: number | TransactionArgument }

export function isUserGroupInAnyPolicyRule( tx: Transaction, args: IsUserGroupInAnyPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_user_group_in_any_policy_rule`, arguments: [ obj(tx, args.policy), pure(tx, args.userGroupId, `u16`) ], }) }

export interface IsUserGroupInPolicyRuleArgs { policyRule: TransactionObjectInput; userGroupId: number | TransactionArgument }

export function isUserGroupInPolicyRule( tx: Transaction, args: IsUserGroupInPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_user_group_in_policy_rule`, arguments: [ obj(tx, args.policyRule), pure(tx, args.userGroupId, `u16`) ], }) }

export interface IsUserInAnyPolicyRuleArgs { policy: TransactionObjectInput; userId: number | TransactionArgument }

export function isUserInAnyPolicyRule( tx: Transaction, args: IsUserInAnyPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_user_in_any_policy_rule`, arguments: [ obj(tx, args.policy), pure(tx, args.userId, `u16`) ], }) }

export interface IsUserInPolicyRuleArgs { policyRule: TransactionObjectInput; userId: number | TransactionArgument }

export function isUserInPolicyRule( tx: Transaction, args: IsUserInPolicyRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::is_user_in_policy_rule`, arguments: [ obj(tx, args.policyRule), pure(tx, args.userId, `u16`) ], }) }

export function policyResultGetParamsSpecificApproval( tx: Transaction, policyResult: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::policy::policy_result_get_params_specific_approval`, arguments: [ obj(tx, policyResult) ], }) }
