import * as reified from "../../_framework/reified";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {EnumClass, PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {ID, UID} from "../../sui/object/structs";
import {VecMap} from "../../sui/vec-map/structs";
import {VecSet} from "../../sui/vec-set/structs";
import {PKG_V1} from "../index";
import {EnumOutputShapeWithKeys, bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== AddedCapEvent =============================== */

export function isAddedCapEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::AddedCapEvent`; }

export interface AddedCapEventFields { workspaceId: ToField<ID>; userCapId: ToField<ID>; isInit: ToField<"bool"> }

export type AddedCapEventReified = Reified< AddedCapEvent, AddedCapEventFields >;

export class AddedCapEvent implements StructClass { static readonly $typeName = `${PKG_V1}::user::AddedCapEvent`; static readonly $numTypeParams = 0;

 readonly $typeName = AddedCapEvent.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::AddedCapEvent`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly userCapId: ToField<ID>; readonly isInit: ToField<"bool">

 private constructor(typeArgs: [], fields: AddedCapEventFields, ) { this.$fullTypeName = composeSuiType( AddedCapEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::AddedCapEvent`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.userCapId = fields.userCapId;; this.isInit = fields.isInit; }

 static reified( ): AddedCapEventReified { return { typeName: AddedCapEvent.$typeName, fullTypeName: composeSuiType( AddedCapEvent.$typeName, ...[] ) as `${typeof PKG_V1}::user::AddedCapEvent`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AddedCapEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AddedCapEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AddedCapEvent.fromBcs( data, ), bcs: AddedCapEvent.bcs, fromJSONField: (field: any) => AddedCapEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AddedCapEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AddedCapEvent.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => AddedCapEvent.fetch( client, id, ), new: ( fields: AddedCapEventFields, ) => { return new AddedCapEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AddedCapEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AddedCapEvent>> { return phantom(AddedCapEvent.reified( )); } static get p() { return AddedCapEvent.phantom() }

 static get bcs() { return bcs.struct("AddedCapEvent", {

 workspace_id: ID.bcs, user_cap_id: ID.bcs, is_init: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): AddedCapEvent { return AddedCapEvent.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), userCapId: decodeFromFields(ID.reified(), fields.user_cap_id), isInit: decodeFromFields("bool", fields.is_init) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AddedCapEvent { if (!isAddedCapEvent(item.type)) { throw new Error("not a AddedCapEvent type");

 }

 return AddedCapEvent.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), userCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.user_cap_id), isInit: decodeFromFieldsWithTypes("bool", item.fields.is_init) } ) }

 static fromBcs( data: Uint8Array ): AddedCapEvent { return AddedCapEvent.fromFields( AddedCapEvent.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,userCapId: this.userCapId,isInit: this.isInit,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AddedCapEvent { return AddedCapEvent.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), userCapId: decodeFromJSONField(ID.reified(), field.userCapId), isInit: decodeFromJSONField("bool", field.isInit) } ) }

 static fromJSON( json: Record<string, any> ): AddedCapEvent { if (json.$typeName !== AddedCapEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AddedCapEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AddedCapEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAddedCapEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AddedCapEvent object`); } return AddedCapEvent.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<AddedCapEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AddedCapEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAddedCapEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AddedCapEvent object`); }

 return AddedCapEvent.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== CreatedRegistrationHolderEvent =============================== */

export function isCreatedRegistrationHolderEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::CreatedRegistrationHolderEvent`; }

export interface CreatedRegistrationHolderEventFields { workspaceId: ToField<ID>; registrationHolder: ToField<ID>; userAddressType: ToField<"u8">; userAddress: ToField<Vector<"u8">> }

export type CreatedRegistrationHolderEventReified = Reified< CreatedRegistrationHolderEvent, CreatedRegistrationHolderEventFields >;

export class CreatedRegistrationHolderEvent implements StructClass { static readonly $typeName = `${PKG_V1}::user::CreatedRegistrationHolderEvent`; static readonly $numTypeParams = 0;

 readonly $typeName = CreatedRegistrationHolderEvent.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::CreatedRegistrationHolderEvent`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly registrationHolder: ToField<ID>; readonly userAddressType: ToField<"u8">; readonly userAddress: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: CreatedRegistrationHolderEventFields, ) { this.$fullTypeName = composeSuiType( CreatedRegistrationHolderEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::CreatedRegistrationHolderEvent`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.registrationHolder = fields.registrationHolder;; this.userAddressType = fields.userAddressType;; this.userAddress = fields.userAddress; }

 static reified( ): CreatedRegistrationHolderEventReified { return { typeName: CreatedRegistrationHolderEvent.$typeName, fullTypeName: composeSuiType( CreatedRegistrationHolderEvent.$typeName, ...[] ) as `${typeof PKG_V1}::user::CreatedRegistrationHolderEvent`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => CreatedRegistrationHolderEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CreatedRegistrationHolderEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => CreatedRegistrationHolderEvent.fromBcs( data, ), bcs: CreatedRegistrationHolderEvent.bcs, fromJSONField: (field: any) => CreatedRegistrationHolderEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => CreatedRegistrationHolderEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => CreatedRegistrationHolderEvent.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => CreatedRegistrationHolderEvent.fetch( client, id, ), new: ( fields: CreatedRegistrationHolderEventFields, ) => { return new CreatedRegistrationHolderEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return CreatedRegistrationHolderEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<CreatedRegistrationHolderEvent>> { return phantom(CreatedRegistrationHolderEvent.reified( )); } static get p() { return CreatedRegistrationHolderEvent.phantom() }

 static get bcs() { return bcs.struct("CreatedRegistrationHolderEvent", {

 workspace_id: ID.bcs, registration_holder: ID.bcs, user_address_type: bcs.u8(), user_address: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): CreatedRegistrationHolderEvent { return CreatedRegistrationHolderEvent.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), registrationHolder: decodeFromFields(ID.reified(), fields.registration_holder), userAddressType: decodeFromFields("u8", fields.user_address_type), userAddress: decodeFromFields(reified.vector("u8"), fields.user_address) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): CreatedRegistrationHolderEvent { if (!isCreatedRegistrationHolderEvent(item.type)) { throw new Error("not a CreatedRegistrationHolderEvent type");

 }

 return CreatedRegistrationHolderEvent.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), registrationHolder: decodeFromFieldsWithTypes(ID.reified(), item.fields.registration_holder), userAddressType: decodeFromFieldsWithTypes("u8", item.fields.user_address_type), userAddress: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.user_address) } ) }

 static fromBcs( data: Uint8Array ): CreatedRegistrationHolderEvent { return CreatedRegistrationHolderEvent.fromFields( CreatedRegistrationHolderEvent.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,registrationHolder: this.registrationHolder,userAddressType: this.userAddressType,userAddress: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.userAddress),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): CreatedRegistrationHolderEvent { return CreatedRegistrationHolderEvent.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), registrationHolder: decodeFromJSONField(ID.reified(), field.registrationHolder), userAddressType: decodeFromJSONField("u8", field.userAddressType), userAddress: decodeFromJSONField(reified.vector("u8"), field.userAddress) } ) }

 static fromJSON( json: Record<string, any> ): CreatedRegistrationHolderEvent { if (json.$typeName !== CreatedRegistrationHolderEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return CreatedRegistrationHolderEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): CreatedRegistrationHolderEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCreatedRegistrationHolderEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CreatedRegistrationHolderEvent object`); } return CreatedRegistrationHolderEvent.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<CreatedRegistrationHolderEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CreatedRegistrationHolderEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCreatedRegistrationHolderEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CreatedRegistrationHolderEvent object`); }

 return CreatedRegistrationHolderEvent.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Recovery =============================== */

