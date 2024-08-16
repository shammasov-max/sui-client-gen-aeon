import * as reified from "../../_framework/reified";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom, ToTypeStr as ToPhantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {TreasuryCap} from "../../sui/coin/structs";
import {UID} from "../../sui/object/structs";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== EXAMPLE_COIN =============================== */

export function isEXAMPLE_COIN(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::example_coin::EXAMPLE_COIN`; }

export interface EXAMPLE_COINFields { dummyField: ToField<"bool"> }

export type EXAMPLE_COINReified = Reified< EXAMPLE_COIN, EXAMPLE_COINFields >;

export class EXAMPLE_COIN implements StructClass { static readonly $typeName = `${PKG_V1}::example_coin::EXAMPLE_COIN`; static readonly $numTypeParams = 0;

 readonly $typeName = EXAMPLE_COIN.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::example_coin::EXAMPLE_COIN`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: EXAMPLE_COINFields, ) { this.$fullTypeName = composeSuiType( EXAMPLE_COIN.$typeName, ...typeArgs ) as `${typeof PKG_V1}::example_coin::EXAMPLE_COIN`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): EXAMPLE_COINReified { return { typeName: EXAMPLE_COIN.$typeName, fullTypeName: composeSuiType( EXAMPLE_COIN.$typeName, ...[] ) as `${typeof PKG_V1}::example_coin::EXAMPLE_COIN`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => EXAMPLE_COIN.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => EXAMPLE_COIN.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => EXAMPLE_COIN.fromBcs( data, ), bcs: EXAMPLE_COIN.bcs, fromJSONField: (field: any) => EXAMPLE_COIN.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => EXAMPLE_COIN.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => EXAMPLE_COIN.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => EXAMPLE_COIN.fetch( client, id, ), new: ( fields: EXAMPLE_COINFields, ) => { return new EXAMPLE_COIN( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return EXAMPLE_COIN.reified() }

 static phantom( ): PhantomReified<ToTypeStr<EXAMPLE_COIN>> { return phantom(EXAMPLE_COIN.reified( )); } static get p() { return EXAMPLE_COIN.phantom() }

 static get bcs() { return bcs.struct("EXAMPLE_COIN", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): EXAMPLE_COIN { return EXAMPLE_COIN.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): EXAMPLE_COIN { if (!isEXAMPLE_COIN(item.type)) { throw new Error("not a EXAMPLE_COIN type");

 }

 return EXAMPLE_COIN.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): EXAMPLE_COIN { return EXAMPLE_COIN.fromFields( EXAMPLE_COIN.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): EXAMPLE_COIN { return EXAMPLE_COIN.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): EXAMPLE_COIN { if (json.$typeName !== EXAMPLE_COIN.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return EXAMPLE_COIN.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): EXAMPLE_COIN { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isEXAMPLE_COIN(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a EXAMPLE_COIN object`); } return EXAMPLE_COIN.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<EXAMPLE_COIN> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching EXAMPLE_COIN object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isEXAMPLE_COIN(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a EXAMPLE_COIN object`); }

 return EXAMPLE_COIN.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Faucet =============================== */

export function isFaucet(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::example_coin::Faucet`; }

export interface FaucetFields { id: ToField<UID>; cap: ToField<TreasuryCap<ToPhantom<EXAMPLE_COIN>>> }

export type FaucetReified = Reified< Faucet, FaucetFields >;

export class Faucet implements StructClass { static readonly $typeName = `${PKG_V1}::example_coin::Faucet`; static readonly $numTypeParams = 0;

 readonly $typeName = Faucet.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::example_coin::Faucet`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly cap: ToField<TreasuryCap<ToPhantom<EXAMPLE_COIN>>>

 private constructor(typeArgs: [], fields: FaucetFields, ) { this.$fullTypeName = composeSuiType( Faucet.$typeName, ...typeArgs ) as `${typeof PKG_V1}::example_coin::Faucet`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.cap = fields.cap; }

 static reified( ): FaucetReified { return { typeName: Faucet.$typeName, fullTypeName: composeSuiType( Faucet.$typeName, ...[] ) as `${typeof PKG_V1}::example_coin::Faucet`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Faucet.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Faucet.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Faucet.fromBcs( data, ), bcs: Faucet.bcs, fromJSONField: (field: any) => Faucet.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Faucet.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Faucet.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Faucet.fetch( client, id, ), new: ( fields: FaucetFields, ) => { return new Faucet( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Faucet.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Faucet>> { return phantom(Faucet.reified( )); } static get p() { return Faucet.phantom() }

 static get bcs() { return bcs.struct("Faucet", {

 id: UID.bcs, cap: TreasuryCap.bcs

}) };

 static fromFields( fields: Record<string, any> ): Faucet { return Faucet.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), cap: decodeFromFields(TreasuryCap.reified(reified.phantom(EXAMPLE_COIN.reified())), fields.cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Faucet { if (!isFaucet(item.type)) { throw new Error("not a Faucet type");

 }

 return Faucet.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), cap: decodeFromFieldsWithTypes(TreasuryCap.reified(reified.phantom(EXAMPLE_COIN.reified())), item.fields.cap) } ) }

 static fromBcs( data: Uint8Array ): Faucet { return Faucet.fromFields( Faucet.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,cap: this.cap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Faucet { return Faucet.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), cap: decodeFromJSONField(TreasuryCap.reified(reified.phantom(EXAMPLE_COIN.reified())), field.cap) } ) }

 static fromJSON( json: Record<string, any> ): Faucet { if (json.$typeName !== Faucet.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Faucet.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Faucet { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isFaucet(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Faucet object`); } return Faucet.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Faucet> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Faucet object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isFaucet(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Faucet object`); }

 return Faucet.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
