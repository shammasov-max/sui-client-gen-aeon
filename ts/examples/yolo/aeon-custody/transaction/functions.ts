import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure, vector} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {PolicyRule} from "../policy/structs";
import {ConfigTxType} from "./structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ApproveProposalArgs { users: TransactionObjectInput; transactions: TransactionObjectInput; txId: bigint | TransactionArgument; userId: number | TransactionArgument }

export function approveProposal( tx: Transaction, args: ApproveProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::approve_proposal`, arguments: [ obj(tx, args.users), obj(tx, args.transactions), pure(tx, args.txId, `u64`), pure(tx, args.userId, `u16`) ], }) }

export interface RejectProposalArgs { users: TransactionObjectInput; transactions: TransactionObjectInput; txId: bigint | TransactionArgument; userId: number | TransactionArgument }

export function rejectProposal( tx: Transaction, args: RejectProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::reject_proposal`, arguments: [ obj(tx, args.users), obj(tx, args.transactions), pure(tx, args.txId, `u64`), pure(tx, args.userId, `u16`) ], }) }

export interface CancelTransactionArgs { users: TransactionObjectInput; transactions: TransactionObjectInput; txId: bigint | TransactionArgument; userId: number | TransactionArgument; workspaceId: string | TransactionArgument }

export function cancelTransaction( tx: Transaction, typeArg: string, args: CancelTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::cancel_transaction`, typeArguments: [typeArg], arguments: [ obj(tx, args.users), obj(tx, args.transactions), pure(tx, args.txId, `u64`), pure(tx, args.userId, `u16`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface CreateAddAddressEnumArgs { name: string | TransactionArgument; networkAddress: Array<number | TransactionArgument> | TransactionArgument; networkIds: Array<string | TransactionArgument> | TransactionArgument }

export function createAddAddressEnum( tx: Transaction, args: CreateAddAddressEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_address_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.networkAddress, `vector<u8>`), pure(tx, args.networkIds, `vector<${String.$typeName}>`) ], }) }

export interface CreateAddAddressGroupEnumArgs { name: string | TransactionArgument; addressIds: Array<number | TransactionArgument> | TransactionArgument }

export function createAddAddressGroupEnum( tx: Transaction, args: CreateAddAddressGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_address_group_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addressIds, `vector<u16>`) ], }) }

export function createAddExternalSignerEnum( tx: Transaction, publicKey: Array<number | TransactionArgument> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_external_signer_enum`, arguments: [ pure(tx, publicKey, `vector<u8>`) ], }) }

export function createAddRoleEnum( tx: Transaction, newRole: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_role_enum`, arguments: [ obj(tx, newRole) ], }) }

export interface CreateAddUserEnumArgs { name: string | TransactionArgument; registrationAddressType: number | TransactionArgument; registrationAddress: Array<number | TransactionArgument> | TransactionArgument; roleId: number | TransactionArgument; groupsToAddTo: Array<number | TransactionArgument> | TransactionArgument }

export function createAddUserEnum( tx: Transaction, args: CreateAddUserEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_user_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.registrationAddressType, `u8`), pure(tx, args.registrationAddress, `vector<u8>`), pure(tx, args.roleId, `u16`), pure(tx, args.groupsToAddTo, `vector<u16>`) ], }) }

export interface CreateAddVaultEnumArgs { name: string | TransactionArgument; vaultGroupId: number | TransactionArgument; vaultProfileId: string | TransactionArgument }

export function createAddVaultEnum( tx: Transaction, args: CreateAddVaultEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_vault_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.vaultGroupId, `u16`), pure(tx, args.vaultProfileId, `${String.$typeName}`) ], }) }

export interface CreateAddVaultGroupEnumArgs { name: string | TransactionArgument; vaultIds: Array<number | TransactionArgument> | TransactionArgument }

export function createAddVaultGroupEnum( tx: Transaction, args: CreateAddVaultGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_vault_group_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.vaultIds, `vector<u16>`) ], }) }

export function createAddWhitelistActionModuleEnum( tx: Transaction, moduleId: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_add_whitelist_action_module_enum`, arguments: [ pure(tx, moduleId, `${ID.$typeName}`) ], }) }

