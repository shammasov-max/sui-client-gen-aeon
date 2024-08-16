import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {ID, UID} from "../../sui/object/structs";
import {VecMap} from "../../sui/vec-map/structs";
import {PKG_V1} from "../index";
import {BcsType, bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== InitTaskRequest =============================== */

export function isInitTaskRequest(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::tasks::InitTaskRequest`; }

export interface InitTaskRequestFields { workspaceId: ToField<ID>; taskId: ToField<"u16"> }

export type InitTaskRequestReified = Reified< InitTaskRequest, InitTaskRequestFields >;

export class InitTaskRequest implements StructClass { static readonly $typeName = `${PKG_V1}::tasks::InitTaskRequest`; static readonly $numTypeParams = 0;

 readonly $typeName = InitTaskRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::tasks::InitTaskRequest`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly taskId: ToField<"u16">

 private constructor(typeArgs: [], fields: InitTaskRequestFields, ) { this.$fullTypeName = composeSuiType( InitTaskRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::tasks::InitTaskRequest`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.taskId = fields.taskId; }

 static reified( ): InitTaskRequestReified { return { typeName: InitTaskRequest.$typeName, fullTypeName: composeSuiType( InitTaskRequest.$typeName, ...[] ) as `${typeof PKG_V1}::tasks::InitTaskRequest`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => InitTaskRequest.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => InitTaskRequest.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => InitTaskRequest.fromBcs( data, ), bcs: InitTaskRequest.bcs, fromJSONField: (field: any) => InitTaskRequest.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => InitTaskRequest.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => InitTaskRequest.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => InitTaskRequest.fetch( client, id, ), new: ( fields: InitTaskRequestFields, ) => { return new InitTaskRequest( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return InitTaskRequest.reified() }

 static phantom( ): PhantomReified<ToTypeStr<InitTaskRequest>> { return phantom(InitTaskRequest.reified( )); } static get p() { return InitTaskRequest.phantom() }

 static get bcs() { return bcs.struct("InitTaskRequest", {

 workspace_id: ID.bcs, task_id: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): InitTaskRequest { return InitTaskRequest.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), taskId: decodeFromFields("u16", fields.task_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): InitTaskRequest { if (!isInitTaskRequest(item.type)) { throw new Error("not a InitTaskRequest type");

 }

 return InitTaskRequest.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), taskId: decodeFromFieldsWithTypes("u16", item.fields.task_id) } ) }

 static fromBcs( data: Uint8Array ): InitTaskRequest { return InitTaskRequest.fromFields( InitTaskRequest.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,taskId: this.taskId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): InitTaskRequest { return InitTaskRequest.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), taskId: decodeFromJSONField("u16", field.taskId) } ) }

 static fromJSON( json: Record<string, any> ): InitTaskRequest { if (json.$typeName !== InitTaskRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return InitTaskRequest.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): InitTaskRequest { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isInitTaskRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a InitTaskRequest object`); } return InitTaskRequest.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<InitTaskRequest> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching InitTaskRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isInitTaskRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a InitTaskRequest object`); }

 return InitTaskRequest.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Task =============================== */

export function isTask(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::tasks::Task`; }

export interface TaskFields { authorisingUser: ToField<"u16">; authorisedExecutorId: ToField<ID>; taskModuleId: ToField<ID>; taskId: ToField<"u16"> }

export type TaskReified = Reified< Task, TaskFields >;

export class Task implements StructClass { static readonly $typeName = `${PKG_V1}::tasks::Task`; static readonly $numTypeParams = 0;

 readonly $typeName = Task.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::tasks::Task`;

 readonly $typeArgs: [];

 readonly authorisingUser: ToField<"u16">; readonly authorisedExecutorId: ToField<ID>; readonly taskModuleId: ToField<ID>; readonly taskId: ToField<"u16">

 private constructor(typeArgs: [], fields: TaskFields, ) { this.$fullTypeName = composeSuiType( Task.$typeName, ...typeArgs ) as `${typeof PKG_V1}::tasks::Task`; this.$typeArgs = typeArgs;

 this.authorisingUser = fields.authorisingUser;; this.authorisedExecutorId = fields.authorisedExecutorId;; this.taskModuleId = fields.taskModuleId;; this.taskId = fields.taskId; }

 static reified( ): TaskReified { return { typeName: Task.$typeName, fullTypeName: composeSuiType( Task.$typeName, ...[] ) as `${typeof PKG_V1}::tasks::Task`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Task.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Task.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Task.fromBcs( data, ), bcs: Task.bcs, fromJSONField: (field: any) => Task.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Task.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Task.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Task.fetch( client, id, ), new: ( fields: TaskFields, ) => { return new Task( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Task.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Task>> { return phantom(Task.reified( )); } static get p() { return Task.phantom() }

 static get bcs() { return bcs.struct("Task", {

 authorising_user: bcs.u16(), authorised_executor_id: ID.bcs, task_module_id: ID.bcs, task_id: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): Task { return Task.reified( ).new( { authorisingUser: decodeFromFields("u16", fields.authorising_user), authorisedExecutorId: decodeFromFields(ID.reified(), fields.authorised_executor_id), taskModuleId: decodeFromFields(ID.reified(), fields.task_module_id), taskId: decodeFromFields("u16", fields.task_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Task { if (!isTask(item.type)) { throw new Error("not a Task type");

 }

 return Task.reified( ).new( { authorisingUser: decodeFromFieldsWithTypes("u16", item.fields.authorising_user), authorisedExecutorId: decodeFromFieldsWithTypes(ID.reified(), item.fields.authorised_executor_id), taskModuleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.task_module_id), taskId: decodeFromFieldsWithTypes("u16", item.fields.task_id) } ) }

 static fromBcs( data: Uint8Array ): Task { return Task.fromFields( Task.bcs.parse(data) ) }

 toJSONField() { return {

 authorisingUser: this.authorisingUser,authorisedExecutorId: this.authorisedExecutorId,taskModuleId: this.taskModuleId,taskId: this.taskId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Task { return Task.reified( ).new( { authorisingUser: decodeFromJSONField("u16", field.authorisingUser), authorisedExecutorId: decodeFromJSONField(ID.reified(), field.authorisedExecutorId), taskModuleId: decodeFromJSONField(ID.reified(), field.taskModuleId), taskId: decodeFromJSONField("u16", field.taskId) } ) }

 static fromJSON( json: Record<string, any> ): Task { if (json.$typeName !== Task.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Task.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Task { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTask(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Task object`); } return Task.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Task> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Task object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTask(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Task object`); }

 return Task.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== TaskCreatedEvent =============================== */

export function isTaskCreatedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::tasks::TaskCreatedEvent`; }

