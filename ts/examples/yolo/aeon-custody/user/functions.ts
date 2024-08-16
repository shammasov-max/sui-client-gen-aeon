import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddExternalSignerArgs { users: TransactionObjectInput; publicKey: Array<number | TransactionArgument> | TransactionArgument }

export function addExternalSigner( tx: Transaction, args: AddExternalSignerArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::add_external_signer`, arguments: [ obj(tx, args.users), pure(tx, args.publicKey, `vector<u8>`) ], }) }

export interface AddFirstAdminArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; name: string | TransactionArgument; initAddress: string | TransactionArgument; approveAddress: string | TransactionArgument; approvePublicKey: Array<number | TransactionArgument> | TransactionArgument; adminRegistrationAddress: Array<number | TransactionArgument> | TransactionArgument }

export function addFirstAdmin( tx: Transaction, args: AddFirstAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::add_first_admin`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.initAddress, `address`), pure(tx, args.approveAddress, `address`), pure(tx, args.approvePublicKey, `vector<u8>`), pure(tx, args.adminRegistrationAddress, `vector<u8>`) ], }) }

export interface AddInitCapUsersArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; userId: number | TransactionArgument }

export function addInitCapUsers( tx: Transaction, args: AddInitCapUsersArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::add_init_cap_users`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`) ], }) }

export interface AddUserToGroupInternalArgs { users: TransactionObjectInput; userId: number | TransactionArgument; groupId: number | TransactionArgument }

export function addUserToGroupInternal( tx: Transaction, args: AddUserToGroupInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::add_user_to_group_internal`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`), pure(tx, args.groupId, `u16`) ], }) }

export interface AuthorizeUserArgs { users: TransactionObjectInput; userCap: TransactionObjectInput; requiredPermissions: Array<number | TransactionArgument> | TransactionArgument; requireApproveCap: boolean | TransactionArgument }

export function authorizeUser( tx: Transaction, args: AuthorizeUserArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::authorize_user`, arguments: [ obj(tx, args.users), obj(tx, args.userCap), pure(tx, args.requiredPermissions, `vector<u8>`), pure(tx, args.requireApproveCap, `bool`) ], }) }

export interface CreateCapInternalArgs { workspaceId: string | TransactionArgument; isApprove: boolean | TransactionArgument }

export function createCapInternal( tx: Transaction, args: CreateCapInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::create_cap_internal`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.isApprove, `bool`) ], }) }

export interface DeleteUserFromGroupInternalArgs { users: TransactionObjectInput; userId: number | TransactionArgument; groupId: number | TransactionArgument }

export function deleteUserFromGroupInternal( tx: Transaction, args: DeleteUserFromGroupInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::delete_user_from_group_internal`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`), pure(tx, args.groupId, `u16`) ], }) }

export interface ExecuteConfigAddRoleArgs { users: TransactionObjectInput; role: TransactionObjectInput }

export function executeConfigAddRole( tx: Transaction, args: ExecuteConfigAddRoleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_add_role`, arguments: [ obj(tx, args.users), obj(tx, args.role) ], }) }

export interface ExecuteConfigAddUserArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; name: string | TransactionArgument; registrationAddressType: number | TransactionArgument; registrationAddress: Array<number | TransactionArgument> | TransactionArgument; userRoleId: number | TransactionArgument; groupsToAddTo: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigAddUser( tx: Transaction, args: ExecuteConfigAddUserArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_add_user`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.registrationAddressType, `u8`), pure(tx, args.registrationAddress, `vector<u8>`), pure(tx, args.userRoleId, `u16`), pure(tx, args.groupsToAddTo, `vector<u16>`) ], }) }

export interface ExecuteConfigEditWorkspaceQuorumArgs { users: TransactionObjectInput; updatedQuorumValue: number | TransactionArgument }

