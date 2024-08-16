import * as reified from "../../../../_framework/reified";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {ID, UID} from "../../../../sui/object/structs";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== DWalletCap =============================== */

export function isDWalletCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::dwallet_cap::DWalletCap`; }

export interface DWalletCapFields { id: ToField<UID>; dwalletNetworkCapId: ToField<ID> }

export type DWalletCapReified = Reified< DWalletCap, DWalletCapFields >;

export class DWalletCap implements StructClass { static readonly $typeName = `${PKG_V1}::dwallet_cap::DWalletCap`; static readonly $numTypeParams = 0;

 readonly $typeName = DWalletCap.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::dwallet_cap::DWalletCap`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly dwalletNetworkCapId: ToField<ID>

 private constructor(typeArgs: [], fields: DWalletCapFields, ) { this.$fullTypeName = composeSuiType( DWalletCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::dwallet_cap::DWalletCap`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.dwalletNetworkCapId = fields.dwalletNetworkCapId; }

 static reified( ): DWalletCapReified { return { typeName: DWalletCap.$typeName, fullTypeName: composeSuiType( DWalletCap.$typeName, ...[] ) as `${typeof PKG_V1}::dwallet_cap::DWalletCap`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DWalletCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DWalletCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DWalletCap.fromBcs( data, ), bcs: DWalletCap.bcs, fromJSONField: (field: any) => DWalletCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DWalletCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DWalletCap.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => DWalletCap.fetch( client, id, ), new: ( fields: DWalletCapFields, ) => { return new DWalletCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DWalletCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DWalletCap>> { return phantom(DWalletCap.reified( )); } static get p() { return DWalletCap.phantom() }

 static get bcs() { return bcs.struct("DWalletCap", {

 id: UID.bcs, dwallet_network_cap_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): DWalletCap { return DWalletCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), dwalletNetworkCapId: decodeFromFields(ID.reified(), fields.dwallet_network_cap_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DWalletCap { if (!isDWalletCap(item.type)) { throw new Error("not a DWalletCap type");

 }

 return DWalletCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), dwalletNetworkCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.dwallet_network_cap_id) } ) }

 static fromBcs( data: Uint8Array ): DWalletCap { return DWalletCap.fromFields( DWalletCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,dwalletNetworkCapId: this.dwalletNetworkCapId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DWalletCap { return DWalletCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), dwalletNetworkCapId: decodeFromJSONField(ID.reified(), field.dwalletNetworkCapId) } ) }

 static fromJSON( json: Record<string, any> ): DWalletCap { if (json.$typeName !== DWalletCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DWalletCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DWalletCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDWalletCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DWalletCap object`); } return DWalletCap.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<DWalletCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DWalletCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDWalletCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DWalletCap object`); }

 return DWalletCap.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== DWalletNetworkApproveRequest =============================== */

export function isDWalletNetworkApproveRequest(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::dwallet_cap::DWalletNetworkApproveRequest`; }

export interface DWalletNetworkApproveRequestFields { capId: ToField<ID>; message: ToField<Vector<"u8">> }

export type DWalletNetworkApproveRequestReified = Reified< DWalletNetworkApproveRequest, DWalletNetworkApproveRequestFields >;

export class DWalletNetworkApproveRequest implements StructClass { static readonly $typeName = `${PKG_V1}::dwallet_cap::DWalletNetworkApproveRequest`; static readonly $numTypeParams = 0;

 readonly $typeName = DWalletNetworkApproveRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::dwallet_cap::DWalletNetworkApproveRequest`;

 readonly $typeArgs: [];

 readonly capId: ToField<ID>; readonly message: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: DWalletNetworkApproveRequestFields, ) { this.$fullTypeName = composeSuiType( DWalletNetworkApproveRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::dwallet_cap::DWalletNetworkApproveRequest`; this.$typeArgs = typeArgs;

