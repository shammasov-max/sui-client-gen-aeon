import * as reified from "../../_framework/reified";
import {DWalletCap} from "../../_dependencies/source/0x0/dwallet-cap/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {VecMap} from "../../sui/vec-map/structs";
import {PKG_V1} from "../index";
import {NetworkAddress} from "../library/structs";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== NamespaceInfo =============================== */

export function isNamespaceInfo(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::NamespaceInfo`; }

export interface NamespaceInfoFields { chainIds: ToField<Vector<String>>; txEffectModuleIds: ToField<Vector<ID>>; txAssembleModuleId: ToField<Vector<ID>>; txUpdateModuleIds: ToField<Vector<ID>> }

export type NamespaceInfoReified = Reified< NamespaceInfo, NamespaceInfoFields >;

export class NamespaceInfo implements StructClass { static readonly $typeName = `${PKG_V1}::vault::NamespaceInfo`; static readonly $numTypeParams = 0;

 readonly $typeName = NamespaceInfo.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::NamespaceInfo`;

 readonly $typeArgs: [];

 readonly chainIds: ToField<Vector<String>>; readonly txEffectModuleIds: ToField<Vector<ID>>; readonly txAssembleModuleId: ToField<Vector<ID>>; readonly txUpdateModuleIds: ToField<Vector<ID>>

 private constructor(typeArgs: [], fields: NamespaceInfoFields, ) { this.$fullTypeName = composeSuiType( NamespaceInfo.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::NamespaceInfo`; this.$typeArgs = typeArgs;

 this.chainIds = fields.chainIds;; this.txEffectModuleIds = fields.txEffectModuleIds;; this.txAssembleModuleId = fields.txAssembleModuleId;; this.txUpdateModuleIds = fields.txUpdateModuleIds; }

 static reified( ): NamespaceInfoReified { return { typeName: NamespaceInfo.$typeName, fullTypeName: composeSuiType( NamespaceInfo.$typeName, ...[] ) as `${typeof PKG_V1}::vault::NamespaceInfo`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => NamespaceInfo.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => NamespaceInfo.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => NamespaceInfo.fromBcs( data, ), bcs: NamespaceInfo.bcs, fromJSONField: (field: any) => NamespaceInfo.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => NamespaceInfo.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => NamespaceInfo.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => NamespaceInfo.fetch( client, id, ), new: ( fields: NamespaceInfoFields, ) => { return new NamespaceInfo( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return NamespaceInfo.reified() }

 static phantom( ): PhantomReified<ToTypeStr<NamespaceInfo>> { return phantom(NamespaceInfo.reified( )); } static get p() { return NamespaceInfo.phantom() }

 static get bcs() { return bcs.struct("NamespaceInfo", {

 chain_ids: bcs.vector(String.bcs), tx_effect_module_ids: bcs.vector(ID.bcs), tx_assemble_module_id: bcs.vector(ID.bcs), tx_update_module_ids: bcs.vector(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): NamespaceInfo { return NamespaceInfo.reified( ).new( { chainIds: decodeFromFields(reified.vector(String.reified()), fields.chain_ids), txEffectModuleIds: decodeFromFields(reified.vector(ID.reified()), fields.tx_effect_module_ids), txAssembleModuleId: decodeFromFields(reified.vector(ID.reified()), fields.tx_assemble_module_id), txUpdateModuleIds: decodeFromFields(reified.vector(ID.reified()), fields.tx_update_module_ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): NamespaceInfo { if (!isNamespaceInfo(item.type)) { throw new Error("not a NamespaceInfo type");

 }

 return NamespaceInfo.reified( ).new( { chainIds: decodeFromFieldsWithTypes(reified.vector(String.reified()), item.fields.chain_ids), txEffectModuleIds: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.tx_effect_module_ids), txAssembleModuleId: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.tx_assemble_module_id), txUpdateModuleIds: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.tx_update_module_ids) } ) }

 static fromBcs( data: Uint8Array ): NamespaceInfo { return NamespaceInfo.fromFields( NamespaceInfo.bcs.parse(data) ) }

 toJSONField() { return {

 chainIds: fieldToJSON<Vector<String>>(`vector<${String.$typeName}>`, this.chainIds),txEffectModuleIds: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.txEffectModuleIds),txAssembleModuleId: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.txAssembleModuleId),txUpdateModuleIds: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.txUpdateModuleIds),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): NamespaceInfo { return NamespaceInfo.reified( ).new( { chainIds: decodeFromJSONField(reified.vector(String.reified()), field.chainIds), txEffectModuleIds: decodeFromJSONField(reified.vector(ID.reified()), field.txEffectModuleIds), txAssembleModuleId: decodeFromJSONField(reified.vector(ID.reified()), field.txAssembleModuleId), txUpdateModuleIds: decodeFromJSONField(reified.vector(ID.reified()), field.txUpdateModuleIds) } ) }

 static fromJSON( json: Record<string, any> ): NamespaceInfo { if (json.$typeName !== NamespaceInfo.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return NamespaceInfo.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): NamespaceInfo { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isNamespaceInfo(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a NamespaceInfo object`); } return NamespaceInfo.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<NamespaceInfo> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching NamespaceInfo object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isNamespaceInfo(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a NamespaceInfo object`); }

 return NamespaceInfo.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== UserShareEvent =============================== */

export function isUserShareEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::UserShareEvent`; }

export interface UserShareEventFields { workspaceId: ToField<ID>; vaultId: ToField<"u16">; publicKey: ToField<Vector<"u8">>; encryptedUserShare: ToField<Vector<"u8">> }

export type UserShareEventReified = Reified< UserShareEvent, UserShareEventFields >;

export class UserShareEvent implements StructClass { static readonly $typeName = `${PKG_V1}::vault::UserShareEvent`; static readonly $numTypeParams = 0;

 readonly $typeName = UserShareEvent.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::UserShareEvent`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly publicKey: ToField<Vector<"u8">>; readonly encryptedUserShare: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: UserShareEventFields, ) { this.$fullTypeName = composeSuiType( UserShareEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::UserShareEvent`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.publicKey = fields.publicKey;; this.encryptedUserShare = fields.encryptedUserShare; }

 static reified( ): UserShareEventReified { return { typeName: UserShareEvent.$typeName, fullTypeName: composeSuiType( UserShareEvent.$typeName, ...[] ) as `${typeof PKG_V1}::vault::UserShareEvent`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UserShareEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UserShareEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UserShareEvent.fromBcs( data, ), bcs: UserShareEvent.bcs, fromJSONField: (field: any) => UserShareEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UserShareEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UserShareEvent.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => UserShareEvent.fetch( client, id, ), new: ( fields: UserShareEventFields, ) => { return new UserShareEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UserShareEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UserShareEvent>> { return phantom(UserShareEvent.reified( )); } static get p() { return UserShareEvent.phantom() }

 static get bcs() { return bcs.struct("UserShareEvent", {

 workspace_id: ID.bcs, vault_id: bcs.u16(), public_key: bcs.vector(bcs.u8()), encrypted_user_share: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): UserShareEvent { return UserShareEvent.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), publicKey: decodeFromFields(reified.vector("u8"), fields.public_key), encryptedUserShare: decodeFromFields(reified.vector("u8"), fields.encrypted_user_share) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UserShareEvent { if (!isUserShareEvent(item.type)) { throw new Error("not a UserShareEvent type");

 }

 return UserShareEvent.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), publicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.public_key), encryptedUserShare: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.encrypted_user_share) } ) }

 static fromBcs( data: Uint8Array ): UserShareEvent { return UserShareEvent.fromFields( UserShareEvent.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,publicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.publicKey),encryptedUserShare: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.encryptedUserShare),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UserShareEvent { return UserShareEvent.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), publicKey: decodeFromJSONField(reified.vector("u8"), field.publicKey), encryptedUserShare: decodeFromJSONField(reified.vector("u8"), field.encryptedUserShare) } ) }

 static fromJSON( json: Record<string, any> ): UserShareEvent { if (json.$typeName !== UserShareEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UserShareEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UserShareEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUserShareEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UserShareEvent object`); } return UserShareEvent.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<UserShareEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UserShareEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUserShareEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UserShareEvent object`); }

 return UserShareEvent.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Vault =============================== */