export function executeConfigEditWorkspaceQuorum( tx: Transaction, args: ExecuteConfigEditWorkspaceQuorumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_edit_workspace_quorum`, arguments: [ obj(tx, args.users), pure(tx, args.updatedQuorumValue, `u16`) ], }) }

export interface ExecuteConfigRecoverAccountArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; userId: number | TransactionArgument; newMobileSignerAddress: string | TransactionArgument }

export function executeConfigRecoverAccount( tx: Transaction, args: ExecuteConfigRecoverAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_recover_account`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`), pure(tx, args.newMobileSignerAddress, `address`) ], }) }

export interface ExecuteConfigRegisterRecoveryArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; userId: number | TransactionArgument; recoveryAddress: string | TransactionArgument; publicKey: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigRegisterRecovery( tx: Transaction, args: ExecuteConfigRegisterRecoveryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_register_recovery`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`), pure(tx, args.recoveryAddress, `address`), pure(tx, args.publicKey, `vector<u8>`) ], }) }

export interface ExecuteConfigRevokeRecoveryArgs { users: TransactionObjectInput; userId: number | TransactionArgument }

export function executeConfigRevokeRecovery( tx: Transaction, args: ExecuteConfigRevokeRecoveryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_revoke_recovery`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface ExecuteConfigUserCreateGroupArgs { users: TransactionObjectInput; name: string | TransactionArgument; userIds: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigUserCreateGroup( tx: Transaction, args: ExecuteConfigUserCreateGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_create_group`, arguments: [ obj(tx, args.users), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.userIds, `vector<u16>`) ], }) }

export interface ExecuteConfigUserDeleteArgs { users: TransactionObjectInput; userId: number | TransactionArgument }

export function executeConfigUserDelete( tx: Transaction, args: ExecuteConfigUserDeleteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_delete`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface ExecuteConfigUserDeleteGroupArgs { users: TransactionObjectInput; groupId: number | TransactionArgument }

export function executeConfigUserDeleteGroup( tx: Transaction, args: ExecuteConfigUserDeleteGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_delete_group`, arguments: [ obj(tx, args.users), pure(tx, args.groupId, `u16`) ], }) }

export interface ExecuteConfigUserEditArgs { users: TransactionObjectInput; userId: number | TransactionArgument; newNameOpt: (string | TransactionArgument | TransactionArgument | null); newRoleIdOpt: (number | TransactionArgument | TransactionArgument | null) }

export function executeConfigUserEdit( tx: Transaction, args: ExecuteConfigUserEditArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_edit`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`), pure(tx, args.newNameOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.newRoleIdOpt, `${Option.$typeName}<u16>`) ], }) }

export interface ExecuteConfigUserEditGroupArgs { users: TransactionObjectInput; groupId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); userIdsAdd: Array<number | TransactionArgument> | TransactionArgument; userIdsDelete: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigUserEditGroup( tx: Transaction, args: ExecuteConfigUserEditGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_edit_group`, arguments: [ obj(tx, args.users), pure(tx, args.groupId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.userIdsAdd, `vector<u16>`), pure(tx, args.userIdsDelete, `vector<u16>`) ], }) }

export interface ExecuteConfigUserResetArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; userId: number | TransactionArgument; resetInitCap: boolean | TransactionArgument; newRegistrationAddressType: (number | TransactionArgument | TransactionArgument | null); newRegistrationAddress: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null) }

export function executeConfigUserReset( tx: Transaction, args: ExecuteConfigUserResetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_reset`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`), pure(tx, args.resetInitCap, `bool`), pure(tx, args.newRegistrationAddressType, `${Option.$typeName}<u8>`), pure(tx, args.newRegistrationAddress, `${Option.$typeName}<vector<u8>>`) ], }) }

export interface ExecuteConfigUserResetInitCapArgs { users: TransactionObjectInput; workspaceId: string | TransactionArgument; userId: number | TransactionArgument; newRegistrationAddressType: number | TransactionArgument; newRegistrationAddress: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigUserResetInitCap( tx: Transaction, args: ExecuteConfigUserResetInitCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::execute_config_user_reset_init_cap`, arguments: [ obj(tx, args.users), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`), pure(tx, args.newRegistrationAddressType, `u8`), pure(tx, args.newRegistrationAddress, `vector<u8>`) ], }) }

