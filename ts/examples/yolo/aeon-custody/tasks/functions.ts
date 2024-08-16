import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface CreateTaskStateArgs { initTaskRequest: TransactionObjectInput; cap: TransactionObjectInput; state: GenericArg }

export function createTaskState( tx: Transaction, typeArg: string, args: CreateTaskStateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::tasks::create_task_state`, typeArguments: [typeArg], arguments: [ obj(tx, args.initTaskRequest), obj(tx, args.cap), generic(tx, `${typeArg}`, args.state) ], }) }

export interface ExecuteConfigTaskApproveArgs { tasks: TransactionObjectInput; authorisingUser: number | TransactionArgument; workspaceId: string | TransactionArgument; taskModuleId: string | TransactionArgument; authorisedExecutorId: string | TransactionArgument }

export function executeConfigTaskApprove( tx: Transaction, args: ExecuteConfigTaskApproveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::tasks::execute_config_task_approve`, arguments: [ obj(tx, args.tasks), pure(tx, args.authorisingUser, `u16`), pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.taskModuleId, `${ID.$typeName}`), pure(tx, args.authorisedExecutorId, `${ID.$typeName}`) ], }) }

export interface GetTaskStateBorrowMutArgs { taskState: TransactionObjectInput; cap: TransactionObjectInput }

export function getTaskStateBorrowMut( tx: Transaction, typeArg: string, args: GetTaskStateBorrowMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::tasks::get_task_state_borrow_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.taskState), obj(tx, args.cap) ], }) }

export function initTasks( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::tasks::init_tasks`, arguments: [ ], }) }

export interface ViewTaskArgs { tasks: TransactionObjectInput; taskId: number | TransactionArgument }

export function viewTask( tx: Transaction, args: ViewTaskArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::tasks::view_task`, arguments: [ obj(tx, args.tasks), pure(tx, args.taskId, `u16`) ], }) }