export interface CreateConfigTxDirectApprovalArgs { transactions: TransactionObjectInput; txns: Array<TransactionObjectInput> | TransactionArgument; initiator: number | TransactionArgument }

export function createConfigTxDirectApproval( tx: Transaction, args: CreateConfigTxDirectApprovalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_config_tx_direct_approval`, arguments: [ obj(tx, args.transactions), vector(tx, `${ConfigTxType.$typeName}`, args.txns), pure(tx, args.initiator, `u16`) ], }) }

export interface CreateConfigTxInternalArgs { transactions: TransactionObjectInput; txns: Array<TransactionObjectInput> | TransactionArgument; status: TransactionObjectInput; initiator: number | TransactionArgument }

export function createConfigTxInternal( tx: Transaction, args: CreateConfigTxInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_config_tx_internal`, arguments: [ obj(tx, args.transactions), vector(tx, `${ConfigTxType.$typeName}`, args.txns), obj(tx, args.status), pure(tx, args.initiator, `u16`) ], }) }

export interface CreateConfigTxPendingApprovalQuorumArgs { workspaceId: string | TransactionArgument; transactions: TransactionObjectInput; txns: Array<TransactionObjectInput> | TransactionArgument; initiator: number | TransactionArgument }

export function createConfigTxPendingApprovalQuorum( tx: Transaction, args: CreateConfigTxPendingApprovalQuorumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_config_tx_pending_approval_quorum`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), obj(tx, args.transactions), vector(tx, `${ConfigTxType.$typeName}`, args.txns), pure(tx, args.initiator, `u16`) ], }) }

export interface CreateCreateActionGroupEnumArgs { name: string | TransactionArgument; moduleIds: Array<string | TransactionArgument> | TransactionArgument }

export function createCreateActionGroupEnum( tx: Transaction, args: CreateCreateActionGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_create_action_group_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.moduleIds, `vector<${ID.$typeName}>`) ], }) }

export interface CreateCreateUserGroupEnumArgs { name: string | TransactionArgument; userIds: Array<number | TransactionArgument> | TransactionArgument }

export function createCreateUserGroupEnum( tx: Transaction, args: CreateCreateUserGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_create_user_group_enum`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.userIds, `vector<u16>`) ], }) }

export function createDeleteActionGroupEnum( tx: Transaction, groupId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_delete_action_group_enum`, arguments: [ pure(tx, groupId, `u16`) ], }) }

export function createDeleteAddressEnum( tx: Transaction, addressId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_delete_address_enum`, arguments: [ pure(tx, addressId, `u16`) ], }) }

export function createDeleteAddressGroupEnum( tx: Transaction, groupId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_delete_address_group_enum`, arguments: [ pure(tx, groupId, `u16`) ], }) }

export function createDeleteUserEnum( tx: Transaction, userId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_delete_user_enum`, arguments: [ pure(tx, userId, `u16`) ], }) }

export function createDeleteUserGroupEnum( tx: Transaction, groupId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_delete_user_group_enum`, arguments: [ pure(tx, groupId, `u16`) ], }) }

export function createDeleteVaultGroupEnum( tx: Transaction, vaultGroupId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_delete_vault_group_enum`, arguments: [ pure(tx, vaultGroupId, `u16`) ], }) }

export interface CreateEditActionGroupEnumArgs { groupId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); moduleIdsAdd: Array<string | TransactionArgument> | TransactionArgument; moduleIdsDelete: Array<string | TransactionArgument> | TransactionArgument }