export function isVault(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::Vault`; }

export interface VaultFields { name: ToField<String>; vaultGroupId: ToField<"u16">; vaultProfileId: ToField<String>; dwalletCap: ToField<DWalletCap> }

export type VaultReified = Reified< Vault, VaultFields >;

export class Vault implements StructClass { static readonly $typeName = `${PKG_V1}::vault::Vault`; static readonly $numTypeParams = 0;

 readonly $typeName = Vault.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::Vault`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly vaultGroupId: ToField<"u16">; readonly vaultProfileId: ToField<String>; readonly dwalletCap: ToField<DWalletCap>

 private constructor(typeArgs: [], fields: VaultFields, ) { this.$fullTypeName = composeSuiType( Vault.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::Vault`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.vaultGroupId = fields.vaultGroupId;; this.vaultProfileId = fields.vaultProfileId;; this.dwalletCap = fields.dwalletCap; }

 static reified( ): VaultReified { return { typeName: Vault.$typeName, fullTypeName: composeSuiType( Vault.$typeName, ...[] ) as `${typeof PKG_V1}::vault::Vault`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Vault.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Vault.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Vault.fromBcs( data, ), bcs: Vault.bcs, fromJSONField: (field: any) => Vault.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Vault.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Vault.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Vault.fetch( client, id, ), new: ( fields: VaultFields, ) => { return new Vault( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Vault.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Vault>> { return phantom(Vault.reified( )); } static get p() { return Vault.phantom() }

 static get bcs() { return bcs.struct("Vault", {

 name: String.bcs, vault_group_id: bcs.u16(), vault_profile_id: String.bcs, dwallet_cap: DWalletCap.bcs

}) };

 static fromFields( fields: Record<string, any> ): Vault { return Vault.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), vaultGroupId: decodeFromFields("u16", fields.vault_group_id), vaultProfileId: decodeFromFields(String.reified(), fields.vault_profile_id), dwalletCap: decodeFromFields(DWalletCap.reified(), fields.dwallet_cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Vault { if (!isVault(item.type)) { throw new Error("not a Vault type");

 }

 return Vault.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), vaultGroupId: decodeFromFieldsWithTypes("u16", item.fields.vault_group_id), vaultProfileId: decodeFromFieldsWithTypes(String.reified(), item.fields.vault_profile_id), dwalletCap: decodeFromFieldsWithTypes(DWalletCap.reified(), item.fields.dwallet_cap) } ) }

 static fromBcs( data: Uint8Array ): Vault { return Vault.fromFields( Vault.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,vaultGroupId: this.vaultGroupId,vaultProfileId: this.vaultProfileId,dwalletCap: this.dwalletCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Vault { return Vault.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), vaultGroupId: decodeFromJSONField("u16", field.vaultGroupId), vaultProfileId: decodeFromJSONField(String.reified(), field.vaultProfileId), dwalletCap: decodeFromJSONField(DWalletCap.reified(), field.dwalletCap) } ) }

 static fromJSON( json: Record<string, any> ): Vault { if (json.$typeName !== Vault.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Vault.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Vault { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVault(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Vault object`); } return Vault.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Vault> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Vault object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVault(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Vault object`); }

 return Vault.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== VaultCreated =============================== */

export function isVaultCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::VaultCreated`; }

export interface VaultCreatedFields { workspaceId: ToField<ID>; vaultId: ToField<"u16">; dwalletCapId: ToField<ID> }

export type VaultCreatedReified = Reified< VaultCreated, VaultCreatedFields >;

export class VaultCreated implements StructClass { static readonly $typeName = `${PKG_V1}::vault::VaultCreated`; static readonly $numTypeParams = 0;

 readonly $typeName = VaultCreated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::VaultCreated`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly vaultId: ToField<"u16">; readonly dwalletCapId: ToField<ID>

 private constructor(typeArgs: [], fields: VaultCreatedFields, ) { this.$fullTypeName = composeSuiType( VaultCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::VaultCreated`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.vaultId = fields.vaultId;; this.dwalletCapId = fields.dwalletCapId; }

 static reified( ): VaultCreatedReified { return { typeName: VaultCreated.$typeName, fullTypeName: composeSuiType( VaultCreated.$typeName, ...[] ) as `${typeof PKG_V1}::vault::VaultCreated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultCreated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultCreated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultCreated.fromBcs( data, ), bcs: VaultCreated.bcs, fromJSONField: (field: any) => VaultCreated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultCreated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultCreated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => VaultCreated.fetch( client, id, ), new: ( fields: VaultCreatedFields, ) => { return new VaultCreated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultCreated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultCreated>> { return phantom(VaultCreated.reified( )); } static get p() { return VaultCreated.phantom() }

 static get bcs() { return bcs.struct("VaultCreated", {

 workspace_id: ID.bcs, vault_id: bcs.u16(), dwallet_cap_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): VaultCreated { return VaultCreated.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), vaultId: decodeFromFields("u16", fields.vault_id), dwalletCapId: decodeFromFields(ID.reified(), fields.dwallet_cap_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultCreated { if (!isVaultCreated(item.type)) { throw new Error("not a VaultCreated type");

 }

 return VaultCreated.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), vaultId: decodeFromFieldsWithTypes("u16", item.fields.vault_id), dwalletCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.dwallet_cap_id) } ) }

 static fromBcs( data: Uint8Array ): VaultCreated { return VaultCreated.fromFields( VaultCreated.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,vaultId: this.vaultId,dwalletCapId: this.dwalletCapId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultCreated { return VaultCreated.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), vaultId: decodeFromJSONField("u16", field.vaultId), dwalletCapId: decodeFromJSONField(ID.reified(), field.dwalletCapId) } ) }

 static fromJSON( json: Record<string, any> ): VaultCreated { if (json.$typeName !== VaultCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultCreated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultCreated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultCreated object`); } return VaultCreated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultCreated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultCreated object`); }

 return VaultCreated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== VaultGroup =============================== */

export function isVaultGroup(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::VaultGroup`; }