export function getAdminQuorumCount( tx: Transaction, users: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_admin_quorum_count`, arguments: [ obj(tx, users) ], }) }

export function getAdminQuorumMembers( tx: Transaction, users: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_admin_quorum_members`, arguments: [ obj(tx, users) ], }) }

export function getAdminQuorumPermission( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_admin_quorum_permission`, arguments: [ ], }) }

export function getAdminQuorumThreshold( tx: Transaction, users: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_admin_quorum_threshold`, arguments: [ obj(tx, users) ], }) }

export function getAllPublicKeysSigners( tx: Transaction, users: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_all_public_keys_signers`, arguments: [ obj(tx, users) ], }) }

export interface GetApprovePublicKeyArgs { users: TransactionObjectInput; userId: number | TransactionArgument }

export function getApprovePublicKey( tx: Transaction, args: GetApprovePublicKeyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_approve_public_key`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export function getApproveTaskPermission( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_approve_task_permission`, arguments: [ ], }) }

export interface GetCountQuorumMembersFromListArgs { users: TransactionObjectInput; usersCheck: Array<number | TransactionArgument> | TransactionArgument }

export function getCountQuorumMembersFromList( tx: Transaction, args: GetCountQuorumMembersFromListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_count_quorum_members_from_list`, arguments: [ obj(tx, args.users), pure(tx, args.usersCheck, `vector<u16>`) ], }) }

export interface GetDistinctUsersInGroupIdsArgs { users: TransactionObjectInput; groupIds: Array<number | TransactionArgument> | TransactionArgument }

export function getDistinctUsersInGroupIds( tx: Transaction, args: GetDistinctUsersInGroupIdsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_distinct_users_in_group_ids`, arguments: [ obj(tx, args.users), pure(tx, args.groupIds, `vector<u16>`) ], }) }

export function getInitMpcTxPermission( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_init_mpc_tx_permission`, arguments: [ ], }) }

export interface GetMembersByPermissionArgs { users: TransactionObjectInput; permission: number | TransactionArgument }

export function getMembersByPermission( tx: Transaction, args: GetMembersByPermissionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_members_by_permission`, arguments: [ obj(tx, args.users), pure(tx, args.permission, `u8`) ], }) }

export function getRecoveryPermission( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_recovery_permission`, arguments: [ ], }) }

export function getSignMpcTxPermission( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_sign_mpc_tx_permission`, arguments: [ ], }) }

export interface GetUserByCapIdArgs { users: TransactionObjectInput; userCap: TransactionObjectInput }

export function getUserByCapId( tx: Transaction, args: GetUserByCapIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_user_by_cap_id`, arguments: [ obj(tx, args.users), obj(tx, args.userCap) ], }) }

export interface GetUserByRecoveryCapIdArgs { users: TransactionObjectInput; userCap: TransactionObjectInput }

export function getUserByRecoveryCapId( tx: Transaction, args: GetUserByRecoveryCapIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_user_by_recovery_cap_id`, arguments: [ obj(tx, args.users), obj(tx, args.userCap) ], }) }

export interface GetUserRoleIdArgs { users: TransactionObjectInput; userId: number | TransactionArgument }

export function getUserRoleId( tx: Transaction, args: GetUserRoleIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_user_role_id`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export function getUsersSigningRole( tx: Transaction, users: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_users_signing_role`, arguments: [ obj(tx, users) ], }) }

export function getVoteProposalPermission( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::get_vote_proposal_permission`, arguments: [ ], }) }

export function initUsers( tx: Transaction, adminQuorumThreshold: number | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::init_users`, arguments: [ pure(tx, adminQuorumThreshold, `u16`) ], }) }

export function isAdminQuorumValid( tx: Transaction, users: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_admin_quorum_valid`, arguments: [ obj(tx, users) ], }) }

export interface IsAuthorizedRecoveryArgs { users: TransactionObjectInput; userId: number | TransactionArgument; callingUserCapId: string | TransactionArgument }