export interface TaskCreatedEventFields { workspaceId: ToField<ID>; taskId: ToField<"u16">; taskModuleId: ToField<ID>; authorisedExecutorId: ToField<ID>; authorisingUser: ToField<"u16"> }

export type TaskCreatedEventReified = Reified< TaskCreatedEvent, TaskCreatedEventFields >;

export class TaskCreatedEvent implements StructClass { static readonly $typeName = `${PKG_V1}::tasks::TaskCreatedEvent`; static readonly $numTypeParams = 0;

 readonly $typeName = TaskCreatedEvent.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::tasks::TaskCreatedEvent`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly taskId: ToField<"u16">; readonly taskModuleId: ToField<ID>; readonly authorisedExecutorId: ToField<ID>; readonly authorisingUser: ToField<"u16">

 private constructor(typeArgs: [], fields: TaskCreatedEventFields, ) { this.$fullTypeName = composeSuiType( TaskCreatedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::tasks::TaskCreatedEvent`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.taskId = fields.taskId;; this.taskModuleId = fields.taskModuleId;; this.authorisedExecutorId = fields.authorisedExecutorId;; this.authorisingUser = fields.authorisingUser; }

 static reified( ): TaskCreatedEventReified { return { typeName: TaskCreatedEvent.$typeName, fullTypeName: composeSuiType( TaskCreatedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::tasks::TaskCreatedEvent`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TaskCreatedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TaskCreatedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TaskCreatedEvent.fromBcs( data, ), bcs: TaskCreatedEvent.bcs, fromJSONField: (field: any) => TaskCreatedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TaskCreatedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TaskCreatedEvent.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => TaskCreatedEvent.fetch( client, id, ), new: ( fields: TaskCreatedEventFields, ) => { return new TaskCreatedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TaskCreatedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TaskCreatedEvent>> { return phantom(TaskCreatedEvent.reified( )); } static get p() { return TaskCreatedEvent.phantom() }

 static get bcs() { return bcs.struct("TaskCreatedEvent", {

 workspace_id: ID.bcs, task_id: bcs.u16(), task_module_id: ID.bcs, authorised_executor_id: ID.bcs, authorising_user: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): TaskCreatedEvent { return TaskCreatedEvent.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), taskId: decodeFromFields("u16", fields.task_id), taskModuleId: decodeFromFields(ID.reified(), fields.task_module_id), authorisedExecutorId: decodeFromFields(ID.reified(), fields.authorised_executor_id), authorisingUser: decodeFromFields("u16", fields.authorising_user) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TaskCreatedEvent { if (!isTaskCreatedEvent(item.type)) { throw new Error("not a TaskCreatedEvent type");

 }

 return TaskCreatedEvent.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), taskId: decodeFromFieldsWithTypes("u16", item.fields.task_id), taskModuleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.task_module_id), authorisedExecutorId: decodeFromFieldsWithTypes(ID.reified(), item.fields.authorised_executor_id), authorisingUser: decodeFromFieldsWithTypes("u16", item.fields.authorising_user) } ) }

 static fromBcs( data: Uint8Array ): TaskCreatedEvent { return TaskCreatedEvent.fromFields( TaskCreatedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,taskId: this.taskId,taskModuleId: this.taskModuleId,authorisedExecutorId: this.authorisedExecutorId,authorisingUser: this.authorisingUser,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TaskCreatedEvent { return TaskCreatedEvent.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), taskId: decodeFromJSONField("u16", field.taskId), taskModuleId: decodeFromJSONField(ID.reified(), field.taskModuleId), authorisedExecutorId: decodeFromJSONField(ID.reified(), field.authorisedExecutorId), authorisingUser: decodeFromJSONField("u16", field.authorisingUser) } ) }

 static fromJSON( json: Record<string, any> ): TaskCreatedEvent { if (json.$typeName !== TaskCreatedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TaskCreatedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TaskCreatedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTaskCreatedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TaskCreatedEvent object`); } return TaskCreatedEvent.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<TaskCreatedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TaskCreatedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTaskCreatedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TaskCreatedEvent object`); }

 return TaskCreatedEvent.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== TaskState =============================== */

export function isTaskState(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::tasks::TaskState` + '<'); }

