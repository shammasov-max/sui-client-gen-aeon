import * as reified from "../../../../_framework/reified";
import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, Vector, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {Bag} from "../../../../sui/bag/structs";
import {ID, UID} from "../../../../sui/object/structs";
import {VecMap} from "../../../../sui/vec-map/structs";
import {Option} from "../../0x1/option/structs";
import {String} from "../../0x1/string/structs";
import {PKG_V1} from "../index";
import {BcsType, bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== AddedModuleTransaction =============================== */

export function isAddedModuleTransaction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::module_interface::AddedModuleTransaction` + '<'); }

export interface AddedModuleTransactionFields<T extends TypeArgument> { workspaceId: ToField<ID>; vaultId: ToField<"u16">; moduleId: ToField<ID>; txId: ToField<"u64">; transaction: ToField<T> }

export type AddedModuleTransactionReified<T extends TypeArgument> = Reified< AddedModuleTransaction<T>, AddedModuleTransactionFields<T> >;

export class AddedModuleTransaction<T extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::AddedModuleTransaction`; static readonly $numTypeParams = 1;

 readonly $typeName = AddedModuleTransaction.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::AddedModuleTransaction<${ToTypeStr<T>}>`;

 readonly $typeArgs: [ToTypeStr<T>];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly moduleId: ToField<ID>; readonly txId: ToField<"u64">; readonly transaction: ToField<T>

 private constructor(typeArgs: [ToTypeStr<T>], fields: AddedModuleTransactionFields<T>, ) { this.$fullTypeName = composeSuiType( AddedModuleTransaction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::AddedModuleTransaction<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.moduleId = fields.moduleId;; this.txId = fields.txId;; this.transaction = fields.transaction; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): AddedModuleTransactionReified<ToTypeArgument<T>> { return { typeName: AddedModuleTransaction.$typeName, fullTypeName: composeSuiType( AddedModuleTransaction.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::module_interface::AddedModuleTransaction<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => AddedModuleTransaction.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AddedModuleTransaction.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => AddedModuleTransaction.fromBcs( T, data, ), bcs: AddedModuleTransaction.bcs(toBcs(T)), fromJSONField: (field: any) => AddedModuleTransaction.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => AddedModuleTransaction.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => AddedModuleTransaction.fromSuiParsedData( T, content, ), fetch: async (client: SuiClient, id: string) => AddedModuleTransaction.fetch( client, T, id, ), new: ( fields: AddedModuleTransactionFields<ToTypeArgument<T>>, ) => { return new AddedModuleTransaction( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return AddedModuleTransaction.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<AddedModuleTransaction<ToTypeArgument<T>>>> { return phantom(AddedModuleTransaction.reified( T )); } static get p() { return AddedModuleTransaction.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`AddedModuleTransaction<${T.name}>`, {

 workspace_id: ID.bcs, vault_id: bcs.u16(), module_id: ID.bcs, tx_id: bcs.u64(), transaction: T

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): AddedModuleTransaction<ToTypeArgument<T>> { return AddedModuleTransaction.reified( typeArg, ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), moduleId: decodeFromFields(ID.reified(), fields.module_id), txId: decodeFromFields("u64", fields.tx_id), transaction: decodeFromFields(typeArg, fields.transaction) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): AddedModuleTransaction<ToTypeArgument<T>> { if (!isAddedModuleTransaction(item.type)) { throw new Error("not a AddedModuleTransaction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return AddedModuleTransaction.reified( typeArg, ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), moduleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.module_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), transaction: decodeFromFieldsWithTypes(typeArg, item.fields.transaction) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): AddedModuleTransaction<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return AddedModuleTransaction.fromFields( typeArg, AddedModuleTransaction.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,moduleId: this.moduleId,txId: this.txId.toString(),transaction: fieldToJSON<T>(this.$typeArgs[0], this.transaction),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): AddedModuleTransaction<ToTypeArgument<T>> { return AddedModuleTransaction.reified( typeArg, ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), moduleId: decodeFromJSONField(ID.reified(), field.moduleId), txId: decodeFromJSONField("u64", field.txId), transaction: decodeFromJSONField(typeArg, field.transaction) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): AddedModuleTransaction<ToTypeArgument<T>> { if (json.$typeName !== AddedModuleTransaction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(AddedModuleTransaction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return AddedModuleTransaction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): AddedModuleTransaction<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAddedModuleTransaction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AddedModuleTransaction object`); } return AddedModuleTransaction.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<AddedModuleTransaction<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AddedModuleTransaction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAddedModuleTransaction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AddedModuleTransaction object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return AddedModuleTransaction.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== BalanceChange =============================== */