 this.capId = fields.capId;; this.message = fields.message; }

 static reified( ): DWalletNetworkApproveRequestReified { return { typeName: DWalletNetworkApproveRequest.$typeName, fullTypeName: composeSuiType( DWalletNetworkApproveRequest.$typeName, ...[] ) as `${typeof PKG_V1}::dwallet_cap::DWalletNetworkApproveRequest`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DWalletNetworkApproveRequest.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DWalletNetworkApproveRequest.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DWalletNetworkApproveRequest.fromBcs( data, ), bcs: DWalletNetworkApproveRequest.bcs, fromJSONField: (field: any) => DWalletNetworkApproveRequest.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DWalletNetworkApproveRequest.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DWalletNetworkApproveRequest.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => DWalletNetworkApproveRequest.fetch( client, id, ), new: ( fields: DWalletNetworkApproveRequestFields, ) => { return new DWalletNetworkApproveRequest( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DWalletNetworkApproveRequest.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DWalletNetworkApproveRequest>> { return phantom(DWalletNetworkApproveRequest.reified( )); } static get p() { return DWalletNetworkApproveRequest.phantom() }

 static get bcs() { return bcs.struct("DWalletNetworkApproveRequest", {

 cap_id: ID.bcs, message: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): DWalletNetworkApproveRequest { return DWalletNetworkApproveRequest.reified( ).new( { capId: decodeFromFields(ID.reified(), fields.cap_id), message: decodeFromFields(reified.vector("u8"), fields.message) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DWalletNetworkApproveRequest { if (!isDWalletNetworkApproveRequest(item.type)) { throw new Error("not a DWalletNetworkApproveRequest type");

 }

 return DWalletNetworkApproveRequest.reified( ).new( { capId: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap_id), message: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.message) } ) }

 static fromBcs( data: Uint8Array ): DWalletNetworkApproveRequest { return DWalletNetworkApproveRequest.fromFields( DWalletNetworkApproveRequest.bcs.parse(data) ) }

 toJSONField() { return {

 capId: this.capId,message: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.message),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DWalletNetworkApproveRequest { return DWalletNetworkApproveRequest.reified( ).new( { capId: decodeFromJSONField(ID.reified(), field.capId), message: decodeFromJSONField(reified.vector("u8"), field.message) } ) }

 static fromJSON( json: Record<string, any> ): DWalletNetworkApproveRequest { if (json.$typeName !== DWalletNetworkApproveRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DWalletNetworkApproveRequest.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DWalletNetworkApproveRequest { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDWalletNetworkApproveRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DWalletNetworkApproveRequest object`); } return DWalletNetworkApproveRequest.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<DWalletNetworkApproveRequest> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DWalletNetworkApproveRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDWalletNetworkApproveRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DWalletNetworkApproveRequest object`); }

 return DWalletNetworkApproveRequest.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== DWalletNetworkInitCapRequest =============================== */

export function isDWalletNetworkInitCapRequest(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::dwallet_cap::DWalletNetworkInitCapRequest`; }

export interface DWalletNetworkInitCapRequestFields { capId: ToField<ID>; dwalletNetworkCapId: ToField<ID> }

export type DWalletNetworkInitCapRequestReified = Reified< DWalletNetworkInitCapRequest, DWalletNetworkInitCapRequestFields >;

export class DWalletNetworkInitCapRequest implements StructClass { static readonly $typeName = `${PKG_V1}::dwallet_cap::DWalletNetworkInitCapRequest`; static readonly $numTypeParams = 0;

 readonly $typeName = DWalletNetworkInitCapRequest.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::dwallet_cap::DWalletNetworkInitCapRequest`;

 readonly $typeArgs: [];

 readonly capId: ToField<ID>; readonly dwalletNetworkCapId: ToField<ID>

 private constructor(typeArgs: [], fields: DWalletNetworkInitCapRequestFields, ) { this.$fullTypeName = composeSuiType( DWalletNetworkInitCapRequest.$typeName, ...typeArgs ) as `${typeof PKG_V1}::dwallet_cap::DWalletNetworkInitCapRequest`; this.$typeArgs = typeArgs;

 this.capId = fields.capId;; this.dwalletNetworkCapId = fields.dwalletNetworkCapId; }

 static reified( ): DWalletNetworkInitCapRequestReified { return { typeName: DWalletNetworkInitCapRequest.$typeName, fullTypeName: composeSuiType( DWalletNetworkInitCapRequest.$typeName, ...[] ) as `${typeof PKG_V1}::dwallet_cap::DWalletNetworkInitCapRequest`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DWalletNetworkInitCapRequest.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DWalletNetworkInitCapRequest.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DWalletNetworkInitCapRequest.fromBcs( data, ), bcs: DWalletNetworkInitCapRequest.bcs, fromJSONField: (field: any) => DWalletNetworkInitCapRequest.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DWalletNetworkInitCapRequest.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DWalletNetworkInitCapRequest.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => DWalletNetworkInitCapRequest.fetch( client, id, ), new: ( fields: DWalletNetworkInitCapRequestFields, ) => { return new DWalletNetworkInitCapRequest( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DWalletNetworkInitCapRequest.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DWalletNetworkInitCapRequest>> { return phantom(DWalletNetworkInitCapRequest.reified( )); } static get p() { return DWalletNetworkInitCapRequest.phantom() }

 static get bcs() { return bcs.struct("DWalletNetworkInitCapRequest", {

 cap_id: ID.bcs, dwallet_network_cap_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): DWalletNetworkInitCapRequest { return DWalletNetworkInitCapRequest.reified( ).new( { capId: decodeFromFields(ID.reified(), fields.cap_id), dwalletNetworkCapId: decodeFromFields(ID.reified(), fields.dwallet_network_cap_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DWalletNetworkInitCapRequest { if (!isDWalletNetworkInitCapRequest(item.type)) { throw new Error("not a DWalletNetworkInitCapRequest type");

 }

 return DWalletNetworkInitCapRequest.reified( ).new( { capId: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap_id), dwalletNetworkCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.dwallet_network_cap_id) } ) }

 static fromBcs( data: Uint8Array ): DWalletNetworkInitCapRequest { return DWalletNetworkInitCapRequest.fromFields( DWalletNetworkInitCapRequest.bcs.parse(data) ) }

 toJSONField() { return {

 capId: this.capId,dwalletNetworkCapId: this.dwalletNetworkCapId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DWalletNetworkInitCapRequest { return DWalletNetworkInitCapRequest.reified( ).new( { capId: decodeFromJSONField(ID.reified(), field.capId), dwalletNetworkCapId: decodeFromJSONField(ID.reified(), field.dwalletNetworkCapId) } ) }

 static fromJSON( json: Record<string, any> ): DWalletNetworkInitCapRequest { if (json.$typeName !== DWalletNetworkInitCapRequest.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DWalletNetworkInitCapRequest.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DWalletNetworkInitCapRequest { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDWalletNetworkInitCapRequest(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DWalletNetworkInitCapRequest object`); } return DWalletNetworkInitCapRequest.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<DWalletNetworkInitCapRequest> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DWalletNetworkInitCapRequest object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDWalletNetworkInitCapRequest(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DWalletNetworkInitCapRequest object`); }

 return DWalletNetworkInitCapRequest.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
