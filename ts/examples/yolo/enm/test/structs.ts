import * as reified from "../../_framework/reified";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {EnumClass, PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {PKG_V1} from "../index";
import {EnumOutputShapeWithKeys, bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Auth =============================== */

export function isAuth(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::test::Auth`; }

export interface AuthFields { val: ToField<"u8"> }

export type AuthReified = Reified< Auth, AuthFields >;

export class Auth implements StructClass { static readonly $typeName = `${PKG_V1}::test::Auth`; static readonly $numTypeParams = 0;

 readonly $typeName = Auth.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::test::Auth`;

 readonly $typeArgs: [];

 readonly val: ToField<"u8">

 private constructor(typeArgs: [], fields: AuthFields, ) { this.$fullTypeName = composeSuiType( Auth.$typeName, ...typeArgs ) as `${typeof PKG_V1}::test::Auth`; this.$typeArgs = typeArgs;

 this.val = fields.val; }

 static reified( ): AuthReified { return { typeName: Auth.$typeName, fullTypeName: composeSuiType( Auth.$typeName, ...[] ) as `${typeof PKG_V1}::test::Auth`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Auth.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Auth.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Auth.fromBcs( data, ), bcs: Auth.bcs, fromJSONField: (field: any) => Auth.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Auth.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Auth.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Auth.fetch( client, id, ), new: ( fields: AuthFields, ) => { return new Auth( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Auth.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Auth>> { return phantom(Auth.reified( )); } static get p() { return Auth.phantom() }

 static get bcs() { return bcs.struct("Auth", {

 val: bcs.u8()

}) };

 static fromFields( fields: Record<string, any> ): Auth { return Auth.reified( ).new( { val: decodeFromFields("u8", fields.val) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Auth { if (!isAuth(item.type)) { throw new Error("not a Auth type");

 }

 return Auth.reified( ).new( { val: decodeFromFieldsWithTypes("u8", item.fields.val) } ) }

 static fromBcs( data: Uint8Array ): Auth { return Auth.fromFields( Auth.bcs.parse(data) ) }

 toJSONField() { return {

 val: this.val,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Auth { return Auth.reified( ).new( { val: decodeFromJSONField("u8", field.val) } ) }

 static fromJSON( json: Record<string, any> ): Auth { if (json.$typeName !== Auth.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Auth.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Auth { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAuth(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Auth object`); } return Auth.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Auth> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Auth object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAuth(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Auth object`); }

 return Auth.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ConfigTx =============================== */

export function isConfigTx(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::test::ConfigTx`; }

export interface ConfigTxFields { initiator: ToField<"u16">; status: ToField<ConfigTxStatus>; txns: ToField<Vector<ConfigTxType>> }

export type ConfigTxReified = Reified< ConfigTx, ConfigTxFields >;

export class ConfigTx implements StructClass { static readonly $typeName = `${PKG_V1}::test::ConfigTx`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTx.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::test::ConfigTx`;

 readonly $typeArgs: [];

 readonly initiator: ToField<"u16">; readonly status: ToField<ConfigTxStatus>; readonly txns: ToField<Vector<ConfigTxType>>

 private constructor(typeArgs: [], fields: ConfigTxFields, ) { this.$fullTypeName = composeSuiType( ConfigTx.$typeName, ...typeArgs ) as `${typeof PKG_V1}::test::ConfigTx`; this.$typeArgs = typeArgs;

 this.initiator = fields.initiator;; this.status = fields.status;; this.txns = fields.txns; }

 static reified( ): ConfigTxReified { return { typeName: ConfigTx.$typeName, fullTypeName: composeSuiType( ConfigTx.$typeName, ...[] ) as `${typeof PKG_V1}::test::ConfigTx`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigTx.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigTx.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigTx.fromBcs( data, ), bcs: ConfigTx.bcs, fromJSONField: (field: any) => ConfigTx.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigTx.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigTx.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ConfigTx.fetch( client, id, ), new: ( fields: ConfigTxFields, ) => { return new ConfigTx( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigTx.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigTx>> { return phantom(ConfigTx.reified( )); } static get p() { return ConfigTx.phantom() }

 static get bcs() { return bcs.struct("ConfigTx", {

 initiator: bcs.u16(), status: ConfigTxStatus.bcs, txns: bcs.vector(ConfigTxType.bcs)

}) };

 static fromFields( fields: Record<string, any> ): ConfigTx { return ConfigTx.reified( ).new( { initiator: decodeFromFields("u16", fields.initiator), status: decodeFromFields(ConfigTxStatus.reified(), fields.status), txns: decodeFromFields(reified.vector(ConfigTxType.reified()), fields.txns) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigTx { if (!isConfigTx(item.type)) { throw new Error("not a ConfigTx type");

 }

 return ConfigTx.reified( ).new( { initiator: decodeFromFieldsWithTypes("u16", item.fields.initiator), status: decodeFromFieldsWithTypes(ConfigTxStatus.reified(), item.fields.status), txns: decodeFromFieldsWithTypes(reified.vector(ConfigTxType.reified()), item.fields.txns) } ) }

 static fromBcs( data: Uint8Array ): ConfigTx { return ConfigTx.fromFields( ConfigTx.bcs.parse(data) ) }

 toJSONField() { return {

 initiator: this.initiator,status: this.status.toJSONField(),txns: fieldToJSON<Vector<ConfigTxType>>(`vector<${ConfigTxType.$typeName}>`, this.txns),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigTx { return ConfigTx.reified( ).new( { initiator: decodeFromJSONField("u16", field.initiator), status: decodeFromJSONField(ConfigTxStatus.reified(), field.status), txns: decodeFromJSONField(reified.vector(ConfigTxType.reified()), field.txns) } ) }

 static fromJSON( json: Record<string, any> ): ConfigTx { if (json.$typeName !== ConfigTx.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigTx.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigTx { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigTx(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigTx object`); } return ConfigTx.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigTx> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigTx object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigTx(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigTx object`); }

 return ConfigTx.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== AuthSession =============================== */

export function isAuthSession(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::test::AuthSession` + '<') }

export type AuthSessionVariants = EnumOutputShapeWithKeys< { any: true; specific: { val: ToField<"u8"> } }, " any " | " specific " >;

export type AuthSessionReified = Reified< AuthSession, AuthSessionVariants >;

export class AuthSession implements EnumClass { static readonly $typeName = `${PKG_V1}::test::AuthSession`; static readonly $numTypeParams = 0;

 readonly $typeName = AuthSession.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::test::AuthSession`;

 readonly $typeArgs: []; readonly $data: AuthSessionVariants

 private constructor(typeArgs: [], data: AuthSessionVariants) { this.$fullTypeName = composeSuiType( AuthSession.$typeName, ...typeArgs ) as `${typeof PKG_V1}::test::AuthSession`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AuthSessionReified { return { typeName: AuthSession.$typeName, fullTypeName: composeSuiType( AuthSession.$typeName, ...[] ) as `${typeof PKG_V1}::test::AuthSession`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AuthSession.fromBcs( data, ), bcs: AuthSession.bcs, new: (data: AuthSessionVariants ) => { return new AuthSession( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AuthSession.reified() }

 static get bcs() { return bcs.enum("AuthSession", {

 any: null

, specific: { val: bcs.u8() }

 });

 } static fromBcs( data: Uint8Array ): AuthSession {

 const parsed: AuthSessionVariants = AuthSession.bcs.parse(data);

 return new AuthSession([], parsed);

 }

 }

/* ============================== ConfigTxStatus =============================== */

export function isConfigTxStatus(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::test::ConfigTxStatus` + '<') }

export type ConfigTxStatusVariants = EnumOutputShapeWithKeys< { pendingApproval: { proposal: ToField<Proposal> }; directApproval: true; rejected: true; executed: true; cancelled: true }, " pendingApproval " | " directApproval " | " rejected " | " executed " | " cancelled " >;

export type ConfigTxStatusReified = Reified< ConfigTxStatus, ConfigTxStatusVariants >;

export class ConfigTxStatus implements EnumClass { static readonly $typeName = `${PKG_V1}::test::ConfigTxStatus`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxStatus.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::test::ConfigTxStatus`;

 readonly $typeArgs: []; readonly $data: ConfigTxStatusVariants

 private constructor(typeArgs: [], data: ConfigTxStatusVariants) { this.$fullTypeName = composeSuiType( ConfigTxStatus.$typeName, ...typeArgs ) as `${typeof PKG_V1}::test::ConfigTxStatus`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ConfigTxStatusReified { return { typeName: ConfigTxStatus.$typeName, fullTypeName: composeSuiType( ConfigTxStatus.$typeName, ...[] ) as `${typeof PKG_V1}::test::ConfigTxStatus`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ConfigTxStatus.fromBcs( data, ), bcs: ConfigTxStatus.bcs, new: (data: ConfigTxStatusVariants ) => { return new ConfigTxStatus( [], data ) }, kind: "EnumClassReified", } }

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

export function isConfigTxType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::test::ConfigTxType` + '<') }

export type ConfigTxTypeVariants = EnumOutputShapeWithKeys< { addVaultGroup: { name: ToField<String>; vault_ids: ToField<Vector<"u16">> }; editVaultGroup: { name_new: ToField<String>; vault_group_id: ToField<"u16">; vault_ids_add: ToField<Vector<"u16">>; vault_ids_remove: ToField<Vector<"u16">> }; deleteVaultGroup: { vault_group_id: ToField<"u16"> }; addUser: { name: ToField<String>; registration_address_type: ToField<"u8">; registration_address: ToField<Vector<"u8">>; role_id: ToField<"u16">; groups_to_add_to: ToField<Vector<"u16">> }; deleteUser: { user_id: ToField<"u16"> }; shareUserShares: { user_id: ToField<"u16"> }; addressBookAddAddress: { name: ToField<String>; network_address: ToField<Vector<"u8">>; network_ids: ToField<Vector<String>> }; addressBookEditAddress: { address_id: ToField<"u16">; new_name: ToField<Option<String>>; new_network_ids: ToField<Option<Vector<String>>> }; addressBookDeleteAddress: { address_id: ToField<"u16"> }; vaultProfileDelete: { profile_name: ToField<String> }; addwhitelistActionModule: { module_id: ToField<ID> }; removeWhitelistActionModule: { module_id: ToField<ID> }; deleteActionGroup: { group_id: ToField<"u16"> }; revokeRecovery: { user_id: ToField<"u16"> }; recoverAccount: { user_id: ToField<"u16">; new_registration_address_type: ToField<"u8">; new_registration_address: ToField<Vector<"u8">> } }, " addVaultGroup " | " editVaultGroup " | " deleteVaultGroup " | " addUser " | " deleteUser " | " shareUserShares " | " addressBookAddAddress " | " addressBookEditAddress " | " addressBookDeleteAddress " | " vaultProfileDelete " | " addwhitelistActionModule " | " removeWhitelistActionModule " | " deleteActionGroup " | " revokeRecovery " | " recoverAccount " >;

export type ConfigTxTypeReified = Reified< ConfigTxType, ConfigTxTypeVariants >;

export class ConfigTxType implements EnumClass { static readonly $typeName = `${PKG_V1}::test::ConfigTxType`; static readonly $numTypeParams = 0;

 readonly $typeName = ConfigTxType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::test::ConfigTxType`;

 readonly $typeArgs: []; readonly $data: ConfigTxTypeVariants

 private constructor(typeArgs: [], data: ConfigTxTypeVariants) { this.$fullTypeName = composeSuiType( ConfigTxType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::test::ConfigTxType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ConfigTxTypeReified { return { typeName: ConfigTxType.$typeName, fullTypeName: composeSuiType( ConfigTxType.$typeName, ...[] ) as `${typeof PKG_V1}::test::ConfigTxType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ConfigTxType.fromBcs( data, ), bcs: ConfigTxType.bcs, new: (data: ConfigTxTypeVariants ) => { return new ConfigTxType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ConfigTxType.reified() }

 static get bcs() { return bcs.enum("ConfigTxType", {

 addVaultGroup: { name: String.bcs, vault_ids: bcs.vector(bcs.u16()) }

, editVaultGroup: { name_new: String.bcs, vault_group_id: bcs.u16(), vault_ids_add: bcs.vector(bcs.u16()), vault_ids_remove: bcs.vector(bcs.u16()) }

, deleteVaultGroup: { vault_group_id: bcs.u16() }

, addUser: { name: String.bcs, registration_address_type: bcs.u8(), registration_address: bcs.vector(bcs.u8()), role_id: bcs.u16(), groups_to_add_to: bcs.vector(bcs.u16()) }

, deleteUser: { user_id: bcs.u16() }

, shareUserShares: { user_id: bcs.u16() }

, addressBookAddAddress: { name: String.bcs, network_address: bcs.vector(bcs.u8()), network_ids: bcs.vector(String.bcs) }

, addressBookEditAddress: { address_id: bcs.u16(), new_name: Option.bcs(String.bcs), new_network_ids: Option.bcs(bcs.vector(String.bcs)) }

, addressBookDeleteAddress: { address_id: bcs.u16() }

, vaultProfileDelete: { profile_name: String.bcs }

, addwhitelistActionModule: { module_id: ID.bcs }

, removeWhitelistActionModule: { module_id: ID.bcs }

, deleteActionGroup: { group_id: bcs.u16() }

, revokeRecovery: { user_id: bcs.u16() }

, recoverAccount: { user_id: bcs.u16(), new_registration_address_type: bcs.u8(), new_registration_address: bcs.vector(bcs.u8()) }

 });

 } static fromBcs( data: Uint8Array ): ConfigTxType {

 const parsed: ConfigTxTypeVariants = ConfigTxType.bcs.parse(data);

 return new ConfigTxType([], parsed);

 }

 }

/* ============================== Proposal =============================== */

export function isProposal(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::test::Proposal` + '<') }

export type ProposalVariants = EnumOutputShapeWithKeys< { configProposalQuorum: { approved: ToField<Vector<"u16">>; rejected: ToField<Vector<"u16">> }; mpcTxProposalQuorum: { approved: ToField<Vector<"u16">>; rejected: ToField<Vector<"u16">> }; mpcTxProposalSpecific: { require_approval_users: ToField<Vector<"u16">>; threshold: ToField<"u16">; approved: ToField<Vector<"u16">>; rejected: ToField<Vector<"u16">> } }, " configProposalQuorum " | " mpcTxProposalQuorum " | " mpcTxProposalSpecific " >;

export type ProposalReified = Reified< Proposal, ProposalVariants >;

export class Proposal implements EnumClass { static readonly $typeName = `${PKG_V1}::test::Proposal`; static readonly $numTypeParams = 0;

 readonly $typeName = Proposal.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::test::Proposal`;

 readonly $typeArgs: []; readonly $data: ProposalVariants

 private constructor(typeArgs: [], data: ProposalVariants) { this.$fullTypeName = composeSuiType( Proposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::test::Proposal`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ProposalReified { return { typeName: Proposal.$typeName, fullTypeName: composeSuiType( Proposal.$typeName, ...[] ) as `${typeof PKG_V1}::test::Proposal`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => Proposal.fromBcs( data, ), bcs: Proposal.bcs, new: (data: ProposalVariants ) => { return new Proposal( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return Proposal.reified() }

 static get bcs() { return bcs.enum("Proposal", {

 configProposalQuorum: { approved: bcs.vector(bcs.u16()), rejected: bcs.vector(bcs.u16()) }

, mpcTxProposalQuorum: { approved: bcs.vector(bcs.u16()), rejected: bcs.vector(bcs.u16()) }

, mpcTxProposalSpecific: { require_approval_users: bcs.vector(bcs.u16()), threshold: bcs.u16(), approved: bcs.vector(bcs.u16()), rejected: bcs.vector(bcs.u16()) }

 });

 } static fromBcs( data: Uint8Array ): Proposal {

 const parsed: ProposalVariants = Proposal.bcs.parse(data);

 return new Proposal([], parsed);

 }

 }
