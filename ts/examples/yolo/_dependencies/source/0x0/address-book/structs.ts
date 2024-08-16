import * as reified from "../../../../_framework/reified";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom, ToTypeStr as ToPhantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {Table} from "../../../../sui/table/structs";
import {VecSet} from "../../../../sui/vec-set/structs";
import {String} from "../../0x1/string/structs";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Address =============================== */

export function isAddress(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::address_book::Address`; }

export interface AddressFields { name: ToField<String>; groupIds: ToField<VecSet<"u16">>; address: ToField<Vector<"u8">>; networkIds: ToField<VecSet<String>> }

export type AddressReified = Reified< Address, AddressFields >;

export class Address implements StructClass { static readonly $typeName = `${PKG_V1}::address_book::Address`; static readonly $numTypeParams = 0;

 readonly $typeName = Address.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::address_book::Address`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly groupIds: ToField<VecSet<"u16">>; readonly address: ToField<Vector<"u8">>; readonly networkIds: ToField<VecSet<String>>

 private constructor(typeArgs: [], fields: AddressFields, ) { this.$fullTypeName = composeSuiType( Address.$typeName, ...typeArgs ) as `${typeof PKG_V1}::address_book::Address`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.groupIds = fields.groupIds;; this.address = fields.address;; this.networkIds = fields.networkIds; }

 static reified( ): AddressReified { return { typeName: Address.$typeName, fullTypeName: composeSuiType( Address.$typeName, ...[] ) as `${typeof PKG_V1}::address_book::Address`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Address.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Address.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Address.fromBcs( data, ), bcs: Address.bcs, fromJSONField: (field: any) => Address.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Address.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Address.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Address.fetch( client, id, ), new: ( fields: AddressFields, ) => { return new Address( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Address.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Address>> { return phantom(Address.reified( )); } static get p() { return Address.phantom() }

 static get bcs() { return bcs.struct("Address", {

 name: String.bcs, group_ids: VecSet.bcs(bcs.u16()), address_: bcs.vector(bcs.u8()), network_ids: VecSet.bcs(String.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Address { return Address.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), groupIds: decodeFromFields(VecSet.reified("u16"), fields.group_ids), address: decodeFromFields(reified.vector("u8"), fields.address_), networkIds: decodeFromFields(VecSet.reified(String.reified()), fields.network_ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Address { if (!isAddress(item.type)) { throw new Error("not a Address type");

 }

 return Address.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), groupIds: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.group_ids), address: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.address_), networkIds: decodeFromFieldsWithTypes(VecSet.reified(String.reified()), item.fields.network_ids) } ) }

 static fromBcs( data: Uint8Array ): Address { return Address.fromFields( Address.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,groupIds: this.groupIds.toJSONField(),address: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.address),networkIds: this.networkIds.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Address { return Address.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), groupIds: decodeFromJSONField(VecSet.reified("u16"), field.groupIds), address: decodeFromJSONField(reified.vector("u8"), field.address), networkIds: decodeFromJSONField(VecSet.reified(String.reified()), field.networkIds) } ) }

 static fromJSON( json: Record<string, any> ): Address { if (json.$typeName !== Address.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Address.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Address { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAddress(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Address object`); } return Address.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Address> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Address object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAddress(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Address object`); }

 return Address.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== AddressBook =============================== */

export function isAddressBook(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::address_book::AddressBook`; }

export interface AddressBookFields { addresses: ToField<Table<"u16", ToPhantom<Address>>>; addressGroups: ToField<Table<"u16", ToPhantom<AddressGroup>>>; addressEntryIdByAddress: ToField<Table<ToPhantom<Vector<"u8">>, ToPhantom<Vector<"u16">>>>; addressIdCounter: ToField<"u16"> }

export type AddressBookReified = Reified< AddressBook, AddressBookFields >;

export class AddressBook implements StructClass { static readonly $typeName = `${PKG_V1}::address_book::AddressBook`; static readonly $numTypeParams = 0;

 readonly $typeName = AddressBook.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::address_book::AddressBook`;

 readonly $typeArgs: [];

 readonly addresses: ToField<Table<"u16", ToPhantom<Address>>>; readonly addressGroups: ToField<Table<"u16", ToPhantom<AddressGroup>>>; readonly addressEntryIdByAddress: ToField<Table<ToPhantom<Vector<"u8">>, ToPhantom<Vector<"u16">>>>; readonly addressIdCounter: ToField<"u16">

 private constructor(typeArgs: [], fields: AddressBookFields, ) { this.$fullTypeName = composeSuiType( AddressBook.$typeName, ...typeArgs ) as `${typeof PKG_V1}::address_book::AddressBook`; this.$typeArgs = typeArgs;

 this.addresses = fields.addresses;; this.addressGroups = fields.addressGroups;; this.addressEntryIdByAddress = fields.addressEntryIdByAddress;; this.addressIdCounter = fields.addressIdCounter; }

 static reified( ): AddressBookReified { return { typeName: AddressBook.$typeName, fullTypeName: composeSuiType( AddressBook.$typeName, ...[] ) as `${typeof PKG_V1}::address_book::AddressBook`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AddressBook.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AddressBook.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AddressBook.fromBcs( data, ), bcs: AddressBook.bcs, fromJSONField: (field: any) => AddressBook.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AddressBook.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AddressBook.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => AddressBook.fetch( client, id, ), new: ( fields: AddressBookFields, ) => { return new AddressBook( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AddressBook.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AddressBook>> { return phantom(AddressBook.reified( )); } static get p() { return AddressBook.phantom() }

 static get bcs() { return bcs.struct("AddressBook", {

 addresses: Table.bcs, address_groups: Table.bcs, address_entry_id_by_address: Table.bcs, address_id_counter: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): AddressBook { return AddressBook.reified( ).new( { addresses: decodeFromFields(Table.reified(reified.phantom("u16"), reified.phantom(Address.reified())), fields.addresses), addressGroups: decodeFromFields(Table.reified(reified.phantom("u16"), reified.phantom(AddressGroup.reified())), fields.address_groups), addressEntryIdByAddress: decodeFromFields(Table.reified(reified.phantom(reified.vector("u8")), reified.phantom(reified.vector("u16"))), fields.address_entry_id_by_address), addressIdCounter: decodeFromFields("u16", fields.address_id_counter) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AddressBook { if (!isAddressBook(item.type)) { throw new Error("not a AddressBook type");

 }

 return AddressBook.reified( ).new( { addresses: decodeFromFieldsWithTypes(Table.reified(reified.phantom("u16"), reified.phantom(Address.reified())), item.fields.addresses), addressGroups: decodeFromFieldsWithTypes(Table.reified(reified.phantom("u16"), reified.phantom(AddressGroup.reified())), item.fields.address_groups), addressEntryIdByAddress: decodeFromFieldsWithTypes(Table.reified(reified.phantom(reified.vector("u8")), reified.phantom(reified.vector("u16"))), item.fields.address_entry_id_by_address), addressIdCounter: decodeFromFieldsWithTypes("u16", item.fields.address_id_counter) } ) }

 static fromBcs( data: Uint8Array ): AddressBook { return AddressBook.fromFields( AddressBook.bcs.parse(data) ) }

 toJSONField() { return {

 addresses: this.addresses.toJSONField(),addressGroups: this.addressGroups.toJSONField(),addressEntryIdByAddress: this.addressEntryIdByAddress.toJSONField(),addressIdCounter: this.addressIdCounter,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AddressBook { return AddressBook.reified( ).new( { addresses: decodeFromJSONField(Table.reified(reified.phantom("u16"), reified.phantom(Address.reified())), field.addresses), addressGroups: decodeFromJSONField(Table.reified(reified.phantom("u16"), reified.phantom(AddressGroup.reified())), field.addressGroups), addressEntryIdByAddress: decodeFromJSONField(Table.reified(reified.phantom(reified.vector("u8")), reified.phantom(reified.vector("u16"))), field.addressEntryIdByAddress), addressIdCounter: decodeFromJSONField("u16", field.addressIdCounter) } ) }

 static fromJSON( json: Record<string, any> ): AddressBook { if (json.$typeName !== AddressBook.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AddressBook.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AddressBook { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAddressBook(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AddressBook object`); } return AddressBook.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<AddressBook> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AddressBook object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAddressBook(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AddressBook object`); }

 return AddressBook.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== AddressGroup =============================== */

export function isAddressGroup(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::address_book::AddressGroup`; }

export interface AddressGroupFields { name: ToField<String>; addressIds: ToField<VecSet<"u16">> }

export type AddressGroupReified = Reified< AddressGroup, AddressGroupFields >;

export class AddressGroup implements StructClass { static readonly $typeName = `${PKG_V1}::address_book::AddressGroup`; static readonly $numTypeParams = 0;

 readonly $typeName = AddressGroup.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::address_book::AddressGroup`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly addressIds: ToField<VecSet<"u16">>

 private constructor(typeArgs: [], fields: AddressGroupFields, ) { this.$fullTypeName = composeSuiType( AddressGroup.$typeName, ...typeArgs ) as `${typeof PKG_V1}::address_book::AddressGroup`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.addressIds = fields.addressIds; }

 static reified( ): AddressGroupReified { return { typeName: AddressGroup.$typeName, fullTypeName: composeSuiType( AddressGroup.$typeName, ...[] ) as `${typeof PKG_V1}::address_book::AddressGroup`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AddressGroup.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AddressGroup.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AddressGroup.fromBcs( data, ), bcs: AddressGroup.bcs, fromJSONField: (field: any) => AddressGroup.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AddressGroup.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AddressGroup.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => AddressGroup.fetch( client, id, ), new: ( fields: AddressGroupFields, ) => { return new AddressGroup( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AddressGroup.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AddressGroup>> { return phantom(AddressGroup.reified( )); } static get p() { return AddressGroup.phantom() }

 static get bcs() { return bcs.struct("AddressGroup", {

 name: String.bcs, address_ids: VecSet.bcs(bcs.u16())

}) };

 static fromFields( fields: Record<string, any> ): AddressGroup { return AddressGroup.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), addressIds: decodeFromFields(VecSet.reified("u16"), fields.address_ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AddressGroup { if (!isAddressGroup(item.type)) { throw new Error("not a AddressGroup type");

 }

 return AddressGroup.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), addressIds: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.address_ids) } ) }

 static fromBcs( data: Uint8Array ): AddressGroup { return AddressGroup.fromFields( AddressGroup.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,addressIds: this.addressIds.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AddressGroup { return AddressGroup.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), addressIds: decodeFromJSONField(VecSet.reified("u16"), field.addressIds) } ) }

 static fromJSON( json: Record<string, any> ): AddressGroup { if (json.$typeName !== AddressGroup.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AddressGroup.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AddressGroup { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAddressGroup(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AddressGroup object`); } return AddressGroup.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<AddressGroup> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AddressGroup object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAddressGroup(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AddressGroup object`); }

 return AddressGroup.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
