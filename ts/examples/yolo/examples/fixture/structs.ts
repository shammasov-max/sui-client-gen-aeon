import * as reified from "../../_framework/reified";
import {String as String1} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeArgument, ToTypeStr, TypeArgument, Vector, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs, ToTypeStr as ToPhantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {Balance} from "../../sui/balance/structs";
import {ID, UID} from "../../sui/object/structs";
import {SUI} from "../../sui/sui/structs";
import {Url} from "../../sui/url/structs";
import {PKG_V1} from "../index";
import {StructFromOtherModule} from "../other-module/structs";
import {BcsType, bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Bar =============================== */

export function isBar(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::fixture::Bar`; }

export interface BarFields { value: ToField<"u64"> }

export type BarReified = Reified< Bar, BarFields >;

export class Bar implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::Bar`; static readonly $numTypeParams = 0;

 readonly $typeName = Bar.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::Bar`;

 readonly $typeArgs: [];

 readonly value: ToField<"u64">

 private constructor(typeArgs: [], fields: BarFields, ) { this.$fullTypeName = composeSuiType( Bar.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::Bar`; this.$typeArgs = typeArgs;

 this.value = fields.value; }

 static reified( ): BarReified { return { typeName: Bar.$typeName, fullTypeName: composeSuiType( Bar.$typeName, ...[] ) as `${typeof PKG_V1}::fixture::Bar`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Bar.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Bar.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Bar.fromBcs( data, ), bcs: Bar.bcs, fromJSONField: (field: any) => Bar.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Bar.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Bar.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Bar.fetch( client, id, ), new: ( fields: BarFields, ) => { return new Bar( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Bar.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Bar>> { return phantom(Bar.reified( )); } static get p() { return Bar.phantom() }

 static get bcs() { return bcs.struct("Bar", {

 value: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Bar { return Bar.reified( ).new( { value: decodeFromFields("u64", fields.value) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Bar { if (!isBar(item.type)) { throw new Error("not a Bar type");

 }

 return Bar.reified( ).new( { value: decodeFromFieldsWithTypes("u64", item.fields.value) } ) }

 static fromBcs( data: Uint8Array ): Bar { return Bar.fromFields( Bar.bcs.parse(data) ) }

 toJSONField() { return {

 value: this.value.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Bar { return Bar.reified( ).new( { value: decodeFromJSONField("u64", field.value) } ) }

 static fromJSON( json: Record<string, any> ): Bar { if (json.$typeName !== Bar.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Bar.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Bar { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBar(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Bar object`); } return Bar.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Bar> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Bar object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBar(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Bar object`); }

 return Bar.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Dummy =============================== */

export function isDummy(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::fixture::Dummy`; }

export interface DummyFields { dummyField: ToField<"bool"> }

export type DummyReified = Reified< Dummy, DummyFields >;

export class Dummy implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::Dummy`; static readonly $numTypeParams = 0;

 readonly $typeName = Dummy.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::Dummy`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DummyFields, ) { this.$fullTypeName = composeSuiType( Dummy.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::Dummy`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DummyReified { return { typeName: Dummy.$typeName, fullTypeName: composeSuiType( Dummy.$typeName, ...[] ) as `${typeof PKG_V1}::fixture::Dummy`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Dummy.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Dummy.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Dummy.fromBcs( data, ), bcs: Dummy.bcs, fromJSONField: (field: any) => Dummy.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Dummy.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Dummy.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Dummy.fetch( client, id, ), new: ( fields: DummyFields, ) => { return new Dummy( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Dummy.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Dummy>> { return phantom(Dummy.reified( )); } static get p() { return Dummy.phantom() }

 static get bcs() { return bcs.struct("Dummy", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Dummy { return Dummy.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Dummy { if (!isDummy(item.type)) { throw new Error("not a Dummy type");

 }

 return Dummy.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Dummy { return Dummy.fromFields( Dummy.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Dummy { return Dummy.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Dummy { if (json.$typeName !== Dummy.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Dummy.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Dummy { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDummy(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Dummy object`); } return Dummy.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Dummy> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Dummy object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDummy(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Dummy object`); }

 return Dummy.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Foo =============================== */

export function isFoo(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::fixture::Foo` + '<'); }

export interface FooFields<T extends TypeArgument> { id: ToField<UID>; generic: ToField<T>; reifiedPrimitiveVec: ToField<Vector<"u64">>; reifiedObjectVec: ToField<Vector<Bar>>; genericVec: ToField<Vector<T>>; genericVecNested: ToField<Vector<WithTwoGenerics<T, "u8">>>; twoGenerics: ToField<WithTwoGenerics<T, Bar>>; twoGenericsReifiedPrimitive: ToField<WithTwoGenerics<"u16", "u64">>; twoGenericsReifiedObject: ToField<WithTwoGenerics<Bar, Bar>>; twoGenericsNested: ToField<WithTwoGenerics<T, WithTwoGenerics<"u8", "u8">>>; twoGenericsReifiedNested: ToField<WithTwoGenerics<Bar, WithTwoGenerics<"u8", "u8">>>; twoGenericsNestedVec: ToField<Vector<WithTwoGenerics<Bar, Vector<WithTwoGenerics<T, "u8">>>>>; dummy: ToField<Dummy>; other: ToField<StructFromOtherModule> }

export type FooReified<T extends TypeArgument> = Reified< Foo<T>, FooFields<T> >;

export class Foo<T extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::Foo`; static readonly $numTypeParams = 1;

 readonly $typeName = Foo.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::Foo<${ToTypeStr<T>}>`;

 readonly $typeArgs: [ToTypeStr<T>];

 readonly id: ToField<UID>; readonly generic: ToField<T>; readonly reifiedPrimitiveVec: ToField<Vector<"u64">>; readonly reifiedObjectVec: ToField<Vector<Bar>>; readonly genericVec: ToField<Vector<T>>; readonly genericVecNested: ToField<Vector<WithTwoGenerics<T, "u8">>>; readonly twoGenerics: ToField<WithTwoGenerics<T, Bar>>; readonly twoGenericsReifiedPrimitive: ToField<WithTwoGenerics<"u16", "u64">>; readonly twoGenericsReifiedObject: ToField<WithTwoGenerics<Bar, Bar>>; readonly twoGenericsNested: ToField<WithTwoGenerics<T, WithTwoGenerics<"u8", "u8">>>; readonly twoGenericsReifiedNested: ToField<WithTwoGenerics<Bar, WithTwoGenerics<"u8", "u8">>>; readonly twoGenericsNestedVec: ToField<Vector<WithTwoGenerics<Bar, Vector<WithTwoGenerics<T, "u8">>>>>; readonly dummy: ToField<Dummy>; readonly other: ToField<StructFromOtherModule>

 private constructor(typeArgs: [ToTypeStr<T>], fields: FooFields<T>, ) { this.$fullTypeName = composeSuiType( Foo.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::Foo<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.generic = fields.generic;; this.reifiedPrimitiveVec = fields.reifiedPrimitiveVec;; this.reifiedObjectVec = fields.reifiedObjectVec;; this.genericVec = fields.genericVec;; this.genericVecNested = fields.genericVecNested;; this.twoGenerics = fields.twoGenerics;; this.twoGenericsReifiedPrimitive = fields.twoGenericsReifiedPrimitive;; this.twoGenericsReifiedObject = fields.twoGenericsReifiedObject;; this.twoGenericsNested = fields.twoGenericsNested;; this.twoGenericsReifiedNested = fields.twoGenericsReifiedNested;; this.twoGenericsNestedVec = fields.twoGenericsNestedVec;; this.dummy = fields.dummy;; this.other = fields.other; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): FooReified<ToTypeArgument<T>> { return { typeName: Foo.$typeName, fullTypeName: composeSuiType( Foo.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::fixture::Foo<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => Foo.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Foo.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => Foo.fromBcs( T, data, ), bcs: Foo.bcs(toBcs(T)), fromJSONField: (field: any) => Foo.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => Foo.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => Foo.fromSuiParsedData( T, content, ), fetch: async (client: SuiClient, id: string) => Foo.fetch( client, T, id, ), new: ( fields: FooFields<ToTypeArgument<T>>, ) => { return new Foo( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Foo.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<Foo<ToTypeArgument<T>>>> { return phantom(Foo.reified( T )); } static get p() { return Foo.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`Foo<${T.name}>`, {

 id: UID.bcs, generic: T, reified_primitive_vec: bcs.vector(bcs.u64()), reified_object_vec: bcs.vector(Bar.bcs), generic_vec: bcs.vector(T), generic_vec_nested: bcs.vector(WithTwoGenerics.bcs(T, bcs.u8())), two_generics: WithTwoGenerics.bcs(T, Bar.bcs), two_generics_reified_primitive: WithTwoGenerics.bcs(bcs.u16(), bcs.u64()), two_generics_reified_object: WithTwoGenerics.bcs(Bar.bcs, Bar.bcs), two_generics_nested: WithTwoGenerics.bcs(T, WithTwoGenerics.bcs(bcs.u8(), bcs.u8())), two_generics_reified_nested: WithTwoGenerics.bcs(Bar.bcs, WithTwoGenerics.bcs(bcs.u8(), bcs.u8())), two_generics_nested_vec: bcs.vector(WithTwoGenerics.bcs(Bar.bcs, bcs.vector(WithTwoGenerics.bcs(T, bcs.u8())))), dummy: Dummy.bcs, other: StructFromOtherModule.bcs

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): Foo<ToTypeArgument<T>> { return Foo.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), generic: decodeFromFields(typeArg, fields.generic), reifiedPrimitiveVec: decodeFromFields(reified.vector("u64"), fields.reified_primitive_vec), reifiedObjectVec: decodeFromFields(reified.vector(Bar.reified()), fields.reified_object_vec), genericVec: decodeFromFields(reified.vector(typeArg), fields.generic_vec), genericVecNested: decodeFromFields(reified.vector(WithTwoGenerics.reified(typeArg, "u8")), fields.generic_vec_nested), twoGenerics: decodeFromFields(WithTwoGenerics.reified(typeArg, Bar.reified()), fields.two_generics), twoGenericsReifiedPrimitive: decodeFromFields(WithTwoGenerics.reified("u16", "u64"), fields.two_generics_reified_primitive), twoGenericsReifiedObject: decodeFromFields(WithTwoGenerics.reified(Bar.reified(), Bar.reified()), fields.two_generics_reified_object), twoGenericsNested: decodeFromFields(WithTwoGenerics.reified(typeArg, WithTwoGenerics.reified("u8", "u8")), fields.two_generics_nested), twoGenericsReifiedNested: decodeFromFields(WithTwoGenerics.reified(Bar.reified(), WithTwoGenerics.reified("u8", "u8")), fields.two_generics_reified_nested), twoGenericsNestedVec: decodeFromFields(reified.vector(WithTwoGenerics.reified(Bar.reified(), reified.vector(WithTwoGenerics.reified(typeArg, "u8")))), fields.two_generics_nested_vec), dummy: decodeFromFields(Dummy.reified(), fields.dummy), other: decodeFromFields(StructFromOtherModule.reified(), fields.other) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): Foo<ToTypeArgument<T>> { if (!isFoo(item.type)) { throw new Error("not a Foo type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Foo.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), generic: decodeFromFieldsWithTypes(typeArg, item.fields.generic), reifiedPrimitiveVec: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.reified_primitive_vec), reifiedObjectVec: decodeFromFieldsWithTypes(reified.vector(Bar.reified()), item.fields.reified_object_vec), genericVec: decodeFromFieldsWithTypes(reified.vector(typeArg), item.fields.generic_vec), genericVecNested: decodeFromFieldsWithTypes(reified.vector(WithTwoGenerics.reified(typeArg, "u8")), item.fields.generic_vec_nested), twoGenerics: decodeFromFieldsWithTypes(WithTwoGenerics.reified(typeArg, Bar.reified()), item.fields.two_generics), twoGenericsReifiedPrimitive: decodeFromFieldsWithTypes(WithTwoGenerics.reified("u16", "u64"), item.fields.two_generics_reified_primitive), twoGenericsReifiedObject: decodeFromFieldsWithTypes(WithTwoGenerics.reified(Bar.reified(), Bar.reified()), item.fields.two_generics_reified_object), twoGenericsNested: decodeFromFieldsWithTypes(WithTwoGenerics.reified(typeArg, WithTwoGenerics.reified("u8", "u8")), item.fields.two_generics_nested), twoGenericsReifiedNested: decodeFromFieldsWithTypes(WithTwoGenerics.reified(Bar.reified(), WithTwoGenerics.reified("u8", "u8")), item.fields.two_generics_reified_nested), twoGenericsNestedVec: decodeFromFieldsWithTypes(reified.vector(WithTwoGenerics.reified(Bar.reified(), reified.vector(WithTwoGenerics.reified(typeArg, "u8")))), item.fields.two_generics_nested_vec), dummy: decodeFromFieldsWithTypes(Dummy.reified(), item.fields.dummy), other: decodeFromFieldsWithTypes(StructFromOtherModule.reified(), item.fields.other) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): Foo<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return Foo.fromFields( typeArg, Foo.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,generic: fieldToJSON<T>(this.$typeArgs[0], this.generic),reifiedPrimitiveVec: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.reifiedPrimitiveVec),reifiedObjectVec: fieldToJSON<Vector<Bar>>(`vector<${Bar.$typeName}>`, this.reifiedObjectVec),genericVec: fieldToJSON<Vector<T>>(`vector<${this.$typeArgs[0]}>`, this.genericVec),genericVecNested: fieldToJSON<Vector<WithTwoGenerics<T, "u8">>>(`vector<${WithTwoGenerics.$typeName}<${this.$typeArgs[0]}, u8>>`, this.genericVecNested),twoGenerics: this.twoGenerics.toJSONField(),twoGenericsReifiedPrimitive: this.twoGenericsReifiedPrimitive.toJSONField(),twoGenericsReifiedObject: this.twoGenericsReifiedObject.toJSONField(),twoGenericsNested: this.twoGenericsNested.toJSONField(),twoGenericsReifiedNested: this.twoGenericsReifiedNested.toJSONField(),twoGenericsNestedVec: fieldToJSON<Vector<WithTwoGenerics<Bar, Vector<WithTwoGenerics<T, "u8">>>>>(`vector<${WithTwoGenerics.$typeName}<${Bar.$typeName}, vector<${WithTwoGenerics.$typeName}<${this.$typeArgs[0]}, u8>>>>`, this.twoGenericsNestedVec),dummy: this.dummy.toJSONField(),other: this.other.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): Foo<ToTypeArgument<T>> { return Foo.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), generic: decodeFromJSONField(typeArg, field.generic), reifiedPrimitiveVec: decodeFromJSONField(reified.vector("u64"), field.reifiedPrimitiveVec), reifiedObjectVec: decodeFromJSONField(reified.vector(Bar.reified()), field.reifiedObjectVec), genericVec: decodeFromJSONField(reified.vector(typeArg), field.genericVec), genericVecNested: decodeFromJSONField(reified.vector(WithTwoGenerics.reified(typeArg, "u8")), field.genericVecNested), twoGenerics: decodeFromJSONField(WithTwoGenerics.reified(typeArg, Bar.reified()), field.twoGenerics), twoGenericsReifiedPrimitive: decodeFromJSONField(WithTwoGenerics.reified("u16", "u64"), field.twoGenericsReifiedPrimitive), twoGenericsReifiedObject: decodeFromJSONField(WithTwoGenerics.reified(Bar.reified(), Bar.reified()), field.twoGenericsReifiedObject), twoGenericsNested: decodeFromJSONField(WithTwoGenerics.reified(typeArg, WithTwoGenerics.reified("u8", "u8")), field.twoGenericsNested), twoGenericsReifiedNested: decodeFromJSONField(WithTwoGenerics.reified(Bar.reified(), WithTwoGenerics.reified("u8", "u8")), field.twoGenericsReifiedNested), twoGenericsNestedVec: decodeFromJSONField(reified.vector(WithTwoGenerics.reified(Bar.reified(), reified.vector(WithTwoGenerics.reified(typeArg, "u8")))), field.twoGenericsNestedVec), dummy: decodeFromJSONField(Dummy.reified(), field.dummy), other: decodeFromJSONField(StructFromOtherModule.reified(), field.other) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): Foo<ToTypeArgument<T>> { if (json.$typeName !== Foo.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Foo.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Foo.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): Foo<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isFoo(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Foo object`); } return Foo.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<Foo<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Foo object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isFoo(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Foo object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Foo.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WithGenericField =============================== */

export function isWithGenericField(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::fixture::WithGenericField` + '<'); }

export interface WithGenericFieldFields<T extends TypeArgument> { id: ToField<UID>; genericField: ToField<T> }

export type WithGenericFieldReified<T extends TypeArgument> = Reified< WithGenericField<T>, WithGenericFieldFields<T> >;

export class WithGenericField<T extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::WithGenericField`; static readonly $numTypeParams = 1;

 readonly $typeName = WithGenericField.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::WithGenericField<${ToTypeStr<T>}>`;

 readonly $typeArgs: [ToTypeStr<T>];

 readonly id: ToField<UID>; readonly genericField: ToField<T>

 private constructor(typeArgs: [ToTypeStr<T>], fields: WithGenericFieldFields<T>, ) { this.$fullTypeName = composeSuiType( WithGenericField.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::WithGenericField<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.genericField = fields.genericField; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): WithGenericFieldReified<ToTypeArgument<T>> { return { typeName: WithGenericField.$typeName, fullTypeName: composeSuiType( WithGenericField.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::fixture::WithGenericField<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => WithGenericField.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithGenericField.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => WithGenericField.fromBcs( T, data, ), bcs: WithGenericField.bcs(toBcs(T)), fromJSONField: (field: any) => WithGenericField.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => WithGenericField.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => WithGenericField.fromSuiParsedData( T, content, ), fetch: async (client: SuiClient, id: string) => WithGenericField.fetch( client, T, id, ), new: ( fields: WithGenericFieldFields<ToTypeArgument<T>>, ) => { return new WithGenericField( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithGenericField.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<WithGenericField<ToTypeArgument<T>>>> { return phantom(WithGenericField.reified( T )); } static get p() { return WithGenericField.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`WithGenericField<${T.name}>`, {

 id: UID.bcs, generic_field: T

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): WithGenericField<ToTypeArgument<T>> { return WithGenericField.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), genericField: decodeFromFields(typeArg, fields.generic_field) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): WithGenericField<ToTypeArgument<T>> { if (!isWithGenericField(item.type)) { throw new Error("not a WithGenericField type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return WithGenericField.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), genericField: decodeFromFieldsWithTypes(typeArg, item.fields.generic_field) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): WithGenericField<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return WithGenericField.fromFields( typeArg, WithGenericField.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,genericField: fieldToJSON<T>(this.$typeArgs[0], this.genericField),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): WithGenericField<ToTypeArgument<T>> { return WithGenericField.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), genericField: decodeFromJSONField(typeArg, field.genericField) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): WithGenericField<ToTypeArgument<T>> { if (json.$typeName !== WithGenericField.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WithGenericField.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return WithGenericField.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): WithGenericField<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithGenericField(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithGenericField object`); } return WithGenericField.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<WithGenericField<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithGenericField object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithGenericField(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithGenericField object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return WithGenericField.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WithSpecialTypes =============================== */

export function isWithSpecialTypes(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::fixture::WithSpecialTypes` + '<'); }

export interface WithSpecialTypesFields<T extends PhantomTypeArgument, U extends TypeArgument> { id: ToField<UID>; string: ToField<String>; asciiString: ToField<String1>; url: ToField<Url>; idField: ToField<ID>; uid: ToField<UID>; balance: ToField<Balance<ToPhantom<SUI>>>; option: ToField<Option<"u64">>; optionObj: ToField<Option<Bar>>; optionNone: ToField<Option<"u64">>; balanceGeneric: ToField<Balance<T>>; optionGeneric: ToField<Option<U>>; optionGenericNone: ToField<Option<U>> }

export type WithSpecialTypesReified<T extends PhantomTypeArgument, U extends TypeArgument> = Reified< WithSpecialTypes<T, U>, WithSpecialTypesFields<T, U> >;

export class WithSpecialTypes<T extends PhantomTypeArgument, U extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::WithSpecialTypes`; static readonly $numTypeParams = 2;

 readonly $typeName = WithSpecialTypes.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::WithSpecialTypes<${PhantomToTypeStr<T>}, ${ToTypeStr<U>}>`;

 readonly $typeArgs: [PhantomToTypeStr<T>, ToTypeStr<U>];

 readonly id: ToField<UID>; readonly string: ToField<String>; readonly asciiString: ToField<String1>; readonly url: ToField<Url>; readonly idField: ToField<ID>; readonly uid: ToField<UID>; readonly balance: ToField<Balance<ToPhantom<SUI>>>; readonly option: ToField<Option<"u64">>; readonly optionObj: ToField<Option<Bar>>; readonly optionNone: ToField<Option<"u64">>; readonly balanceGeneric: ToField<Balance<T>>; readonly optionGeneric: ToField<Option<U>>; readonly optionGenericNone: ToField<Option<U>>

 private constructor(typeArgs: [PhantomToTypeStr<T>, ToTypeStr<U>], fields: WithSpecialTypesFields<T, U>, ) { this.$fullTypeName = composeSuiType( WithSpecialTypes.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::WithSpecialTypes<${PhantomToTypeStr<T>}, ${ToTypeStr<U>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.string = fields.string;; this.asciiString = fields.asciiString;; this.url = fields.url;; this.idField = fields.idField;; this.uid = fields.uid;; this.balance = fields.balance;; this.option = fields.option;; this.optionObj = fields.optionObj;; this.optionNone = fields.optionNone;; this.balanceGeneric = fields.balanceGeneric;; this.optionGeneric = fields.optionGeneric;; this.optionGenericNone = fields.optionGenericNone; }

 static reified<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( T: T, U: U ): WithSpecialTypesReified<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { return { typeName: WithSpecialTypes.$typeName, fullTypeName: composeSuiType( WithSpecialTypes.$typeName, ...[extractType(T), extractType(U)] ) as `${typeof PKG_V1}::fixture::WithSpecialTypes<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${ToTypeStr<ToTypeArgument<U>>}>`, typeArgs: [ extractType(T), extractType(U) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>, ToTypeStr<ToTypeArgument<U>>], reifiedTypeArgs: [T, U], fromFields: (fields: Record<string, any>) => WithSpecialTypes.fromFields( [T, U], fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithSpecialTypes.fromFieldsWithTypes( [T, U], item, ), fromBcs: (data: Uint8Array) => WithSpecialTypes.fromBcs( [T, U], data, ), bcs: WithSpecialTypes.bcs(toBcs(U)), fromJSONField: (field: any) => WithSpecialTypes.fromJSONField( [T, U], field, ), fromJSON: (json: Record<string, any>) => WithSpecialTypes.fromJSON( [T, U], json, ), fromSuiParsedData: (content: SuiParsedData) => WithSpecialTypes.fromSuiParsedData( [T, U], content, ), fetch: async (client: SuiClient, id: string) => WithSpecialTypes.fetch( client, [T, U], id, ), new: ( fields: WithSpecialTypesFields<ToPhantomTypeArgument<T>, ToTypeArgument<U>>, ) => { return new WithSpecialTypes( [extractType(T), extractType(U)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithSpecialTypes.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( T: T, U: U ): PhantomReified<ToTypeStr<WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>>>> { return phantom(WithSpecialTypes.reified( T, U )); } static get p() { return WithSpecialTypes.phantom }

 static get bcs() { return <U extends BcsType<any>>(U: U) => bcs.struct(`WithSpecialTypes<${U.name}>`, {

 id: UID.bcs, string: String.bcs, ascii_string: String1.bcs, url: Url.bcs, id_field: ID.bcs, uid: UID.bcs, balance: Balance.bcs, option: Option.bcs(bcs.u64()), option_obj: Option.bcs(Bar.bcs), option_none: Option.bcs(bcs.u64()), balance_generic: Balance.bcs, option_generic: Option.bcs(U), option_generic_none: Option.bcs(U)

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], fields: Record<string, any> ): WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { return WithSpecialTypes.reified( typeArgs[0], typeArgs[1], ).new( { id: decodeFromFields(UID.reified(), fields.id), string: decodeFromFields(String.reified(), fields.string), asciiString: decodeFromFields(String1.reified(), fields.ascii_string), url: decodeFromFields(Url.reified(), fields.url), idField: decodeFromFields(ID.reified(), fields.id_field), uid: decodeFromFields(UID.reified(), fields.uid), balance: decodeFromFields(Balance.reified(reified.phantom(SUI.reified())), fields.balance), option: decodeFromFields(Option.reified("u64"), fields.option), optionObj: decodeFromFields(Option.reified(Bar.reified()), fields.option_obj), optionNone: decodeFromFields(Option.reified("u64"), fields.option_none), balanceGeneric: decodeFromFields(Balance.reified(typeArgs[0]), fields.balance_generic), optionGeneric: decodeFromFields(Option.reified(typeArgs[1]), fields.option_generic), optionGenericNone: decodeFromFields(Option.reified(typeArgs[1]), fields.option_generic_none) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], item: FieldsWithTypes ): WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { if (!isWithSpecialTypes(item.type)) { throw new Error("not a WithSpecialTypes type");

 } assertFieldsWithTypesArgsMatch(item, typeArgs);

 return WithSpecialTypes.reified( typeArgs[0], typeArgs[1], ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), string: decodeFromFieldsWithTypes(String.reified(), item.fields.string), asciiString: decodeFromFieldsWithTypes(String1.reified(), item.fields.ascii_string), url: decodeFromFieldsWithTypes(Url.reified(), item.fields.url), idField: decodeFromFieldsWithTypes(ID.reified(), item.fields.id_field), uid: decodeFromFieldsWithTypes(UID.reified(), item.fields.uid), balance: decodeFromFieldsWithTypes(Balance.reified(reified.phantom(SUI.reified())), item.fields.balance), option: decodeFromFieldsWithTypes(Option.reified("u64"), item.fields.option), optionObj: decodeFromFieldsWithTypes(Option.reified(Bar.reified()), item.fields.option_obj), optionNone: decodeFromFieldsWithTypes(Option.reified("u64"), item.fields.option_none), balanceGeneric: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.balance_generic), optionGeneric: decodeFromFieldsWithTypes(Option.reified(typeArgs[1]), item.fields.option_generic), optionGenericNone: decodeFromFieldsWithTypes(Option.reified(typeArgs[1]), item.fields.option_generic_none) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], data: Uint8Array ): WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { return WithSpecialTypes.fromFields( typeArgs, WithSpecialTypes.bcs( toBcs(typeArgs[1]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,string: this.string,asciiString: this.asciiString,url: this.url,idField: this.idField,uid: this.uid,balance: this.balance.toJSONField(),option: fieldToJSON<Option<"u64">>(`${Option.$typeName}<u64>`, this.option),optionObj: fieldToJSON<Option<Bar>>(`${Option.$typeName}<${Bar.$typeName}>`, this.optionObj),optionNone: fieldToJSON<Option<"u64">>(`${Option.$typeName}<u64>`, this.optionNone),balanceGeneric: this.balanceGeneric.toJSONField(),optionGeneric: fieldToJSON<Option<U>>(`${Option.$typeName}<${this.$typeArgs[1]}>`, this.optionGeneric),optionGenericNone: fieldToJSON<Option<U>>(`${Option.$typeName}<${this.$typeArgs[1]}>`, this.optionGenericNone),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], field: any ): WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { return WithSpecialTypes.reified( typeArgs[0], typeArgs[1], ).new( { id: decodeFromJSONField(UID.reified(), field.id), string: decodeFromJSONField(String.reified(), field.string), asciiString: decodeFromJSONField(String1.reified(), field.asciiString), url: decodeFromJSONField(Url.reified(), field.url), idField: decodeFromJSONField(ID.reified(), field.idField), uid: decodeFromJSONField(UID.reified(), field.uid), balance: decodeFromJSONField(Balance.reified(reified.phantom(SUI.reified())), field.balance), option: decodeFromJSONField(Option.reified("u64"), field.option), optionObj: decodeFromJSONField(Option.reified(Bar.reified()), field.optionObj), optionNone: decodeFromJSONField(Option.reified("u64"), field.optionNone), balanceGeneric: decodeFromJSONField(Balance.reified(typeArgs[0]), field.balanceGeneric), optionGeneric: decodeFromJSONField(Option.reified(typeArgs[1]), field.optionGeneric), optionGenericNone: decodeFromJSONField(Option.reified(typeArgs[1]), field.optionGenericNone) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], json: Record<string, any> ): WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { if (json.$typeName !== WithSpecialTypes.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WithSpecialTypes.$typeName, ...typeArgs.map(extractType)), json.$typeArgs, typeArgs, )

 return WithSpecialTypes.fromJSONField( typeArgs, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], content: SuiParsedData ): WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithSpecialTypes(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithSpecialTypes object`); } return WithSpecialTypes.fromFieldsWithTypes( typeArgs, content ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>, U extends Reified<TypeArgument, any>>( client: SuiClient, typeArgs: [T, U], id: string ): Promise<WithSpecialTypes<ToPhantomTypeArgument<T>, ToTypeArgument<U>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithSpecialTypes object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithSpecialTypes(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithSpecialTypes object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 2) { throw new Error(`type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`); }; for (let i = 0; i < 2; i++) { const gotTypeArg = compressSuiType(gotTypeArgs[i]); const expectedTypeArg = compressSuiType(extractType(typeArgs[i])); if (gotTypeArg !== expectedTypeArg) { throw new Error(`type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); } };

 return WithSpecialTypes.fromBcs( typeArgs, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WithSpecialTypesAsGenerics =============================== */

export function isWithSpecialTypesAsGenerics(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::fixture::WithSpecialTypesAsGenerics` + '<'); }

export interface WithSpecialTypesAsGenericsFields<T0 extends TypeArgument, T1 extends TypeArgument, T2 extends TypeArgument, T3 extends TypeArgument, T4 extends TypeArgument, T5 extends TypeArgument, T6 extends TypeArgument, T7 extends TypeArgument> { id: ToField<UID>; string: ToField<T0>; asciiString: ToField<T1>; url: ToField<T2>; idField: ToField<T3>; uid: ToField<T4>; balance: ToField<T5>; option: ToField<T6>; optionNone: ToField<T7> }

export type WithSpecialTypesAsGenericsReified<T0 extends TypeArgument, T1 extends TypeArgument, T2 extends TypeArgument, T3 extends TypeArgument, T4 extends TypeArgument, T5 extends TypeArgument, T6 extends TypeArgument, T7 extends TypeArgument> = Reified< WithSpecialTypesAsGenerics<T0, T1, T2, T3, T4, T5, T6, T7>, WithSpecialTypesAsGenericsFields<T0, T1, T2, T3, T4, T5, T6, T7> >;

export class WithSpecialTypesAsGenerics<T0 extends TypeArgument, T1 extends TypeArgument, T2 extends TypeArgument, T3 extends TypeArgument, T4 extends TypeArgument, T5 extends TypeArgument, T6 extends TypeArgument, T7 extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::WithSpecialTypesAsGenerics`; static readonly $numTypeParams = 8;

 readonly $typeName = WithSpecialTypesAsGenerics.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::WithSpecialTypesAsGenerics<${ToTypeStr<T0>}, ${ToTypeStr<T1>}, ${ToTypeStr<T2>}, ${ToTypeStr<T3>}, ${ToTypeStr<T4>}, ${ToTypeStr<T5>}, ${ToTypeStr<T6>}, ${ToTypeStr<T7>}>`;

 readonly $typeArgs: [ToTypeStr<T0>, ToTypeStr<T1>, ToTypeStr<T2>, ToTypeStr<T3>, ToTypeStr<T4>, ToTypeStr<T5>, ToTypeStr<T6>, ToTypeStr<T7>];

 readonly id: ToField<UID>; readonly string: ToField<T0>; readonly asciiString: ToField<T1>; readonly url: ToField<T2>; readonly idField: ToField<T3>; readonly uid: ToField<T4>; readonly balance: ToField<T5>; readonly option: ToField<T6>; readonly optionNone: ToField<T7>

 private constructor(typeArgs: [ToTypeStr<T0>, ToTypeStr<T1>, ToTypeStr<T2>, ToTypeStr<T3>, ToTypeStr<T4>, ToTypeStr<T5>, ToTypeStr<T6>, ToTypeStr<T7>], fields: WithSpecialTypesAsGenericsFields<T0, T1, T2, T3, T4, T5, T6, T7>, ) { this.$fullTypeName = composeSuiType( WithSpecialTypesAsGenerics.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::WithSpecialTypesAsGenerics<${ToTypeStr<T0>}, ${ToTypeStr<T1>}, ${ToTypeStr<T2>}, ${ToTypeStr<T3>}, ${ToTypeStr<T4>}, ${ToTypeStr<T5>}, ${ToTypeStr<T6>}, ${ToTypeStr<T7>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.string = fields.string;; this.asciiString = fields.asciiString;; this.url = fields.url;; this.idField = fields.idField;; this.uid = fields.uid;; this.balance = fields.balance;; this.option = fields.option;; this.optionNone = fields.optionNone; }

 static reified<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( T0: T0, T1: T1, T2: T2, T3: T3, T4: T4, T5: T5, T6: T6, T7: T7 ): WithSpecialTypesAsGenericsReified<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { return { typeName: WithSpecialTypesAsGenerics.$typeName, fullTypeName: composeSuiType( WithSpecialTypesAsGenerics.$typeName, ...[extractType(T0), extractType(T1), extractType(T2), extractType(T3), extractType(T4), extractType(T5), extractType(T6), extractType(T7)] ) as `${typeof PKG_V1}::fixture::WithSpecialTypesAsGenerics<${ToTypeStr<ToTypeArgument<T0>>}, ${ToTypeStr<ToTypeArgument<T1>>}, ${ToTypeStr<ToTypeArgument<T2>>}, ${ToTypeStr<ToTypeArgument<T3>>}, ${ToTypeStr<ToTypeArgument<T4>>}, ${ToTypeStr<ToTypeArgument<T5>>}, ${ToTypeStr<ToTypeArgument<T6>>}, ${ToTypeStr<ToTypeArgument<T7>>}>`, typeArgs: [ extractType(T0), extractType(T1), extractType(T2), extractType(T3), extractType(T4), extractType(T5), extractType(T6), extractType(T7) ] as [ToTypeStr<ToTypeArgument<T0>>, ToTypeStr<ToTypeArgument<T1>>, ToTypeStr<ToTypeArgument<T2>>, ToTypeStr<ToTypeArgument<T3>>, ToTypeStr<ToTypeArgument<T4>>, ToTypeStr<ToTypeArgument<T5>>, ToTypeStr<ToTypeArgument<T6>>, ToTypeStr<ToTypeArgument<T7>>], reifiedTypeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], fromFields: (fields: Record<string, any>) => WithSpecialTypesAsGenerics.fromFields( [T0, T1, T2, T3, T4, T5, T6, T7], fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithSpecialTypesAsGenerics.fromFieldsWithTypes( [T0, T1, T2, T3, T4, T5, T6, T7], item, ), fromBcs: (data: Uint8Array) => WithSpecialTypesAsGenerics.fromBcs( [T0, T1, T2, T3, T4, T5, T6, T7], data, ), bcs: WithSpecialTypesAsGenerics.bcs(toBcs(T0), toBcs(T1), toBcs(T2), toBcs(T3), toBcs(T4), toBcs(T5), toBcs(T6), toBcs(T7)), fromJSONField: (field: any) => WithSpecialTypesAsGenerics.fromJSONField( [T0, T1, T2, T3, T4, T5, T6, T7], field, ), fromJSON: (json: Record<string, any>) => WithSpecialTypesAsGenerics.fromJSON( [T0, T1, T2, T3, T4, T5, T6, T7], json, ), fromSuiParsedData: (content: SuiParsedData) => WithSpecialTypesAsGenerics.fromSuiParsedData( [T0, T1, T2, T3, T4, T5, T6, T7], content, ), fetch: async (client: SuiClient, id: string) => WithSpecialTypesAsGenerics.fetch( client, [T0, T1, T2, T3, T4, T5, T6, T7], id, ), new: ( fields: WithSpecialTypesAsGenericsFields<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>>, ) => { return new WithSpecialTypesAsGenerics( [extractType(T0), extractType(T1), extractType(T2), extractType(T3), extractType(T4), extractType(T5), extractType(T6), extractType(T7)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithSpecialTypesAsGenerics.reified }

 static phantom<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( T0: T0, T1: T1, T2: T2, T3: T3, T4: T4, T5: T5, T6: T6, T7: T7 ): PhantomReified<ToTypeStr<WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>>>> { return phantom(WithSpecialTypesAsGenerics.reified( T0, T1, T2, T3, T4, T5, T6, T7 )); } static get p() { return WithSpecialTypesAsGenerics.phantom }

 static get bcs() { return <T0 extends BcsType<any>, T1 extends BcsType<any>, T2 extends BcsType<any>, T3 extends BcsType<any>, T4 extends BcsType<any>, T5 extends BcsType<any>, T6 extends BcsType<any>, T7 extends BcsType<any>>(T0: T0, T1: T1, T2: T2, T3: T3, T4: T4, T5: T5, T6: T6, T7: T7) => bcs.struct(`WithSpecialTypesAsGenerics<${T0.name}, ${T1.name}, ${T2.name}, ${T3.name}, ${T4.name}, ${T5.name}, ${T6.name}, ${T7.name}>`, {

 id: UID.bcs, string: T0, ascii_string: T1, url: T2, id_field: T3, uid: T4, balance: T5, option: T6, option_none: T7

}) };

 static fromFields<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], fields: Record<string, any> ): WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { return WithSpecialTypesAsGenerics.reified( typeArgs[0], typeArgs[1], typeArgs[2], typeArgs[3], typeArgs[4], typeArgs[5], typeArgs[6], typeArgs[7], ).new( { id: decodeFromFields(UID.reified(), fields.id), string: decodeFromFields(typeArgs[0], fields.string), asciiString: decodeFromFields(typeArgs[1], fields.ascii_string), url: decodeFromFields(typeArgs[2], fields.url), idField: decodeFromFields(typeArgs[3], fields.id_field), uid: decodeFromFields(typeArgs[4], fields.uid), balance: decodeFromFields(typeArgs[5], fields.balance), option: decodeFromFields(typeArgs[6], fields.option), optionNone: decodeFromFields(typeArgs[7], fields.option_none) } ) }

 static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], item: FieldsWithTypes ): WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { if (!isWithSpecialTypesAsGenerics(item.type)) { throw new Error("not a WithSpecialTypesAsGenerics type");

 } assertFieldsWithTypesArgsMatch(item, typeArgs);

 return WithSpecialTypesAsGenerics.reified( typeArgs[0], typeArgs[1], typeArgs[2], typeArgs[3], typeArgs[4], typeArgs[5], typeArgs[6], typeArgs[7], ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), string: decodeFromFieldsWithTypes(typeArgs[0], item.fields.string), asciiString: decodeFromFieldsWithTypes(typeArgs[1], item.fields.ascii_string), url: decodeFromFieldsWithTypes(typeArgs[2], item.fields.url), idField: decodeFromFieldsWithTypes(typeArgs[3], item.fields.id_field), uid: decodeFromFieldsWithTypes(typeArgs[4], item.fields.uid), balance: decodeFromFieldsWithTypes(typeArgs[5], item.fields.balance), option: decodeFromFieldsWithTypes(typeArgs[6], item.fields.option), optionNone: decodeFromFieldsWithTypes(typeArgs[7], item.fields.option_none) } ) }

 static fromBcs<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], data: Uint8Array ): WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { return WithSpecialTypesAsGenerics.fromFields( typeArgs, WithSpecialTypesAsGenerics.bcs( toBcs(typeArgs[0]), toBcs(typeArgs[1]), toBcs(typeArgs[2]), toBcs(typeArgs[3]), toBcs(typeArgs[4]), toBcs(typeArgs[5]), toBcs(typeArgs[6]), toBcs(typeArgs[7]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,string: fieldToJSON<T0>(this.$typeArgs[0], this.string),asciiString: fieldToJSON<T1>(this.$typeArgs[1], this.asciiString),url: fieldToJSON<T2>(this.$typeArgs[2], this.url),idField: fieldToJSON<T3>(this.$typeArgs[3], this.idField),uid: fieldToJSON<T4>(this.$typeArgs[4], this.uid),balance: fieldToJSON<T5>(this.$typeArgs[5], this.balance),option: fieldToJSON<T6>(this.$typeArgs[6], this.option),optionNone: fieldToJSON<T7>(this.$typeArgs[7], this.optionNone),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], field: any ): WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { return WithSpecialTypesAsGenerics.reified( typeArgs[0], typeArgs[1], typeArgs[2], typeArgs[3], typeArgs[4], typeArgs[5], typeArgs[6], typeArgs[7], ).new( { id: decodeFromJSONField(UID.reified(), field.id), string: decodeFromJSONField(typeArgs[0], field.string), asciiString: decodeFromJSONField(typeArgs[1], field.asciiString), url: decodeFromJSONField(typeArgs[2], field.url), idField: decodeFromJSONField(typeArgs[3], field.idField), uid: decodeFromJSONField(typeArgs[4], field.uid), balance: decodeFromJSONField(typeArgs[5], field.balance), option: decodeFromJSONField(typeArgs[6], field.option), optionNone: decodeFromJSONField(typeArgs[7], field.optionNone) } ) }

 static fromJSON<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], json: Record<string, any> ): WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { if (json.$typeName !== WithSpecialTypesAsGenerics.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WithSpecialTypesAsGenerics.$typeName, ...typeArgs.map(extractType)), json.$typeArgs, typeArgs, )

 return WithSpecialTypesAsGenerics.fromJSONField( typeArgs, json, ) }

 static fromSuiParsedData<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], content: SuiParsedData ): WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithSpecialTypesAsGenerics(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithSpecialTypesAsGenerics object`); } return WithSpecialTypesAsGenerics.fromFieldsWithTypes( typeArgs, content ); }

 static async fetch<T0 extends Reified<TypeArgument, any>, T1 extends Reified<TypeArgument, any>, T2 extends Reified<TypeArgument, any>, T3 extends Reified<TypeArgument, any>, T4 extends Reified<TypeArgument, any>, T5 extends Reified<TypeArgument, any>, T6 extends Reified<TypeArgument, any>, T7 extends Reified<TypeArgument, any>>( client: SuiClient, typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7], id: string ): Promise<WithSpecialTypesAsGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>, ToTypeArgument<T2>, ToTypeArgument<T3>, ToTypeArgument<T4>, ToTypeArgument<T5>, ToTypeArgument<T6>, ToTypeArgument<T7>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithSpecialTypesAsGenerics object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithSpecialTypesAsGenerics(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithSpecialTypesAsGenerics object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 8) { throw new Error(`type argument mismatch: expected 8 type arguments but got ${gotTypeArgs.length}`); }; for (let i = 0; i < 8; i++) { const gotTypeArg = compressSuiType(gotTypeArgs[i]); const expectedTypeArg = compressSuiType(extractType(typeArgs[i])); if (gotTypeArg !== expectedTypeArg) { throw new Error(`type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); } };

 return WithSpecialTypesAsGenerics.fromBcs( typeArgs, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WithSpecialTypesInVectors =============================== */

export function isWithSpecialTypesInVectors(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::fixture::WithSpecialTypesInVectors` + '<'); }

export interface WithSpecialTypesInVectorsFields<T extends TypeArgument> { id: ToField<UID>; string: ToField<Vector<String>>; asciiString: ToField<Vector<String1>>; idField: ToField<Vector<ID>>; bar: ToField<Vector<Bar>>; option: ToField<Vector<Option<"u64">>>; optionGeneric: ToField<Vector<Option<T>>> }

export type WithSpecialTypesInVectorsReified<T extends TypeArgument> = Reified< WithSpecialTypesInVectors<T>, WithSpecialTypesInVectorsFields<T> >;

export class WithSpecialTypesInVectors<T extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::WithSpecialTypesInVectors`; static readonly $numTypeParams = 1;

 readonly $typeName = WithSpecialTypesInVectors.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::WithSpecialTypesInVectors<${ToTypeStr<T>}>`;

 readonly $typeArgs: [ToTypeStr<T>];

 readonly id: ToField<UID>; readonly string: ToField<Vector<String>>; readonly asciiString: ToField<Vector<String1>>; readonly idField: ToField<Vector<ID>>; readonly bar: ToField<Vector<Bar>>; readonly option: ToField<Vector<Option<"u64">>>; readonly optionGeneric: ToField<Vector<Option<T>>>

 private constructor(typeArgs: [ToTypeStr<T>], fields: WithSpecialTypesInVectorsFields<T>, ) { this.$fullTypeName = composeSuiType( WithSpecialTypesInVectors.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::WithSpecialTypesInVectors<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.string = fields.string;; this.asciiString = fields.asciiString;; this.idField = fields.idField;; this.bar = fields.bar;; this.option = fields.option;; this.optionGeneric = fields.optionGeneric; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): WithSpecialTypesInVectorsReified<ToTypeArgument<T>> { return { typeName: WithSpecialTypesInVectors.$typeName, fullTypeName: composeSuiType( WithSpecialTypesInVectors.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::fixture::WithSpecialTypesInVectors<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => WithSpecialTypesInVectors.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithSpecialTypesInVectors.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => WithSpecialTypesInVectors.fromBcs( T, data, ), bcs: WithSpecialTypesInVectors.bcs(toBcs(T)), fromJSONField: (field: any) => WithSpecialTypesInVectors.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => WithSpecialTypesInVectors.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => WithSpecialTypesInVectors.fromSuiParsedData( T, content, ), fetch: async (client: SuiClient, id: string) => WithSpecialTypesInVectors.fetch( client, T, id, ), new: ( fields: WithSpecialTypesInVectorsFields<ToTypeArgument<T>>, ) => { return new WithSpecialTypesInVectors( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithSpecialTypesInVectors.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<WithSpecialTypesInVectors<ToTypeArgument<T>>>> { return phantom(WithSpecialTypesInVectors.reified( T )); } static get p() { return WithSpecialTypesInVectors.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`WithSpecialTypesInVectors<${T.name}>`, {

 id: UID.bcs, string: bcs.vector(String.bcs), ascii_string: bcs.vector(String1.bcs), id_field: bcs.vector(ID.bcs), bar: bcs.vector(Bar.bcs), option: bcs.vector(Option.bcs(bcs.u64())), option_generic: bcs.vector(Option.bcs(T))

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): WithSpecialTypesInVectors<ToTypeArgument<T>> { return WithSpecialTypesInVectors.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), string: decodeFromFields(reified.vector(String.reified()), fields.string), asciiString: decodeFromFields(reified.vector(String1.reified()), fields.ascii_string), idField: decodeFromFields(reified.vector(ID.reified()), fields.id_field), bar: decodeFromFields(reified.vector(Bar.reified()), fields.bar), option: decodeFromFields(reified.vector(Option.reified("u64")), fields.option), optionGeneric: decodeFromFields(reified.vector(Option.reified(typeArg)), fields.option_generic) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): WithSpecialTypesInVectors<ToTypeArgument<T>> { if (!isWithSpecialTypesInVectors(item.type)) { throw new Error("not a WithSpecialTypesInVectors type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return WithSpecialTypesInVectors.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), string: decodeFromFieldsWithTypes(reified.vector(String.reified()), item.fields.string), asciiString: decodeFromFieldsWithTypes(reified.vector(String1.reified()), item.fields.ascii_string), idField: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.id_field), bar: decodeFromFieldsWithTypes(reified.vector(Bar.reified()), item.fields.bar), option: decodeFromFieldsWithTypes(reified.vector(Option.reified("u64")), item.fields.option), optionGeneric: decodeFromFieldsWithTypes(reified.vector(Option.reified(typeArg)), item.fields.option_generic) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): WithSpecialTypesInVectors<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return WithSpecialTypesInVectors.fromFields( typeArg, WithSpecialTypesInVectors.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,string: fieldToJSON<Vector<String>>(`vector<${String.$typeName}>`, this.string),asciiString: fieldToJSON<Vector<String1>>(`vector<${String1.$typeName}>`, this.asciiString),idField: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.idField),bar: fieldToJSON<Vector<Bar>>(`vector<${Bar.$typeName}>`, this.bar),option: fieldToJSON<Vector<Option<"u64">>>(`vector<${Option.$typeName}<u64>>`, this.option),optionGeneric: fieldToJSON<Vector<Option<T>>>(`vector<${Option.$typeName}<${this.$typeArgs[0]}>>`, this.optionGeneric),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): WithSpecialTypesInVectors<ToTypeArgument<T>> { return WithSpecialTypesInVectors.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), string: decodeFromJSONField(reified.vector(String.reified()), field.string), asciiString: decodeFromJSONField(reified.vector(String1.reified()), field.asciiString), idField: decodeFromJSONField(reified.vector(ID.reified()), field.idField), bar: decodeFromJSONField(reified.vector(Bar.reified()), field.bar), option: decodeFromJSONField(reified.vector(Option.reified("u64")), field.option), optionGeneric: decodeFromJSONField(reified.vector(Option.reified(typeArg)), field.optionGeneric) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): WithSpecialTypesInVectors<ToTypeArgument<T>> { if (json.$typeName !== WithSpecialTypesInVectors.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WithSpecialTypesInVectors.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return WithSpecialTypesInVectors.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): WithSpecialTypesInVectors<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithSpecialTypesInVectors(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithSpecialTypesInVectors object`); } return WithSpecialTypesInVectors.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<WithSpecialTypesInVectors<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithSpecialTypesInVectors object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithSpecialTypesInVectors(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithSpecialTypesInVectors object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return WithSpecialTypesInVectors.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WithTwoGenerics =============================== */

export function isWithTwoGenerics(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::fixture::WithTwoGenerics` + '<'); }

export interface WithTwoGenericsFields<T extends TypeArgument, U extends TypeArgument> { genericField1: ToField<T>; genericField2: ToField<U> }

export type WithTwoGenericsReified<T extends TypeArgument, U extends TypeArgument> = Reified< WithTwoGenerics<T, U>, WithTwoGenericsFields<T, U> >;

export class WithTwoGenerics<T extends TypeArgument, U extends TypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::fixture::WithTwoGenerics`; static readonly $numTypeParams = 2;

 readonly $typeName = WithTwoGenerics.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::fixture::WithTwoGenerics<${ToTypeStr<T>}, ${ToTypeStr<U>}>`;

 readonly $typeArgs: [ToTypeStr<T>, ToTypeStr<U>];

 readonly genericField1: ToField<T>; readonly genericField2: ToField<U>

 private constructor(typeArgs: [ToTypeStr<T>, ToTypeStr<U>], fields: WithTwoGenericsFields<T, U>, ) { this.$fullTypeName = composeSuiType( WithTwoGenerics.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fixture::WithTwoGenerics<${ToTypeStr<T>}, ${ToTypeStr<U>}>`; this.$typeArgs = typeArgs;

 this.genericField1 = fields.genericField1;; this.genericField2 = fields.genericField2; }

 static reified<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( T: T, U: U ): WithTwoGenericsReified<ToTypeArgument<T>, ToTypeArgument<U>> { return { typeName: WithTwoGenerics.$typeName, fullTypeName: composeSuiType( WithTwoGenerics.$typeName, ...[extractType(T), extractType(U)] ) as `${typeof PKG_V1}::fixture::WithTwoGenerics<${ToTypeStr<ToTypeArgument<T>>}, ${ToTypeStr<ToTypeArgument<U>>}>`, typeArgs: [ extractType(T), extractType(U) ] as [ToTypeStr<ToTypeArgument<T>>, ToTypeStr<ToTypeArgument<U>>], reifiedTypeArgs: [T, U], fromFields: (fields: Record<string, any>) => WithTwoGenerics.fromFields( [T, U], fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithTwoGenerics.fromFieldsWithTypes( [T, U], item, ), fromBcs: (data: Uint8Array) => WithTwoGenerics.fromBcs( [T, U], data, ), bcs: WithTwoGenerics.bcs(toBcs(T), toBcs(U)), fromJSONField: (field: any) => WithTwoGenerics.fromJSONField( [T, U], field, ), fromJSON: (json: Record<string, any>) => WithTwoGenerics.fromJSON( [T, U], json, ), fromSuiParsedData: (content: SuiParsedData) => WithTwoGenerics.fromSuiParsedData( [T, U], content, ), fetch: async (client: SuiClient, id: string) => WithTwoGenerics.fetch( client, [T, U], id, ), new: ( fields: WithTwoGenericsFields<ToTypeArgument<T>, ToTypeArgument<U>>, ) => { return new WithTwoGenerics( [extractType(T), extractType(U)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithTwoGenerics.reified }

 static phantom<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( T: T, U: U ): PhantomReified<ToTypeStr<WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>>>> { return phantom(WithTwoGenerics.reified( T, U )); } static get p() { return WithTwoGenerics.phantom }

 static get bcs() { return <T extends BcsType<any>, U extends BcsType<any>>(T: T, U: U) => bcs.struct(`WithTwoGenerics<${T.name}, ${U.name}>`, {

 generic_field_1: T, generic_field_2: U

}) };

 static fromFields<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], fields: Record<string, any> ): WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>> { return WithTwoGenerics.reified( typeArgs[0], typeArgs[1], ).new( { genericField1: decodeFromFields(typeArgs[0], fields.generic_field_1), genericField2: decodeFromFields(typeArgs[1], fields.generic_field_2) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], item: FieldsWithTypes ): WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>> { if (!isWithTwoGenerics(item.type)) { throw new Error("not a WithTwoGenerics type");

 } assertFieldsWithTypesArgsMatch(item, typeArgs);

 return WithTwoGenerics.reified( typeArgs[0], typeArgs[1], ).new( { genericField1: decodeFromFieldsWithTypes(typeArgs[0], item.fields.generic_field_1), genericField2: decodeFromFieldsWithTypes(typeArgs[1], item.fields.generic_field_2) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], data: Uint8Array ): WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>> { return WithTwoGenerics.fromFields( typeArgs, WithTwoGenerics.bcs( toBcs(typeArgs[0]), toBcs(typeArgs[1]) ).parse(data) ) }

 toJSONField() { return {

 genericField1: fieldToJSON<T>(this.$typeArgs[0], this.genericField1),genericField2: fieldToJSON<U>(this.$typeArgs[1], this.genericField2),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], field: any ): WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>> { return WithTwoGenerics.reified( typeArgs[0], typeArgs[1], ).new( { genericField1: decodeFromJSONField(typeArgs[0], field.genericField1), genericField2: decodeFromJSONField(typeArgs[1], field.genericField2) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], json: Record<string, any> ): WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>> { if (json.$typeName !== WithTwoGenerics.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WithTwoGenerics.$typeName, ...typeArgs.map(extractType)), json.$typeArgs, typeArgs, )

 return WithTwoGenerics.fromJSONField( typeArgs, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( typeArgs: [T, U], content: SuiParsedData ): WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithTwoGenerics(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithTwoGenerics object`); } return WithTwoGenerics.fromFieldsWithTypes( typeArgs, content ); }

 static async fetch<T extends Reified<TypeArgument, any>, U extends Reified<TypeArgument, any>>( client: SuiClient, typeArgs: [T, U], id: string ): Promise<WithTwoGenerics<ToTypeArgument<T>, ToTypeArgument<U>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithTwoGenerics object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithTwoGenerics(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithTwoGenerics object`); }

 const gotTypeArgs = parseTypeName(res.data.bcs.type).typeArgs; if (gotTypeArgs.length !== 2) { throw new Error(`type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`); }; for (let i = 0; i < 2; i++) { const gotTypeArg = compressSuiType(gotTypeArgs[i]); const expectedTypeArg = compressSuiType(extractType(typeArgs[i])); if (gotTypeArg !== expectedTypeArg) { throw new Error(`type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); } };

 return WithTwoGenerics.fromBcs( typeArgs, fromB64(res.data.bcs.bcsBytes) ); }

 }
