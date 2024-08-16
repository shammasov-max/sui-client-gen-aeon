import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== NetworkAddress =============================== */

export function isNetworkAddress(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::library::NetworkAddress`; }

export interface NetworkAddressFields { network: ToField<String>; addressRaw: ToField<Vector<"u8">> }

export type NetworkAddressReified = Reified< NetworkAddress, NetworkAddressFields >;

export class NetworkAddress implements StructClass { static readonly $typeName = `${PKG_V1}::library::NetworkAddress`; static readonly $numTypeParams = 0;

 readonly $typeName = NetworkAddress.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::library::NetworkAddress`;

 readonly $typeArgs: [];

 readonly network: ToField<String>; readonly addressRaw: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: NetworkAddressFields, ) { this.$fullTypeName = composeSuiType( NetworkAddress.$typeName, ...typeArgs ) as `${typeof PKG_V1}::library::NetworkAddress`; this.$typeArgs = typeArgs;

 this.network = fields.network;; this.addressRaw = fields.addressRaw; }

 static reified( ): NetworkAddressReified { return { typeName: NetworkAddress.$typeName, fullTypeName: composeSuiType( NetworkAddress.$typeName, ...[] ) as `${typeof PKG_V1}::library::NetworkAddress`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => NetworkAddress.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => NetworkAddress.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => NetworkAddress.fromBcs( data, ), bcs: NetworkAddress.bcs, fromJSONField: (field: any) => NetworkAddress.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => NetworkAddress.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => NetworkAddress.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => NetworkAddress.fetch( client, id, ), new: ( fields: NetworkAddressFields, ) => { return new NetworkAddress( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return NetworkAddress.reified() }

 static phantom( ): PhantomReified<ToTypeStr<NetworkAddress>> { return phantom(NetworkAddress.reified( )); } static get p() { return NetworkAddress.phantom() }

 static get bcs() { return bcs.struct("NetworkAddress", {

 network: String.bcs, address_raw: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): NetworkAddress { return NetworkAddress.reified( ).new( { network: decodeFromFields(String.reified(), fields.network), addressRaw: decodeFromFields(reified.vector("u8"), fields.address_raw) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): NetworkAddress { if (!isNetworkAddress(item.type)) { throw new Error("not a NetworkAddress type");

 }

 return NetworkAddress.reified( ).new( { network: decodeFromFieldsWithTypes(String.reified(), item.fields.network), addressRaw: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.address_raw) } ) }

 static fromBcs( data: Uint8Array ): NetworkAddress { return NetworkAddress.fromFields( NetworkAddress.bcs.parse(data) ) }

 toJSONField() { return {

 network: this.network,addressRaw: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.addressRaw),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): NetworkAddress { return NetworkAddress.reified( ).new( { network: decodeFromJSONField(String.reified(), field.network), addressRaw: decodeFromJSONField(reified.vector("u8"), field.addressRaw) } ) }

 static fromJSON( json: Record<string, any> ): NetworkAddress { if (json.$typeName !== NetworkAddress.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return NetworkAddress.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): NetworkAddress { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isNetworkAddress(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a NetworkAddress object`); } return NetworkAddress.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<NetworkAddress> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching NetworkAddress object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isNetworkAddress(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a NetworkAddress object`); }

 return NetworkAddress.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