export function createEditActionGroupEnum( tx: Transaction, args: CreateEditActionGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_action_group_enum`, arguments: [ pure(tx, args.groupId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.moduleIdsAdd, `vector<${ID.$typeName}>`), pure(tx, args.moduleIdsDelete, `vector<${ID.$typeName}>`) ], }) }

export interface CreateEditAddressEnumArgs { addressId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); newNetworkIds: (Array<string | TransactionArgument> | TransactionArgument | TransactionArgument | null) }

export function createEditAddressEnum( tx: Transaction, args: CreateEditAddressEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_address_enum`, arguments: [ pure(tx, args.addressId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.newNetworkIds, `${Option.$typeName}<vector<${String.$typeName}>>`) ], }) }

export interface CreateEditAddressGroupEnumArgs { groupId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); addressIdsAdd: Array<number | TransactionArgument> | TransactionArgument; addressIdsDelete: Array<number | TransactionArgument> | TransactionArgument }

export function createEditAddressGroupEnum( tx: Transaction, args: CreateEditAddressGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_address_group_enum`, arguments: [ pure(tx, args.groupId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.addressIdsAdd, `vector<u16>`), pure(tx, args.addressIdsDelete, `vector<u16>`) ], }) }

export function createEditPolicyEnum( tx: Transaction, newPolicyRules: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_policy_enum`, arguments: [ vector(tx, `${PolicyRule.$typeName}`, newPolicyRules) ], }) }

export function createEditQuorumEnum( tx: Transaction, newQuorum: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_quorum_enum`, arguments: [ pure(tx, newQuorum, `u16`) ], }) }

export interface CreateEditUserEnumArgs { userId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); newRoleIdOpt: (number | TransactionArgument | TransactionArgument | null) }

export function createEditUserEnum( tx: Transaction, args: CreateEditUserEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_user_enum`, arguments: [ pure(tx, args.userId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.newRoleIdOpt, `${Option.$typeName}<u16>`) ], }) }

export interface CreateEditUserGroupEnumArgs { groupId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); userIdsAdd: Array<number | TransactionArgument> | TransactionArgument; userIdsDelete: Array<number | TransactionArgument> | TransactionArgument }

export function createEditUserGroupEnum( tx: Transaction, args: CreateEditUserGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_user_group_enum`, arguments: [ pure(tx, args.groupId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.userIdsAdd, `vector<u16>`), pure(tx, args.userIdsDelete, `vector<u16>`) ], }) }

export interface CreateEditVaultEnumArgs { vaultId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); vaultGroupIdNewOpt: (number | TransactionArgument | TransactionArgument | null); vaultProfileIdNewOpt: (string | TransactionArgument | TransactionArgument | null) }

export function createEditVaultEnum( tx: Transaction, args: CreateEditVaultEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_vault_enum`, arguments: [ pure(tx, args.vaultId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.vaultGroupIdNewOpt, `${Option.$typeName}<u16>`), pure(tx, args.vaultProfileIdNewOpt, `${Option.$typeName}<${String.$typeName}>`) ], }) }

export interface CreateEditVaultGroupEnumArgs { nameNewOpt: (string | TransactionArgument | TransactionArgument | null); vaultGroupId: number | TransactionArgument; vaultIdsAdd: Array<number | TransactionArgument> | TransactionArgument; vaultIdsRemove: Array<number | TransactionArgument> | TransactionArgument }

export function createEditVaultGroupEnum( tx: Transaction, args: CreateEditVaultGroupEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_vault_group_enum`, arguments: [ pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.vaultGroupId, `u16`), pure(tx, args.vaultIdsAdd, `vector<u16>`), pure(tx, args.vaultIdsRemove, `vector<u16>`) ], }) }

export function createEditWorkspaceNameEnum( tx: Transaction, newWorkspaceName: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_edit_workspace_name_enum`, arguments: [ pure(tx, newWorkspaceName, `${String.$typeName}`) ], }) }

export interface CreateMpcTransactionAutoApprovedArgs { transactions: TransactionObjectInput; initiator: number | TransactionArgument; networkId: string | TransactionArgument; vaultId: number | TransactionArgument; moduleAction: GenericArg; chainModuleId: string | TransactionArgument; memo: string | TransactionArgument }