export interface TaskStateFields<T extends TypeArgument> { id: ToField<UID>; workspaceId: ToField<ID>; taskId: ToField<"u16">; moduleId: ToField<ID>; state: ToField<T> }

export type TaskStateReified<T extends TypeArgument> = Reified< TaskState<T>, TaskStateFields<T> >;

export class TaskState<T extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::tasks::TaskState`; static readonly $numTypeParams = 1;

 readonly $typeName = TaskState.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::tasks::TaskState<${ToTypeStr<T>}>`;

 readonly $typeArgs: [ToTypeStr<T>];

 readonly id: ToField<UID>; readonly workspaceId: ToField<ID>; readonly taskId: ToField<"u16">; readonly moduleId: ToField<ID>; readonly state: ToField<T>

 private constructor(typeArgs: [ToTypeStr<T>], fields: TaskStateFields<T>, ) { this.$fullTypeName = composeSuiType( TaskState.$typeName, ...typeArgs ) as `${typeof PKG_V1}::tasks::TaskState<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.workspaceId = fields.workspaceId;; this.taskId = fields.taskId;; this.moduleId = fields.moduleId;; this.state = fields.state; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): TaskStateReified<ToTypeArgument<T>> { return { typeName: TaskState.$typeName, fullTypeName: composeSuiType( TaskState.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::tasks::TaskState<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => TaskState.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TaskState.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => TaskState.fromBcs( T, data, ), bcs: TaskState.bcs(toBcs(T)), fromJSONField: (field: any) => TaskState.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => TaskState.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => TaskState.fromSuiParsedData( T, content, ), fetch: async (client: SuiClient, id: string) => TaskState.fetch( client, T, id, ), new: ( fields: TaskStateFields<ToTypeArgument<T>>, ) => { return new TaskState( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return TaskState.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<TaskState<ToTypeArgument<T>>>> { return phantom(TaskState.reified( T )); } static get p() { return TaskState.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`TaskState<${T.name}>`, {

 id: UID.bcs, workspace_id: ID.bcs, task_id: bcs.u16(), module_id: ID.bcs, state: T

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): TaskState<ToTypeArgument<T>> { return TaskState.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), taskId: decodeFromFields("u16", fields.task_id), moduleId: decodeFromFields(ID.reified(), fields.module_id), state: decodeFromFields(typeArg, fields.state) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): TaskState<ToTypeArgument<T>> { if (!isTaskState(item.type)) { throw new Error("not a TaskState type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return TaskState.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), taskId: decodeFromFieldsWithTypes("u16", item.fields.task_id), moduleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.module_id), state: decodeFromFieldsWithTypes(typeArg, item.fields.state) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): TaskState<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return TaskState.fromFields( typeArg, TaskState.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,workspaceId: this.workspaceId,taskId: this.taskId,moduleId: this.moduleId,state: fieldToJSON<T>(this.$typeArgs[0], this.state),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): TaskState<ToTypeArgument<T>> { return TaskState.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), taskId: decodeFromJSONField("u16", field.taskId), moduleId: decodeFromJSONField(ID.reified(), field.moduleId), state: decodeFromJSONField(typeArg, field.state) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): TaskState<ToTypeArgument<T>> { if (json.$typeName !== TaskState.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(TaskState.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return TaskState.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): TaskState<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTaskState(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TaskState object`); } return TaskState.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<TaskState<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TaskState object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTaskState(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TaskState object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return TaskState.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Tasks =============================== */

export function isTasks(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::tasks::Tasks`; }

export interface TasksFields { tasks: ToField<VecMap<"u16", Task>>; idCounter: ToField<"u16"> }

export type TasksReified = Reified< Tasks, TasksFields >;

export class Tasks implements StructClass { static readonly $typeName = `${PKG_V1}::tasks::Tasks`; static readonly $numTypeParams = 0;

 readonly $typeName = Tasks.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::tasks::Tasks`;

 readonly $typeArgs: [];

 readonly tasks: ToField<VecMap<"u16", Task>>; readonly idCounter: ToField<"u16">

 private constructor(typeArgs: [], fields: TasksFields, ) { this.$fullTypeName = composeSuiType( Tasks.$typeName, ...typeArgs ) as `${typeof PKG_V1}::tasks::Tasks`; this.$typeArgs = typeArgs;

 this.tasks = fields.tasks;; this.idCounter = fields.idCounter; }

 static reified( ): TasksReified { return { typeName: Tasks.$typeName, fullTypeName: composeSuiType( Tasks.$typeName, ...[] ) as `${typeof PKG_V1}::tasks::Tasks`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Tasks.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Tasks.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Tasks.fromBcs( data, ), bcs: Tasks.bcs, fromJSONField: (field: any) => Tasks.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Tasks.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Tasks.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Tasks.fetch( client, id, ), new: ( fields: TasksFields, ) => { return new Tasks( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Tasks.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Tasks>> { return phantom(Tasks.reified( )); } static get p() { return Tasks.phantom() }

 static get bcs() { return bcs.struct("Tasks", {

 tasks: VecMap.bcs(bcs.u16(), Task.bcs), id_counter: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): Tasks { return Tasks.reified( ).new( { tasks: decodeFromFields(VecMap.reified("u16", Task.reified()), fields.tasks), idCounter: decodeFromFields("u16", fields.id_counter) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Tasks { if (!isTasks(item.type)) { throw new Error("not a Tasks type");

 }

 return Tasks.reified( ).new( { tasks: decodeFromFieldsWithTypes(VecMap.reified("u16", Task.reified()), item.fields.tasks), idCounter: decodeFromFieldsWithTypes("u16", item.fields.id_counter) } ) }

 static fromBcs( data: Uint8Array ): Tasks { return Tasks.fromFields( Tasks.bcs.parse(data) ) }

 toJSONField() { return {

 tasks: this.tasks.toJSONField(),idCounter: this.idCounter,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Tasks { return Tasks.reified( ).new( { tasks: decodeFromJSONField(VecMap.reified("u16", Task.reified()), field.tasks), idCounter: decodeFromJSONField("u16", field.idCounter) } ) }

 static fromJSON( json: Record<string, any> ): Tasks { if (json.$typeName !== Tasks.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Tasks.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Tasks { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTasks(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Tasks object`); } return Tasks.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Tasks> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Tasks object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTasks(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Tasks object`); }

 return Tasks.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
