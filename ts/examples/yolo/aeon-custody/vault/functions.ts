import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure, vector} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {NamespaceInfo} from "./structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface BorrowDwalletCapArgs { vaults: TransactionObjectInput; vaultId: number | TransactionArgument }

export function borrowDwalletCap( tx: Transaction, args: BorrowDwalletCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::borrow_dwallet_cap`, arguments: [ obj(tx, args.vaults), pure(tx, args.vaultId, `u16`) ], }) }

export interface BorrowVaultArgs { vaults: TransactionObjectInput; vaultId: number | TransactionArgument }

export function borrowVault( tx: Transaction, args: BorrowVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::borrow_vault`, arguments: [ obj(tx, args.vaults), pure(tx, args.vaultId, `u16`) ], }) }

export interface CreateNamespaceInfoArgs { chainIds: Array<string | TransactionArgument> | TransactionArgument; actionModuleIds: Array<string | TransactionArgument> | TransactionArgument; txAssembleModuleId: Array<string | TransactionArgument> | TransactionArgument; updateModuleIds: Array<string | TransactionArgument> | TransactionArgument }

export function createNamespaceInfo( tx: Transaction, args: CreateNamespaceInfoArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::create_namespace_info`, arguments: [ pure(tx, args.chainIds, `vector<${String.$typeName}>`), pure(tx, args.actionModuleIds, `vector<${ID.$typeName}>`), pure(tx, args.txAssembleModuleId, `vector<${ID.$typeName}>`), pure(tx, args.updateModuleIds, `vector<${ID.$typeName}>`) ], }) }

export interface CreateNetworkIdArgs { namespace: string | TransactionArgument; chainId: string | TransactionArgument }

export function createNetworkId( tx: Transaction, args: CreateNetworkIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::create_network_id`, arguments: [ pure(tx, args.namespace, `${String.$typeName}`), pure(tx, args.chainId, `${String.$typeName}`) ], }) }

export interface CreateVaultProfileArgs { namespaces: Array<string | TransactionArgument> | TransactionArgument; infos: Array<TransactionObjectInput> | TransactionArgument }

export function createVaultProfile( tx: Transaction, args: CreateVaultProfileArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::create_vault_profile`, arguments: [ pure(tx, args.namespaces, `vector<${String.$typeName}>`), vector(tx, `${NamespaceInfo.$typeName}`, args.infos) ], }) }

export interface ExecuteConfigAddVaultArgs { workspaceId: string | TransactionArgument; vaults: TransactionObjectInput; name: string | TransactionArgument; vaultGroupId: number | TransactionArgument; vaultProfileId: string | TransactionArgument; signerPublicKeys: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument; encryptedUserShares: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument; dwltnDwalletCapId: string | TransactionArgument }

export function executeConfigAddVault( tx: Transaction, args: ExecuteConfigAddVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_add_vault`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), obj(tx, args.vaults), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.vaultGroupId, `u16`), pure(tx, args.vaultProfileId, `${String.$typeName}`), pure(tx, args.signerPublicKeys, `vector<vector<u8>>`), pure(tx, args.encryptedUserShares, `vector<vector<u8>>`), pure(tx, args.dwltnDwalletCapId, `${ID.$typeName}`) ], }) }

export interface ExecuteConfigAddVaultProfileArgs { vaults: TransactionObjectInput; profileName: string | TransactionArgument; vaultProfile: TransactionObjectInput }

export function executeConfigAddVaultProfile( tx: Transaction, args: ExecuteConfigAddVaultProfileArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_add_vault_profile`, arguments: [ obj(tx, args.vaults), pure(tx, args.profileName, `${String.$typeName}`), obj(tx, args.vaultProfile) ], }) }

export interface ExecuteConfigDeleteVaultProfileArgs { vaults: TransactionObjectInput; profileName: string | TransactionArgument }

export function executeConfigDeleteVaultProfile( tx: Transaction, args: ExecuteConfigDeleteVaultProfileArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_delete_vault_profile`, arguments: [ obj(tx, args.vaults), pure(tx, args.profileName, `${String.$typeName}`) ], }) }

export interface ExecuteConfigEditVaultGroupArgs { vaults: TransactionObjectInput; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); vaultGroupId: number | TransactionArgument; vaultIdsAdd: Array<number | TransactionArgument> | TransactionArgument; vaultIdsRemove: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigEditVaultGroup( tx: Transaction, args: ExecuteConfigEditVaultGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_edit_vault_group`, arguments: [ obj(tx, args.vaults), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.vaultGroupId, `u16`), pure(tx, args.vaultIdsAdd, `vector<u16>`), pure(tx, args.vaultIdsRemove, `vector<u16>`) ], }) }

export interface ExecuteConfigEditVaultProfileArgs { vaults: TransactionObjectInput; profileName: string | TransactionArgument; vaultProfile: TransactionObjectInput }

export function executeConfigEditVaultProfile( tx: Transaction, args: ExecuteConfigEditVaultProfileArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_edit_vault_profile`, arguments: [ obj(tx, args.vaults), pure(tx, args.profileName, `${String.$typeName}`), obj(tx, args.vaultProfile) ], }) }