export function isRecovery(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::Recovery`; }

export interface RecoveryFields { capId: ToField<ID>; recoveryPublicKey: ToField<Vector<"u8">> }

export type RecoveryReified = Reified< Recovery, RecoveryFields >;

export class Recovery implements StructClass { static readonly $typeName = `${PKG_V1}::user::Recovery`; static readonly $numTypeParams = 0;

 readonly $typeName = Recovery.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::Recovery`;

 readonly $typeArgs: [];

 readonly capId: ToField<ID>; readonly recoveryPublicKey: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: RecoveryFields, ) { this.$fullTypeName = composeSuiType( Recovery.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::Recovery`; this.$typeArgs = typeArgs;

 this.capId = fields.capId;; this.recoveryPublicKey = fields.recoveryPublicKey; }

 static reified( ): RecoveryReified { return { typeName: Recovery.$typeName, fullTypeName: composeSuiType( Recovery.$typeName, ...[] ) as `${typeof PKG_V1}::user::Recovery`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Recovery.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Recovery.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Recovery.fromBcs( data, ), bcs: Recovery.bcs, fromJSONField: (field: any) => Recovery.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Recovery.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Recovery.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Recovery.fetch( client, id, ), new: ( fields: RecoveryFields, ) => { return new Recovery( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Recovery.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Recovery>> { return phantom(Recovery.reified( )); } static get p() { return Recovery.phantom() }

 static get bcs() { return bcs.struct("Recovery", {

 cap_id: ID.bcs, recovery_public_key: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): Recovery { return Recovery.reified( ).new( { capId: decodeFromFields(ID.reified(), fields.cap_id), recoveryPublicKey: decodeFromFields(reified.vector("u8"), fields.recovery_public_key) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Recovery { if (!isRecovery(item.type)) { throw new Error("not a Recovery type");

 }

 return Recovery.reified( ).new( { capId: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap_id), recoveryPublicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.recovery_public_key) } ) }

 static fromBcs( data: Uint8Array ): Recovery { return Recovery.fromFields( Recovery.bcs.parse(data) ) }

 toJSONField() { return {

 capId: this.capId,recoveryPublicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.recoveryPublicKey),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Recovery { return Recovery.reified( ).new( { capId: decodeFromJSONField(ID.reified(), field.capId), recoveryPublicKey: decodeFromJSONField(reified.vector("u8"), field.recoveryPublicKey) } ) }

 static fromJSON( json: Record<string, any> ): Recovery { if (json.$typeName !== Recovery.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Recovery.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Recovery { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRecovery(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Recovery object`); } return Recovery.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Recovery> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Recovery object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRecovery(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Recovery object`); }

 return Recovery.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== RegistrationHolder =============================== */

export function isRegistrationHolder(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::RegistrationHolder`; }