export function isBalanceChange(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::BalanceChange`; }

export interface BalanceChangeFields { tokenAddress: ToField<Vector<"u8">>; counterparty: ToField<Vector<"u8">>; network: ToField<String>; amount: ToField<"u256">; amountDollar: ToField<"u256"> }

export type BalanceChangeReified = Reified< BalanceChange, BalanceChangeFields >;

export class BalanceChange implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::BalanceChange`; static readonly $numTypeParams = 0;

 readonly $typeName = BalanceChange.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::BalanceChange`;

 readonly $typeArgs: [];

 readonly tokenAddress: ToField<Vector<"u8">>; readonly counterparty: ToField<Vector<"u8">>; readonly network: ToField<String>; readonly amount: ToField<"u256">; readonly amountDollar: ToField<"u256">

 private constructor(typeArgs: [], fields: BalanceChangeFields, ) { this.$fullTypeName = composeSuiType( BalanceChange.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::BalanceChange`; this.$typeArgs = typeArgs;

 this.tokenAddress = fields.tokenAddress;; this.counterparty = fields.counterparty;; this.network = fields.network;; this.amount = fields.amount;; this.amountDollar = fields.amountDollar; }

 static reified( ): BalanceChangeReified { return { typeName: BalanceChange.$typeName, fullTypeName: composeSuiType( BalanceChange.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::BalanceChange`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => BalanceChange.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BalanceChange.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => BalanceChange.fromBcs( data, ), bcs: BalanceChange.bcs, fromJSONField: (field: any) => BalanceChange.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => BalanceChange.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => BalanceChange.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => BalanceChange.fetch( client, id, ), new: ( fields: BalanceChangeFields, ) => { return new BalanceChange( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return BalanceChange.reified() }

 static phantom( ): PhantomReified<ToTypeStr<BalanceChange>> { return phantom(BalanceChange.reified( )); } static get p() { return BalanceChange.phantom() }

 static get bcs() { return bcs.struct("BalanceChange", {

 token_address: bcs.vector(bcs.u8()), counterparty: bcs.vector(bcs.u8()), network: String.bcs, amount: bcs.u256(), amount_dollar: bcs.u256()

}) };

 static fromFields( fields: Record<string, any> ): BalanceChange { return BalanceChange.reified( ).new( { tokenAddress: decodeFromFields(reified.vector("u8"), fields.token_address), counterparty: decodeFromFields(reified.vector("u8"), fields.counterparty), network: decodeFromFields(String.reified(), fields.network), amount: decodeFromFields("u256", fields.amount), amountDollar: decodeFromFields("u256", fields.amount_dollar) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): BalanceChange { if (!isBalanceChange(item.type)) { throw new Error("not a BalanceChange type");

 }

 return BalanceChange.reified( ).new( { tokenAddress: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.token_address), counterparty: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.counterparty), network: decodeFromFieldsWithTypes(String.reified(), item.fields.network), amount: decodeFromFieldsWithTypes("u256", item.fields.amount), amountDollar: decodeFromFieldsWithTypes("u256", item.fields.amount_dollar) } ) }

 static fromBcs( data: Uint8Array ): BalanceChange { return BalanceChange.fromFields( BalanceChange.bcs.parse(data) ) }

 toJSONField() { return {

 tokenAddress: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.tokenAddress),counterparty: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.counterparty),network: this.network,amount: this.amount.toString(),amountDollar: this.amountDollar.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): BalanceChange { return BalanceChange.reified( ).new( { tokenAddress: decodeFromJSONField(reified.vector("u8"), field.tokenAddress), counterparty: decodeFromJSONField(reified.vector("u8"), field.counterparty), network: decodeFromJSONField(String.reified(), field.network), amount: decodeFromJSONField("u256", field.amount), amountDollar: decodeFromJSONField("u256", field.amountDollar) } ) }

 static fromJSON( json: Record<string, any> ): BalanceChange { if (json.$typeName !== BalanceChange.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return BalanceChange.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): BalanceChange { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBalanceChange(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BalanceChange object`); } return BalanceChange.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<BalanceChange> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BalanceChange object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBalanceChange(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BalanceChange object`); }

 return BalanceChange.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ContainerRegisteredResult =============================== */

export function isContainerRegisteredResult(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::ContainerRegisteredResult`; }

export interface ContainerRegisteredResultFields { workspaceId: ToField<ID>; containerId: ToField<ID> }

export type ContainerRegisteredResultReified = Reified< ContainerRegisteredResult, ContainerRegisteredResultFields >;

export class ContainerRegisteredResult implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ContainerRegisteredResult`; static readonly $numTypeParams = 0;

 readonly $typeName = ContainerRegisteredResult.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ContainerRegisteredResult`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly containerId: ToField<ID>

 private constructor(typeArgs: [], fields: ContainerRegisteredResultFields, ) { this.$fullTypeName = composeSuiType( ContainerRegisteredResult.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ContainerRegisteredResult`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.containerId = fields.containerId; }

 static reified( ): ContainerRegisteredResultReified { return { typeName: ContainerRegisteredResult.$typeName, fullTypeName: composeSuiType( ContainerRegisteredResult.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::ContainerRegisteredResult`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ContainerRegisteredResult.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ContainerRegisteredResult.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ContainerRegisteredResult.fromBcs( data, ), bcs: ContainerRegisteredResult.bcs, fromJSONField: (field: any) => ContainerRegisteredResult.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ContainerRegisteredResult.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ContainerRegisteredResult.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ContainerRegisteredResult.fetch( client, id, ), new: ( fields: ContainerRegisteredResultFields, ) => { return new ContainerRegisteredResult( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ContainerRegisteredResult.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ContainerRegisteredResult>> { return phantom(ContainerRegisteredResult.reified( )); } static get p() { return ContainerRegisteredResult.phantom() }

 static get bcs() { return bcs.struct("ContainerRegisteredResult", {

 workspace_id: ID.bcs, container_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): ContainerRegisteredResult { return ContainerRegisteredResult.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), containerId: decodeFromFields(ID.reified(), fields.container_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ContainerRegisteredResult { if (!isContainerRegisteredResult(item.type)) { throw new Error("not a ContainerRegisteredResult type");

 }

 return ContainerRegisteredResult.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), containerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.container_id) } ) }

 static fromBcs( data: Uint8Array ): ContainerRegisteredResult { return ContainerRegisteredResult.fromFields( ContainerRegisteredResult.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,containerId: this.containerId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ContainerRegisteredResult { return ContainerRegisteredResult.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), containerId: decodeFromJSONField(ID.reified(), field.containerId) } ) }

 static fromJSON( json: Record<string, any> ): ContainerRegisteredResult { if (json.$typeName !== ContainerRegisteredResult.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ContainerRegisteredResult.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ContainerRegisteredResult { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isContainerRegisteredResult(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ContainerRegisteredResult object`); } return ContainerRegisteredResult.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ContainerRegisteredResult> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ContainerRegisteredResult object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isContainerRegisteredResult(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ContainerRegisteredResult object`); }

 return ContainerRegisteredResult.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== InitModuleContainerRequest =============================== */

export function isInitModuleContainerRequest(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::InitModuleContainerRequest`; }

export interface InitModuleContainerRequestFields { workspaceId: ToField<ID>; moduleId: ToField<ID> }

export type InitModuleContainerRequestReified = Reified< InitModuleContainerRequest, InitModuleContainerRequestFields >;

export class InitModuleContainerRequest implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::InitModuleContainerRequest`; static readonly $numTypeParams = 0;

 readonly $typeName = InitModuleContainerRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::InitModuleContainerRequest`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly moduleId: ToField<ID>

 private constructor(typeArgs: [], fields: InitModuleContainerRequestFields, ) { this.$fullTypeName = composeSuiType( InitModuleContainerRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::InitModuleContainerRequest`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.moduleId = fields.moduleId; }

 static reified( ): InitModuleContainerRequestReified { return { typeName: InitModuleContainerRequest.$typeName, fullTypeName: composeSuiType( InitModuleContainerRequest.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::InitModuleContainerRequest`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => InitModuleContainerRequest.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => InitModuleContainerRequest.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => InitModuleContainerRequest.fromBcs( data, ), bcs: InitModuleContainerRequest.bcs, fromJSONField: (field: any) => InitModuleContainerRequest.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => InitModuleContainerRequest.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => InitModuleContainerRequest.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => InitModuleContainerRequest.fetch( client, id, ), new: ( fields: InitModuleContainerRequestFields, ) => { return new InitModuleContainerRequest( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return InitModuleContainerRequest.reified() }

 static phantom( ): PhantomReified<ToTypeStr<InitModuleContainerRequest>> { return phantom(InitModuleContainerRequest.reified( )); } static get p() { return InitModuleContainerRequest.phantom() }

 static get bcs() { return bcs.struct("InitModuleContainerRequest", {

 workspace_id: ID.bcs, module_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): InitModuleContainerRequest { return InitModuleContainerRequest.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), moduleId: decodeFromFields(ID.reified(), fields.module_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): InitModuleContainerRequest { if (!isInitModuleContainerRequest(item.type)) { throw new Error("not a InitModuleContainerRequest type");

 }

 return InitModuleContainerRequest.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), moduleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.module_id) } ) }

 static fromBcs( data: Uint8Array ): InitModuleContainerRequest { return InitModuleContainerRequest.fromFields( InitModuleContainerRequest.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,moduleId: this.moduleId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): InitModuleContainerRequest { return InitModuleContainerRequest.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), moduleId: decodeFromJSONField(ID.reified(), field.moduleId) } ) }

 static fromJSON( json: Record<string, any> ): InitModuleContainerRequest { if (json.$typeName !== InitModuleContainerRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return InitModuleContainerRequest.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): InitModuleContainerRequest { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isInitModuleContainerRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a InitModuleContainerRequest object`); } return InitModuleContainerRequest.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<InitModuleContainerRequest> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching InitModuleContainerRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isInitModuleContainerRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a InitModuleContainerRequest object`); }

 return InitModuleContainerRequest.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== InitVaultContainerRequest =============================== */

export function isInitVaultContainerRequest(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::InitVaultContainerRequest`; }

export interface InitVaultContainerRequestFields { workspaceId: ToField<ID>; vaultId: ToField<"u16">; requiredModuleIds: ToField<Vector<ID>> }

export type InitVaultContainerRequestReified = Reified< InitVaultContainerRequest, InitVaultContainerRequestFields >;

export class InitVaultContainerRequest implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::InitVaultContainerRequest`; static readonly $numTypeParams = 0;

 readonly $typeName = InitVaultContainerRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::InitVaultContainerRequest`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly requiredModuleIds: ToField<Vector<ID>>

 private constructor(typeArgs: [], fields: InitVaultContainerRequestFields, ) { this.$fullTypeName = composeSuiType( InitVaultContainerRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::InitVaultContainerRequest`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.requiredModuleIds = fields.requiredModuleIds; }

 static reified( ): InitVaultContainerRequestReified { return { typeName: InitVaultContainerRequest.$typeName, fullTypeName: composeSuiType( InitVaultContainerRequest.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::InitVaultContainerRequest`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => InitVaultContainerRequest.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => InitVaultContainerRequest.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => InitVaultContainerRequest.fromBcs( data, ), bcs: InitVaultContainerRequest.bcs, fromJSONField: (field: any) => InitVaultContainerRequest.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => InitVaultContainerRequest.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => InitVaultContainerRequest.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => InitVaultContainerRequest.fetch( client, id, ), new: ( fields: InitVaultContainerRequestFields, ) => { return new InitVaultContainerRequest( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return InitVaultContainerRequest.reified() }

 static phantom( ): PhantomReified<ToTypeStr<InitVaultContainerRequest>> { return phantom(InitVaultContainerRequest.reified( )); } static get p() { return InitVaultContainerRequest.phantom() }

 static get bcs() { return bcs.struct("InitVaultContainerRequest", {

 workspace_id: ID.bcs, vault_id: bcs.u16(), required_module_ids: bcs.vector(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): InitVaultContainerRequest { return InitVaultContainerRequest.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), requiredModuleIds: decodeFromFields(reified.vector(ID.reified()), fields.required_module_ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): InitVaultContainerRequest { if (!isInitVaultContainerRequest(item.type)) { throw new Error("not a InitVaultContainerRequest type");

 }

 return InitVaultContainerRequest.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), requiredModuleIds: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.required_module_ids) } ) }

 static fromBcs( data: Uint8Array ): InitVaultContainerRequest { return InitVaultContainerRequest.fromFields( InitVaultContainerRequest.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,requiredModuleIds: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.requiredModuleIds),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): InitVaultContainerRequest { return InitVaultContainerRequest.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), requiredModuleIds: decodeFromJSONField(reified.vector(ID.reified()), field.requiredModuleIds) } ) }

 static fromJSON( json: Record<string, any> ): InitVaultContainerRequest { if (json.$typeName !== InitVaultContainerRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return InitVaultContainerRequest.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): InitVaultContainerRequest { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isInitVaultContainerRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a InitVaultContainerRequest object`); } return InitVaultContainerRequest.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<InitVaultContainerRequest> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching InitVaultContainerRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isInitVaultContainerRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a InitVaultContainerRequest object`); }

 return InitVaultContainerRequest.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ModuleActionRequest =============================== */

export function isModuleActionRequest(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::module_interface::ModuleActionRequest` + '<'); }

export interface ModuleActionRequestFields<A extends TypeArgument> { workspaceId: ToField<ID>; vaultId: ToField<"u16">; moduleId: ToField<ID>; networkId: ToField<String>; txId: ToField<"u64">; action: ToField<A> }

export type ModuleActionRequestReified<A extends TypeArgument> = Reified< ModuleActionRequest<A>, ModuleActionRequestFields<A> >;

export class ModuleActionRequest<A extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ModuleActionRequest`; static readonly $numTypeParams = 1;

 readonly $typeName = ModuleActionRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ModuleActionRequest<${ToTypeStr<A>}>`;

 readonly $typeArgs: [ToTypeStr<A>];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly moduleId: ToField<ID>; readonly networkId: ToField<String>; readonly txId: ToField<"u64">; readonly action: ToField<A>

 private constructor(typeArgs: [ToTypeStr<A>], fields: ModuleActionRequestFields<A>, ) { this.$fullTypeName = composeSuiType( ModuleActionRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ModuleActionRequest<${ToTypeStr<A>}>`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.moduleId = fields.moduleId;; this.networkId = fields.networkId;; this.txId = fields.txId;; this.action = fields.action; }

 static reified<A extends Reified<TypeArgument, any>>( A: A ): ModuleActionRequestReified<ToTypeArgument<A>> { return { typeName: ModuleActionRequest.$typeName, fullTypeName: composeSuiType( ModuleActionRequest.$typeName, ...[extractType(A)] ) as `${typeof PKG_V1}::module_interface::ModuleActionRequest<${ToTypeStr<ToTypeArgument<A>>}>`, typeArgs: [ extractType(A) ] as [ToTypeStr<ToTypeArgument<A>>], reifiedTypeArgs: [A], fromFields: (fields: Record<string, any>) => ModuleActionRequest.fromFields( A, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ModuleActionRequest.fromFieldsWithTypes( A, item, ), fromBcs: (data: Uint8Array) => ModuleActionRequest.fromBcs( A, data, ), bcs: ModuleActionRequest.bcs(toBcs(A)), fromJSONField: (field: any) => ModuleActionRequest.fromJSONField( A, field, ), fromJSON: (json: Record<string, any>) => ModuleActionRequest.fromJSON( A, json, ), fromSuiParsedData: (content: SuiParsedData) => ModuleActionRequest.fromSuiParsedData( A, content, ), fetch: async (client: SuiClient, id: string) => ModuleActionRequest.fetch( client, A, id, ), new: ( fields: ModuleActionRequestFields<ToTypeArgument<A>>, ) => { return new ModuleActionRequest( [extractType(A)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ModuleActionRequest.reified }

 static phantom<A extends Reified<TypeArgument, any>>( A: A ): PhantomReified<ToTypeStr<ModuleActionRequest<ToTypeArgument<A>>>> { return phantom(ModuleActionRequest.reified( A )); } static get p() { return ModuleActionRequest.phantom }

 static get bcs() { return <A extends BcsType<any>>(A: A) => bcs.struct(`ModuleActionRequest<${A.name}>`, {

 workspace_id: ID.bcs, vault_id: bcs.u16(), module_id: ID.bcs, network_id: String.bcs, tx_id: bcs.u64(), action: A

}) };

 static fromFields<A extends Reified<TypeArgument, any>>( typeArg: A, fields: Record<string, any> ): ModuleActionRequest<ToTypeArgument<A>> { return ModuleActionRequest.reified( typeArg, ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), moduleId: decodeFromFields(ID.reified(), fields.module_id), networkId: decodeFromFields(String.reified(), fields.network_id), txId: decodeFromFields("u64", fields.tx_id), action: decodeFromFields(typeArg, fields.action) } ) }

 static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>( typeArg: A, item: FieldsWithTypes ): ModuleActionRequest<ToTypeArgument<A>> { if (!isModuleActionRequest(item.type)) { throw new Error("not a ModuleActionRequest type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ModuleActionRequest.reified( typeArg, ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), moduleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.module_id), networkId: decodeFromFieldsWithTypes(String.reified(), item.fields.network_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), action: decodeFromFieldsWithTypes(typeArg, item.fields.action) } ) }

 static fromBcs<A extends Reified<TypeArgument, any>>( typeArg: A, data: Uint8Array ): ModuleActionRequest<ToTypeArgument<A>> { const typeArgs = [typeArg];

 return ModuleActionRequest.fromFields( typeArg, ModuleActionRequest.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,moduleId: this.moduleId,networkId: this.networkId,txId: this.txId.toString(),action: fieldToJSON<A>(this.$typeArgs[0], this.action),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<A extends Reified<TypeArgument, any>>( typeArg: A, field: any ): ModuleActionRequest<ToTypeArgument<A>> { return ModuleActionRequest.reified( typeArg, ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), moduleId: decodeFromJSONField(ID.reified(), field.moduleId), networkId: decodeFromJSONField(String.reified(), field.networkId), txId: decodeFromJSONField("u64", field.txId), action: decodeFromJSONField(typeArg, field.action) } ) }

 static fromJSON<A extends Reified<TypeArgument, any>>( typeArg: A, json: Record<string, any> ): ModuleActionRequest<ToTypeArgument<A>> { if (json.$typeName !== ModuleActionRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ModuleActionRequest.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ModuleActionRequest.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<A extends Reified<TypeArgument, any>>( typeArg: A, content: SuiParsedData ): ModuleActionRequest<ToTypeArgument<A>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isModuleActionRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ModuleActionRequest object`); } return ModuleActionRequest.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<A extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: A, id: string ): Promise<ModuleActionRequest<ToTypeArgument<A>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ModuleActionRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isModuleActionRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ModuleActionRequest object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ModuleActionRequest.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ModuleActionResult =============================== */

export function isModuleActionResult(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::module_interface::ModuleActionResult` + '<'); }

export interface ModuleActionResultFields<E extends TypeArgument> { workspaceId: ToField<ID>; moduleId: ToField<ID>; txId: ToField<"u64">; vaultId: ToField<"u16">; networkId: ToField<String>; txSignable: ToField<Vector<Vector<"u8">>>; moduleEvent: ToField<E> }

export type ModuleActionResultReified<E extends TypeArgument> = Reified< ModuleActionResult<E>, ModuleActionResultFields<E> >;

export class ModuleActionResult<E extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ModuleActionResult`; static readonly $numTypeParams = 1;

 readonly $typeName = ModuleActionResult.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ModuleActionResult<${ToTypeStr<E>}>`;

 readonly $typeArgs: [ToTypeStr<E>];

 readonly workspaceId: ToField<ID>; readonly moduleId: ToField<ID>; readonly txId: ToField<"u64">; readonly vaultId: ToField<"u16">; readonly networkId: ToField<String>; readonly txSignable: ToField<Vector<Vector<"u8">>>; readonly moduleEvent: ToField<E>

 private constructor(typeArgs: [ToTypeStr<E>], fields: ModuleActionResultFields<E>, ) { this.$fullTypeName = composeSuiType( ModuleActionResult.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ModuleActionResult<${ToTypeStr<E>}>`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.moduleId = fields.moduleId;; this.txId = fields.txId;; this.vaultId = fields.vaultId;; this.networkId = fields.networkId;; this.txSignable = fields.txSignable;; this.moduleEvent = fields.moduleEvent; }

 static reified<E extends Reified<TypeArgument, any>>( E: E ): ModuleActionResultReified<ToTypeArgument<E>> { return { typeName: ModuleActionResult.$typeName, fullTypeName: composeSuiType( ModuleActionResult.$typeName, ...[extractType(E)] ) as `${typeof PKG_V1}::module_interface::ModuleActionResult<${ToTypeStr<ToTypeArgument<E>>}>`, typeArgs: [ extractType(E) ] as [ToTypeStr<ToTypeArgument<E>>], reifiedTypeArgs: [E], fromFields: (fields: Record<string, any>) => ModuleActionResult.fromFields( E, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ModuleActionResult.fromFieldsWithTypes( E, item, ), fromBcs: (data: Uint8Array) => ModuleActionResult.fromBcs( E, data, ), bcs: ModuleActionResult.bcs(toBcs(E)), fromJSONField: (field: any) => ModuleActionResult.fromJSONField( E, field, ), fromJSON: (json: Record<string, any>) => ModuleActionResult.fromJSON( E, json, ), fromSuiParsedData: (content: SuiParsedData) => ModuleActionResult.fromSuiParsedData( E, content, ), fetch: async (client: SuiClient, id: string) => ModuleActionResult.fetch( client, E, id, ), new: ( fields: ModuleActionResultFields<ToTypeArgument<E>>, ) => { return new ModuleActionResult( [extractType(E)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ModuleActionResult.reified }

 static phantom<E extends Reified<TypeArgument, any>>( E: E ): PhantomReified<ToTypeStr<ModuleActionResult<ToTypeArgument<E>>>> { return phantom(ModuleActionResult.reified( E )); } static get p() { return ModuleActionResult.phantom }

 static get bcs() { return <E extends BcsType<any>>(E: E) => bcs.struct(`ModuleActionResult<${E.name}>`, {

 workspace_id: ID.bcs, module_id: ID.bcs, tx_id: bcs.u64(), vault_id: bcs.u16(), network_id: String.bcs, tx_signable: bcs.vector(bcs.vector(bcs.u8())), module_event: E

}) };

 static fromFields<E extends Reified<TypeArgument, any>>( typeArg: E, fields: Record<string, any> ): ModuleActionResult<ToTypeArgument<E>> { return ModuleActionResult.reified( typeArg, ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), moduleId: decodeFromFields(ID.reified(), fields.module_id), txId: decodeFromFields("u64", fields.tx_id), vaultId: decodeFromFields("u16", fields.vault_id), networkId: decodeFromFields(String.reified(), fields.network_id), txSignable: decodeFromFields(reified.vector(reified.vector("u8")), fields.tx_signable), moduleEvent: decodeFromFields(typeArg, fields.module_event) } ) }

 static fromFieldsWithTypes<E extends Reified<TypeArgument, any>>( typeArg: E, item: FieldsWithTypes ): ModuleActionResult<ToTypeArgument<E>> { if (!isModuleActionResult(item.type)) { throw new Error("not a ModuleActionResult type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ModuleActionResult.reified( typeArg, ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), moduleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.module_id), txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), networkId: decodeFromFieldsWithTypes(String.reified(), item.fields.network_id), txSignable: decodeFromFieldsWithTypes(reified.vector(reified.vector("u8")), item.fields.tx_signable), moduleEvent: decodeFromFieldsWithTypes(typeArg, item.fields.module_event) } ) }

 static fromBcs<E extends Reified<TypeArgument, any>>( typeArg: E, data: Uint8Array ): ModuleActionResult<ToTypeArgument<E>> { const typeArgs = [typeArg];

 return ModuleActionResult.fromFields( typeArg, ModuleActionResult.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,moduleId: this.moduleId,txId: this.txId.toString(),vaultId: this.vaultId,networkId: this.networkId,txSignable: fieldToJSON<Vector<Vector<"u8">>>(`vector<vector<u8>>`, this.txSignable),moduleEvent: fieldToJSON<E>(this.$typeArgs[0], this.moduleEvent),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<E extends Reified<TypeArgument, any>>( typeArg: E, field: any ): ModuleActionResult<ToTypeArgument<E>> { return ModuleActionResult.reified( typeArg, ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), moduleId: decodeFromJSONField(ID.reified(), field.moduleId), txId: decodeFromJSONField("u64", field.txId), vaultId: decodeFromJSONField("u16", field.vaultId), networkId: decodeFromJSONField(String.reified(), field.networkId), txSignable: decodeFromJSONField(reified.vector(reified.vector("u8")), field.txSignable), moduleEvent: decodeFromJSONField(typeArg, field.moduleEvent) } ) }

 static fromJSON<E extends Reified<TypeArgument, any>>( typeArg: E, json: Record<string, any> ): ModuleActionResult<ToTypeArgument<E>> { if (json.$typeName !== ModuleActionResult.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ModuleActionResult.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ModuleActionResult.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<E extends Reified<TypeArgument, any>>( typeArg: E, content: SuiParsedData ): ModuleActionResult<ToTypeArgument<E>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isModuleActionResult(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ModuleActionResult object`); } return ModuleActionResult.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<E extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: E, id: string ): Promise<ModuleActionResult<ToTypeArgument<E>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ModuleActionResult object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isModuleActionResult(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ModuleActionResult object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ModuleActionResult.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ModuleCap =============================== */

export function isModuleCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::ModuleCap`; }

export interface ModuleCapFields { id: ToField<UID> }

export type ModuleCapReified = Reified< ModuleCap, ModuleCapFields >;

export class ModuleCap implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ModuleCap`; static readonly $numTypeParams = 0;

 readonly $typeName = ModuleCap.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ModuleCap`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>

 private constructor(typeArgs: [], fields: ModuleCapFields, ) { this.$fullTypeName = composeSuiType( ModuleCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ModuleCap`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): ModuleCapReified { return { typeName: ModuleCap.$typeName, fullTypeName: composeSuiType( ModuleCap.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::ModuleCap`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ModuleCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ModuleCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ModuleCap.fromBcs( data, ), bcs: ModuleCap.bcs, fromJSONField: (field: any) => ModuleCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ModuleCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ModuleCap.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ModuleCap.fetch( client, id, ), new: ( fields: ModuleCapFields, ) => { return new ModuleCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ModuleCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ModuleCap>> { return phantom(ModuleCap.reified( )); } static get p() { return ModuleCap.phantom() }

 static get bcs() { return bcs.struct("ModuleCap", {

 id: UID.bcs

}) };

 static fromFields( fields: Record<string, any> ): ModuleCap { return ModuleCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ModuleCap { if (!isModuleCap(item.type)) { throw new Error("not a ModuleCap type");

 }

 return ModuleCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs( data: Uint8Array ): ModuleCap { return ModuleCap.fromFields( ModuleCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ModuleCap { return ModuleCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON( json: Record<string, any> ): ModuleCap { if (json.$typeName !== ModuleCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ModuleCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ModuleCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isModuleCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ModuleCap object`); } return ModuleCap.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ModuleCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ModuleCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isModuleCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ModuleCap object`); }

 return ModuleCap.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ModuleCapCreated =============================== */

export function isModuleCapCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::ModuleCapCreated`; }

export interface ModuleCapCreatedFields { capHolderId: ToField<ID>; cap: ToField<ID> }

export type ModuleCapCreatedReified = Reified< ModuleCapCreated, ModuleCapCreatedFields >;

export class ModuleCapCreated implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ModuleCapCreated`; static readonly $numTypeParams = 0;

 readonly $typeName = ModuleCapCreated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ModuleCapCreated`;

 readonly $typeArgs: [];

 readonly capHolderId: ToField<ID>; readonly cap: ToField<ID>

 private constructor(typeArgs: [], fields: ModuleCapCreatedFields, ) { this.$fullTypeName = composeSuiType( ModuleCapCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ModuleCapCreated`; this.$typeArgs = typeArgs;

 this.capHolderId = fields.capHolderId;; this.cap = fields.cap; }

 static reified( ): ModuleCapCreatedReified { return { typeName: ModuleCapCreated.$typeName, fullTypeName: composeSuiType( ModuleCapCreated.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::ModuleCapCreated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ModuleCapCreated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ModuleCapCreated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ModuleCapCreated.fromBcs( data, ), bcs: ModuleCapCreated.bcs, fromJSONField: (field: any) => ModuleCapCreated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ModuleCapCreated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ModuleCapCreated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ModuleCapCreated.fetch( client, id, ), new: ( fields: ModuleCapCreatedFields, ) => { return new ModuleCapCreated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ModuleCapCreated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ModuleCapCreated>> { return phantom(ModuleCapCreated.reified( )); } static get p() { return ModuleCapCreated.phantom() }

 static get bcs() { return bcs.struct("ModuleCapCreated", {

 cap_holder_id: ID.bcs, cap: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): ModuleCapCreated { return ModuleCapCreated.reified( ).new( { capHolderId: decodeFromFields(ID.reified(), fields.cap_holder_id), cap: decodeFromFields(ID.reified(), fields.cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ModuleCapCreated { if (!isModuleCapCreated(item.type)) { throw new Error("not a ModuleCapCreated type");

 }

 return ModuleCapCreated.reified( ).new( { capHolderId: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap_holder_id), cap: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap) } ) }

 static fromBcs( data: Uint8Array ): ModuleCapCreated { return ModuleCapCreated.fromFields( ModuleCapCreated.bcs.parse(data) ) }

 toJSONField() { return {

 capHolderId: this.capHolderId,cap: this.cap,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ModuleCapCreated { return ModuleCapCreated.reified( ).new( { capHolderId: decodeFromJSONField(ID.reified(), field.capHolderId), cap: decodeFromJSONField(ID.reified(), field.cap) } ) }

 static fromJSON( json: Record<string, any> ): ModuleCapCreated { if (json.$typeName !== ModuleCapCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ModuleCapCreated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ModuleCapCreated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isModuleCapCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ModuleCapCreated object`); } return ModuleCapCreated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ModuleCapCreated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ModuleCapCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isModuleCapCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ModuleCapCreated object`); }

 return ModuleCapCreated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ModuleContainer =============================== */

export function isModuleContainer(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::module_interface::ModuleContainer` + '<'); }

export interface ModuleContainerFields<S extends TypeArgument, T extends TypeArgument> { moduleState: ToField<S>; transactionState: ToField<VecMap<"u64", T>> }

export type ModuleContainerReified<S extends TypeArgument, T extends TypeArgument> = Reified< ModuleContainer<S, T>, ModuleContainerFields<S, T> >;

export class ModuleContainer<S extends TypeArgument, T extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ModuleContainer`; static readonly $numTypeParams = 2;

 readonly $typeName = ModuleContainer.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ModuleContainer<${ToTypeStr<S>}, ${ToTypeStr<T>}>`;

 readonly $typeArgs: [ToTypeStr<S>, ToTypeStr<T>];

 readonly moduleState: ToField<S>; readonly transactionState: ToField<VecMap<"u64", T>>

 private constructor(typeArgs: [ToTypeStr<S>, ToTypeStr<T>], fields: ModuleContainerFields<S, T>, ) { this.$fullTypeName = composeSuiType( ModuleContainer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ModuleContainer<${ToTypeStr<S>}, ${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.moduleState = fields.moduleState;; this.transactionState = fields.transactionState; }

 static reified<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( S: S, T: T ): ModuleContainerReified<ToTypeArgument<S>, ToTypeArgument<T>> { return { typeName: ModuleContainer.$typeName, fullTypeName: composeSuiType( ModuleContainer.$typeName, ...[extractType(S), extractType(T)] ) as `${typeof PKG_V1}::module_interface::ModuleContainer<${ToTypeStr<ToTypeArgument<S>>}, ${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(S), extractType(T) ] as [ToTypeStr<ToTypeArgument<S>>, ToTypeStr<ToTypeArgument<T>>], reifiedTypeArgs: [S, T], fromFields: (fields: Record<string, any>) => ModuleContainer.fromFields( [S, T], fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ModuleContainer.fromFieldsWithTypes( [S, T], item, ), fromBcs: (data: Uint8Array) => ModuleContainer.fromBcs( [S, T], data, ), bcs: ModuleContainer.bcs(toBcs(S), toBcs(T)), fromJSONField: (field: any) => ModuleContainer.fromJSONField( [S, T], field, ), fromJSON: (json: Record<string, any>) => ModuleContainer.fromJSON( [S, T], json, ), fromSuiParsedData: (content: SuiParsedData) => ModuleContainer.fromSuiParsedData( [S, T], content, ), fetch: async (client: SuiClient, id: string) => ModuleContainer.fetch( client, [S, T], id, ), new: ( fields: ModuleContainerFields<ToTypeArgument<S>, ToTypeArgument<T>>, ) => { return new ModuleContainer( [extractType(S), extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ModuleContainer.reified }

 static phantom<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( S: S, T: T ): PhantomReified<ToTypeStr<ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>>>> { return phantom(ModuleContainer.reified( S, T )); } static get p() { return ModuleContainer.phantom }

 static get bcs() { return <S extends BcsType<any>, T extends BcsType<any>>(S: S, T: T) => bcs.struct(`ModuleContainer<${S.name}, ${T.name}>`, {

 module_state: S, transaction_state: VecMap.bcs(bcs.u64(), T)

}) };

 static fromFields<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( typeArgs: [S, T], fields: Record<string, any> ): ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>> { return ModuleContainer.reified( typeArgs[0], typeArgs[1], ).new( { moduleState: decodeFromFields(typeArgs[0], fields.module_state), transactionState: decodeFromFields(VecMap.reified("u64", typeArgs[1]), fields.transaction_state) } ) }

 static fromFieldsWithTypes<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( typeArgs: [S, T], item: FieldsWithTypes ): ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>> { if (!isModuleContainer(item.type)) { throw new Error("not a ModuleContainer type");

 } assertFieldsWithTypesArgsMatch(item, typeArgs);

 return ModuleContainer.reified( typeArgs[0], typeArgs[1], ).new( { moduleState: decodeFromFieldsWithTypes(typeArgs[0], item.fields.module_state), transactionState: decodeFromFieldsWithTypes(VecMap.reified("u64", typeArgs[1]), item.fields.transaction_state) } ) }

 static fromBcs<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( typeArgs: [S, T], data: Uint8Array ): ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>> { return ModuleContainer.fromFields( typeArgs, ModuleContainer.bcs( toBcs(typeArgs[0]), toBcs(typeArgs[1]) ).parse(data) ) }

 toJSONField() { return {

 moduleState: fieldToJSON<S>(this.$typeArgs[0], this.moduleState),transactionState: this.transactionState.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( typeArgs: [S, T], field: any ): ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>> { return ModuleContainer.reified( typeArgs[0], typeArgs[1], ).new( { moduleState: decodeFromJSONField(typeArgs[0], field.moduleState), transactionState: decodeFromJSONField(VecMap.reified("u64", typeArgs[1]), field.transactionState) } ) }

 static fromJSON<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( typeArgs: [S, T], json: Record<string, any> ): ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>> { if (json.$typeName !== ModuleContainer.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ModuleContainer.$typeName, ...typeArgs.map(extractType)), json.$typeArgs, typeArgs, )

 return ModuleContainer.fromJSONField( typeArgs, json, ) }

 static fromSuiParsedData<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( typeArgs: [S, T], content: SuiParsedData ): ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isModuleContainer(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ModuleContainer object`); } return ModuleContainer.fromFieldsWithTypes( typeArgs, content ); }

 static async fetch<S extends Reified<TypeArgument, any>, T extends Reified<TypeArgument, any>>( client: SuiClient, typeArgs: [S, T], id: string ): Promise<ModuleContainer<ToTypeArgument<S>, ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ModuleContainer object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isModuleContainer(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ModuleContainer object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 2) { throw new Error(`type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`); }; for (let i = 0; i < 2; i++) { const gotTypeArg = compressSuiType(gotTypeArgs[i]); const expectedTypeArg = compressSuiType(extractType(typeArgs[i])); if (gotTypeArg !== expectedTypeArg) { throw new Error(`type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); } };

 return ModuleContainer.fromBcs( typeArgs, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ShareContainerRequired =============================== */

export function isShareContainerRequired(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::ShareContainerRequired`; }

export interface ShareContainerRequiredFields { workspaceId: ToField<ID>; containerId: ToField<ID> }

export type ShareContainerRequiredReified = Reified< ShareContainerRequired, ShareContainerRequiredFields >;

export class ShareContainerRequired implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::ShareContainerRequired`; static readonly $numTypeParams = 0;

 readonly $typeName = ShareContainerRequired.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::ShareContainerRequired`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly containerId: ToField<ID>

 private constructor(typeArgs: [], fields: ShareContainerRequiredFields, ) { this.$fullTypeName = composeSuiType( ShareContainerRequired.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::ShareContainerRequired`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.containerId = fields.containerId; }

 static reified( ): ShareContainerRequiredReified { return { typeName: ShareContainerRequired.$typeName, fullTypeName: composeSuiType( ShareContainerRequired.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::ShareContainerRequired`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ShareContainerRequired.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ShareContainerRequired.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ShareContainerRequired.fromBcs( data, ), bcs: ShareContainerRequired.bcs, fromJSONField: (field: any) => ShareContainerRequired.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ShareContainerRequired.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ShareContainerRequired.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ShareContainerRequired.fetch( client, id, ), new: ( fields: ShareContainerRequiredFields, ) => { return new ShareContainerRequired( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ShareContainerRequired.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ShareContainerRequired>> { return phantom(ShareContainerRequired.reified( )); } static get p() { return ShareContainerRequired.phantom() }

 static get bcs() { return bcs.struct("ShareContainerRequired", {

 workspace_id: ID.bcs, container_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): ShareContainerRequired { return ShareContainerRequired.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), containerId: decodeFromFields(ID.reified(), fields.container_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ShareContainerRequired { if (!isShareContainerRequired(item.type)) { throw new Error("not a ShareContainerRequired type");

 }

 return ShareContainerRequired.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), containerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.container_id) } ) }

 static fromBcs( data: Uint8Array ): ShareContainerRequired { return ShareContainerRequired.fromFields( ShareContainerRequired.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,containerId: this.containerId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ShareContainerRequired { return ShareContainerRequired.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), containerId: decodeFromJSONField(ID.reified(), field.containerId) } ) }

 static fromJSON( json: Record<string, any> ): ShareContainerRequired { if (json.$typeName !== ShareContainerRequired.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ShareContainerRequired.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ShareContainerRequired { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isShareContainerRequired(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ShareContainerRequired object`); } return ShareContainerRequired.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ShareContainerRequired> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ShareContainerRequired object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isShareContainerRequired(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ShareContainerRequired object`); }

 return ShareContainerRequired.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== TxEffects =============================== */

export function isTxEffects(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::module_interface::TxEffects` + '<'); }

export interface TxEffectsFields<A extends TypeArgument> { txEffectsModuleId: ToField<ID>; txAssembleModuleId: ToField<ID>; network: ToField<String>; interactionAddressOpt: ToField<Option<Vector<"u8">>>; balanceChanges: ToField<Vector<BalanceChange>>; action: ToField<A> }

export type TxEffectsReified<A extends TypeArgument> = Reified< TxEffects<A>, TxEffectsFields<A> >;

export class TxEffects<A extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::TxEffects`; static readonly $numTypeParams = 1;

 readonly $typeName = TxEffects.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::TxEffects<${ToTypeStr<A>}>`;

 readonly $typeArgs: [ToTypeStr<A>];

 readonly txEffectsModuleId: ToField<ID>; readonly txAssembleModuleId: ToField<ID>; readonly network: ToField<String>; readonly interactionAddressOpt: ToField<Option<Vector<"u8">>>; readonly balanceChanges: ToField<Vector<BalanceChange>>; readonly action: ToField<A>

 private constructor(typeArgs: [ToTypeStr<A>], fields: TxEffectsFields<A>, ) { this.$fullTypeName = composeSuiType( TxEffects.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::TxEffects<${ToTypeStr<A>}>`; this.$typeArgs = typeArgs;

 this.txEffectsModuleId = fields.txEffectsModuleId;; this.txAssembleModuleId = fields.txAssembleModuleId;; this.network = fields.network;; this.interactionAddressOpt = fields.interactionAddressOpt;; this.balanceChanges = fields.balanceChanges;; this.action = fields.action; }

 static reified<A extends Reified<TypeArgument, any>>( A: A ): TxEffectsReified<ToTypeArgument<A>> { return { typeName: TxEffects.$typeName, fullTypeName: composeSuiType( TxEffects.$typeName, ...[extractType(A)] ) as `${typeof PKG_V1}::module_interface::TxEffects<${ToTypeStr<ToTypeArgument<A>>}>`, typeArgs: [ extractType(A) ] as [ToTypeStr<ToTypeArgument<A>>], reifiedTypeArgs: [A], fromFields: (fields: Record<string, any>) => TxEffects.fromFields( A, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TxEffects.fromFieldsWithTypes( A, item, ), fromBcs: (data: Uint8Array) => TxEffects.fromBcs( A, data, ), bcs: TxEffects.bcs(toBcs(A)), fromJSONField: (field: any) => TxEffects.fromJSONField( A, field, ), fromJSON: (json: Record<string, any>) => TxEffects.fromJSON( A, json, ), fromSuiParsedData: (content: SuiParsedData) => TxEffects.fromSuiParsedData( A, content, ), fetch: async (client: SuiClient, id: string) => TxEffects.fetch( client, A, id, ), new: ( fields: TxEffectsFields<ToTypeArgument<A>>, ) => { return new TxEffects( [extractType(A)], fields ) }, kind: "StructClassReified", } }

 static get r() { return TxEffects.reified }

 static phantom<A extends Reified<TypeArgument, any>>( A: A ): PhantomReified<ToTypeStr<TxEffects<ToTypeArgument<A>>>> { return phantom(TxEffects.reified( A )); } static get p() { return TxEffects.phantom }

 static get bcs() { return <A extends BcsType<any>>(A: A) => bcs.struct(`TxEffects<${A.name}>`, {

 tx_effects_module_id: ID.bcs, tx_assemble_module_id: ID.bcs, network: String.bcs, interaction_address_opt: Option.bcs(bcs.vector(bcs.u8())), balance_changes: bcs.vector(BalanceChange.bcs), action: A

}) };

 static fromFields<A extends Reified<TypeArgument, any>>( typeArg: A, fields: Record<string, any> ): TxEffects<ToTypeArgument<A>> { return TxEffects.reified( typeArg, ).new( { txEffectsModuleId: decodeFromFields(ID.reified(), fields.tx_effects_module_id), txAssembleModuleId: decodeFromFields(ID.reified(), fields.tx_assemble_module_id), network: decodeFromFields(String.reified(), fields.network), interactionAddressOpt: decodeFromFields(Option.reified(reified.vector("u8")), fields.interaction_address_opt), balanceChanges: decodeFromFields(reified.vector(BalanceChange.reified()), fields.balance_changes), action: decodeFromFields(typeArg, fields.action) } ) }

 static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>( typeArg: A, item: FieldsWithTypes ): TxEffects<ToTypeArgument<A>> { if (!isTxEffects(item.type)) { throw new Error("not a TxEffects type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return TxEffects.reified( typeArg, ).new( { txEffectsModuleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.tx_effects_module_id), txAssembleModuleId: decodeFromFieldsWithTypes(ID.reified(), item.fields.tx_assemble_module_id), network: decodeFromFieldsWithTypes(String.reified(), item.fields.network), interactionAddressOpt: decodeFromFieldsWithTypes(Option.reified(reified.vector("u8")), item.fields.interaction_address_opt), balanceChanges: decodeFromFieldsWithTypes(reified.vector(BalanceChange.reified()), item.fields.balance_changes), action: decodeFromFieldsWithTypes(typeArg, item.fields.action) } ) }

 static fromBcs<A extends Reified<TypeArgument, any>>( typeArg: A, data: Uint8Array ): TxEffects<ToTypeArgument<A>> { const typeArgs = [typeArg];

 return TxEffects.fromFields( typeArg, TxEffects.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 txEffectsModuleId: this.txEffectsModuleId,txAssembleModuleId: this.txAssembleModuleId,network: this.network,interactionAddressOpt: fieldToJSON<Option<Vector<"u8">>>(`${Option.$typeName}<vector<u8>>`, this.interactionAddressOpt),balanceChanges: fieldToJSON<Vector<BalanceChange>>(`vector<${BalanceChange.$typeName}>`, this.balanceChanges),action: fieldToJSON<A>(this.$typeArgs[0], this.action),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<A extends Reified<TypeArgument, any>>( typeArg: A, field: any ): TxEffects<ToTypeArgument<A>> { return TxEffects.reified( typeArg, ).new( { txEffectsModuleId: decodeFromJSONField(ID.reified(), field.txEffectsModuleId), txAssembleModuleId: decodeFromJSONField(ID.reified(), field.txAssembleModuleId), network: decodeFromJSONField(String.reified(), field.network), interactionAddressOpt: decodeFromJSONField(Option.reified(reified.vector("u8")), field.interactionAddressOpt), balanceChanges: decodeFromJSONField(reified.vector(BalanceChange.reified()), field.balanceChanges), action: decodeFromJSONField(typeArg, field.action) } ) }

 static fromJSON<A extends Reified<TypeArgument, any>>( typeArg: A, json: Record<string, any> ): TxEffects<ToTypeArgument<A>> { if (json.$typeName !== TxEffects.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(TxEffects.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return TxEffects.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<A extends Reified<TypeArgument, any>>( typeArg: A, content: SuiParsedData ): TxEffects<ToTypeArgument<A>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTxEffects(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TxEffects object`); } return TxEffects.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<A extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: A, id: string ): Promise<TxEffects<ToTypeArgument<A>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TxEffects object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTxEffects(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TxEffects object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return TxEffects.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== TxEffectsResult =============================== */

export function isTxEffectsResult(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::module_interface::TxEffectsResult` + '<'); }

export interface TxEffectsResultFields<A extends TypeArgument> { effects: ToField<TxEffects<A>> }

export type TxEffectsResultReified<A extends TypeArgument> = Reified< TxEffectsResult<A>, TxEffectsResultFields<A> >;

export class TxEffectsResult<A extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::TxEffectsResult`; static readonly $numTypeParams = 1;

 readonly $typeName = TxEffectsResult.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::TxEffectsResult<${ToTypeStr<A>}>`;

 readonly $typeArgs: [ToTypeStr<A>];

 readonly effects: ToField<TxEffects<A>>

 private constructor(typeArgs: [ToTypeStr<A>], fields: TxEffectsResultFields<A>, ) { this.$fullTypeName = composeSuiType( TxEffectsResult.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::TxEffectsResult<${ToTypeStr<A>}>`; this.$typeArgs = typeArgs;

 this.effects = fields.effects; }

 static reified<A extends Reified<TypeArgument, any>>( A: A ): TxEffectsResultReified<ToTypeArgument<A>> { return { typeName: TxEffectsResult.$typeName, fullTypeName: composeSuiType( TxEffectsResult.$typeName, ...[extractType(A)] ) as `${typeof PKG_V1}::module_interface::TxEffectsResult<${ToTypeStr<ToTypeArgument<A>>}>`, typeArgs: [ extractType(A) ] as [ToTypeStr<ToTypeArgument<A>>], reifiedTypeArgs: [A], fromFields: (fields: Record<string, any>) => TxEffectsResult.fromFields( A, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TxEffectsResult.fromFieldsWithTypes( A, item, ), fromBcs: (data: Uint8Array) => TxEffectsResult.fromBcs( A, data, ), bcs: TxEffectsResult.bcs(toBcs(A)), fromJSONField: (field: any) => TxEffectsResult.fromJSONField( A, field, ), fromJSON: (json: Record<string, any>) => TxEffectsResult.fromJSON( A, json, ), fromSuiParsedData: (content: SuiParsedData) => TxEffectsResult.fromSuiParsedData( A, content, ), fetch: async (client: SuiClient, id: string) => TxEffectsResult.fetch( client, A, id, ), new: ( fields: TxEffectsResultFields<ToTypeArgument<A>>, ) => { return new TxEffectsResult( [extractType(A)], fields ) }, kind: "StructClassReified", } }

 static get r() { return TxEffectsResult.reified }

 static phantom<A extends Reified<TypeArgument, any>>( A: A ): PhantomReified<ToTypeStr<TxEffectsResult<ToTypeArgument<A>>>> { return phantom(TxEffectsResult.reified( A )); } static get p() { return TxEffectsResult.phantom }

 static get bcs() { return <A extends BcsType<any>>(A: A) => bcs.struct(`TxEffectsResult<${A.name}>`, {

 effects: TxEffects.bcs(A)

}) };

 static fromFields<A extends Reified<TypeArgument, any>>( typeArg: A, fields: Record<string, any> ): TxEffectsResult<ToTypeArgument<A>> { return TxEffectsResult.reified( typeArg, ).new( { effects: decodeFromFields(TxEffects.reified(typeArg), fields.effects) } ) }

 static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>( typeArg: A, item: FieldsWithTypes ): TxEffectsResult<ToTypeArgument<A>> { if (!isTxEffectsResult(item.type)) { throw new Error("not a TxEffectsResult type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return TxEffectsResult.reified( typeArg, ).new( { effects: decodeFromFieldsWithTypes(TxEffects.reified(typeArg), item.fields.effects) } ) }

 static fromBcs<A extends Reified<TypeArgument, any>>( typeArg: A, data: Uint8Array ): TxEffectsResult<ToTypeArgument<A>> { const typeArgs = [typeArg];

 return TxEffectsResult.fromFields( typeArg, TxEffectsResult.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 effects: this.effects.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<A extends Reified<TypeArgument, any>>( typeArg: A, field: any ): TxEffectsResult<ToTypeArgument<A>> { return TxEffectsResult.reified( typeArg, ).new( { effects: decodeFromJSONField(TxEffects.reified(typeArg), field.effects) } ) }

 static fromJSON<A extends Reified<TypeArgument, any>>( typeArg: A, json: Record<string, any> ): TxEffectsResult<ToTypeArgument<A>> { if (json.$typeName !== TxEffectsResult.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(TxEffectsResult.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return TxEffectsResult.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<A extends Reified<TypeArgument, any>>( typeArg: A, content: SuiParsedData ): TxEffectsResult<ToTypeArgument<A>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTxEffectsResult(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TxEffectsResult object`); } return TxEffectsResult.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<A extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: A, id: string ): Promise<TxEffectsResult<ToTypeArgument<A>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TxEffectsResult object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTxEffectsResult(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TxEffectsResult object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return TxEffectsResult.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== VaultContainer =============================== */

export function isVaultContainer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::VaultContainer`; }

export interface VaultContainerFields { id: ToField<UID>; workspaceId: ToField<ID>; vaultId: ToField<"u16">; mapModuleIdToContainer: ToField<Bag> }

export type VaultContainerReified = Reified< VaultContainer, VaultContainerFields >;

export class VaultContainer implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::VaultContainer`; static readonly $numTypeParams = 0;

 readonly $typeName = VaultContainer.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::VaultContainer`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly mapModuleIdToContainer: ToField<Bag>

 private constructor(typeArgs: [], fields: VaultContainerFields, ) { this.$fullTypeName = composeSuiType( VaultContainer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::VaultContainer`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.mapModuleIdToContainer = fields.mapModuleIdToContainer; }

 static reified( ): VaultContainerReified { return { typeName: VaultContainer.$typeName, fullTypeName: composeSuiType( VaultContainer.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::VaultContainer`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultContainer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultContainer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultContainer.fromBcs( data, ), bcs: VaultContainer.bcs, fromJSONField: (field: any) => VaultContainer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultContainer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultContainer.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => VaultContainer.fetch( client, id, ), new: ( fields: VaultContainerFields, ) => { return new VaultContainer( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultContainer.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultContainer>> { return phantom(VaultContainer.reified( )); } static get p() { return VaultContainer.phantom() }

 static get bcs() { return bcs.struct("VaultContainer", {

 id: UID.bcs, workspace_id: ID.bcs, vault_id: bcs.u16(), map_module_id_to_container: Bag.bcs

}) };

 static fromFields( fields: Record<string, any> ): VaultContainer { return VaultContainer.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), mapModuleIdToContainer: decodeFromFields(Bag.reified(), fields.map_module_id_to_container) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultContainer { if (!isVaultContainer(item.type)) { throw new Error("not a VaultContainer type");

 }

 return VaultContainer.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), mapModuleIdToContainer: decodeFromFieldsWithTypes(Bag.reified(), item.fields.map_module_id_to_container) } ) }

 static fromBcs( data: Uint8Array ): VaultContainer { return VaultContainer.fromFields( VaultContainer.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,workspaceId: this.workspaceId,vaultId: this.vaultId,mapModuleIdToContainer: this.mapModuleIdToContainer.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultContainer { return VaultContainer.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), mapModuleIdToContainer: decodeFromJSONField(Bag.reified(), field.mapModuleIdToContainer) } ) }

 static fromJSON( json: Record<string, any> ): VaultContainer { if (json.$typeName !== VaultContainer.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultContainer.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultContainer { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultContainer(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultContainer object`); } return VaultContainer.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultContainer> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultContainer object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultContainer(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultContainer object`); }

 return VaultContainer.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== VaultContainerCreated =============================== */

export function isVaultContainerCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::module_interface::VaultContainerCreated`; }

export interface VaultContainerCreatedFields { vaultContainerId: ToField<ID>; workspaceId: ToField<ID>; vaultId: ToField<"u16"> }

export type VaultContainerCreatedReified = Reified< VaultContainerCreated, VaultContainerCreatedFields >;

export class VaultContainerCreated implements StructClass { static readonly $typeName = `${PKG_V1}::module_interface::VaultContainerCreated`; static readonly $numTypeParams = 0;

 readonly $typeName = VaultContainerCreated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::module_interface::VaultContainerCreated`;

 readonly $typeArgs: [];

 readonly vaultContainerId: ToField<ID>; readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">

 private constructor(typeArgs: [], fields: VaultContainerCreatedFields, ) { this.$fullTypeName = composeSuiType( VaultContainerCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::module_interface::VaultContainerCreated`; this.$typeArgs = typeArgs;

 this.vaultContainerId = fields.vaultContainerId;; this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId; }

 static reified( ): VaultContainerCreatedReified { return { typeName: VaultContainerCreated.$typeName, fullTypeName: composeSuiType( VaultContainerCreated.$typeName, ...[] ) as `${typeof PKG_V1}::module_interface::VaultContainerCreated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultContainerCreated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultContainerCreated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultContainerCreated.fromBcs( data, ), bcs: VaultContainerCreated.bcs, fromJSONField: (field: any) => VaultContainerCreated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultContainerCreated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultContainerCreated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => VaultContainerCreated.fetch( client, id, ), new: ( fields: VaultContainerCreatedFields, ) => { return new VaultContainerCreated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultContainerCreated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultContainerCreated>> { return phantom(VaultContainerCreated.reified( )); } static get p() { return VaultContainerCreated.phantom() }

 static get bcs() { return bcs.struct("VaultContainerCreated", {

 vault_container_id: ID.bcs, workspace_id: ID.bcs, vault_id: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): VaultContainerCreated { return VaultContainerCreated.reified( ).new( { vaultContainerId: decodeFromFields(ID.reified(), fields.vault_container_id), workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultContainerCreated { if (!isVaultContainerCreated(item.type)) { throw new Error("not a VaultContainerCreated type");

 }

 return VaultContainerCreated.reified( ).new( { vaultContainerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_container_id), workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id) } ) }

 static fromBcs( data: Uint8Array ): VaultContainerCreated { return VaultContainerCreated.fromFields( VaultContainerCreated.bcs.parse(data) ) }

 toJSONField() { return {

 vaultContainerId: this.vaultContainerId,workspaceId: this.workspaceId,vaultId: this.vaultId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultContainerCreated { return VaultContainerCreated.reified( ).new( { vaultContainerId: decodeFromJSONField(ID.reified(), field.vaultContainerId), workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId) } ) }

 static fromJSON( json: Record<string, any> ): VaultContainerCreated { if (json.$typeName !== VaultContainerCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultContainerCreated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultContainerCreated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultContainerCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultContainerCreated object`); } return VaultContainerCreated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultContainerCreated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultContainerCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultContainerCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultContainerCreated object`); }

 return VaultContainerCreated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
