import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure, vector} from "../../_framework/util";
import {ConfigTxExecutionInput, ConfigTxType} from "../transaction/structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ApproveProposalArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput }

export function approveProposal( tx: Transaction, args: ApproveProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::approve_proposal`, arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap) ], }) }

export interface RejectProposalArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput }

export function rejectProposal( tx: Transaction, args: RejectProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::reject_proposal`, arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap) ], }) }

export interface CancelTransactionArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput }

export function cancelTransaction( tx: Transaction, typeArg: string, args: CancelTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::cancel_transaction`, typeArguments: [typeArg], arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap) ], }) }

export interface AddInitCapArgs { workspace: TransactionObjectInput; userCap: TransactionObjectInput }

export function addInitCap( tx: Transaction, args: AddInitCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::add_init_cap`, arguments: [ obj(tx, args.workspace), obj(tx, args.userCap) ], }) }

export function createExecutorCap( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::create_executor_cap`, arguments: [ ], }) }

export interface ExecuteConfigTxArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput; initConfigActionsInputs: Array<TransactionObjectInput> | TransactionArgument }

export function executeConfigTx( tx: Transaction, args: ExecuteConfigTxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::execute_config_tx`, arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap), vector(tx, `${ConfigTxExecutionInput.$typeName}`, args.initConfigActionsInputs) ], }) }

export interface ExecuteRecoverAccountArgs { workspace: TransactionObjectInput; recoveryCap: TransactionObjectInput; newMobileSignerAddress: string | TransactionArgument; encryptedUserShares: TransactionObjectInput; publicKey: Array<number | TransactionArgument> | TransactionArgument }

export function executeRecoverAccount( tx: Transaction, args: ExecuteRecoverAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::execute_recover_account`, arguments: [ obj(tx, args.workspace), obj(tx, args.recoveryCap), pure(tx, args.newMobileSignerAddress, `address`), obj(tx, args.encryptedUserShares), pure(tx, args.publicKey, `vector<u8>`) ], }) }

export interface FinalizeMpcTxArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput }

export function finalizeMpcTx( tx: Transaction, typeArg: string, args: FinalizeMpcTxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::finalize_mpc_tx`, typeArguments: [typeArg], arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap) ], }) }

export interface InitWorkspaceArgs { initialUserName: string | TransactionArgument; workspaceName: string | TransactionArgument; adminMobileSignerAddress: string | TransactionArgument; adminMobileSignerPublicKey: Array<number | TransactionArgument> | TransactionArgument; adminRegistrationAddress: Array<number | TransactionArgument> | TransactionArgument; initConfigActions: Array<TransactionObjectInput> | TransactionArgument; initConfigActionsInputs: Array<TransactionObjectInput> | TransactionArgument }

export function initWorkspace( tx: Transaction, args: InitWorkspaceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::init_workspace`, arguments: [ pure(tx, args.initialUserName, `${String.$typeName}`), pure(tx, args.workspaceName, `${String.$typeName}`), pure(tx, args.adminMobileSignerAddress, `address`), pure(tx, args.adminMobileSignerPublicKey, `vector<u8>`), pure(tx, args.adminRegistrationAddress, `vector<u8>`), vector(tx, `${ConfigTxType.$typeName}`, args.initConfigActions), vector(tx, `${ConfigTxExecutionInput.$typeName}`, args.initConfigActionsInputs) ], }) }

export interface ProcessModuleActionResultArgs { workspace: TransactionObjectInput; moduleResult: TransactionObjectInput }

export function processModuleActionResult( tx: Transaction, typeArgs: [string, string], args: ProcessModuleActionResultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::process_module_action_result`, typeArguments: typeArgs, arguments: [ obj(tx, args.workspace), obj(tx, args.moduleResult) ], }) }

export interface RequestConfigTransactionArgs { workspace: TransactionObjectInput; configTxns: Array<TransactionObjectInput> | TransactionArgument; userCap: TransactionObjectInput }

export function requestConfigTransaction( tx: Transaction, typeArg: string, args: RequestConfigTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::request_config_transaction`, typeArguments: [typeArg], arguments: [ obj(tx, args.workspace), vector(tx, `${ConfigTxType.$typeName}`, args.configTxns), obj(tx, args.userCap) ], }) }

export interface RequestMpcTransactionArgs { workspace: TransactionObjectInput; vaultId: number | TransactionArgument; effectsResult: TransactionObjectInput; userCap: TransactionObjectInput; memo: string | TransactionArgument }

export function requestMpcTransaction( tx: Transaction, typeArg: string, args: RequestMpcTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::request_mpc_transaction`, typeArguments: [typeArg], arguments: [ obj(tx, args.workspace), pure(tx, args.vaultId, `u16`), obj(tx, args.effectsResult), obj(tx, args.userCap), pure(tx, args.memo, `${String.$typeName}`) ], }) }

export interface RequestUpdateMpcTransactionArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput }

export function requestUpdateMpcTransaction( tx: Transaction, typeArg: string, args: RequestUpdateMpcTransactionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::request_update_mpc_transaction`, typeArguments: [typeArg], arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap) ], }) }

export interface RetrieveUserCapsArgs { workspace: TransactionObjectInput; holder: TransactionObjectInput; initCapHolderAddressOpt: (string | TransactionArgument | TransactionArgument | null); approveCapHolderAddressOpt: (string | TransactionArgument | TransactionArgument | null); approveCapHolderPublicKeyOpt: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null); signature: Array<number | TransactionArgument> | TransactionArgument }

export function retrieveUserCaps( tx: Transaction, args: RetrieveUserCapsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::retrieve_user_caps`, arguments: [ obj(tx, args.workspace), obj(tx, args.holder), pure(tx, args.initCapHolderAddressOpt, `${Option.$typeName}<address>`), pure(tx, args.approveCapHolderAddressOpt, `${Option.$typeName}<address>`), pure(tx, args.approveCapHolderPublicKeyOpt, `${Option.$typeName}<vector<u8>>`), pure(tx, args.signature, `vector<u8>`) ], }) }

export interface SignMpcTxArgs { workspace: TransactionObjectInput; txId: bigint | TransactionArgument; userCap: TransactionObjectInput }

export function signMpcTx( tx: Transaction, typeArg: string, args: SignMpcTxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::workspace::sign_mpc_tx`, typeArguments: [typeArg], arguments: [ obj(tx, args.workspace), pure(tx, args.txId, `u64`), obj(tx, args.userCap) ], }) }