export interface RegistrationHolderFields { id: ToField<UID>; userId: ToField<"u16">; userAddressType: ToField<"u8">; userAddress: ToField<Vector<"u8">>; initCapOpt: ToField<Option<UserCap>>; approveCapOpt: ToField<Option<UserCap>> }

export type RegistrationHolderReified = Reified< RegistrationHolder, RegistrationHolderFields >;

export class RegistrationHolder implements StructClass { static readonly $typeName = `${PKG_V1}::user::RegistrationHolder`; static readonly $numTypeParams = 0;

 readonly $typeName = RegistrationHolder.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::RegistrationHolder`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly userId: ToField<"u16">; readonly userAddressType: ToField<"u8">; readonly userAddress: ToField<Vector<"u8">>; readonly initCapOpt: ToField<Option<UserCap>>; readonly approveCapOpt: ToField<Option<UserCap>>

 private constructor(typeArgs: [], fields: RegistrationHolderFields, ) { this.$fullTypeName = composeSuiType( RegistrationHolder.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::RegistrationHolder`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.userId = fields.userId;; this.userAddressType = fields.userAddressType;; this.userAddress = fields.userAddress;; this.initCapOpt = fields.initCapOpt;; this.approveCapOpt = fields.approveCapOpt; }

 static reified( ): RegistrationHolderReified { return { typeName: RegistrationHolder.$typeName, fullTypeName: composeSuiType( RegistrationHolder.$typeName, ...[] ) as `${typeof PKG_V1}::user::RegistrationHolder`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => RegistrationHolder.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RegistrationHolder.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => RegistrationHolder.fromBcs( data, ), bcs: RegistrationHolder.bcs, fromJSONField: (field: any) => RegistrationHolder.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => RegistrationHolder.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => RegistrationHolder.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => RegistrationHolder.fetch( client, id, ), new: ( fields: RegistrationHolderFields, ) => { return new RegistrationHolder( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return RegistrationHolder.reified() }

 static phantom( ): PhantomReified<ToTypeStr<RegistrationHolder>> { return phantom(RegistrationHolder.reified( )); } static get p() { return RegistrationHolder.phantom() }

 static get bcs() { return bcs.struct("RegistrationHolder", {

 id: UID.bcs, user_id: bcs.u16(), user_address_type: bcs.u8(), user_address: bcs.vector(bcs.u8()), init_cap_opt: Option.bcs(UserCap.bcs), approve_cap_opt: Option.bcs(UserCap.bcs)

}) };

 static fromFields( fields: Record<string, any> ): RegistrationHolder { return RegistrationHolder.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), userId: decodeFromFields("u16", fields.user_id), userAddressType: decodeFromFields("u8", fields.user_address_type), userAddress: decodeFromFields(reified.vector("u8"), fields.user_address), initCapOpt: decodeFromFields(Option.reified(UserCap.reified()), fields.init_cap_opt), approveCapOpt: decodeFromFields(Option.reified(UserCap.reified()), fields.approve_cap_opt) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): RegistrationHolder { if (!isRegistrationHolder(item.type)) { throw new Error("not a RegistrationHolder type");

 }

 return RegistrationHolder.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), userId: decodeFromFieldsWithTypes("u16", item.fields.user_id), userAddressType: decodeFromFieldsWithTypes("u8", item.fields.user_address_type), userAddress: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.user_address), initCapOpt: decodeFromFieldsWithTypes(Option.reified(UserCap.reified()), item.fields.init_cap_opt), approveCapOpt: decodeFromFieldsWithTypes(Option.reified(UserCap.reified()), item.fields.approve_cap_opt) } ) }

 static fromBcs( data: Uint8Array ): RegistrationHolder { return RegistrationHolder.fromFields( RegistrationHolder.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,userId: this.userId,userAddressType: this.userAddressType,userAddress: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.userAddress),initCapOpt: fieldToJSON<Option<UserCap>>(`${Option.$typeName}<${UserCap.$typeName}>`, this.initCapOpt),approveCapOpt: fieldToJSON<Option<UserCap>>(`${Option.$typeName}<${UserCap.$typeName}>`, this.approveCapOpt),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): RegistrationHolder { return RegistrationHolder.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), userId: decodeFromJSONField("u16", field.userId), userAddressType: decodeFromJSONField("u8", field.userAddressType), userAddress: decodeFromJSONField(reified.vector("u8"), field.userAddress), initCapOpt: decodeFromJSONField(Option.reified(UserCap.reified()), field.initCapOpt), approveCapOpt: decodeFromJSONField(Option.reified(UserCap.reified()), field.approveCapOpt) } ) }

 static fromJSON( json: Record<string, any> ): RegistrationHolder { if (json.$typeName !== RegistrationHolder.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return RegistrationHolder.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): RegistrationHolder { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRegistrationHolder(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RegistrationHolder object`); } return RegistrationHolder.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<RegistrationHolder> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RegistrationHolder object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRegistrationHolder(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RegistrationHolder object`); }

 return RegistrationHolder.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== RetrievedUserCapsEvent =============================== */

export function isRetrievedUserCapsEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::RetrievedUserCapsEvent`; }

export interface RetrievedUserCapsEventFields { registrationHolder: ToField<ID>; userAddressType: ToField<"u8">; userAddress: ToField<Vector<"u8">>; approveCapHolderAddressOpt: ToField<Option<"address">> }

export type RetrievedUserCapsEventReified = Reified< RetrievedUserCapsEvent, RetrievedUserCapsEventFields >;

export class RetrievedUserCapsEvent implements StructClass { static readonly $typeName = `${PKG_V1}::user::RetrievedUserCapsEvent`; static readonly $numTypeParams = 0;

 readonly $typeName = RetrievedUserCapsEvent.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::RetrievedUserCapsEvent`;

 readonly $typeArgs: [];

 readonly registrationHolder: ToField<ID>; readonly userAddressType: ToField<"u8">; readonly userAddress: ToField<Vector<"u8">>; readonly approveCapHolderAddressOpt: ToField<Option<"address">>

 private constructor(typeArgs: [], fields: RetrievedUserCapsEventFields, ) { this.$fullTypeName = composeSuiType( RetrievedUserCapsEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::RetrievedUserCapsEvent`; this.$typeArgs = typeArgs;

 this.registrationHolder = fields.registrationHolder;; this.userAddressType = fields.userAddressType;; this.userAddress = fields.userAddress;; this.approveCapHolderAddressOpt = fields.approveCapHolderAddressOpt; }

 static reified( ): RetrievedUserCapsEventReified { return { typeName: RetrievedUserCapsEvent.$typeName, fullTypeName: composeSuiType( RetrievedUserCapsEvent.$typeName, ...[] ) as `${typeof PKG_V1}::user::RetrievedUserCapsEvent`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => RetrievedUserCapsEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RetrievedUserCapsEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => RetrievedUserCapsEvent.fromBcs( data, ), bcs: RetrievedUserCapsEvent.bcs, fromJSONField: (field: any) => RetrievedUserCapsEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => RetrievedUserCapsEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => RetrievedUserCapsEvent.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => RetrievedUserCapsEvent.fetch( client, id, ), new: ( fields: RetrievedUserCapsEventFields, ) => { return new RetrievedUserCapsEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return RetrievedUserCapsEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<RetrievedUserCapsEvent>> { return phantom(RetrievedUserCapsEvent.reified( )); } static get p() { return RetrievedUserCapsEvent.phantom() }

 static get bcs() { return bcs.struct("RetrievedUserCapsEvent", {

 registration_holder: ID.bcs, user_address_type: bcs.u8(), user_address: bcs.vector(bcs.u8()), approve_cap_holder_address_opt: Option.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }))

}) };

 static fromFields( fields: Record<string, any> ): RetrievedUserCapsEvent { return RetrievedUserCapsEvent.reified( ).new( { registrationHolder: decodeFromFields(ID.reified(), fields.registration_holder), userAddressType: decodeFromFields("u8", fields.user_address_type), userAddress: decodeFromFields(reified.vector("u8"), fields.user_address), approveCapHolderAddressOpt: decodeFromFields(Option.reified("address"), fields.approve_cap_holder_address_opt) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): RetrievedUserCapsEvent { if (!isRetrievedUserCapsEvent(item.type)) { throw new Error("not a RetrievedUserCapsEvent type");

 }

 return RetrievedUserCapsEvent.reified( ).new( { registrationHolder: decodeFromFieldsWithTypes(ID.reified(), item.fields.registration_holder), userAddressType: decodeFromFieldsWithTypes("u8", item.fields.user_address_type), userAddress: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.user_address), approveCapHolderAddressOpt: decodeFromFieldsWithTypes(Option.reified("address"), item.fields.approve_cap_holder_address_opt) } ) }

 static fromBcs( data: Uint8Array ): RetrievedUserCapsEvent { return RetrievedUserCapsEvent.fromFields( RetrievedUserCapsEvent.bcs.parse(data) ) }

 toJSONField() { return {

 registrationHolder: this.registrationHolder,userAddressType: this.userAddressType,userAddress: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.userAddress),approveCapHolderAddressOpt: fieldToJSON<Option<"address">>(`${Option.$typeName}<address>`, this.approveCapHolderAddressOpt),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): RetrievedUserCapsEvent { return RetrievedUserCapsEvent.reified( ).new( { registrationHolder: decodeFromJSONField(ID.reified(), field.registrationHolder), userAddressType: decodeFromJSONField("u8", field.userAddressType), userAddress: decodeFromJSONField(reified.vector("u8"), field.userAddress), approveCapHolderAddressOpt: decodeFromJSONField(Option.reified("address"), field.approveCapHolderAddressOpt) } ) }

 static fromJSON( json: Record<string, any> ): RetrievedUserCapsEvent { if (json.$typeName !== RetrievedUserCapsEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return RetrievedUserCapsEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): RetrievedUserCapsEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRetrievedUserCapsEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RetrievedUserCapsEvent object`); } return RetrievedUserCapsEvent.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<RetrievedUserCapsEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RetrievedUserCapsEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRetrievedUserCapsEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RetrievedUserCapsEvent object`); }

 return RetrievedUserCapsEvent.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== User =============================== */

export function isUser(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::User`; }

