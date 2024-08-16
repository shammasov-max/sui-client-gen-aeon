import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ExecuteConfigAddActionModuleArgs { settings: TransactionObjectInput; actionModule: string | TransactionArgument }

export function executeConfigAddActionModule( tx: Transaction, args: ExecuteConfigAddActionModuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::execute_config_add_action_module`, arguments: [ obj(tx, args.settings), pure(tx, args.actionModule, `${ID.$typeName}`) ], }) }

export interface ExecuteConfigCreateActionGroupArgs { settings: TransactionObjectInput; name: string | TransactionArgument; ids: Array<string | TransactionArgument> | TransactionArgument }

export function executeConfigCreateActionGroup( tx: Transaction, args: ExecuteConfigCreateActionGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::execute_config_create_action_group`, arguments: [ obj(tx, args.settings), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.ids, `vector<${ID.$typeName}>`) ], }) }

export interface ExecuteConfigDeleteActionGroupArgs { settings: TransactionObjectInput; groupId: number | TransactionArgument }

export function executeConfigDeleteActionGroup( tx: Transaction, args: ExecuteConfigDeleteActionGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::execute_config_delete_action_group`, arguments: [ obj(tx, args.settings), pure(tx, args.groupId, `u16`) ], }) }

export interface ExecuteConfigEditActionGroupArgs { settings: TransactionObjectInput; groupId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); idsAdd: Array<string | TransactionArgument> | TransactionArgument; idsDelete: Array<string | TransactionArgument> | TransactionArgument }

export function executeConfigEditActionGroup( tx: Transaction, args: ExecuteConfigEditActionGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::execute_config_edit_action_group`, arguments: [ obj(tx, args.settings), pure(tx, args.groupId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.idsAdd, `vector<${ID.$typeName}>`), pure(tx, args.idsDelete, `vector<${ID.$typeName}>`) ], }) }

export interface ExecuteConfigEditWorkspaceNameArgs { workspaceSettings: TransactionObjectInput; name: string | TransactionArgument }

export function executeConfigEditWorkspaceName( tx: Transaction, args: ExecuteConfigEditWorkspaceNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::execute_config_edit_workspace_name`, arguments: [ obj(tx, args.workspaceSettings), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface ExecuteConfigRemoveActionModuleArgs { settings: TransactionObjectInput; actionModule: string | TransactionArgument }

export function executeConfigRemoveActionModule( tx: Transaction, args: ExecuteConfigRemoveActionModuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::execute_config_remove_action_module`, arguments: [ obj(tx, args.settings), pure(tx, args.actionModule, `${ID.$typeName}`) ], }) }

export interface GetGroupIdsByActionIdArgs { settings: TransactionObjectInput; actionId: string | TransactionArgument }

export function getGroupIdsByActionId( tx: Transaction, args: GetGroupIdsByActionIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::get_group_ids_by_action_id`, arguments: [ obj(tx, args.settings), pure(tx, args.actionId, `${ID.$typeName}`) ], }) }

export function initWorkspaceSettings( tx: Transaction, name: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::settings::init_workspace_settings`, arguments: [ pure(tx, name, `${String.$typeName}`) ], }) }