export function createMpcTransactionAutoApproved( tx: Transaction, typeArg: string, args: CreateMpcTransactionAutoApprovedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_mpc_transaction_auto_approved`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.initiator, `u16`), pure(tx, args.networkId, `${String.$typeName}`), pure(tx, args.vaultId, `u16`), generic(tx, `${typeArg}`, args.moduleAction), pure(tx, args.chainModuleId, `${ID.$typeName}`), pure(tx, args.memo, `${String.$typeName}`) ], }) }

export interface CreateMpcTransactionBlockedArgs { transactions: TransactionObjectInput; initiator: number | TransactionArgument; networkId: string | TransactionArgument; vaultId: number | TransactionArgument; moduleAction: GenericArg; chainModuleId: string | TransactionArgument; memo: string | TransactionArgument }

export function createMpcTransactionBlocked( tx: Transaction, typeArg: string, args: CreateMpcTransactionBlockedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_mpc_transaction_blocked`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.initiator, `u16`), pure(tx, args.networkId, `${String.$typeName}`), pure(tx, args.vaultId, `u16`), generic(tx, `${typeArg}`, args.moduleAction), pure(tx, args.chainModuleId, `${ID.$typeName}`), pure(tx, args.memo, `${String.$typeName}`) ], }) }

export interface CreateMpcTransactionInternalArgs { transactions: TransactionObjectInput; initiator: number | TransactionArgument; networkId: string | TransactionArgument; status: TransactionObjectInput; vaultId: number | TransactionArgument; moduleAction: GenericArg; chainModuleId: string | TransactionArgument; memo: string | TransactionArgument }

export function createMpcTransactionInternal( tx: Transaction, typeArg: string, args: CreateMpcTransactionInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_mpc_transaction_internal`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.initiator, `u16`), pure(tx, args.networkId, `${String.$typeName}`), obj(tx, args.status), pure(tx, args.vaultId, `u16`), generic(tx, `${typeArg}`, args.moduleAction), pure(tx, args.chainModuleId, `${ID.$typeName}`), pure(tx, args.memo, `${String.$typeName}`) ], }) }

export interface CreateMpcTransactionPendingApprovalQuorumArgs { transactions: TransactionObjectInput; workspaceId: string | TransactionArgument; initiator: number | TransactionArgument; networkId: string | TransactionArgument; vaultId: number | TransactionArgument; moduleAction: GenericArg; chainModuleId: string | TransactionArgument; memo: string | TransactionArgument }

export function createMpcTransactionPendingApprovalQuorum( tx: Transaction, typeArg: string, args: CreateMpcTransactionPendingApprovalQuorumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_mpc_transaction_pending_approval_quorum`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.initiator, `u16`), pure(tx, args.networkId, `${String.$typeName}`), pure(tx, args.vaultId, `u16`), generic(tx, `${typeArg}`, args.moduleAction), pure(tx, args.chainModuleId, `${ID.$typeName}`), pure(tx, args.memo, `${String.$typeName}`) ], }) }

export interface CreateMpcTransactionPendingApprovalSpecificArgs { transactions: TransactionObjectInput; workspaceId: string | TransactionArgument; initiator: number | TransactionArgument; networkId: string | TransactionArgument; vaultId: number | TransactionArgument; moduleAction: GenericArg; chainModuleId: string | TransactionArgument; memo: string | TransactionArgument; requireApprovalUsers: Array<number | TransactionArgument> | TransactionArgument; threshold: number | TransactionArgument }