export interface UserFields { name: ToField<String>; roleId: ToField<"u16">; initTxCaps: ToField<Vector<ID>>; approveCap: ToField<ID>; approvePublicKeyOpt: ToField<Option<Vector<"u8">>>; groupIds: ToField<VecSet<"u16">>; recoveryOpt: ToField<Option<Recovery>>; registrationAddressType: ToField<"u8">; registrationAddress: ToField<Vector<"u8">> }

export type UserReified = Reified< User, UserFields >;

export class User implements StructClass { static readonly $typeName = `${PKG_V1}::user::User`; static readonly $numTypeParams = 0;

 readonly $typeName = User.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::User`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly roleId: ToField<"u16">; readonly initTxCaps: ToField<Vector<ID>>; readonly approveCap: ToField<ID>; readonly approvePublicKeyOpt: ToField<Option<Vector<"u8">>>; readonly groupIds: ToField<VecSet<"u16">>; readonly recoveryOpt: ToField<Option<Recovery>>; readonly registrationAddressType: ToField<"u8">; readonly registrationAddress: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: UserFields, ) { this.$fullTypeName = composeSuiType( User.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::User`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.roleId = fields.roleId;; this.initTxCaps = fields.initTxCaps;; this.approveCap = fields.approveCap;; this.approvePublicKeyOpt = fields.approvePublicKeyOpt;; this.groupIds = fields.groupIds;; this.recoveryOpt = fields.recoveryOpt;; this.registrationAddressType = fields.registrationAddressType;; this.registrationAddress = fields.registrationAddress; }

 static reified( ): UserReified { return { typeName: User.$typeName, fullTypeName: composeSuiType( User.$typeName, ...[] ) as `${typeof PKG_V1}::user::User`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => User.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => User.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => User.fromBcs( data, ), bcs: User.bcs, fromJSONField: (field: any) => User.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => User.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => User.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => User.fetch( client, id, ), new: ( fields: UserFields, ) => { return new User( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return User.reified() }

 static phantom( ): PhantomReified<ToTypeStr<User>> { return phantom(User.reified( )); } static get p() { return User.phantom() }

 static get bcs() { return bcs.struct("User", {

 name: String.bcs, role_id: bcs.u16(), init_tx_caps: bcs.vector(ID.bcs), approve_cap: ID.bcs, approve_public_key_opt: Option.bcs(bcs.vector(bcs.u8())), group_ids: VecSet.bcs(bcs.u16()), recovery_opt: Option.bcs(Recovery.bcs), registration_address_type: bcs.u8(), registration_address: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): User { return User.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), roleId: decodeFromFields("u16", fields.role_id), initTxCaps: decodeFromFields(reified.vector(ID.reified()), fields.init_tx_caps), approveCap: decodeFromFields(ID.reified(), fields.approve_cap), approvePublicKeyOpt: decodeFromFields(Option.reified(reified.vector("u8")), fields.approve_public_key_opt), groupIds: decodeFromFields(VecSet.reified("u16"), fields.group_ids), recoveryOpt: decodeFromFields(Option.reified(Recovery.reified()), fields.recovery_opt), registrationAddressType: decodeFromFields("u8", fields.registration_address_type), registrationAddress: decodeFromFields(reified.vector("u8"), fields.registration_address) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): User { if (!isUser(item.type)) { throw new Error("not a User type");

 }

 return User.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), roleId: decodeFromFieldsWithTypes("u16", item.fields.role_id), initTxCaps: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.init_tx_caps), approveCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.approve_cap), approvePublicKeyOpt: decodeFromFieldsWithTypes(Option.reified(reified.vector("u8")), item.fields.approve_public_key_opt), groupIds: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.group_ids), recoveryOpt: decodeFromFieldsWithTypes(Option.reified(Recovery.reified()), item.fields.recovery_opt), registrationAddressType: decodeFromFieldsWithTypes("u8", item.fields.registration_address_type), registrationAddress: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.registration_address) } ) }

 static fromBcs( data: Uint8Array ): User { return User.fromFields( User.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,roleId: this.roleId,initTxCaps: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.initTxCaps),approveCap: this.approveCap,approvePublicKeyOpt: fieldToJSON<Option<Vector<"u8">>>(`${Option.$typeName}<vector<u8>>`, this.approvePublicKeyOpt),groupIds: this.groupIds.toJSONField(),recoveryOpt: fieldToJSON<Option<Recovery>>(`${Option.$typeName}<${Recovery.$typeName}>`, this.recoveryOpt),registrationAddressType: this.registrationAddressType,registrationAddress: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.registrationAddress),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): User { return User.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), roleId: decodeFromJSONField("u16", field.roleId), initTxCaps: decodeFromJSONField(reified.vector(ID.reified()), field.initTxCaps), approveCap: decodeFromJSONField(ID.reified(), field.approveCap), approvePublicKeyOpt: decodeFromJSONField(Option.reified(reified.vector("u8")), field.approvePublicKeyOpt), groupIds: decodeFromJSONField(VecSet.reified("u16"), field.groupIds), recoveryOpt: decodeFromJSONField(Option.reified(Recovery.reified()), field.recoveryOpt), registrationAddressType: decodeFromJSONField("u8", field.registrationAddressType), registrationAddress: decodeFromJSONField(reified.vector("u8"), field.registrationAddress) } ) }

 static fromJSON( json: Record<string, any> ): User { if (json.$typeName !== User.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return User.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): User { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUser(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a User object`); } return User.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<User> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching User object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUser(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a User object`); }

 return User.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== UserCap =============================== */

export function isUserCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::UserCap`; }

export interface UserCapFields { id: ToField<UID>; workspaceId: ToField<ID> }

export type UserCapReified = Reified< UserCap, UserCapFields >;

export class UserCap implements StructClass { static readonly $typeName = `${PKG_V1}::user::UserCap`; static readonly $numTypeParams = 0;

 readonly $typeName = UserCap.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::UserCap`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly workspaceId: ToField<ID>

 private constructor(typeArgs: [], fields: UserCapFields, ) { this.$fullTypeName = composeSuiType( UserCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::UserCap`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.workspaceId = fields.workspaceId; }

 static reified( ): UserCapReified { return { typeName: UserCap.$typeName, fullTypeName: composeSuiType( UserCap.$typeName, ...[] ) as `${typeof PKG_V1}::user::UserCap`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UserCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UserCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UserCap.fromBcs( data, ), bcs: UserCap.bcs, fromJSONField: (field: any) => UserCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UserCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UserCap.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => UserCap.fetch( client, id, ), new: ( fields: UserCapFields, ) => { return new UserCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UserCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UserCap>> { return phantom(UserCap.reified( )); } static get p() { return UserCap.phantom() }

 static get bcs() { return bcs.struct("UserCap", {

 id: UID.bcs, workspace_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): UserCap { return UserCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), workspaceId: decodeFromFields(ID.reified(), fields.workspace_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UserCap { if (!isUserCap(item.type)) { throw new Error("not a UserCap type");

 }

 return UserCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id) } ) }

 static fromBcs( data: Uint8Array ): UserCap { return UserCap.fromFields( UserCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,workspaceId: this.workspaceId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UserCap { return UserCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId) } ) }

 static fromJSON( json: Record<string, any> ): UserCap { if (json.$typeName !== UserCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UserCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UserCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUserCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UserCap object`); } return UserCap.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<UserCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UserCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUserCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UserCap object`); }

 return UserCap.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== UserGroup =============================== */

export function isUserGroup(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::UserGroup`; }

