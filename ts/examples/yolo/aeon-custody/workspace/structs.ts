import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, Vector, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {ID, UID} from "../../sui/object/structs";
import {AddressBook} from "../address-book/structs";
import {PKG_V1} from "../index";
import {TxEffects} from "../module-interface/structs";
import {Policy} from "../policy/structs";
import {WorkspaceSettings} from "../settings/structs";
import {ConfigTxType, MpcTxStatus, Transactions} from "../transaction/structs";
import {Users} from "../user/structs";
import {Vaults} from "../vault/structs";
import {BcsType, bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== ConfigTransactionRequested =============================== */

export function isConfigTransactionRequested(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::workspace::ConfigTransactionRequested` + '<'); }

export interface ConfigTransactionRequestedFields<A extends TypeArgument> { workspaceId: ToField<ID>; txId: ToField<"u64">; txTypes: ToField<Vector<ConfigTxType>>; initiator: ToField<"u16">; requireApprovalUsers: ToField<Vector<"u16">> }

export type ConfigTransactionRequestedReified<A extends TypeArgument> = Reified< ConfigTransactionRequested<A>, ConfigTransactionRequestedFields<A> >;

export class ConfigTransactionRequested<A extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::ConfigTransactionRequested`; static readonly $numTypeParams = 1;

 readonly $typeName = ConfigTransactionRequested.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::ConfigTransactionRequested<${ToTypeStr<A>}>`;

 readonly $typeArgs: [ToTypeStr<A>];

 readonly workspaceId: ToField<ID>; readonly txId: ToField<"u64">; readonly txTypes: ToField<Vector<ConfigTxType>>; readonly initiator: ToField<"u16">; readonly requireApprovalUsers: ToField<Vector<"u16">>

 private constructor(typeArgs: [ToTypeStr<A>], fields: ConfigTransactionRequestedFields<A>, ) { this.$fullTypeName = composeSuiType( ConfigTransactionRequested.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::ConfigTransactionRequested<${ToTypeStr<A>}>`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.txId = fields.txId;; this.txTypes = fields.txTypes;; this.initiator = fields.initiator;; this.requireApprovalUsers = fields.requireApprovalUsers; }

 static reified<A extends Reified<TypeArgument, any>>( A: A ): ConfigTransactionRequestedReified<ToTypeArgument<A>> { return { typeName: ConfigTransactionRequested.$typeName, fullTypeName: composeSuiType( ConfigTransactionRequested.$typeName, ...[extractType(A)] ) as `${typeof PKG_V1}::workspace::ConfigTransactionRequested<${ToTypeStr<ToTypeArgument<A>>}>`, typeArgs: [ extractType(A) ] as [ToTypeStr<ToTypeArgument<A>>], reifiedTypeArgs: [A], fromFields: (fields: Record<string, any>) => ConfigTransactionRequested.fromFields( A, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigTransactionRequested.fromFieldsWithTypes( A, item, ), fromBcs: (data: Uint8Array) => ConfigTransactionRequested.fromBcs( A, data, ), bcs: ConfigTransactionRequested.bcs(toBcs(A)), fromJSONField: (field: any) => ConfigTransactionRequested.fromJSONField( A, field, ), fromJSON: (json: Record<string, any>) => ConfigTransactionRequested.fromJSON( A, json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigTransactionRequested.fromSuiParsedData( A, content, ), fetch: async (client: SuiClient, id: string) => ConfigTransactionRequested.fetch( client, A, id, ), new: ( fields: ConfigTransactionRequestedFields<ToTypeArgument<A>>, ) => { return new ConfigTransactionRequested( [extractType(A)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigTransactionRequested.reified }

 static phantom<A extends Reified<TypeArgument, any>>( A: A ): PhantomReified<ToTypeStr<ConfigTransactionRequested<ToTypeArgument<A>>>> { return phantom(ConfigTransactionRequested.reified( A )); } static get p() { return ConfigTransactionRequested.phantom }

 static get bcs() { return <A extends BcsType<any>>(A: A) => bcs.struct(`ConfigTransactionRequested<${A.name}>`, {

 workspace_id: ID.bcs, tx_id: bcs.u64(), tx_types: bcs.vector(ConfigTxType.bcs), initiator: bcs.u16(), require_approval_users: bcs.vector(bcs.u16())

}) };

 static fromFields<A extends Reified<TypeArgument, any>>( typeArg: A, fields: Record<string, any> ): ConfigTransactionRequested<ToTypeArgument<A>> { return ConfigTransactionRequested.reified( typeArg, ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), txId: decodeFromFields("u64", fields.tx_id), txTypes: decodeFromFields(reified.vector(ConfigTxType.reified()), fields.tx_types), initiator: decodeFromFields("u16", fields.initiator), requireApprovalUsers: decodeFromFields(reified.vector("u16"), fields.require_approval_users) } ) }

 static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>( typeArg: A, item: FieldsWithTypes ): ConfigTransactionRequested<ToTypeArgument<A>> { if (!isConfigTransactionRequested(item.type)) { throw new Error("not a ConfigTransactionRequested type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ConfigTransactionRequested.reified( typeArg, ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), txTypes: decodeFromFieldsWithTypes(reified.vector(ConfigTxType.reified()), item.fields.tx_types), initiator: decodeFromFieldsWithTypes("u16", item.fields.initiator), requireApprovalUsers: decodeFromFieldsWithTypes(reified.vector("u16"), item.fields.require_approval_users) } ) }

 static fromBcs<A extends Reified<TypeArgument, any>>( typeArg: A, data: Uint8Array ): ConfigTransactionRequested<ToTypeArgument<A>> { const typeArgs = [typeArg];

 return ConfigTransactionRequested.fromFields( typeArg, ConfigTransactionRequested.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,txId: this.txId.toString(),txTypes: fieldToJSON<Vector<ConfigTxType>>(`vector<${ConfigTxType.$typeName}>`, this.txTypes),initiator: this.initiator,requireApprovalUsers: fieldToJSON<Vector<"u16">>(`vector<u16>`, this.requireApprovalUsers),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<A extends Reified<TypeArgument, any>>( typeArg: A, field: any ): ConfigTransactionRequested<ToTypeArgument<A>> { return ConfigTransactionRequested.reified( typeArg, ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), txId: decodeFromJSONField("u64", field.txId), txTypes: decodeFromJSONField(reified.vector(ConfigTxType.reified()), field.txTypes), initiator: decodeFromJSONField("u16", field.initiator), requireApprovalUsers: decodeFromJSONField(reified.vector("u16"), field.requireApprovalUsers) } ) }

 static fromJSON<A extends Reified<TypeArgument, any>>( typeArg: A, json: Record<string, any> ): ConfigTransactionRequested<ToTypeArgument<A>> { if (json.$typeName !== ConfigTransactionRequested.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ConfigTransactionRequested.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ConfigTransactionRequested.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<A extends Reified<TypeArgument, any>>( typeArg: A, content: SuiParsedData ): ConfigTransactionRequested<ToTypeArgument<A>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigTransactionRequested(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigTransactionRequested object`); } return ConfigTransactionRequested.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<A extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: A, id: string ): Promise<ConfigTransactionRequested<ToTypeArgument<A>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigTransactionRequested object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigTransactionRequested(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigTransactionRequested object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ConfigTransactionRequested.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== DwalletSignatureRequest =============================== */

export function isDwalletSignatureRequest(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::workspace::DwalletSignatureRequest`; }

export interface DwalletSignatureRequestFields { workspaceId: ToField<ID>; vaultId: ToField<"u16">; txId: ToField<"u64">; txSignable: ToField<Vector<Vector<"u8">>> }

export type DwalletSignatureRequestReified = Reified< DwalletSignatureRequest, DwalletSignatureRequestFields >;

export class DwalletSignatureRequest implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::DwalletSignatureRequest`; static readonly $numTypeParams = 0;

 readonly $typeName = DwalletSignatureRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::DwalletSignatureRequest`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly txId: ToField<"u64">; readonly txSignable: ToField<Vector<Vector<"u8">>>

 private constructor(typeArgs: [], fields: DwalletSignatureRequestFields, ) { this.$fullTypeName = composeSuiType( DwalletSignatureRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::DwalletSignatureRequest`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.txId = fields.txId;; this.txSignable = fields.txSignable; }

 static reified( ): DwalletSignatureRequestReified { return { typeName: DwalletSignatureRequest.$typeName, fullTypeName: composeSuiType( DwalletSignatureRequest.$typeName, ...[] ) as `${typeof PKG_V1}::workspace::DwalletSignatureRequest`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DwalletSignatureRequest.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DwalletSignatureRequest.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DwalletSignatureRequest.fromBcs( data, ), bcs: DwalletSignatureRequest.bcs, fromJSONField: (field: any) => DwalletSignatureRequest.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DwalletSignatureRequest.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DwalletSignatureRequest.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => DwalletSignatureRequest.fetch( client, id, ), new: ( fields: DwalletSignatureRequestFields, ) => { return new DwalletSignatureRequest( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DwalletSignatureRequest.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DwalletSignatureRequest>> { return phantom(DwalletSignatureRequest.reified( )); } static get p() { return DwalletSignatureRequest.phantom() }

 static get bcs() { return bcs.struct("DwalletSignatureRequest", {

 workspace_id: ID.bcs, vault_id: bcs.u16(), tx_id: bcs.u64(), tx_signable: bcs.vector(bcs.vector(bcs.u8()))

}) };

 static fromFields( fields: Record<string, any> ): DwalletSignatureRequest { return DwalletSignatureRequest.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), txId: decodeFromFields("u64", fields.tx_id), txSignable: decodeFromFields(reified.vector(reified.vector("u8")), fields.tx_signable) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DwalletSignatureRequest { if (!isDwalletSignatureRequest(item.type)) { throw new Error("not a DwalletSignatureRequest type");

 }

 return DwalletSignatureRequest.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), txSignable: decodeFromFieldsWithTypes(reified.vector(reified.vector("u8")), item.fields.tx_signable) } ) }

 static fromBcs( data: Uint8Array ): DwalletSignatureRequest { return DwalletSignatureRequest.fromFields( DwalletSignatureRequest.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,txId: this.txId.toString(),txSignable: fieldToJSON<Vector<Vector<"u8">>>(`vector<vector<u8>>`, this.txSignable),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DwalletSignatureRequest { return DwalletSignatureRequest.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), txId: decodeFromJSONField("u64", field.txId), txSignable: decodeFromJSONField(reified.vector(reified.vector("u8")), field.txSignable) } ) }

 static fromJSON( json: Record<string, any> ): DwalletSignatureRequest { if (json.$typeName !== DwalletSignatureRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DwalletSignatureRequest.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DwalletSignatureRequest { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDwalletSignatureRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DwalletSignatureRequest object`); } return DwalletSignatureRequest.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<DwalletSignatureRequest> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DwalletSignatureRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDwalletSignatureRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DwalletSignatureRequest object`); }

 return DwalletSignatureRequest.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ExecutorCap =============================== */

export function isExecutorCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::workspace::ExecutorCap`; }

export interface ExecutorCapFields { id: ToField<UID> }

export type ExecutorCapReified = Reified< ExecutorCap, ExecutorCapFields >;

export class ExecutorCap implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::ExecutorCap`; static readonly $numTypeParams = 0;

 readonly $typeName = ExecutorCap.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::ExecutorCap`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>

 private constructor(typeArgs: [], fields: ExecutorCapFields, ) { this.$fullTypeName = composeSuiType( ExecutorCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::ExecutorCap`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): ExecutorCapReified { return { typeName: ExecutorCap.$typeName, fullTypeName: composeSuiType( ExecutorCap.$typeName, ...[] ) as `${typeof PKG_V1}::workspace::ExecutorCap`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ExecutorCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ExecutorCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ExecutorCap.fromBcs( data, ), bcs: ExecutorCap.bcs, fromJSONField: (field: any) => ExecutorCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ExecutorCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ExecutorCap.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ExecutorCap.fetch( client, id, ), new: ( fields: ExecutorCapFields, ) => { return new ExecutorCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ExecutorCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ExecutorCap>> { return phantom(ExecutorCap.reified( )); } static get p() { return ExecutorCap.phantom() }

 static get bcs() { return bcs.struct("ExecutorCap", {

 id: UID.bcs

}) };

 static fromFields( fields: Record<string, any> ): ExecutorCap { return ExecutorCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ExecutorCap { if (!isExecutorCap(item.type)) { throw new Error("not a ExecutorCap type");

 }

 return ExecutorCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs( data: Uint8Array ): ExecutorCap { return ExecutorCap.fromFields( ExecutorCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ExecutorCap { return ExecutorCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON( json: Record<string, any> ): ExecutorCap { if (json.$typeName !== ExecutorCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ExecutorCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ExecutorCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isExecutorCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ExecutorCap object`); } return ExecutorCap.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ExecutorCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ExecutorCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isExecutorCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ExecutorCap object`); }

 return ExecutorCap.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== MpcTransactionRequested =============================== */

export function isMpcTransactionRequested(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::workspace::MpcTransactionRequested` + '<'); }

export interface MpcTransactionRequestedFields<A extends TypeArgument> { workspaceId: ToField<ID>; vaultId: ToField<"u16">; txId: ToField<"u64">; initiator: ToField<"u16">; initialStatus: ToField<MpcTxStatus>; requireApprovalUsers: ToField<Vector<"u16">>; effects: ToField<TxEffects<A>> }

export type MpcTransactionRequestedReified<A extends TypeArgument> = Reified< MpcTransactionRequested<A>, MpcTransactionRequestedFields<A> >;

export class MpcTransactionRequested<A extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::MpcTransactionRequested`; static readonly $numTypeParams = 1;

 readonly $typeName = MpcTransactionRequested.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::MpcTransactionRequested<${ToTypeStr<A>}>`;

 readonly $typeArgs: [ToTypeStr<A>];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly txId: ToField<"u64">; readonly initiator: ToField<"u16">; readonly initialStatus: ToField<MpcTxStatus>; readonly requireApprovalUsers: ToField<Vector<"u16">>; readonly effects: ToField<TxEffects<A>>

 private constructor(typeArgs: [ToTypeStr<A>], fields: MpcTransactionRequestedFields<A>, ) { this.$fullTypeName = composeSuiType( MpcTransactionRequested.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::MpcTransactionRequested<${ToTypeStr<A>}>`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.txId = fields.txId;; this.initiator = fields.initiator;; this.initialStatus = fields.initialStatus;; this.requireApprovalUsers = fields.requireApprovalUsers;; this.effects = fields.effects; }

 static reified<A extends Reified<TypeArgument, any>>( A: A ): MpcTransactionRequestedReified<ToTypeArgument<A>> { return { typeName: MpcTransactionRequested.$typeName, fullTypeName: composeSuiType( MpcTransactionRequested.$typeName, ...[extractType(A)] ) as `${typeof PKG_V1}::workspace::MpcTransactionRequested<${ToTypeStr<ToTypeArgument<A>>}>`, typeArgs: [ extractType(A) ] as [ToTypeStr<ToTypeArgument<A>>], reifiedTypeArgs: [A], fromFields: (fields: Record<string, any>) => MpcTransactionRequested.fromFields( A, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MpcTransactionRequested.fromFieldsWithTypes( A, item, ), fromBcs: (data: Uint8Array) => MpcTransactionRequested.fromBcs( A, data, ), bcs: MpcTransactionRequested.bcs(toBcs(A)), fromJSONField: (field: any) => MpcTransactionRequested.fromJSONField( A, field, ), fromJSON: (json: Record<string, any>) => MpcTransactionRequested.fromJSON( A, json, ), fromSuiParsedData: (content: SuiParsedData) => MpcTransactionRequested.fromSuiParsedData( A, content, ), fetch: async (client: SuiClient, id: string) => MpcTransactionRequested.fetch( client, A, id, ), new: ( fields: MpcTransactionRequestedFields<ToTypeArgument<A>>, ) => { return new MpcTransactionRequested( [extractType(A)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MpcTransactionRequested.reified }

 static phantom<A extends Reified<TypeArgument, any>>( A: A ): PhantomReified<ToTypeStr<MpcTransactionRequested<ToTypeArgument<A>>>> { return phantom(MpcTransactionRequested.reified( A )); } static get p() { return MpcTransactionRequested.phantom }

 static get bcs() { return <A extends BcsType<any>>(A: A) => bcs.struct(`MpcTransactionRequested<${A.name}>`, {

 workspace_id: ID.bcs, vault_id: bcs.u16(), tx_id: bcs.u64(), initiator: bcs.u16(), initial_status: MpcTxStatus.bcs, require_approval_users: bcs.vector(bcs.u16()), effects: TxEffects.bcs(A)

}) };

 static fromFields<A extends Reified<TypeArgument, any>>( typeArg: A, fields: Record<string, any> ): MpcTransactionRequested<ToTypeArgument<A>> { return MpcTransactionRequested.reified( typeArg, ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), txId: decodeFromFields("u64", fields.tx_id), initiator: decodeFromFields("u16", fields.initiator), initialStatus: decodeFromFields(MpcTxStatus.reified(), fields.initial_status), requireApprovalUsers: decodeFromFields(reified.vector("u16"), fields.require_approval_users), effects: decodeFromFields(TxEffects.reified(typeArg), fields.effects) } ) }

 static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>( typeArg: A, item: FieldsWithTypes ): MpcTransactionRequested<ToTypeArgument<A>> { if (!isMpcTransactionRequested(item.type)) { throw new Error("not a MpcTransactionRequested type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MpcTransactionRequested.reified( typeArg, ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), initiator: decodeFromFieldsWithTypes("u16", item.fields.initiator), initialStatus: decodeFromFieldsWithTypes(MpcTxStatus.reified(), item.fields.initial_status), requireApprovalUsers: decodeFromFieldsWithTypes(reified.vector("u16"), item.fields.require_approval_users), effects: decodeFromFieldsWithTypes(TxEffects.reified(typeArg), item.fields.effects) } ) }

 static fromBcs<A extends Reified<TypeArgument, any>>( typeArg: A, data: Uint8Array ): MpcTransactionRequested<ToTypeArgument<A>> { const typeArgs = [typeArg];

 return MpcTransactionRequested.fromFields( typeArg, MpcTransactionRequested.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,txId: this.txId.toString(),initiator: this.initiator,initialStatus: this.initialStatus.toJSONField(),requireApprovalUsers: fieldToJSON<Vector<"u16">>(`vector<u16>`, this.requireApprovalUsers),effects: this.effects.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<A extends Reified<TypeArgument, any>>( typeArg: A, field: any ): MpcTransactionRequested<ToTypeArgument<A>> { return MpcTransactionRequested.reified( typeArg, ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), txId: decodeFromJSONField("u64", field.txId), initiator: decodeFromJSONField("u16", field.initiator), initialStatus: decodeFromJSONField(MpcTxStatus.reified(), field.initialStatus), requireApprovalUsers: decodeFromJSONField(reified.vector("u16"), field.requireApprovalUsers), effects: decodeFromJSONField(TxEffects.reified(typeArg), field.effects) } ) }

 static fromJSON<A extends Reified<TypeArgument, any>>( typeArg: A, json: Record<string, any> ): MpcTransactionRequested<ToTypeArgument<A>> { if (json.$typeName !== MpcTransactionRequested.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MpcTransactionRequested.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MpcTransactionRequested.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<A extends Reified<TypeArgument, any>>( typeArg: A, content: SuiParsedData ): MpcTransactionRequested<ToTypeArgument<A>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMpcTransactionRequested(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MpcTransactionRequested object`); } return MpcTransactionRequested.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<A extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: A, id: string ): Promise<MpcTransactionRequested<ToTypeArgument<A>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MpcTransactionRequested object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMpcTransactionRequested(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MpcTransactionRequested object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MpcTransactionRequested.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ProcessedModuleActionResult =============================== */

export function isProcessedModuleActionResult(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::workspace::ProcessedModuleActionResult` + '<'); }

export interface ProcessedModuleActionResultFields<E extends TypeArgument> { workspaceId: ToField<ID>; vaultId: ToField<"u16">; txId: ToField<"u64">; networkId: ToField<String>; moduleEvent: ToField<E> }

export type ProcessedModuleActionResultReified<E extends TypeArgument> = Reified< ProcessedModuleActionResult<E>, ProcessedModuleActionResultFields<E> >;

export class ProcessedModuleActionResult<E extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::ProcessedModuleActionResult`; static readonly $numTypeParams = 1;

 readonly $typeName = ProcessedModuleActionResult.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::ProcessedModuleActionResult<${ToTypeStr<E>}>`;

 readonly $typeArgs: [ToTypeStr<E>];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly txId: ToField<"u64">; readonly networkId: ToField<String>; readonly moduleEvent: ToField<E>

 private constructor(typeArgs: [ToTypeStr<E>], fields: ProcessedModuleActionResultFields<E>, ) { this.$fullTypeName = composeSuiType( ProcessedModuleActionResult.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::ProcessedModuleActionResult<${ToTypeStr<E>}>`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.txId = fields.txId;; this.networkId = fields.networkId;; this.moduleEvent = fields.moduleEvent; }

 static reified<E extends Reified<TypeArgument, any>>( E: E ): ProcessedModuleActionResultReified<ToTypeArgument<E>> { return { typeName: ProcessedModuleActionResult.$typeName, fullTypeName: composeSuiType( ProcessedModuleActionResult.$typeName, ...[extractType(E)] ) as `${typeof PKG_V1}::workspace::ProcessedModuleActionResult<${ToTypeStr<ToTypeArgument<E>>}>`, typeArgs: [ extractType(E) ] as [ToTypeStr<ToTypeArgument<E>>], reifiedTypeArgs: [E], fromFields: (fields: Record<string, any>) => ProcessedModuleActionResult.fromFields( E, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ProcessedModuleActionResult.fromFieldsWithTypes( E, item, ), fromBcs: (data: Uint8Array) => ProcessedModuleActionResult.fromBcs( E, data, ), bcs: ProcessedModuleActionResult.bcs(toBcs(E)), fromJSONField: (field: any) => ProcessedModuleActionResult.fromJSONField( E, field, ), fromJSON: (json: Record<string, any>) => ProcessedModuleActionResult.fromJSON( E, json, ), fromSuiParsedData: (content: SuiParsedData) => ProcessedModuleActionResult.fromSuiParsedData( E, content, ), fetch: async (client: SuiClient, id: string) => ProcessedModuleActionResult.fetch( client, E, id, ), new: ( fields: ProcessedModuleActionResultFields<ToTypeArgument<E>>, ) => { return new ProcessedModuleActionResult( [extractType(E)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ProcessedModuleActionResult.reified }

 static phantom<E extends Reified<TypeArgument, any>>( E: E ): PhantomReified<ToTypeStr<ProcessedModuleActionResult<ToTypeArgument<E>>>> { return phantom(ProcessedModuleActionResult.reified( E )); } static get p() { return ProcessedModuleActionResult.phantom }

 static get bcs() { return <E extends BcsType<any>>(E: E) => bcs.struct(`ProcessedModuleActionResult<${E.name}>`, {

 workspace_id: ID.bcs, vault_id: bcs.u16(), tx_id: bcs.u64(), network_id: String.bcs, module_event: E

}) };

 static fromFields<E extends Reified<TypeArgument, any>>( typeArg: E, fields: Record<string, any> ): ProcessedModuleActionResult<ToTypeArgument<E>> { return ProcessedModuleActionResult.reified( typeArg, ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), txId: decodeFromFields("u64", fields.tx_id), networkId: decodeFromFields(String.reified(), fields.network_id), moduleEvent: decodeFromFields(typeArg, fields.module_event) } ) }

 static fromFieldsWithTypes<E extends Reified<TypeArgument, any>>( typeArg: E, item: FieldsWithTypes ): ProcessedModuleActionResult<ToTypeArgument<E>> { if (!isProcessedModuleActionResult(item.type)) { throw new Error("not a ProcessedModuleActionResult type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ProcessedModuleActionResult.reified( typeArg, ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), networkId: decodeFromFieldsWithTypes(String.reified(), item.fields.network_id), moduleEvent: decodeFromFieldsWithTypes(typeArg, item.fields.module_event) } ) }

 static fromBcs<E extends Reified<TypeArgument, any>>( typeArg: E, data: Uint8Array ): ProcessedModuleActionResult<ToTypeArgument<E>> { const typeArgs = [typeArg];

 return ProcessedModuleActionResult.fromFields( typeArg, ProcessedModuleActionResult.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,txId: this.txId.toString(),networkId: this.networkId,moduleEvent: fieldToJSON<E>(this.$typeArgs[0], this.moduleEvent),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<E extends Reified<TypeArgument, any>>( typeArg: E, field: any ): ProcessedModuleActionResult<ToTypeArgument<E>> { return ProcessedModuleActionResult.reified( typeArg, ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), txId: decodeFromJSONField("u64", field.txId), networkId: decodeFromJSONField(String.reified(), field.networkId), moduleEvent: decodeFromJSONField(typeArg, field.moduleEvent) } ) }

 static fromJSON<E extends Reified<TypeArgument, any>>( typeArg: E, json: Record<string, any> ): ProcessedModuleActionResult<ToTypeArgument<E>> { if (json.$typeName !== ProcessedModuleActionResult.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ProcessedModuleActionResult.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ProcessedModuleActionResult.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<E extends Reified<TypeArgument, any>>( typeArg: E, content: SuiParsedData ): ProcessedModuleActionResult<ToTypeArgument<E>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProcessedModuleActionResult(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ProcessedModuleActionResult object`); } return ProcessedModuleActionResult.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<E extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: E, id: string ): Promise<ProcessedModuleActionResult<ToTypeArgument<E>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ProcessedModuleActionResult object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProcessedModuleActionResult(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ProcessedModuleActionResult object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ProcessedModuleActionResult.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ProposalVote =============================== */

export function isProposalVote(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::workspace::ProposalVote`; }

export interface ProposalVoteFields { workspaceId: ToField<ID>; txId: ToField<"u64">; userId: ToField<"u16">; isApprove: ToField<"bool"> }

export type ProposalVoteReified = Reified< ProposalVote, ProposalVoteFields >;

export class ProposalVote implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::ProposalVote`; static readonly $numTypeParams = 0;

 readonly $typeName = ProposalVote.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::ProposalVote`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly txId: ToField<"u64">; readonly userId: ToField<"u16">; readonly isApprove: ToField<"bool">

 private constructor(typeArgs: [], fields: ProposalVoteFields, ) { this.$fullTypeName = composeSuiType( ProposalVote.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::ProposalVote`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.txId = fields.txId;; this.userId = fields.userId;; this.isApprove = fields.isApprove; }

 static reified( ): ProposalVoteReified { return { typeName: ProposalVote.$typeName, fullTypeName: composeSuiType( ProposalVote.$typeName, ...[] ) as `${typeof PKG_V1}::workspace::ProposalVote`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ProposalVote.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ProposalVote.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ProposalVote.fromBcs( data, ), bcs: ProposalVote.bcs, fromJSONField: (field: any) => ProposalVote.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ProposalVote.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ProposalVote.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ProposalVote.fetch( client, id, ), new: ( fields: ProposalVoteFields, ) => { return new ProposalVote( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ProposalVote.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ProposalVote>> { return phantom(ProposalVote.reified( )); } static get p() { return ProposalVote.phantom() }

 static get bcs() { return bcs.struct("ProposalVote", {

 workspace_id: ID.bcs, tx_id: bcs.u64(), user_id: bcs.u16(), isApprove: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ProposalVote { return ProposalVote.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), txId: decodeFromFields("u64", fields.tx_id), userId: decodeFromFields("u16", fields.user_id), isApprove: decodeFromFields("bool", fields.isApprove) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ProposalVote { if (!isProposalVote(item.type)) { throw new Error("not a ProposalVote type");

 }

 return ProposalVote.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), userId: decodeFromFieldsWithTypes("u16", item.fields.user_id), isApprove: decodeFromFieldsWithTypes("bool", item.fields.isApprove) } ) }

 static fromBcs( data: Uint8Array ): ProposalVote { return ProposalVote.fromFields( ProposalVote.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,txId: this.txId.toString(),userId: this.userId,isApprove: this.isApprove,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ProposalVote { return ProposalVote.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), txId: decodeFromJSONField("u64", field.txId), userId: decodeFromJSONField("u16", field.userId), isApprove: decodeFromJSONField("bool", field.isApprove) } ) }

 static fromJSON( json: Record<string, any> ): ProposalVote { if (json.$typeName !== ProposalVote.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ProposalVote.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ProposalVote { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposalVote(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ProposalVote object`); } return ProposalVote.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ProposalVote> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ProposalVote object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposalVote(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ProposalVote object`); }

 return ProposalVote.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Workspace =============================== */

export function isWorkspace(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::workspace::Workspace`; }

export interface WorkspaceFields { id: ToField<UID>; name: ToField<String>; vaults: ToField<Vaults>; users: ToField<Users>; addressBook: ToField<AddressBook>; policy: ToField<Policy>; transactions: ToField<Transactions>; settings: ToField<WorkspaceSettings> }

export type WorkspaceReified = Reified< Workspace, WorkspaceFields >;

export class Workspace implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::Workspace`; static readonly $numTypeParams = 0;

 readonly $typeName = Workspace.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::Workspace`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly name: ToField<String>; readonly vaults: ToField<Vaults>; readonly users: ToField<Users>; readonly addressBook: ToField<AddressBook>; readonly policy: ToField<Policy>; readonly transactions: ToField<Transactions>; readonly settings: ToField<WorkspaceSettings>

 private constructor(typeArgs: [], fields: WorkspaceFields, ) { this.$fullTypeName = composeSuiType( Workspace.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::Workspace`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.name = fields.name;; this.vaults = fields.vaults;; this.users = fields.users;; this.addressBook = fields.addressBook;; this.policy = fields.policy;; this.transactions = fields.transactions;; this.settings = fields.settings; }

 static reified( ): WorkspaceReified { return { typeName: Workspace.$typeName, fullTypeName: composeSuiType( Workspace.$typeName, ...[] ) as `${typeof PKG_V1}::workspace::Workspace`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Workspace.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Workspace.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Workspace.fromBcs( data, ), bcs: Workspace.bcs, fromJSONField: (field: any) => Workspace.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Workspace.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Workspace.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Workspace.fetch( client, id, ), new: ( fields: WorkspaceFields, ) => { return new Workspace( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Workspace.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Workspace>> { return phantom(Workspace.reified( )); } static get p() { return Workspace.phantom() }

 static get bcs() { return bcs.struct("Workspace", {

 id: UID.bcs, name: String.bcs, vaults: Vaults.bcs, users: Users.bcs, address_book: AddressBook.bcs, policy: Policy.bcs, transactions: Transactions.bcs, settings: WorkspaceSettings.bcs

}) };

 static fromFields( fields: Record<string, any> ): Workspace { return Workspace.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), name: decodeFromFields(String.reified(), fields.name), vaults: decodeFromFields(Vaults.reified(), fields.vaults), users: decodeFromFields(Users.reified(), fields.users), addressBook: decodeFromFields(AddressBook.reified(), fields.address_book), policy: decodeFromFields(Policy.reified(), fields.policy), transactions: decodeFromFields(Transactions.reified(), fields.transactions), settings: decodeFromFields(WorkspaceSettings.reified(), fields.settings) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Workspace { if (!isWorkspace(item.type)) { throw new Error("not a Workspace type");

 }

 return Workspace.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), vaults: decodeFromFieldsWithTypes(Vaults.reified(), item.fields.vaults), users: decodeFromFieldsWithTypes(Users.reified(), item.fields.users), addressBook: decodeFromFieldsWithTypes(AddressBook.reified(), item.fields.address_book), policy: decodeFromFieldsWithTypes(Policy.reified(), item.fields.policy), transactions: decodeFromFieldsWithTypes(Transactions.reified(), item.fields.transactions), settings: decodeFromFieldsWithTypes(WorkspaceSettings.reified(), item.fields.settings) } ) }

 static fromBcs( data: Uint8Array ): Workspace { return Workspace.fromFields( Workspace.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,name: this.name,vaults: this.vaults.toJSONField(),users: this.users.toJSONField(),addressBook: this.addressBook.toJSONField(),policy: this.policy.toJSONField(),transactions: this.transactions.toJSONField(),settings: this.settings.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Workspace { return Workspace.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), name: decodeFromJSONField(String.reified(), field.name), vaults: decodeFromJSONField(Vaults.reified(), field.vaults), users: decodeFromJSONField(Users.reified(), field.users), addressBook: decodeFromJSONField(AddressBook.reified(), field.addressBook), policy: decodeFromJSONField(Policy.reified(), field.policy), transactions: decodeFromJSONField(Transactions.reified(), field.transactions), settings: decodeFromJSONField(WorkspaceSettings.reified(), field.settings) } ) }

 static fromJSON( json: Record<string, any> ): Workspace { if (json.$typeName !== Workspace.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Workspace.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Workspace { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWorkspace(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Workspace object`); } return Workspace.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Workspace> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Workspace object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWorkspace(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Workspace object`); }

 return Workspace.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WorkspaceCreated =============================== */

export function isWorkspaceCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::workspace::WorkspaceCreated`; }

export interface WorkspaceCreatedFields { workspaceId: ToField<ID>; browserAddress: ToField<"address">; mobileAddress: ToField<"address">; mobileCap: ToField<ID> }

export type WorkspaceCreatedReified = Reified< WorkspaceCreated, WorkspaceCreatedFields >;

export class WorkspaceCreated implements StructClass { static readonly $typeName = `${PKG_V1}::workspace::WorkspaceCreated`; static readonly $numTypeParams = 0;

 readonly $typeName = WorkspaceCreated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::workspace::WorkspaceCreated`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly browserAddress: ToField<"address">; readonly mobileAddress: ToField<"address">; readonly mobileCap: ToField<ID>

 private constructor(typeArgs: [], fields: WorkspaceCreatedFields, ) { this.$fullTypeName = composeSuiType( WorkspaceCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::workspace::WorkspaceCreated`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.browserAddress = fields.browserAddress;; this.mobileAddress = fields.mobileAddress;; this.mobileCap = fields.mobileCap; }

 static reified( ): WorkspaceCreatedReified { return { typeName: WorkspaceCreated.$typeName, fullTypeName: composeSuiType( WorkspaceCreated.$typeName, ...[] ) as `${typeof PKG_V1}::workspace::WorkspaceCreated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => WorkspaceCreated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WorkspaceCreated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => WorkspaceCreated.fromBcs( data, ), bcs: WorkspaceCreated.bcs, fromJSONField: (field: any) => WorkspaceCreated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => WorkspaceCreated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => WorkspaceCreated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => WorkspaceCreated.fetch( client, id, ), new: ( fields: WorkspaceCreatedFields, ) => { return new WorkspaceCreated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return WorkspaceCreated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<WorkspaceCreated>> { return phantom(WorkspaceCreated.reified( )); } static get p() { return WorkspaceCreated.phantom() }

 static get bcs() { return bcs.struct("WorkspaceCreated", {

 workspace_id: ID.bcs, browser_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), mobile_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), mobile_cap: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): WorkspaceCreated { return WorkspaceCreated.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), browserAddress: decodeFromFields("address", fields.browser_address), mobileAddress: decodeFromFields("address", fields.mobile_address), mobileCap: decodeFromFields(ID.reified(), fields.mobile_cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): WorkspaceCreated { if (!isWorkspaceCreated(item.type)) { throw new Error("not a WorkspaceCreated type");

 }

 return WorkspaceCreated.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), browserAddress: decodeFromFieldsWithTypes("address", item.fields.browser_address), mobileAddress: decodeFromFieldsWithTypes("address", item.fields.mobile_address), mobileCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mobile_cap) } ) }

 static fromBcs( data: Uint8Array ): WorkspaceCreated { return WorkspaceCreated.fromFields( WorkspaceCreated.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,browserAddress: this.browserAddress,mobileAddress: this.mobileAddress,mobileCap: this.mobileCap,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): WorkspaceCreated { return WorkspaceCreated.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), browserAddress: decodeFromJSONField("address", field.browserAddress), mobileAddress: decodeFromJSONField("address", field.mobileAddress), mobileCap: decodeFromJSONField(ID.reified(), field.mobileCap) } ) }

 static fromJSON( json: Record<string, any> ): WorkspaceCreated { if (json.$typeName !== WorkspaceCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return WorkspaceCreated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): WorkspaceCreated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWorkspaceCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WorkspaceCreated object`); } return WorkspaceCreated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<WorkspaceCreated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WorkspaceCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWorkspaceCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WorkspaceCreated object`); }

 return WorkspaceCreated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
