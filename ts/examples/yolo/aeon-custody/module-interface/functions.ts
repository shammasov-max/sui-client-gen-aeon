import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure, vector} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {BalanceChange} from "./structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddTransactionArgs { container: TransactionObjectInput; txId: bigint | TransactionArgument; transaction: GenericArg; req: TransactionObjectInput; moduleCap: TransactionObjectInput }

export function addTransaction( tx: Transaction, typeArgs: [string, string, string], args: AddTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::add_transaction`, typeArguments: typeArgs, arguments: [ obj(tx, args.container), pure(tx, args.txId, `u64`), generic(tx, `${typeArgs[1]}`, args.transaction), obj(tx, args.req), obj(tx, args.moduleCap) ], }) }

export function consumeModuleActionResult( tx: Transaction, typeArg: string, res: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::consume_module_action_result`, typeArguments: [typeArg], arguments: [ obj(tx, res) ], }) }

export function consumeTxEffectResult( tx: Transaction, typeArg: string, res: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::consume_tx_effect_result`, typeArguments: [typeArg], arguments: [ obj(tx, res) ], }) }

export interface CreateBalanceChangeArgs { tokenAddress: Array<number | TransactionArgument> | TransactionArgument; counterparty: Array<number | TransactionArgument> | TransactionArgument; network: string | TransactionArgument; amount: bigint | TransactionArgument; amountDollar: bigint | TransactionArgument }

export function createBalanceChange( tx: Transaction, args: CreateBalanceChangeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_balance_change`, arguments: [ pure(tx, args.tokenAddress, `vector<u8>`), pure(tx, args.counterparty, `vector<u8>`), pure(tx, args.network, `${String.$typeName}`), pure(tx, args.amount, `u256`), pure(tx, args.amountDollar, `u256`) ], }) }

export interface CreateInitModuleContainerRequestArgs { workspaceId: string | TransactionArgument; moduleId: string | TransactionArgument }

export function createInitModuleContainerRequest( tx: Transaction, typeArg: string, args: CreateInitModuleContainerRequestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_init_module_container_request`, typeArguments: [typeArg], arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.moduleId, `${ID.$typeName}`) ], }) }

export interface CreateInitVaultContainerRequestArgs { workspaceId: string | TransactionArgument; vaultId: number | TransactionArgument; requiredModuleIds: Array<string | TransactionArgument> | TransactionArgument }

export function createInitVaultContainerRequest( tx: Transaction, args: CreateInitVaultContainerRequestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_init_vault_container_request`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.vaultId, `u16`), pure(tx, args.requiredModuleIds, `vector<${ID.$typeName}>`) ], }) }

export interface CreateModuleActionRequestArgs { workspaceId: string | TransactionArgument; vaultId: number | TransactionArgument; moduleId: string | TransactionArgument; txId: bigint | TransactionArgument; networkId: string | TransactionArgument; action: GenericArg }

export function createModuleActionRequest( tx: Transaction, typeArg: string, args: CreateModuleActionRequestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_module_action_request`, typeArguments: [typeArg], arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.vaultId, `u16`), pure(tx, args.moduleId, `${ID.$typeName}`), pure(tx, args.txId, `u64`), pure(tx, args.networkId, `${String.$typeName}`), generic(tx, `${typeArg}`, args.action) ], }) }

export interface CreateModuleActionResultArgs { req: TransactionObjectInput; moduleEvent: GenericArg; moduleCap: TransactionObjectInput; txSignable: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument }

export function createModuleActionResult( tx: Transaction, typeArgs: [string, string], args: CreateModuleActionResultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_module_action_result`, typeArguments: typeArgs, arguments: [ obj(tx, args.req), generic(tx, `${typeArgs[1]}`, args.moduleEvent), obj(tx, args.moduleCap), pure(tx, args.txSignable, `vector<vector<u8>>`) ], }) }