export interface VaultGroupFields { name: ToField<String>; vaults: ToField<Vector<"u16">> }

export type VaultGroupReified = Reified< VaultGroup, VaultGroupFields >;

export class VaultGroup implements StructClass { static readonly $typeName = `${PKG_V1}::vault::VaultGroup`; static readonly $numTypeParams = 0;

 readonly $typeName = VaultGroup.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::VaultGroup`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly vaults: ToField<Vector<"u16">>

 private constructor(typeArgs: [], fields: VaultGroupFields, ) { this.$fullTypeName = composeSuiType( VaultGroup.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::VaultGroup`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.vaults = fields.vaults; }

 static reified( ): VaultGroupReified { return { typeName: VaultGroup.$typeName, fullTypeName: composeSuiType( VaultGroup.$typeName, ...[] ) as `${typeof PKG_V1}::vault::VaultGroup`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultGroup.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultGroup.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultGroup.fromBcs( data, ), bcs: VaultGroup.bcs, fromJSONField: (field: any) => VaultGroup.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultGroup.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultGroup.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => VaultGroup.fetch( client, id, ), new: ( fields: VaultGroupFields, ) => { return new VaultGroup( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultGroup.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultGroup>> { return phantom(VaultGroup.reified( )); } static get p() { return VaultGroup.phantom() }

 static get bcs() { return bcs.struct("VaultGroup", {

 name: String.bcs, vaults: bcs.vector(bcs.u16())

}) };

 static fromFields( fields: Record<string, any> ): VaultGroup { return VaultGroup.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), vaults: decodeFromFields(reified.vector("u16"), fields.vaults) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultGroup { if (!isVaultGroup(item.type)) { throw new Error("not a VaultGroup type");

 }

 return VaultGroup.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), vaults: decodeFromFieldsWithTypes(reified.vector("u16"), item.fields.vaults) } ) }

 static fromBcs( data: Uint8Array ): VaultGroup { return VaultGroup.fromFields( VaultGroup.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,vaults: fieldToJSON<Vector<"u16">>(`vector<u16>`, this.vaults),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultGroup { return VaultGroup.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), vaults: decodeFromJSONField(reified.vector("u16"), field.vaults) } ) }

 static fromJSON( json: Record<string, any> ): VaultGroup { if (json.$typeName !== VaultGroup.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultGroup.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultGroup { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultGroup(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultGroup object`); } return VaultGroup.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultGroup> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultGroup object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultGroup(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultGroup object`); }

 return VaultGroup.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== VaultProfile =============================== */

export function isVaultProfile(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::VaultProfile`; }

export interface VaultProfileFields { namespaces: ToField<VecMap<String, NamespaceInfo>> }

export type VaultProfileReified = Reified< VaultProfile, VaultProfileFields >;

export class VaultProfile implements StructClass { static readonly $typeName = `${PKG_V1}::vault::VaultProfile`; static readonly $numTypeParams = 0;

 readonly $typeName = VaultProfile.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::VaultProfile`;

 readonly $typeArgs: [];

 readonly namespaces: ToField<VecMap<String, NamespaceInfo>>

 private constructor(typeArgs: [], fields: VaultProfileFields, ) { this.$fullTypeName = composeSuiType( VaultProfile.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::VaultProfile`; this.$typeArgs = typeArgs;

 this.namespaces = fields.namespaces; }

 static reified( ): VaultProfileReified { return { typeName: VaultProfile.$typeName, fullTypeName: composeSuiType( VaultProfile.$typeName, ...[] ) as `${typeof PKG_V1}::vault::VaultProfile`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultProfile.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultProfile.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultProfile.fromBcs( data, ), bcs: VaultProfile.bcs, fromJSONField: (field: any) => VaultProfile.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultProfile.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultProfile.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => VaultProfile.fetch( client, id, ), new: ( fields: VaultProfileFields, ) => { return new VaultProfile( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultProfile.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultProfile>> { return phantom(VaultProfile.reified( )); } static get p() { return VaultProfile.phantom() }

 static get bcs() { return bcs.struct("VaultProfile", {

 namespaces: VecMap.bcs(String.bcs, NamespaceInfo.bcs)

}) };

 static fromFields( fields: Record<string, any> ): VaultProfile { return VaultProfile.reified( ).new( { namespaces: decodeFromFields(VecMap.reified(String.reified(), NamespaceInfo.reified()), fields.namespaces) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultProfile { if (!isVaultProfile(item.type)) { throw new Error("not a VaultProfile type");

 }

 return VaultProfile.reified( ).new( { namespaces: decodeFromFieldsWithTypes(VecMap.reified(String.reified(), NamespaceInfo.reified()), item.fields.namespaces) } ) }

 static fromBcs( data: Uint8Array ): VaultProfile { return VaultProfile.fromFields( VaultProfile.bcs.parse(data) ) }

 toJSONField() { return {

 namespaces: this.namespaces.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultProfile { return VaultProfile.reified( ).new( { namespaces: decodeFromJSONField(VecMap.reified(String.reified(), NamespaceInfo.reified()), field.namespaces) } ) }

 static fromJSON( json: Record<string, any> ): VaultProfile { if (json.$typeName !== VaultProfile.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultProfile.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultProfile { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultProfile(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultProfile object`); } return VaultProfile.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultProfile> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultProfile object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultProfile(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultProfile object`); }

 return VaultProfile.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Vaults =============================== */

export function isVaults(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::Vaults`; }

export interface VaultsFields { vaults: ToField<VecMap<"u16", Vault>>; vaultGroups: ToField<VecMap<"u16", VaultGroup>>; vaultIdByAddress: ToField<VecMap<NetworkAddress, "u16">>; vaultGroupVaultIdCounter: ToField<"u16">; vaultProfiles: ToField<VecMap<String, VaultProfile>> }

export type VaultsReified = Reified< Vaults, VaultsFields >;

export class Vaults implements StructClass { static readonly $typeName = `${PKG_V1}::vault::Vaults`; static readonly $numTypeParams = 0;

 readonly $typeName = Vaults.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::vault::Vaults`;

 readonly $typeArgs: [];

 readonly vaults: ToField<VecMap<"u16", Vault>>; readonly vaultGroups: ToField<VecMap<"u16", VaultGroup>>; readonly vaultIdByAddress: ToField<VecMap<NetworkAddress, "u16">>; readonly vaultGroupVaultIdCounter: ToField<"u16">; readonly vaultProfiles: ToField<VecMap<String, VaultProfile>>

 private constructor(typeArgs: [], fields: VaultsFields, ) { this.$fullTypeName = composeSuiType( Vaults.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::Vaults`; this.$typeArgs = typeArgs;

 this.vaults = fields.vaults;; this.vaultGroups = fields.vaultGroups;; this.vaultIdByAddress = fields.vaultIdByAddress;; this.vaultGroupVaultIdCounter = fields.vaultGroupVaultIdCounter;; this.vaultProfiles = fields.vaultProfiles; }

 static reified( ): VaultsReified { return { typeName: Vaults.$typeName, fullTypeName: composeSuiType( Vaults.$typeName, ...[] ) as `${typeof PKG_V1}::vault::Vaults`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Vaults.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Vaults.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Vaults.fromBcs( data, ), bcs: Vaults.bcs, fromJSONField: (field: any) => Vaults.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Vaults.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Vaults.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Vaults.fetch( client, id, ), new: ( fields: VaultsFields, ) => { return new Vaults( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Vaults.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Vaults>> { return phantom(Vaults.reified( )); } static get p() { return Vaults.phantom() }

 static get bcs() { return bcs.struct("Vaults", {

 vaults: VecMap.bcs(bcs.u16(), Vault.bcs), vault_groups: VecMap.bcs(bcs.u16(), VaultGroup.bcs), vault_id_by_address: VecMap.bcs(NetworkAddress.bcs, bcs.u16()), vault_group_vault_id_counter: bcs.u16(), vault_profiles: VecMap.bcs(String.bcs, VaultProfile.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Vaults { return Vaults.reified( ).new( { vaults: decodeFromFields(VecMap.reified("u16", Vault.reified()), fields.vaults), vaultGroups: decodeFromFields(VecMap.reified("u16", VaultGroup.reified()), fields.vault_groups), vaultIdByAddress: decodeFromFields(VecMap.reified(NetworkAddress.reified(), "u16"), fields.vault_id_by_address), vaultGroupVaultIdCounter: decodeFromFields("u16", fields.vault_group_vault_id_counter), vaultProfiles: decodeFromFields(VecMap.reified(String.reified(), VaultProfile.reified()), fields.vault_profiles) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Vaults { if (!isVaults(item.type)) { throw new Error("not a Vaults type");

 }

 return Vaults.reified( ).new( { vaults: decodeFromFieldsWithTypes(VecMap.reified("u16", Vault.reified()), item.fields.vaults), vaultGroups: decodeFromFieldsWithTypes(VecMap.reified("u16", VaultGroup.reified()), item.fields.vault_groups), vaultIdByAddress: decodeFromFieldsWithTypes(VecMap.reified(NetworkAddress.reified(), "u16"), item.fields.vault_id_by_address), vaultGroupVaultIdCounter: decodeFromFieldsWithTypes("u16", item.fields.vault_group_vault_id_counter), vaultProfiles: decodeFromFieldsWithTypes(VecMap.reified(String.reified(), VaultProfile.reified()), item.fields.vault_profiles) } ) }

 static fromBcs( data: Uint8Array ): Vaults { return Vaults.fromFields( Vaults.bcs.parse(data) ) }

 toJSONField() { return {

 vaults: this.vaults.toJSONField(),vaultGroups: this.vaultGroups.toJSONField(),vaultIdByAddress: this.vaultIdByAddress.toJSONField(),vaultGroupVaultIdCounter: this.vaultGroupVaultIdCounter,vaultProfiles: this.vaultProfiles.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Vaults { return Vaults.reified( ).new( { vaults: decodeFromJSONField(VecMap.reified("u16", Vault.reified()), field.vaults), vaultGroups: decodeFromJSONField(VecMap.reified("u16", VaultGroup.reified()), field.vaultGroups), vaultIdByAddress: decodeFromJSONField(VecMap.reified(NetworkAddress.reified(), "u16"), field.vaultIdByAddress), vaultGroupVaultIdCounter: decodeFromJSONField("u16", field.vaultGroupVaultIdCounter), vaultProfiles: decodeFromJSONField(VecMap.reified(String.reified(), VaultProfile.reified()), field.vaultProfiles) } ) }

 static fromJSON( json: Record<string, any> ): Vaults { if (json.$typeName !== Vaults.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Vaults.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Vaults { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaults(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Vaults object`); } return Vaults.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Vaults> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Vaults object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaults(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Vaults object`); }

 return Vaults.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