export function createMpcTransactionPendingApprovalSpecific( tx: Transaction, typeArg: string, args: CreateMpcTransactionPendingApprovalSpecificArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_mpc_transaction_pending_approval_specific`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.initiator, `u16`), pure(tx, args.networkId, `${String.$typeName}`), pure(tx, args.vaultId, `u16`), generic(tx, `${typeArg}`, args.moduleAction), pure(tx, args.chainModuleId, `${ID.$typeName}`), pure(tx, args.memo, `${String.$typeName}`), pure(tx, args.requireApprovalUsers, `vector<u16>`), pure(tx, args.threshold, `u16`) ], }) }

export interface CreateRegisterAccountRecoveryEnumArgs { userId: number | TransactionArgument; recoveryAddress: string | TransactionArgument; publicKey: Array<number | TransactionArgument> | TransactionArgument; encryptedUserSharesMap: TransactionObjectInput }

export function createRegisterAccountRecoveryEnum( tx: Transaction, args: CreateRegisterAccountRecoveryEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_register_account_recovery_enum`, arguments: [ pure(tx, args.userId, `u16`), pure(tx, args.recoveryAddress, `address`), pure(tx, args.publicKey, `vector<u8>`), obj(tx, args.encryptedUserSharesMap) ], }) }

export function createRemoveWhitelistActionModuleEnum( tx: Transaction, moduleId: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_remove_whitelist_action_module_enum`, arguments: [ pure(tx, moduleId, `${ID.$typeName}`) ], }) }

export interface CreateResetInitCapUserEnumArgs { userId: number | TransactionArgument; newRegistrationAddressType: number | TransactionArgument; newRegistrationAddress: Array<number | TransactionArgument> | TransactionArgument }

export function createResetInitCapUserEnum( tx: Transaction, args: CreateResetInitCapUserEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_reset_init_cap_user_enum`, arguments: [ pure(tx, args.userId, `u16`), pure(tx, args.newRegistrationAddressType, `u8`), pure(tx, args.newRegistrationAddress, `vector<u8>`) ], }) }

export interface CreateResetUserEnumArgs { userId: number | TransactionArgument; resetInitCap: boolean | TransactionArgument; newRegistrationAddressType: (number | TransactionArgument | TransactionArgument | null); newRegistrationAddress: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null) }

export function createResetUserEnum( tx: Transaction, args: CreateResetUserEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_reset_user_enum`, arguments: [ pure(tx, args.userId, `u16`), pure(tx, args.resetInitCap, `bool`), pure(tx, args.newRegistrationAddressType, `${Option.$typeName}<u8>`), pure(tx, args.newRegistrationAddress, `${Option.$typeName}<vector<u8>>`) ], }) }

export function createRevokeRecoveryEnum( tx: Transaction, userId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_revoke_recovery_enum`, arguments: [ pure(tx, userId, `u16`) ], }) }

export function createShareUserSharesEnum( tx: Transaction, userId: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_share_user_shares_enum`, arguments: [ pure(tx, userId, `u16`) ], }) }

export interface CreateVaultProfileAddEnumArgs { profileName: string | TransactionArgument; vaultProfile: TransactionObjectInput }

export function createVaultProfileAddEnum( tx: Transaction, args: CreateVaultProfileAddEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_vault_profile_add_enum`, arguments: [ pure(tx, args.profileName, `${String.$typeName}`), obj(tx, args.vaultProfile) ], }) }

export function createVaultProfileDeleteEnum( tx: Transaction, profileName: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_vault_profile_delete_enum`, arguments: [ pure(tx, profileName, `${String.$typeName}`) ], }) }

export interface CreateVaultProfileEditEnumArgs { profileName: string | TransactionArgument; vaultProfile: TransactionObjectInput }

export function createVaultProfileEditEnum( tx: Transaction, args: CreateVaultProfileEditEnumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::create_vault_profile_edit_enum`, arguments: [ pure(tx, args.profileName, `${String.$typeName}`), obj(tx, args.vaultProfile) ], }) }

export interface ExecuteActionConfigArgs { actionConfig: TransactionObjectInput; settings: TransactionObjectInput; policy: TransactionObjectInput }

export function executeActionConfig( tx: Transaction, args: ExecuteActionConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::execute_action_config`, arguments: [ obj(tx, args.actionConfig), obj(tx, args.settings), obj(tx, args.policy) ], }) }

export interface ExecuteAddressBookConfigArgs { addressBookConfig: TransactionObjectInput; addressBook: TransactionObjectInput; policy: TransactionObjectInput }

export function executeAddressBookConfig( tx: Transaction, args: ExecuteAddressBookConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::execute_address_book_config`, arguments: [ obj(tx, args.addressBookConfig), obj(tx, args.addressBook), obj(tx, args.policy) ], }) }