export function createModuleCap( tx: Transaction, capHolderId: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_module_cap`, arguments: [ pure(tx, capHolderId, `${ID.$typeName}`) ], }) }

export interface CreateTxEffectsArgs { moduleCap: TransactionObjectInput; txAssembleModuleId: string | TransactionArgument; network: string | TransactionArgument; interactionAddressOpt: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null); balanceChanges: Array<TransactionObjectInput> | TransactionArgument; action: GenericArg }

export function createTxEffects( tx: Transaction, typeArg: string, args: CreateTxEffectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::create_tx_effects`, typeArguments: [typeArg], arguments: [ obj(tx, args.moduleCap), pure(tx, args.txAssembleModuleId, `${ID.$typeName}`), pure(tx, args.network, `${String.$typeName}`), pure(tx, args.interactionAddressOpt, `${Option.$typeName}<vector<u8>>`), vector(tx, `${BalanceChange.$typeName}`, args.balanceChanges), generic(tx, `${typeArg}`, args.action) ], }) }

export function getIdModuleCap( tx: Transaction, moduleCap: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::get_id_module_cap`, arguments: [ obj(tx, moduleCap) ], }) }

export interface GetStateBorrowMutArgs { container: TransactionObjectInput; req: TransactionObjectInput; moduleCap: TransactionObjectInput }

export function getStateBorrowMut( tx: Transaction, typeArgs: [string, string, string], args: GetStateBorrowMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::get_state_borrow_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.container), obj(tx, args.req), obj(tx, args.moduleCap) ], }) }

export interface GetTransactionBorrowMutArgs { container: TransactionObjectInput; txId: bigint | TransactionArgument; req: TransactionObjectInput; moduleCap: TransactionObjectInput }

export function getTransactionBorrowMut( tx: Transaction, typeArgs: [string, string, string], args: GetTransactionBorrowMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::get_transaction_borrow_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.container), pure(tx, args.txId, `u64`), obj(tx, args.req), obj(tx, args.moduleCap) ], }) }

export interface InitModuleContainerArgs { req: TransactionObjectInput; container: TransactionObjectInput; moduleCap: TransactionObjectInput; chainState: GenericArg }

export function initModuleContainer( tx: Transaction, typeArgs: [string, string], args: InitModuleContainerArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::init_module_container`, typeArguments: typeArgs, arguments: [ obj(tx, args.req), obj(tx, args.container), obj(tx, args.moduleCap), generic(tx, `${typeArgs[0]}`, args.chainState) ], }) }

export function initVaultContainer( tx: Transaction, req: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::init_vault_container`, arguments: [ obj(tx, req) ], }) }

export function parseRecipients( tx: Transaction, balanceChanges: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::parse_recipients`, arguments: [ vector(tx, `${BalanceChange.$typeName}`, balanceChanges) ], }) }

export interface ShareContainerArgs { container: TransactionObjectInput; shareRequired: TransactionObjectInput }

export function shareContainer( tx: Transaction, args: ShareContainerArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::share_container`, arguments: [ obj(tx, args.container), obj(tx, args.shareRequired) ], }) }

export function viewBalanceChange( tx: Transaction, change: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::view_balance_change`, arguments: [ obj(tx, change) ], }) }

export function viewInitModuleVaultRequest( tx: Transaction, typeArg: string, req: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::view_init_module_vault_request`, typeArguments: [typeArg], arguments: [ obj(tx, req) ], }) }

export function viewModuleActionRequest( tx: Transaction, typeArg: string, req: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::view_module_action_request`, typeArguments: [typeArg], arguments: [ obj(tx, req) ], }) }

export function viewModuleCapId( tx: Transaction, cap: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::view_module_cap_id`, arguments: [ obj(tx, cap) ], }) }

export function viewTxEffects( tx: Transaction, typeArg: string, effects: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::module_interface::view_tx_effects`, typeArguments: [typeArg], arguments: [ obj(tx, effects) ], }) }