export interface UserGroupFields { name: ToField<String>; userIds: ToField<VecSet<"u16">> }

export type UserGroupReified = Reified< UserGroup, UserGroupFields >;

export class UserGroup implements StructClass { static readonly $typeName = `${PKG_V1}::user::UserGroup`; static readonly $numTypeParams = 0;

 readonly $typeName = UserGroup.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::UserGroup`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly userIds: ToField<VecSet<"u16">>

 private constructor(typeArgs: [], fields: UserGroupFields, ) { this.$fullTypeName = composeSuiType( UserGroup.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::UserGroup`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.userIds = fields.userIds; }

 static reified( ): UserGroupReified { return { typeName: UserGroup.$typeName, fullTypeName: composeSuiType( UserGroup.$typeName, ...[] ) as `${typeof PKG_V1}::user::UserGroup`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UserGroup.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UserGroup.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UserGroup.fromBcs( data, ), bcs: UserGroup.bcs, fromJSONField: (field: any) => UserGroup.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UserGroup.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UserGroup.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => UserGroup.fetch( client, id, ), new: ( fields: UserGroupFields, ) => { return new UserGroup( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UserGroup.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UserGroup>> { return phantom(UserGroup.reified( )); } static get p() { return UserGroup.phantom() }

 static get bcs() { return bcs.struct("UserGroup", {

 name: String.bcs, user_ids: VecSet.bcs(bcs.u16())

}) };

 static fromFields( fields: Record<string, any> ): UserGroup { return UserGroup.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), userIds: decodeFromFields(VecSet.reified("u16"), fields.user_ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UserGroup { if (!isUserGroup(item.type)) { throw new Error("not a UserGroup type");

 }

 return UserGroup.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), userIds: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.user_ids) } ) }

 static fromBcs( data: Uint8Array ): UserGroup { return UserGroup.fromFields( UserGroup.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,userIds: this.userIds.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UserGroup { return UserGroup.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), userIds: decodeFromJSONField(VecSet.reified("u16"), field.userIds) } ) }

 static fromJSON( json: Record<string, any> ): UserGroup { if (json.$typeName !== UserGroup.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UserGroup.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UserGroup { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUserGroup(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UserGroup object`); } return UserGroup.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<UserGroup> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UserGroup object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUserGroup(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UserGroup object`); }

 return UserGroup.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Users =============================== */

export function isUsers(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::user::Users`; }

export interface UsersFields { adminQuorumThreshold: ToField<"u16">; roles: ToField<VecMap<"u16", Role>>; users: ToField<VecMap<"u16", User>>; userGroups: ToField<VecMap<"u16", UserGroup>>; externalSigners: ToField<Vector<Vector<"u8">>>; idCounter: ToField<"u16"> }

export type UsersReified = Reified< Users, UsersFields >;

export class Users implements StructClass { static readonly $typeName = `${PKG_V1}::user::Users`; static readonly $numTypeParams = 0;

 readonly $typeName = Users.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::Users`;

 readonly $typeArgs: [];

 readonly adminQuorumThreshold: ToField<"u16">; readonly roles: ToField<VecMap<"u16", Role>>; readonly users: ToField<VecMap<"u16", User>>; readonly userGroups: ToField<VecMap<"u16", UserGroup>>; readonly externalSigners: ToField<Vector<Vector<"u8">>>; readonly idCounter: ToField<"u16">

 private constructor(typeArgs: [], fields: UsersFields, ) { this.$fullTypeName = composeSuiType( Users.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::Users`; this.$typeArgs = typeArgs;

 this.adminQuorumThreshold = fields.adminQuorumThreshold;; this.roles = fields.roles;; this.users = fields.users;; this.userGroups = fields.userGroups;; this.externalSigners = fields.externalSigners;; this.idCounter = fields.idCounter; }

 static reified( ): UsersReified { return { typeName: Users.$typeName, fullTypeName: composeSuiType( Users.$typeName, ...[] ) as `${typeof PKG_V1}::user::Users`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Users.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Users.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Users.fromBcs( data, ), bcs: Users.bcs, fromJSONField: (field: any) => Users.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Users.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Users.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Users.fetch( client, id, ), new: ( fields: UsersFields, ) => { return new Users( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Users.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Users>> { return phantom(Users.reified( )); } static get p() { return Users.phantom() }

 static get bcs() { return bcs.struct("Users", {

 admin_quorum_threshold: bcs.u16(), roles: VecMap.bcs(bcs.u16(), Role.bcs), users: VecMap.bcs(bcs.u16(), User.bcs), user_groups: VecMap.bcs(bcs.u16(), UserGroup.bcs), external_signers: bcs.vector(bcs.vector(bcs.u8())), id_counter: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): Users { return Users.reified( ).new( { adminQuorumThreshold: decodeFromFields("u16", fields.admin_quorum_threshold), roles: decodeFromFields(VecMap.reified("u16", Role.reified()), fields.roles), users: decodeFromFields(VecMap.reified("u16", User.reified()), fields.users), userGroups: decodeFromFields(VecMap.reified("u16", UserGroup.reified()), fields.user_groups), externalSigners: decodeFromFields(reified.vector(reified.vector("u8")), fields.external_signers), idCounter: decodeFromFields("u16", fields.id_counter) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Users { if (!isUsers(item.type)) { throw new Error("not a Users type");

 }

 return Users.reified( ).new( { adminQuorumThreshold: decodeFromFieldsWithTypes("u16", item.fields.admin_quorum_threshold), roles: decodeFromFieldsWithTypes(VecMap.reified("u16", Role.reified()), item.fields.roles), users: decodeFromFieldsWithTypes(VecMap.reified("u16", User.reified()), item.fields.users), userGroups: decodeFromFieldsWithTypes(VecMap.reified("u16", UserGroup.reified()), item.fields.user_groups), externalSigners: decodeFromFieldsWithTypes(reified.vector(reified.vector("u8")), item.fields.external_signers), idCounter: decodeFromFieldsWithTypes("u16", item.fields.id_counter) } ) }

 static fromBcs( data: Uint8Array ): Users { return Users.fromFields( Users.bcs.parse(data) ) }

 toJSONField() { return {

 adminQuorumThreshold: this.adminQuorumThreshold,roles: this.roles.toJSONField(),users: this.users.toJSONField(),userGroups: this.userGroups.toJSONField(),externalSigners: fieldToJSON<Vector<Vector<"u8">>>(`vector<vector<u8>>`, this.externalSigners),idCounter: this.idCounter,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Users { return Users.reified( ).new( { adminQuorumThreshold: decodeFromJSONField("u16", field.adminQuorumThreshold), roles: decodeFromJSONField(VecMap.reified("u16", Role.reified()), field.roles), users: decodeFromJSONField(VecMap.reified("u16", User.reified()), field.users), userGroups: decodeFromJSONField(VecMap.reified("u16", UserGroup.reified()), field.userGroups), externalSigners: decodeFromJSONField(reified.vector(reified.vector("u8")), field.externalSigners), idCounter: decodeFromJSONField("u16", field.idCounter) } ) }

 static fromJSON( json: Record<string, any> ): Users { if (json.$typeName !== Users.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Users.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Users { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUsers(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Users object`); } return Users.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Users> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Users object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUsers(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Users object`); }

 return Users.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Role =============================== */

export function isRole(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::user::Role` + '<') }

export type RoleVariants = EnumOutputShapeWithKeys< { admin: true; custom: { role_identifier: ToField<String>; permissions: ToField<Vector<"u8">> } }, "admin" | "custom" >;

export type RoleReified = Reified< Role, RoleVariants >;

export class Role implements EnumClass { static readonly $typeName = `${PKG_V1}::user::Role`; static readonly $numTypeParams = 0;

 readonly $typeName = Role.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::user::Role`;

 readonly $typeArgs: []; readonly $data: RoleVariants

 private constructor(typeArgs: [], data: RoleVariants) { this.$fullTypeName = composeSuiType( Role.$typeName, ...typeArgs ) as `${typeof PKG_V1}::user::Role`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): RoleReified { return { typeName: Role.$typeName, fullTypeName: composeSuiType( Role.$typeName, ...[] ) as `${typeof PKG_V1}::user::Role`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => Role.fromBcs( data, ), bcs: Role.bcs, new: (data: RoleVariants ) => { return new Role( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return Role.reified() }

 static get bcs() { return bcs.enum("Role", {

 admin: null

, custom: { role_identifier: String.bcs, permissions: bcs.vector(bcs.u8()) }

 });

 } static fromBcs( data: Uint8Array ): Role {

 const parsed: RoleVariants = Role.bcs.parse(data);

 return new Role([], parsed);

 }

 }