export interface ExecuteConfigTxInternalArgs { users: TransactionObjectInput; vaults: TransactionObjectInput; policy: TransactionObjectInput; addressBook: TransactionObjectInput; settings: TransactionObjectInput; workspaceId: string | TransactionArgument; txUserId: number | TransactionArgument; userCapId: string | TransactionArgument; configTx: TransactionObjectInput; configExecutionInput: TransactionObjectInput }

export function executeConfigTxInternal( tx: Transaction, args: ExecuteConfigTxInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::execute_config_tx_internal`, arguments: [ obj(tx, args.users), obj(tx, args.vaults), obj(tx, args.policy), obj(tx, args.addressBook), obj(tx, args.settings), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.txUserId, `u16`), pure(tx, args.userCapId, `${ID.$typeName}`), obj(tx, args.configTx), obj(tx, args.configExecutionInput) ], }) }

export interface ExecuteOtherConfigArgs { otherConfig: TransactionObjectInput; users: TransactionObjectInput; vaults: TransactionObjectInput; settings: TransactionObjectInput; policy: TransactionObjectInput; txUserId: number | TransactionArgument; workspaceId: string | TransactionArgument }

export function executeOtherConfig( tx: Transaction, args: ExecuteOtherConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::execute_other_config`, arguments: [ obj(tx, args.otherConfig), obj(tx, args.users), obj(tx, args.vaults), obj(tx, args.settings), obj(tx, args.policy), pure(tx, args.txUserId, `u16`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface ExecuteUserConfigArgs { userConfig: TransactionObjectInput; users: TransactionObjectInput; policy: TransactionObjectInput; workspaceId: string | TransactionArgument; txUserId: number | TransactionArgument }

export function executeUserConfig( tx: Transaction, args: ExecuteUserConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::execute_user_config`, arguments: [ obj(tx, args.userConfig), obj(tx, args.users), obj(tx, args.policy), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.txUserId, `u16`) ], }) }

export interface ExecuteVaultConfigArgs { vaultConfig: TransactionObjectInput; users: TransactionObjectInput; vaults: TransactionObjectInput; workspaceId: string | TransactionArgument; configExecutionInput: TransactionObjectInput }

export function executeVaultConfig( tx: Transaction, args: ExecuteVaultConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::execute_vault_config`, arguments: [ obj(tx, args.vaultConfig), obj(tx, args.users), obj(tx, args.vaults), pure(tx, args.workspaceId, `${ID.$typeName}`), obj(tx, args.configExecutionInput) ], }) }

export function getRequiredRoleConfigTx( tx: Transaction, configTx: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::get_required_role_config_tx`, arguments: [ obj(tx, configTx) ], }) }

export function initTransactions( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::init_transactions`, arguments: [ ], }) }

export interface IsConfigTxArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument }

export function isConfigTx( tx: Transaction, args: IsConfigTxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::is_config_tx`, arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`) ], }) }

export function isConfigTxAdminApprovalRequired( tx: Transaction, configTxs: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::is_config_tx_admin_approval_required`, arguments: [ vector(tx, `${ConfigTxType.$typeName}`, configTxs) ], }) }

export interface IsMpcTransactionApprovedArgs { users: TransactionObjectInput; status: TransactionObjectInput }

export function isMpcTransactionApproved( tx: Transaction, args: IsMpcTransactionApprovedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::is_mpc_transaction_approved`, arguments: [ obj(tx, args.users), obj(tx, args.status) ], }) }

