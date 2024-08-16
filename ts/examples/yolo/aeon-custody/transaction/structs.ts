import * as reified from "../../_framework/reified";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {EnumClass, PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, Vector, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {Bag} from "../../sui/bag/structs";
import {ID} from "../../sui/object/structs";
import {VecMap} from "../../sui/vec-map/structs";
import {VecSet} from "../../sui/vec-set/structs";
import {PKG_V1} from "../index";
import {InitVaultContainerRequest} from "../module-interface/structs";
import {PolicyRule} from "../policy/structs";
import {Proposal} from "../proposal/structs";
import {Role} from "../user/structs";
import {VaultProfile} from "../vault/structs";
import {BcsType, EnumOutputShapeWithKeys, bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== ConfigTx =============================== */

export function isConfigTx(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transaction::ConfigTx`; }

export interface ConfigTxFields { initiator: ToField<"u16">; status: ToField<ConfigTxStatus>; txns: ToField<Vector<ConfigTxType>>; cancellations: ToField<VecSet<"u16">> }

export type ConfigTxReified = Reified< ConfigTx, ConfigTxFields >;

export class ConfigTx implements StructClass { static readonly $typeName = `${PKG_V1}::transaction::ConfigTx`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTx.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ConfigTx`;

 readonly $typeArgs: [];

 readonly initiator: ToField<"u16">; readonly status: ToField<ConfigTxStatus>; readonly txns: ToField<Vector<ConfigTxType>>; readonly cancellations: ToField<VecSet<"u16">>

 private constructor(typeArgs: [], fields: ConfigTxFields, ) { this.$fullTypeName = composeSuiType( ConfigTx.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ConfigTx`; this.$typeArgs = typeArgs;

 this.initiator = fields.initiator;; this.status = fields.status;; this.txns = fields.txns;; this.cancellations = fields.cancellations; }

 static reified( ): ConfigTxReified { return { typeName: ConfigTx.$typeName, fullTypeName: composeSuiType( ConfigTx.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ConfigTx`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigTx.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigTx.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigTx.fromBcs( data, ), bcs: ConfigTx.bcs, fromJSONField: (field: any) => ConfigTx.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigTx.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigTx.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ConfigTx.fetch( client, id, ), new: ( fields: ConfigTxFields, ) => { return new ConfigTx( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigTx.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigTx>> { return phantom(ConfigTx.reified( )); } static get p() { return ConfigTx.phantom() }

 static get bcs() { return bcs.struct("ConfigTx", {

 initiator: bcs.u16(), status: ConfigTxStatus.bcs, txns: bcs.vector(ConfigTxType.bcs), cancellations: VecSet.bcs(bcs.u16())

}) };

 static fromFields( fields: Record<string, any> ): ConfigTx { return ConfigTx.reified( ).new( { initiator: decodeFromFields("u16", fields.initiator), status: decodeFromFields(ConfigTxStatus.reified(), fields.status), txns: decodeFromFields(reified.vector(ConfigTxType.reified()), fields.txns), cancellations: decodeFromFields(VecSet.reified("u16"), fields.cancellations) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigTx { if (!isConfigTx(item.type)) { throw new Error("not a ConfigTx type");

 }

 return ConfigTx.reified( ).new( { initiator: decodeFromFieldsWithTypes("u16", item.fields.initiator), status: decodeFromFieldsWithTypes(ConfigTxStatus.reified(), item.fields.status), txns: decodeFromFieldsWithTypes(reified.vector(ConfigTxType.reified()), item.fields.txns), cancellations: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.cancellations) } ) }

 static fromBcs( data: Uint8Array ): ConfigTx { return ConfigTx.fromFields( ConfigTx.bcs.parse(data) ) }

 toJSONField() { return {

 initiator: this.initiator,status: this.status.toJSONField(),txns: fieldToJSON<Vector<ConfigTxType>>(`vector<${ConfigTxType.$typeName}>`, this.txns),cancellations: this.cancellations.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigTx { return ConfigTx.reified( ).new( { initiator: decodeFromJSONField("u16", field.initiator), status: decodeFromJSONField(ConfigTxStatus.reified(), field.status), txns: decodeFromJSONField(reified.vector(ConfigTxType.reified()), field.txns), cancellations: decodeFromJSONField(VecSet.reified("u16"), field.cancellations) } ) }

 static fromJSON( json: Record<string, any> ): ConfigTx { if (json.$typeName !== ConfigTx.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigTx.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigTx { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigTx(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigTx object`); } return ConfigTx.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigTx> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigTx object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigTx(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigTx object`); }

 return ConfigTx.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ConfigTxStatusUpdated =============================== */

export function isConfigTxStatusUpdated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transaction::ConfigTxStatusUpdated`; }

export interface ConfigTxStatusUpdatedFields { workspaceId: ToField<ID>; txId: ToField<"u64">; newStatus: ToField<ConfigTxStatus> }

export type ConfigTxStatusUpdatedReified = Reified< ConfigTxStatusUpdated, ConfigTxStatusUpdatedFields >;

export class ConfigTxStatusUpdated implements StructClass { static readonly $typeName = `${PKG_V1}::transaction::ConfigTxStatusUpdated`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxStatusUpdated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ConfigTxStatusUpdated`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly txId: ToField<"u64">; readonly newStatus: ToField<ConfigTxStatus>

 private constructor(typeArgs: [], fields: ConfigTxStatusUpdatedFields, ) { this.$fullTypeName = composeSuiType( ConfigTxStatusUpdated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ConfigTxStatusUpdated`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.txId = fields.txId;; this.newStatus = fields.newStatus; }

 static reified( ): ConfigTxStatusUpdatedReified { return { typeName: ConfigTxStatusUpdated.$typeName, fullTypeName: composeSuiType( ConfigTxStatusUpdated.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ConfigTxStatusUpdated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigTxStatusUpdated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigTxStatusUpdated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigTxStatusUpdated.fromBcs( data, ), bcs: ConfigTxStatusUpdated.bcs, fromJSONField: (field: any) => ConfigTxStatusUpdated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigTxStatusUpdated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigTxStatusUpdated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ConfigTxStatusUpdated.fetch( client, id, ), new: ( fields: ConfigTxStatusUpdatedFields, ) => { return new ConfigTxStatusUpdated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigTxStatusUpdated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigTxStatusUpdated>> { return phantom(ConfigTxStatusUpdated.reified( )); } static get p() { return ConfigTxStatusUpdated.phantom() }

 static get bcs() { return bcs.struct("ConfigTxStatusUpdated", {

 workspace_id: ID.bcs, tx_id: bcs.u64(), new_status: ConfigTxStatus.bcs

}) };

 static fromFields( fields: Record<string, any> ): ConfigTxStatusUpdated { return ConfigTxStatusUpdated.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), txId: decodeFromFields("u64", fields.tx_id), newStatus: decodeFromFields(ConfigTxStatus.reified(), fields.new_status) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigTxStatusUpdated { if (!isConfigTxStatusUpdated(item.type)) { throw new Error("not a ConfigTxStatusUpdated type");

 }

 return ConfigTxStatusUpdated.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), newStatus: decodeFromFieldsWithTypes(ConfigTxStatus.reified(), item.fields.new_status) } ) }

 static fromBcs( data: Uint8Array ): ConfigTxStatusUpdated { return ConfigTxStatusUpdated.fromFields( ConfigTxStatusUpdated.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,txId: this.txId.toString(),newStatus: this.newStatus.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigTxStatusUpdated { return ConfigTxStatusUpdated.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), txId: decodeFromJSONField("u64", field.txId), newStatus: decodeFromJSONField(ConfigTxStatus.reified(), field.newStatus) } ) }

 static fromJSON( json: Record<string, any> ): ConfigTxStatusUpdated { if (json.$typeName !== ConfigTxStatusUpdated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigTxStatusUpdated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigTxStatusUpdated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigTxStatusUpdated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigTxStatusUpdated object`); } return ConfigTxStatusUpdated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigTxStatusUpdated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigTxStatusUpdated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigTxStatusUpdated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigTxStatusUpdated object`); }

 return ConfigTxStatusUpdated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== MpcTransaction =============================== */

export function isMpcTransaction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::MpcTransaction` + '<'); }

export interface MpcTransactionFields<A extends TypeArgument> { initiator: ToField<"u16">; networkId: ToField<String>; status: ToField<MpcTxStatus>; vaultId: ToField<"u16">; moduleAction: ToField<A>; chainModuleId: ToField<ID>; memo: ToField<String>; cancellations: ToField<VecSet<"u16">> }

export type MpcTransactionReified<A extends TypeArgument> = Reified< MpcTransaction<A>, MpcTransactionFields<A> >;

export class MpcTransaction<A extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::transaction::MpcTransaction`; static readonly $numTypeParams = 1;

 readonly $typeName = MpcTransaction.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::MpcTransaction<${ToTypeStr<A>}>`;

 readonly $typeArgs: [ToTypeStr<A>];

 readonly initiator: ToField<"u16">; readonly networkId: ToField<String>; readonly status: ToField<MpcTxStatus>; readonly vaultId: ToField<"u16">; readonly moduleAction: ToField<A>; readonly chainModuleId: ToField<ID>; readonly memo: ToField<String>; readonly cancellations: ToField<VecSet<"u16">>

 private constructor(typeArgs: [ToTypeStr<A>], fields: MpcTransactionFields<A>, ) { this.$fullTypeName = composeSuiType( MpcTransaction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::MpcTransaction<${ToTypeStr<A>}>`; this.$typeArgs = typeArgs;

 this.initiator = fields.initiator;; this.networkId = fields.networkId;; this.status = fields.status;; this.vaultId = fields.vaultId;; this.moduleAction = fields.moduleAction;; this.chainModuleId = fields.chainModuleId;; this.memo = fields.memo;; this.cancellations = fields.cancellations; }

 static reified<A extends Reified<TypeArgument, any>>( A: A ): MpcTransactionReified<ToTypeArgument<A>> { return { typeName: MpcTransaction.$typeName, fullTypeName: composeSuiType( MpcTransaction.$typeName, ...[extractType(A)] ) as `${typeof PKG_V1}::transaction::MpcTransaction<${ToTypeStr<ToTypeArgument<A>>}>`, typeArgs: [ extractType(A) ] as [ToTypeStr<ToTypeArgument<A>>], reifiedTypeArgs: [A], fromFields: (fields: Record<string, any>) => MpcTransaction.fromFields( A, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MpcTransaction.fromFieldsWithTypes( A, item, ), fromBcs: (data: Uint8Array) => MpcTransaction.fromBcs( A, data, ), bcs: MpcTransaction.bcs(toBcs(A)), fromJSONField: (field: any) => MpcTransaction.fromJSONField( A, field, ), fromJSON: (json: Record<string, any>) => MpcTransaction.fromJSON( A, json, ), fromSuiParsedData: (content: SuiParsedData) => MpcTransaction.fromSuiParsedData( A, content, ), fetch: async (client: SuiClient, id: string) => MpcTransaction.fetch( client, A, id, ), new: ( fields: MpcTransactionFields<ToTypeArgument<A>>, ) => { return new MpcTransaction( [extractType(A)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MpcTransaction.reified }

 static phantom<A extends Reified<TypeArgument, any>>( A: A ): PhantomReified<ToTypeStr<MpcTransaction<ToTypeArgument<A>>>> { return phantom(MpcTransaction.reified( A )); } static get p() { return MpcTransaction.phantom }

 static get bcs() { return <A extends BcsType<any>>(A: A) => bcs.struct(`MpcTransaction<${A.name}>`, {

 initiator: bcs.u16(), network_id: String.bcs, status: MpcTxStatus.bcs, vault_id: bcs.u16(), module_action: A, chain_module_id: ID.bcs, memo: String.bcs, cancellations: VecSet.bcs(bcs.u16())

}) };

 static fromFields<A extends Reified<TypeArgument, any>>( typeArg: A, fields: Record<string, any> ): MpcTransaction<ToTypeArgument<A>> { return MpcTransaction.reified( typeArg, ).new( { initiator: decodeFromFields("u16", fields.initiator), networkId: decodeFromFields(String.reified(), fields.network_id), status: decodeFromFields(MpcTxStatus.reified(), fields.status), vaultId: decodeFromFields("u16", fields.vault_id), moduleAction: decodeFromFields(typeArg, fields.module_action), chainModuleId: decodeFromFields(ID.reified(), fields.chain_module_id), memo: decodeFromFields(String.reified(), fields.memo), cancellations: decodeFromFields(VecSet.reified("u16"), fields.cancellations) } ) }

 static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>( typeArg: A, item: FieldsWithTypes ): MpcTransaction<ToTypeArgument<A>> { if (!isMpcTransaction(item.type)) { throw new Error("not a MpcTransaction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MpcTransaction.reified( typeArg, ).new( { initiator: decodeFromFieldsWithTypes("u16", item.fields.initiator), networkId: decodeFromFieldsWithTypes(String.reified(), item.fields.network_id), status: decodeFromFieldsWithTypes(MpcTxStatus.reified(), item.fields.status), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), moduleAction: decodeFromFieldsWithTypes(typeArg, item.fields.module_action), chainModuleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.chain_module_id), memo: decodeFromFieldsWithTypes(String.reified(), item.fields.memo), cancellations: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.cancellations) } ) }

 static fromBcs<A extends Reified<TypeArgument, any>>( typeArg: A, data: Uint8Array ): MpcTransaction<ToTypeArgument<A>> { const typeArgs = [typeArg];

 return MpcTransaction.fromFields( typeArg, MpcTransaction.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 initiator: this.initiator,networkId: this.networkId,status: this.status.toJSONField(),vaultId: this.vaultId,moduleAction: fieldToJSON<A>(this.$typeArgs[0], this.moduleAction),chainModuleId: this.chainModuleId,memo: this.memo,cancellations: this.cancellations.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<A extends Reified<TypeArgument, any>>( typeArg: A, field: any ): MpcTransaction<ToTypeArgument<A>> { return MpcTransaction.reified( typeArg, ).new( { initiator: decodeFromJSONField("u16", field.initiator), networkId: decodeFromJSONField(String.reified(), field.networkId), status: decodeFromJSONField(MpcTxStatus.reified(), field.status), vaultId: decodeFromJSONField("u16", field.vaultId), moduleAction: decodeFromJSONField(typeArg, field.moduleAction), chainModuleId: decodeFromJSONField(ID.reified(), field.chainModuleId), memo: decodeFromJSONField(String.reified(), field.memo), cancellations: decodeFromJSONField(VecSet.reified("u16"), field.cancellations) } ) }

 static fromJSON<A extends Reified<TypeArgument, any>>( typeArg: A, json: Record<string, any> ): MpcTransaction<ToTypeArgument<A>> { if (json.$typeName !== MpcTransaction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MpcTransaction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MpcTransaction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<A extends Reified<TypeArgument, any>>( typeArg: A, content: SuiParsedData ): MpcTransaction<ToTypeArgument<A>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMpcTransaction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MpcTransaction object`); } return MpcTransaction.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<A extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: A, id: string ): Promise<MpcTransaction<ToTypeArgument<A>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MpcTransaction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMpcTransaction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MpcTransaction object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MpcTransaction.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== MpcTxStatusUpdated =============================== */

export function isMpcTxStatusUpdated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transaction::MpcTxStatusUpdated`; }

export interface MpcTxStatusUpdatedFields { workspaceId: ToField<ID>; txId: ToField<"u64">; newStatus: ToField<MpcTxStatus> }

export type MpcTxStatusUpdatedReified = Reified< MpcTxStatusUpdated, MpcTxStatusUpdatedFields >;

export class MpcTxStatusUpdated implements StructClass { static readonly $typeName = `${PKG_V1}::transaction::MpcTxStatusUpdated`; static readonly $numTypeParams = 0;

 readonly $typeName = MpcTxStatusUpdated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::MpcTxStatusUpdated`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly txId: ToField<"u64">; readonly newStatus: ToField<MpcTxStatus>

 private constructor(typeArgs: [], fields: MpcTxStatusUpdatedFields, ) { this.$fullTypeName = composeSuiType( MpcTxStatusUpdated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::MpcTxStatusUpdated`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.txId = fields.txId;; this.newStatus = fields.newStatus; }

 static reified( ): MpcTxStatusUpdatedReified { return { typeName: MpcTxStatusUpdated.$typeName, fullTypeName: composeSuiType( MpcTxStatusUpdated.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::MpcTxStatusUpdated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MpcTxStatusUpdated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MpcTxStatusUpdated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MpcTxStatusUpdated.fromBcs( data, ), bcs: MpcTxStatusUpdated.bcs, fromJSONField: (field: any) => MpcTxStatusUpdated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MpcTxStatusUpdated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MpcTxStatusUpdated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => MpcTxStatusUpdated.fetch( client, id, ), new: ( fields: MpcTxStatusUpdatedFields, ) => { return new MpcTxStatusUpdated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MpcTxStatusUpdated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MpcTxStatusUpdated>> { return phantom(MpcTxStatusUpdated.reified( )); } static get p() { return MpcTxStatusUpdated.phantom() }

 static get bcs() { return bcs.struct("MpcTxStatusUpdated", {

 workspace_id: ID.bcs, tx_id: bcs.u64(), new_status: MpcTxStatus.bcs

}) };

 static fromFields( fields: Record<string, any> ): MpcTxStatusUpdated { return MpcTxStatusUpdated.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), txId: decodeFromFields("u64", fields.tx_id), newStatus: decodeFromFields(MpcTxStatus.reified(), fields.new_status) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MpcTxStatusUpdated { if (!isMpcTxStatusUpdated(item.type)) { throw new Error("not a MpcTxStatusUpdated type");

 }

 return MpcTxStatusUpdated.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), newStatus: decodeFromFieldsWithTypes(MpcTxStatus.reified(), item.fields.new_status) } ) }

 static fromBcs( data: Uint8Array ): MpcTxStatusUpdated { return MpcTxStatusUpdated.fromFields( MpcTxStatusUpdated.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,txId: this.txId.toString(),newStatus: this.newStatus.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MpcTxStatusUpdated { return MpcTxStatusUpdated.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), txId: decodeFromJSONField("u64", field.txId), newStatus: decodeFromJSONField(MpcTxStatus.reified(), field.newStatus) } ) }

 static fromJSON( json: Record<string, any> ): MpcTxStatusUpdated { if (json.$typeName !== MpcTxStatusUpdated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MpcTxStatusUpdated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MpcTxStatusUpdated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMpcTxStatusUpdated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MpcTxStatusUpdated object`); } return MpcTxStatusUpdated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<MpcTxStatusUpdated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MpcTxStatusUpdated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMpcTxStatusUpdated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MpcTxStatusUpdated object`); }

 return MpcTxStatusUpdated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Transactions =============================== */

export function isTransactions(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transaction::Transactions`; }

export interface TransactionsFields { transactions: ToField<Bag>; transactionIdCounter: ToField<"u64"> }

export type TransactionsReified = Reified< Transactions, TransactionsFields >;

export class Transactions implements StructClass { static readonly $typeName = `${PKG_V1}::transaction::Transactions`; static readonly $numTypeParams = 0;

 readonly $typeName = Transactions.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::Transactions`;

 readonly $typeArgs: [];

 readonly transactions: ToField<Bag>; readonly transactionIdCounter: ToField<"u64">

 private constructor(typeArgs: [], fields: TransactionsFields, ) { this.$fullTypeName = composeSuiType( Transactions.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::Transactions`; this.$typeArgs = typeArgs;

 this.transactions = fields.transactions;; this.transactionIdCounter = fields.transactionIdCounter; }

 static reified( ): TransactionsReified { return { typeName: Transactions.$typeName, fullTypeName: composeSuiType( Transactions.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::Transactions`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Transactions.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Transactions.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Transactions.fromBcs( data, ), bcs: Transactions.bcs, fromJSONField: (field: any) => Transactions.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Transactions.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Transactions.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Transactions.fetch( client, id, ), new: ( fields: TransactionsFields, ) => { return new Transactions( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Transactions.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Transactions>> { return phantom(Transactions.reified( )); } static get p() { return Transactions.phantom() }

 static get bcs() { return bcs.struct("Transactions", {

 transactions: Bag.bcs, transaction_id_counter: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Transactions { return Transactions.reified( ).new( { transactions: decodeFromFields(Bag.reified(), fields.transactions), transactionIdCounter: decodeFromFields("u64", fields.transaction_id_counter) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Transactions { if (!isTransactions(item.type)) { throw new Error("not a Transactions type");

 }

 return Transactions.reified( ).new( { transactions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.transactions), transactionIdCounter: decodeFromFieldsWithTypes("u64", item.fields.transaction_id_counter) } ) }

 static fromBcs( data: Uint8Array ): Transactions { return Transactions.fromFields( Transactions.bcs.parse(data) ) }

 toJSONField() { return {

 transactions: this.transactions.toJSONField(),transactionIdCounter: this.transactionIdCounter.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Transactions { return Transactions.reified( ).new( { transactions: decodeFromJSONField(Bag.reified(), field.transactions), transactionIdCounter: decodeFromJSONField("u64", field.transactionIdCounter) } ) }

 static fromJSON( json: Record<string, any> ): Transactions { if (json.$typeName !== Transactions.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Transactions.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Transactions { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransactions(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Transactions object`); } return Transactions.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Transactions> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Transactions object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransactions(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Transactions object`); }

 return Transactions.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ActionConfigTxType =============================== */

export function isActionConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::ActionConfigTxType` + '<') }

export type ActionConfigTxTypeVariants = EnumOutputShapeWithKeys< { addWhitelistActionModule: { module_id: ToField<ID> }; removeWhitelistActionModule: { module_id: ToField<ID> }; createActionGroup: { name: ToField<String>; module_ids: ToField<Vector<ID>> }; editActionGroup: { group_id: ToField<"u16">; name_new_opt: ToField<Option<String>>; module_ids_add: ToField<Vector<ID>>; module_ids_delete: ToField<Vector<ID>> }; deleteActionGroup: { group_id: ToField<"u16"> } }, "addWhitelistActionModule" | "removeWhitelistActionModule" | "createActionGroup" | "editActionGroup" | "deleteActionGroup" >;

export type ActionConfigTxTypeReified = Reified< ActionConfigTxType, ActionConfigTxTypeVariants >;

export class ActionConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::ActionConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = ActionConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ActionConfigTxType`;

 readonly $typeArgs: []; readonly $data: ActionConfigTxTypeVariants

 private constructor(typeArgs: [], data: ActionConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( ActionConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ActionConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ActionConfigTxTypeReified { return { typeName: ActionConfigTxType.$typeName, fullTypeName: composeSuiType( ActionConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ActionConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ActionConfigTxType.fromBcs( data, ), bcs: ActionConfigTxType.bcs, new: (data: ActionConfigTxTypeVariants ) => { return new ActionConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ActionConfigTxType.reified() }

 static get bcs() { return bcs.enum("ActionConfigTxType", {

 addWhitelistActionModule: { module_id: ID.bcs }

, removeWhitelistActionModule: { module_id: ID.bcs }

, createActionGroup: { name: String.bcs, module_ids: bcs.vector(ID.bcs) }

, editActionGroup: { group_id: bcs.u16(), name_new_opt: Option.bcs(String.bcs), module_ids_add: bcs.vector(ID.bcs), module_ids_delete: bcs.vector(ID.bcs) }

, deleteActionGroup: { group_id: bcs.u16() }

 });

 } static fromBcs( data: Uint8Array ): ActionConfigTxType {

 const parsed: ActionConfigTxTypeVariants = ActionConfigTxType.bcs.parse(data);

 return new ActionConfigTxType([], parsed);

 }

 }

/* ============================== AddressBookConfigTxType =============================== */

export function isAddressBookConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::AddressBookConfigTxType` + '<') }

export type AddressBookConfigTxTypeVariants = EnumOutputShapeWithKeys< { addAddress: { name: ToField<String>; network_address: ToField<Vector<"u8">>; network_ids: ToField<Vector<String>> }; editAddress: { address_id: ToField<"u16">; name_new_opt: ToField<Option<String>>; new_network_ids: ToField<Option<Vector<String>>> }; deleteAddress: { address_id: ToField<"u16"> }; addGroup: { name: ToField<String>; address_ids: ToField<Vector<"u16">> }; editGroup: { group_id: ToField<"u16">; name_new_opt: ToField<Option<String>>; address_ids_add: ToField<Vector<"u16">>; address_ids_delete: ToField<Vector<"u16">> }; deleteGroup: { group_id: ToField<"u16"> } }, "addAddress" | "editAddress" | "deleteAddress" | "addGroup" | "editGroup" | "deleteGroup" >;

export type AddressBookConfigTxTypeReified = Reified< AddressBookConfigTxType, AddressBookConfigTxTypeVariants >;

export class AddressBookConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::AddressBookConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = AddressBookConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::AddressBookConfigTxType`;

 readonly $typeArgs: []; readonly $data: AddressBookConfigTxTypeVariants

 private constructor(typeArgs: [], data: AddressBookConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( AddressBookConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::AddressBookConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AddressBookConfigTxTypeReified { return { typeName: AddressBookConfigTxType.$typeName, fullTypeName: composeSuiType( AddressBookConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::AddressBookConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AddressBookConfigTxType.fromBcs( data, ), bcs: AddressBookConfigTxType.bcs, new: (data: AddressBookConfigTxTypeVariants ) => { return new AddressBookConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AddressBookConfigTxType.reified() }

 static get bcs() { return bcs.enum("AddressBookConfigTxType", {

 addAddress: { name: String.bcs, network_address: bcs.vector(bcs.u8()), network_ids: bcs.vector(String.bcs) }

, editAddress: { address_id: bcs.u16(), name_new_opt: Option.bcs(String.bcs), new_network_ids: Option.bcs(bcs.vector(String.bcs)) }

, deleteAddress: { address_id: bcs.u16() }

, addGroup: { name: String.bcs, address_ids: bcs.vector(bcs.u16()) }

, editGroup: { group_id: bcs.u16(), name_new_opt: Option.bcs(String.bcs), address_ids_add: bcs.vector(bcs.u16()), address_ids_delete: bcs.vector(bcs.u16()) }

, deleteGroup: { group_id: bcs.u16() }

 });

 } static fromBcs( data: Uint8Array ): AddressBookConfigTxType {

 const parsed: AddressBookConfigTxTypeVariants = AddressBookConfigTxType.bcs.parse(data);

 return new AddressBookConfigTxType([], parsed);

 }

 }

/* ============================== ConfigTxExecutionInput =============================== */

export function isConfigTxExecutionInput(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::ConfigTxExecutionInput` + '<') }

export type ConfigTxExecutionInputVariants = EnumOutputShapeWithKeys< { none: true; addVault: { encrypted_user_shares: ToField<Vector<Vector<"u8">>>; dwltn_dwallet_cap_id: ToField<ID> }; addExternalSigner: { vaults_encrypted_user_shares_map: ToField<VecMap<"u16", Vector<"u8">>> }; shareUserShares: { vaults_encrypted_user_shares_map: ToField<VecMap<"u16", Vector<"u8">>> } }, "none" | "addVault" | "addExternalSigner" | "shareUserShares" >;

export type ConfigTxExecutionInputReified = Reified< ConfigTxExecutionInput, ConfigTxExecutionInputVariants >;

export class ConfigTxExecutionInput implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::ConfigTxExecutionInput`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxExecutionInput.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ConfigTxExecutionInput`;

 readonly $typeArgs: []; readonly $data: ConfigTxExecutionInputVariants

 private constructor(typeArgs: [], data: ConfigTxExecutionInputVariants) { this.$fullTypeName = composeSuiType( ConfigTxExecutionInput.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ConfigTxExecutionInput`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ConfigTxExecutionInputReified { return { typeName: ConfigTxExecutionInput.$typeName, fullTypeName: composeSuiType( ConfigTxExecutionInput.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ConfigTxExecutionInput`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ConfigTxExecutionInput.fromBcs( data, ), bcs: ConfigTxExecutionInput.bcs, new: (data: ConfigTxExecutionInputVariants ) => { return new ConfigTxExecutionInput( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ConfigTxExecutionInput.reified() }

 static get bcs() { return bcs.enum("ConfigTxExecutionInput", {

 none: null

, addVault: { encrypted_user_shares: bcs.vector(bcs.vector(bcs.u8())), dwltn_dwallet_cap_id: ID.bcs }

, addExternalSigner: { vaults_encrypted_user_shares_map: VecMap.bcs(bcs.u16(), bcs.vector(bcs.u8())) }

, shareUserShares: { vaults_encrypted_user_shares_map: VecMap.bcs(bcs.u16(), bcs.vector(bcs.u8())) }

 });

 } static fromBcs( data: Uint8Array ): ConfigTxExecutionInput {

 const parsed: ConfigTxExecutionInputVariants = ConfigTxExecutionInput.bcs.parse(data);

 return new ConfigTxExecutionInput([], parsed);

 }

 }

/* ============================== ConfigTxReturnTypes =============================== */

export function isConfigTxReturnTypes(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::ConfigTxReturnTypes` + '<') }

export type ConfigTxReturnTypesVariants = EnumOutputShapeWithKeys< { none: true; initVaultContainerRequest: { vault_container_req: ToField<InitVaultContainerRequest> } }, "none" | "initVaultContainerRequest" >;

export type ConfigTxReturnTypesReified = Reified< ConfigTxReturnTypes, ConfigTxReturnTypesVariants >;

export class ConfigTxReturnTypes implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::ConfigTxReturnTypes`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxReturnTypes.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ConfigTxReturnTypes`;

 readonly $typeArgs: []; readonly $data: ConfigTxReturnTypesVariants

 private constructor(typeArgs: [], data: ConfigTxReturnTypesVariants) { this.$fullTypeName = composeSuiType( ConfigTxReturnTypes.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ConfigTxReturnTypes`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ConfigTxReturnTypesReified { return { typeName: ConfigTxReturnTypes.$typeName, fullTypeName: composeSuiType( ConfigTxReturnTypes.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ConfigTxReturnTypes`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ConfigTxReturnTypes.fromBcs( data, ), bcs: ConfigTxReturnTypes.bcs, new: (data: ConfigTxReturnTypesVariants ) => { return new ConfigTxReturnTypes( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ConfigTxReturnTypes.reified() }

 static get bcs() { return bcs.enum("ConfigTxReturnTypes", {

 none: null

, initVaultContainerRequest: { vault_container_req: InitVaultContainerRequest.bcs }

 });

 } static fromBcs( data: Uint8Array ): ConfigTxReturnTypes {

 const parsed: ConfigTxReturnTypesVariants = ConfigTxReturnTypes.bcs.parse(data);

 return new ConfigTxReturnTypes([], parsed);

 }

 }

/* ============================== ConfigTxStatus =============================== */

export function isConfigTxStatus(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::ConfigTxStatus` + '<') }

export type ConfigTxStatusVariants = EnumOutputShapeWithKeys< { pendingApproval: { proposal: ToField<Proposal> }; directApproval: true; rejected: true; executed: true; cancelled: true }, "pendingApproval" | "directApproval" | "rejected" | "executed" | "cancelled" >;

export type ConfigTxStatusReified = Reified< ConfigTxStatus, ConfigTxStatusVariants >;

export class ConfigTxStatus implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::ConfigTxStatus`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxStatus.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ConfigTxStatus`;

 readonly $typeArgs: []; readonly $data: ConfigTxStatusVariants

 private constructor(typeArgs: [], data: ConfigTxStatusVariants) { this.$fullTypeName = composeSuiType( ConfigTxStatus.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ConfigTxStatus`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ConfigTxStatusReified { return { typeName: ConfigTxStatus.$typeName, fullTypeName: composeSuiType( ConfigTxStatus.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ConfigTxStatus`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ConfigTxStatus.fromBcs( data, ), bcs: ConfigTxStatus.bcs, new: (data: ConfigTxStatusVariants ) => { return new ConfigTxStatus( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ConfigTxStatus.reified() }

 static get bcs() { return bcs.enum("ConfigTxStatus", {

 pendingApproval: { proposal: Proposal.bcs }

, directApproval: null

, rejected: null

, executed: null

, cancelled: null

 });

 } static fromBcs( data: Uint8Array ): ConfigTxStatus {

 const parsed: ConfigTxStatusVariants = ConfigTxStatus.bcs.parse(data);

 return new ConfigTxStatus([], parsed);

 }

 }

/* ============================== ConfigTxType =============================== */

export function isConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::ConfigTxType` + '<') }

export type ConfigTxTypeVariants = EnumOutputShapeWithKeys< { vaultConfig: { pos0: ToField<VaultConfigTxType> }; userConfig: { pos0: ToField<UserConfigTxType> }; addressBookConfig: { pos0: ToField<AddressBookConfigTxType> }; otherConfig: { pos0: ToField<OtherConfigTxType> }; actionConfig: { pos0: ToField<ActionConfigTxType> } }, "vaultConfig" | "userConfig" | "addressBookConfig" | "otherConfig" | "actionConfig" >;

export type ConfigTxTypeReified = Reified< ConfigTxType, ConfigTxTypeVariants >;

export class ConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::ConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::ConfigTxType`;

 readonly $typeArgs: []; readonly $data: ConfigTxTypeVariants

 private constructor(typeArgs: [], data: ConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( ConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::ConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ConfigTxTypeReified { return { typeName: ConfigTxType.$typeName, fullTypeName: composeSuiType( ConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::ConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ConfigTxType.fromBcs( data, ), bcs: ConfigTxType.bcs, new: (data: ConfigTxTypeVariants ) => { return new ConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ConfigTxType.reified() }

 static get bcs() { return bcs.enum("ConfigTxType", {

 vaultConfig: { pos0: VaultConfigTxType.bcs }

, userConfig: { pos0: UserConfigTxType.bcs }

, addressBookConfig: { pos0: AddressBookConfigTxType.bcs }

, otherConfig: { pos0: OtherConfigTxType.bcs }

, actionConfig: { pos0: ActionConfigTxType.bcs }

 });

 } static fromBcs( data: Uint8Array ): ConfigTxType {

 const parsed: ConfigTxTypeVariants = ConfigTxType.bcs.parse(data);

 return new ConfigTxType([], parsed);

 }

 }

/* ============================== MpcTxStatus =============================== */

export function isMpcTxStatus(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::MpcTxStatus` + '<') }

export type MpcTxStatusVariants = EnumOutputShapeWithKeys< { blocked: true; pendingApproval: { proposal: ToField<Proposal> }; autoApproved: true; proposalRejected: true; readySigning: { tx_signable: ToField<Vector<Vector<"u8">>> }; signingRequested: true; cancelled: true }, "blocked" | "pendingApproval" | "autoApproved" | "proposalRejected" | "readySigning" | "signingRequested" | "cancelled" >;

export type MpcTxStatusReified = Reified< MpcTxStatus, MpcTxStatusVariants >;

export class MpcTxStatus implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::MpcTxStatus`; static readonly $numTypeParams = 0;

 readonly $typeName = MpcTxStatus.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::MpcTxStatus`;

 readonly $typeArgs: []; readonly $data: MpcTxStatusVariants

 private constructor(typeArgs: [], data: MpcTxStatusVariants) { this.$fullTypeName = composeSuiType( MpcTxStatus.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::MpcTxStatus`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): MpcTxStatusReified { return { typeName: MpcTxStatus.$typeName, fullTypeName: composeSuiType( MpcTxStatus.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::MpcTxStatus`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => MpcTxStatus.fromBcs( data, ), bcs: MpcTxStatus.bcs, new: (data: MpcTxStatusVariants ) => { return new MpcTxStatus( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return MpcTxStatus.reified() }

 static get bcs() { return bcs.enum("MpcTxStatus", {

 blocked: null

, pendingApproval: { proposal: Proposal.bcs }

, autoApproved: null

, proposalRejected: null

, readySigning: { tx_signable: bcs.vector(bcs.vector(bcs.u8())) }

, signingRequested: null

, cancelled: null

 });

 } static fromBcs( data: Uint8Array ): MpcTxStatus {

 const parsed: MpcTxStatusVariants = MpcTxStatus.bcs.parse(data);

 return new MpcTxStatus([], parsed);

 }

 }

/* ============================== OtherConfigTxType =============================== */

export function isOtherConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::OtherConfigTxType` + '<') }

export type OtherConfigTxTypeVariants = EnumOutputShapeWithKeys< { editWorkspaceName: { new_workspace_name: ToField<String> }; editPolicy: { new_policy_rules: ToField<Vector<PolicyRule>> }; registerAccountRecovery: { user_id: ToField<"u16">; recovery_address: ToField<"address">; public_key: ToField<Vector<"u8">>; encrypted_user_shares_map: ToField<VecMap<"u16", Vector<"u8">>> }; revokeRecovery: { user_id: ToField<"u16"> } }, "editWorkspaceName" | "editPolicy" | "registerAccountRecovery" | "revokeRecovery" >;

export type OtherConfigTxTypeReified = Reified< OtherConfigTxType, OtherConfigTxTypeVariants >;

export class OtherConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::OtherConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = OtherConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::OtherConfigTxType`;

 readonly $typeArgs: []; readonly $data: OtherConfigTxTypeVariants

 private constructor(typeArgs: [], data: OtherConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( OtherConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::OtherConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): OtherConfigTxTypeReified { return { typeName: OtherConfigTxType.$typeName, fullTypeName: composeSuiType( OtherConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::OtherConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => OtherConfigTxType.fromBcs( data, ), bcs: OtherConfigTxType.bcs, new: (data: OtherConfigTxTypeVariants ) => { return new OtherConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return OtherConfigTxType.reified() }

 static get bcs() { return bcs.enum("OtherConfigTxType", {

 editWorkspaceName: { new_workspace_name: String.bcs }

, editPolicy: { new_policy_rules: bcs.vector(PolicyRule.bcs) }

, registerAccountRecovery: { user_id: bcs.u16(), recovery_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), public_key: bcs.vector(bcs.u8()), encrypted_user_shares_map: VecMap.bcs(bcs.u16(), bcs.vector(bcs.u8())) }

, revokeRecovery: { user_id: bcs.u16() }

 });

 } static fromBcs( data: Uint8Array ): OtherConfigTxType {

 const parsed: OtherConfigTxTypeVariants = OtherConfigTxType.bcs.parse(data);

 return new OtherConfigTxType([], parsed);

 }

 }

/* ============================== UserConfigTxType =============================== */

export function isUserConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::UserConfigTxType` + '<') }

export type UserConfigTxTypeVariants = EnumOutputShapeWithKeys< { addUser: { name: ToField<String>; registration_address_type: ToField<"u8">; registration_address: ToField<Vector<"u8">>; role_id: ToField<"u16">; groups_to_add_to: ToField<Vector<"u16">> }; editUser: { user_id: ToField<"u16">; name_new_opt: ToField<Option<String>>; new_role_id_opt: ToField<Option<"u16">> }; deleteUser: { user_id: ToField<"u16"> }; resetUser: { user_id: ToField<"u16">; reset_init_cap: ToField<"bool">; new_registration_address_type: ToField<Option<"u8">>; new_registration_address: ToField<Option<Vector<"u8">>> }; resetInitCapUser: { user_id: ToField<"u16">; new_registration_address_type: ToField<"u8">; new_registration_address: ToField<Vector<"u8">> }; createUserGroup: { name: ToField<String>; user_ids: ToField<Vector<"u16">> }; editUserGroup: { group_id: ToField<"u16">; name_new_opt: ToField<Option<String>>; user_ids_add: ToField<Vector<"u16">>; user_ids_delete: ToField<Vector<"u16">> }; deleteUserGroup: { group_id: ToField<"u16"> }; editQuorum: { new_quorum: ToField<"u16"> }; addRole: { new_role: ToField<Role> } }, "addUser" | "editUser" | "deleteUser" | "resetUser" | "resetInitCapUser" | "createUserGroup" | "editUserGroup" | "deleteUserGroup" | "editQuorum" | "addRole" >;

export type UserConfigTxTypeReified = Reified< UserConfigTxType, UserConfigTxTypeVariants >;

export class UserConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::UserConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = UserConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::UserConfigTxType`;

 readonly $typeArgs: []; readonly $data: UserConfigTxTypeVariants

 private constructor(typeArgs: [], data: UserConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( UserConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::UserConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): UserConfigTxTypeReified { return { typeName: UserConfigTxType.$typeName, fullTypeName: composeSuiType( UserConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::UserConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => UserConfigTxType.fromBcs( data, ), bcs: UserConfigTxType.bcs, new: (data: UserConfigTxTypeVariants ) => { return new UserConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return UserConfigTxType.reified() }

 static get bcs() { return bcs.enum("UserConfigTxType", {

 addUser: { name: String.bcs, registration_address_type: bcs.u8(), registration_address: bcs.vector(bcs.u8()), role_id: bcs.u16(), groups_to_add_to: bcs.vector(bcs.u16()) }

, editUser: { user_id: bcs.u16(), name_new_opt: Option.bcs(String.bcs), new_role_id_opt: Option.bcs(bcs.u16()) }

, deleteUser: { user_id: bcs.u16() }

, resetUser: { user_id: bcs.u16(), reset_init_cap: bcs.bool(), new_registration_address_type: Option.bcs(bcs.u8()), new_registration_address: Option.bcs(bcs.vector(bcs.u8())) }

, resetInitCapUser: { user_id: bcs.u16(), new_registration_address_type: bcs.u8(), new_registration_address: bcs.vector(bcs.u8()) }

, createUserGroup: { name: String.bcs, user_ids: bcs.vector(bcs.u16()) }

, editUserGroup: { group_id: bcs.u16(), name_new_opt: Option.bcs(String.bcs), user_ids_add: bcs.vector(bcs.u16()), user_ids_delete: bcs.vector(bcs.u16()) }

, deleteUserGroup: { group_id: bcs.u16() }

, editQuorum: { new_quorum: bcs.u16() }

, addRole: { new_role: Role.bcs }

 });

 } static fromBcs( data: Uint8Array ): UserConfigTxType {

 const parsed: UserConfigTxTypeVariants = UserConfigTxType.bcs.parse(data);

 return new UserConfigTxType([], parsed);

 }

 }

/* ============================== VaultConfigTxType =============================== */

export function isVaultConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::transaction::VaultConfigTxType` + '<') }

export type VaultConfigTxTypeVariants = EnumOutputShapeWithKeys< { addVault: { name: ToField<String>; vault_group_id: ToField<"u16">; vault_profile_id: ToField<String> }; editVault: { vault_id: ToField<"u16">; name_new_opt: ToField<Option<String>>; vault_group_id_new_opt: ToField<Option<"u16">>; vault_profile_id_new_opt: ToField<Option<String>> }; addVaultGroup: { name: ToField<String>; vault_ids: ToField<Vector<"u16">> }; editVaultGroup: { name_new_opt: ToField<Option<String>>; vault_group_id: ToField<"u16">; vault_ids_add: ToField<Vector<"u16">>; vault_ids_remove: ToField<Vector<"u16">> }; deleteVaultGroup: { vault_group_id: ToField<"u16"> }; addExternalSigner: { public_key: ToField<Vector<"u8">> }; shareUserShares: { user_id: ToField<"u16"> }; vaultProfileAdd: { profile_name: ToField<String>; vault_profile: ToField<VaultProfile> }; vaultProfileEdit: { profile_name: ToField<String>; vault_profile: ToField<VaultProfile> }; vaultProfileDelete: { profile_name: ToField<String> } }, "addVault" | "editVault" | "addVaultGroup" | "editVaultGroup" | "deleteVaultGroup" | "addExternalSigner" | "shareUserShares" | "vaultProfileAdd" | "vaultProfileEdit" | "vaultProfileDelete" >;

export type VaultConfigTxTypeReified = Reified< VaultConfigTxType, VaultConfigTxTypeVariants >;

export class VaultConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::transaction::VaultConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = VaultConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transaction::VaultConfigTxType`;

 readonly $typeArgs: []; readonly $data: VaultConfigTxTypeVariants

 private constructor(typeArgs: [], data: VaultConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( VaultConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transaction::VaultConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): VaultConfigTxTypeReified { return { typeName: VaultConfigTxType.$typeName, fullTypeName: composeSuiType( VaultConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::transaction::VaultConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => VaultConfigTxType.fromBcs( data, ), bcs: VaultConfigTxType.bcs, new: (data: VaultConfigTxTypeVariants ) => { return new VaultConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return VaultConfigTxType.reified() }

 static get bcs() { return bcs.enum("VaultConfigTxType", {

 addVault: { name: String.bcs, vault_group_id: bcs.u16(), vault_profile_id: String.bcs }

, editVault: { vault_id: bcs.u16(), name_new_opt: Option.bcs(String.bcs), vault_group_id_new_opt: Option.bcs(bcs.u16()), vault_profile_id_new_opt: Option.bcs(String.bcs) }

, addVaultGroup: { name: String.bcs, vault_ids: bcs.vector(bcs.u16()) }

, editVaultGroup: { name_new_opt: Option.bcs(String.bcs), vault_group_id: bcs.u16(), vault_ids_add: bcs.vector(bcs.u16()), vault_ids_remove: bcs.vector(bcs.u16()) }

, deleteVaultGroup: { vault_group_id: bcs.u16() }

, addExternalSigner: { public_key: bcs.vector(bcs.u8()) }

, shareUserShares: { user_id: bcs.u16() }

, vaultProfileAdd: { profile_name: String.bcs, vault_profile: VaultProfile.bcs }

, vaultProfileEdit: { profile_name: String.bcs, vault_profile: VaultProfile.bcs }

, vaultProfileDelete: { profile_name: String.bcs }

 });

 } static fromBcs( data: Uint8Array ): VaultConfigTxType {

 const parsed: VaultConfigTxTypeVariants = VaultConfigTxType.bcs.parse(data);

 return new VaultConfigTxType([], parsed);

 }

 }