export function isAuthorizedRecovery( tx: Transaction, args: IsAuthorizedRecoveryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_authorized_recovery`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`), pure(tx, args.callingUserCapId, `${ID.$typeName}`) ], }) }

export interface IsRoleValidArgs { users: TransactionObjectInput; roleId: number | TransactionArgument }

export function isRoleValid( tx: Transaction, args: IsRoleValidArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_role_valid`, arguments: [ obj(tx, args.users), pure(tx, args.roleId, `u16`) ], }) }

export interface IsUserAuthorizedArgs { users: TransactionObjectInput; userId: number | TransactionArgument; requiredPermissions: Array<number | TransactionArgument> | TransactionArgument }

export function isUserAuthorized( tx: Transaction, args: IsUserAuthorizedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_user_authorized`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`), pure(tx, args.requiredPermissions, `vector<u8>`) ], }) }

export interface IsUserInAnyGroupArgs { users: TransactionObjectInput; userId: number | TransactionArgument }

export function isUserInAnyGroup( tx: Transaction, args: IsUserInAnyGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_user_in_any_group`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface IsUserInGroupArgs { users: TransactionObjectInput; userId: number | TransactionArgument; groupId: number | TransactionArgument }

export function isUserInGroup( tx: Transaction, args: IsUserInGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_user_in_group`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`), pure(tx, args.groupId, `u16`) ], }) }

export function isUserOnboarded( tx: Transaction, user: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_user_onboarded`, arguments: [ obj(tx, user) ], }) }

export interface IsUserValidArgs { users: TransactionObjectInput; userId: number | TransactionArgument }

export function isUserValid( tx: Transaction, args: IsUserValidArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_user_valid`, arguments: [ obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface IsValidRoleIdArgs { roles: TransactionObjectInput; roleId: number | TransactionArgument }

export function isValidRoleId( tx: Transaction, args: IsValidRoleIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::is_valid_role_id`, arguments: [ obj(tx, args.roles), pure(tx, args.roleId, `u16`) ], }) }

export interface IssueNewCapsInternalArgs { workspaceId: string | TransactionArgument; userId: number | TransactionArgument; issueApproveCap: boolean | TransactionArgument; issueInitCap: boolean | TransactionArgument; registrationAddressType: number | TransactionArgument; registrationAddress: Array<number | TransactionArgument> | TransactionArgument }

export function issueNewCapsInternal( tx: Transaction, args: IssueNewCapsInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::issue_new_caps_internal`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`), pure(tx, args.issueApproveCap, `bool`), pure(tx, args.issueInitCap, `bool`), pure(tx, args.registrationAddressType, `u8`), pure(tx, args.registrationAddress, `vector<u8>`) ], }) }

export interface QuorumApprovesArgs { users: TransactionObjectInput; quorumVotes: TransactionObjectInput }

export function quorumApproves( tx: Transaction, args: QuorumApprovesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::quorum_approves`, arguments: [ obj(tx, args.users), obj(tx, args.quorumVotes) ], }) }

export interface RetrieveUserCapsInternalArgs { users: TransactionObjectInput; holder: TransactionObjectInput; initCapHolderAddressOpt: (string | TransactionArgument | TransactionArgument | null); approveCapHolderAddressOpt: (string | TransactionArgument | TransactionArgument | null); approveCapHolderPublicKeyOpt: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null); signature: Array<number | TransactionArgument> | TransactionArgument }

export function retrieveUserCapsInternal( tx: Transaction, args: RetrieveUserCapsInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::retrieve_user_caps_internal`, arguments: [ obj(tx, args.users), obj(tx, args.holder), pure(tx, args.initCapHolderAddressOpt, `${Option.$typeName}<address>`), pure(tx, args.approveCapHolderAddressOpt, `${Option.$typeName}<address>`), pure(tx, args.approveCapHolderPublicKeyOpt, `${Option.$typeName}<vector<u8>>`), pure(tx, args.signature, `vector<u8>`) ], }) }