export function isMpcTransactionSigningRequested( tx: Transaction, status: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::is_mpc_transaction_signing_requested`, arguments: [ obj(tx, status) ], }) }

export interface IsUserInitiatorArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument; userId: number | TransactionArgument }

export function isUserInitiator( tx: Transaction, typeArg: string, args: IsUserInitiatorArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::is_user_initiator`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`), pure(tx, args.userId, `u16`) ], }) }

export interface UpdateConfigTxStatusCancelledArgs { transaction: TransactionObjectInput; txId: bigint | TransactionArgument; workspaceId: string | TransactionArgument }

export function updateConfigTxStatusCancelled( tx: Transaction, args: UpdateConfigTxStatusCancelledArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_config_tx_status_cancelled`, arguments: [ obj(tx, args.transaction), pure(tx, args.txId, `u64`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface UpdateConfigTxStatusExecutedArgs { transaction: TransactionObjectInput; users: TransactionObjectInput; txId: bigint | TransactionArgument; workspaceId: string | TransactionArgument }

export function updateConfigTxStatusExecuted( tx: Transaction, args: UpdateConfigTxStatusExecutedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_config_tx_status_executed`, arguments: [ obj(tx, args.transaction), obj(tx, args.users), pure(tx, args.txId, `u64`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface UpdateConfigTxStatusInternalArgs { transaction: TransactionObjectInput; txId: bigint | TransactionArgument; newStatus: TransactionObjectInput; workspaceId: string | TransactionArgument }

export function updateConfigTxStatusInternal( tx: Transaction, args: UpdateConfigTxStatusInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_config_tx_status_internal`, arguments: [ obj(tx, args.transaction), pure(tx, args.txId, `u64`), obj(tx, args.newStatus), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface UpdateMpcTxStatusCancelledArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument; workspaceId: string | TransactionArgument }

export function updateMpcTxStatusCancelled( tx: Transaction, typeArg: string, args: UpdateMpcTxStatusCancelledArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_mpc_tx_status_cancelled`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface UpdateMpcTxStatusInternalArgs { workspaceId: string | TransactionArgument; transaction: TransactionObjectInput; txId: bigint | TransactionArgument; newStatus: TransactionObjectInput }

export function updateMpcTxStatusInternal( tx: Transaction, typeArg: string, args: UpdateMpcTxStatusInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_mpc_tx_status_internal`, typeArguments: [typeArg], arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), obj(tx, args.transaction), pure(tx, args.txId, `u64`), obj(tx, args.newStatus) ], }) }

export interface UpdateMpcTxStatusReadySigningArgs { transactions: TransactionObjectInput; users: TransactionObjectInput; txId: bigint | TransactionArgument; txSignable: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument; workspaceId: string | TransactionArgument }

export function updateMpcTxStatusReadySigning( tx: Transaction, typeArg: string, args: UpdateMpcTxStatusReadySigningArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_mpc_tx_status_ready_signing`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), obj(tx, args.users), pure(tx, args.txId, `u64`), pure(tx, args.txSignable, `vector<vector<u8>>`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface UpdateMpcTxStatusSigningRequestedArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument; workspaceId: string | TransactionArgument }

export function updateMpcTxStatusSigningRequested( tx: Transaction, typeArg: string, args: UpdateMpcTxStatusSigningRequestedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::update_mpc_tx_status_signing_requested`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`), pure(tx, args.workspaceId, `${ID.$typeName}`) ], }) }

export interface ViewConfigTxArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument }

export function viewConfigTx( tx: Transaction, args: ViewConfigTxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::view_config_tx`, arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`) ], }) }

export interface ViewMpcReadySigningTxSignableArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument }

export function viewMpcReadySigningTxSignable( tx: Transaction, typeArg: string, args: ViewMpcReadySigningTxSignableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::view_mpc_ready_signing_tx_signable`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`) ], }) }

export interface ViewMpcTransactionArgs { transactions: TransactionObjectInput; txId: bigint | TransactionArgument }

export function viewMpcTransaction( tx: Transaction, typeArg: string, args: ViewMpcTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transaction::view_mpc_transaction`, typeArguments: [typeArg], arguments: [ obj(tx, args.transactions), pure(tx, args.txId, `u64`) ], }) }