export interface ExecuteConfigShareUserSharesUserArgs { vaults: TransactionObjectInput; workspaceId: string | TransactionArgument; userPublicKey: Array<number | TransactionArgument> | TransactionArgument; vaultsEncryptedUserSharesMap: TransactionObjectInput }

export function executeConfigShareUserSharesUser( tx: Transaction, args: ExecuteConfigShareUserSharesUserArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_share_user_shares_user`, arguments: [ obj(tx, args.vaults), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userPublicKey, `vector<u8>`), obj(tx, args.vaultsEncryptedUserSharesMap) ], }) }

export interface ExecuteConfigVaultCreateGroupArgs { vaults: TransactionObjectInput; name: string | TransactionArgument; vaultIds: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigVaultCreateGroup( tx: Transaction, args: ExecuteConfigVaultCreateGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_vault_create_group`, arguments: [ obj(tx, args.vaults), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.vaultIds, `vector<u16>`) ], }) }

export interface ExecuteConfigVaultDeleteGroupArgs { vaults: TransactionObjectInput; vaultGroupId: number | TransactionArgument }

export function executeConfigVaultDeleteGroup( tx: Transaction, args: ExecuteConfigVaultDeleteGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_vault_delete_group`, arguments: [ obj(tx, args.vaults), pure(tx, args.vaultGroupId, `u16`) ], }) }

export interface ExecuteConfigVaultEditArgs { vaults: TransactionObjectInput; vaultId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); vaultGroupIdNewOpt: (number | TransactionArgument | TransactionArgument | null); vaultProfileIdNewOpt: (string | TransactionArgument | TransactionArgument | null) }

export function executeConfigVaultEdit( tx: Transaction, args: ExecuteConfigVaultEditArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::execute_config_vault_edit`, arguments: [ obj(tx, args.vaults), pure(tx, args.vaultId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.vaultGroupIdNewOpt, `${Option.$typeName}<u16>`), pure(tx, args.vaultProfileIdNewOpt, `${Option.$typeName}<${String.$typeName}>`) ], }) }

export function getNumberVaults( tx: Transaction, vaults: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_number_vaults`, arguments: [ obj(tx, vaults) ], }) }

export interface GetTxAssembleModuleIdsArgs { vaults: TransactionObjectInput; profile: string | TransactionArgument }

export function getTxAssembleModuleIds( tx: Transaction, args: GetTxAssembleModuleIdsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_tx_assemble_module_ids`, arguments: [ obj(tx, args.vaults), pure(tx, args.profile, `${String.$typeName}`) ], }) }

export interface GetVaultIdByAddressArgs { vaults: TransactionObjectInput; addressChain: TransactionObjectInput }

export function getVaultIdByAddress( tx: Transaction, args: GetVaultIdByAddressArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_vault_id_by_address`, arguments: [ obj(tx, args.vaults), obj(tx, args.addressChain) ], }) }

export function getVaultIds( tx: Transaction, vaults: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_vault_ids`, arguments: [ obj(tx, vaults) ], }) }

export function initVaults( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::init_vaults`, arguments: [ ], }) }

export interface IsTxAuthorizedVaultArgs { vaults: TransactionObjectInput; txVaultId: number | TransactionArgument; txNetworkId: string | TransactionArgument; txEffectsModuleId: string | TransactionArgument; txAssembleModuleId: string | TransactionArgument }

export function isTxAuthorizedVault( tx: Transaction, args: IsTxAuthorizedVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::is_tx_authorized_vault`, arguments: [ obj(tx, args.vaults), pure(tx, args.txVaultId, `u16`), pure(tx, args.txNetworkId, `${String.$typeName}`), pure(tx, args.txEffectsModuleId, `${ID.$typeName}`), pure(tx, args.txAssembleModuleId, `${ID.$typeName}`) ], }) }

export interface IsValidVaultProfileArgs { vaults: TransactionObjectInput; profileName: string | TransactionArgument }

export function isValidVaultProfile( tx: Transaction, args: IsValidVaultProfileArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::is_valid_vault_profile`, arguments: [ obj(tx, args.vaults), pure(tx, args.profileName, `${String.$typeName}`) ], }) }

export interface RemoveVaultFromGroupInternalArgs { vaults: TransactionObjectInput; vaultId: number | TransactionArgument; newVaultGroupId: number | TransactionArgument }

export function removeVaultFromGroupInternal( tx: Transaction, args: RemoveVaultFromGroupInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::remove_vault_from_group_internal`, arguments: [ obj(tx, args.vaults), pure(tx, args.vaultId, `u16`), pure(tx, args.newVaultGroupId, `u16`) ], }) }

export interface ShareUserShareInternalArgs { workspaceId: string | TransactionArgument; publicKey: Array<number | TransactionArgument> | TransactionArgument; vaultId: number | TransactionArgument; encryptedUserShare: Array<number | TransactionArgument> | TransactionArgument }

export function shareUserShareInternal( tx: Transaction, args: ShareUserShareInternalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::share_user_share_internal`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.publicKey, `vector<u8>`), pure(tx, args.vaultId, `u16`), pure(tx, args.encryptedUserShare, `vector<u8>`) ], }) }

export function viewVaultGroupId( tx: Transaction, vault: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::view_vault_group_id`, arguments: [ obj(tx, vault) ], }) }
