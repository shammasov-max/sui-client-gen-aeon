import * as reified from "../../_framework/reified";
import {EnumClass, PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {VecSet} from "../../sui/vec-set/structs";
import {PKG_V1} from "../index";
import {EnumOutputShapeWithKeys, bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Proposal =============================== */

export function isProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposal::Proposal`; }

export interface ProposalFields { approved: ToField<VecSet<"u16">>; rejected: ToField<VecSet<"u16">>; proposalType: ToField<ProposalType> }

export type ProposalReified = Reified< Proposal, ProposalFields >;

export class Proposal implements StructClass { static readonly $typeName = `${PKG_V1}::proposal::Proposal`; static readonly $numTypeParams = 0;

 readonly $typeName = Proposal.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::proposal::Proposal`;

 readonly $typeArgs: [];

 readonly approved: ToField<VecSet<"u16">>; readonly rejected: ToField<VecSet<"u16">>; readonly proposalType: ToField<ProposalType>

 private constructor(typeArgs: [], fields: ProposalFields, ) { this.$fullTypeName = composeSuiType( Proposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposal::Proposal`; this.$typeArgs = typeArgs;

 this.approved = fields.approved;; this.rejected = fields.rejected;; this.proposalType = fields.proposalType; }

 static reified( ): ProposalReified { return { typeName: Proposal.$typeName, fullTypeName: composeSuiType( Proposal.$typeName, ...[] ) as `${typeof PKG_V1}::proposal::Proposal`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Proposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Proposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Proposal.fromBcs( data, ), bcs: Proposal.bcs, fromJSONField: (field: any) => Proposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Proposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Proposal.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Proposal.fetch( client, id, ), new: ( fields: ProposalFields, ) => { return new Proposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Proposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Proposal>> { return phantom(Proposal.reified( )); } static get p() { return Proposal.phantom() }

 static get bcs() { return bcs.struct("Proposal", {

 approved: VecSet.bcs(bcs.u16()), rejected: VecSet.bcs(bcs.u16()), proposal_type: ProposalType.bcs

}) };

 static fromFields( fields: Record<string, any> ): Proposal { return Proposal.reified( ).new( { approved: decodeFromFields(VecSet.reified("u16"), fields.approved), rejected: decodeFromFields(VecSet.reified("u16"), fields.rejected), proposalType: decodeFromFields(ProposalType.reified(), fields.proposal_type) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Proposal { if (!isProposal(item.type)) { throw new Error("not a Proposal type");

 }

 return Proposal.reified( ).new( { approved: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.approved), rejected: decodeFromFieldsWithTypes(VecSet.reified("u16"), item.fields.rejected), proposalType: decodeFromFieldsWithTypes(ProposalType.reified(), item.fields.proposal_type) } ) }

 static fromBcs( data: Uint8Array ): Proposal { return Proposal.fromFields( Proposal.bcs.parse(data) ) }

 toJSONField() { return {

 approved: this.approved.toJSONField(),rejected: this.rejected.toJSONField(),proposalType: this.proposalType.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Proposal { return Proposal.reified( ).new( { approved: decodeFromJSONField(VecSet.reified("u16"), field.approved), rejected: decodeFromJSONField(VecSet.reified("u16"), field.rejected), proposalType: decodeFromJSONField(ProposalType.reified(), field.proposalType) } ) }

 static fromJSON( json: Record<string, any> ): Proposal { if (json.$typeName !== Proposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Proposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Proposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Proposal object`); } return Proposal.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Proposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Proposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Proposal object`); }

 return Proposal.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ProposalCreated =============================== */

export function isProposalCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposal::ProposalCreated`; }

export interface ProposalCreatedFields { workspaceId: ToField<ID>; initiator: ToField<"u16">; isConfig: ToField<"bool">; requireApprovalUsers: ToField<Vector<"u16">>; threshold: ToField<"u16"> }

export type ProposalCreatedReified = Reified< ProposalCreated, ProposalCreatedFields >;

export class ProposalCreated implements StructClass { static readonly $typeName = `${PKG_V1}::proposal::ProposalCreated`; static readonly $numTypeParams = 0;

 readonly $typeName = ProposalCreated.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::proposal::ProposalCreated`;

 readonly $typeArgs: [];

 readonly workspaceId: ToField<ID>; readonly initiator: ToField<"u16">; readonly isConfig: ToField<"bool">; readonly requireApprovalUsers: ToField<Vector<"u16">>; readonly threshold: ToField<"u16">

 private constructor(typeArgs: [], fields: ProposalCreatedFields, ) { this.$fullTypeName = composeSuiType( ProposalCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposal::ProposalCreated`; this.$typeArgs = typeArgs;

 this.workspaceId = fields.workspaceId;; this.initiator = fields.initiator;; this.isConfig = fields.isConfig;; this.requireApprovalUsers = fields.requireApprovalUsers;; this.threshold = fields.threshold; }

 static reified( ): ProposalCreatedReified { return { typeName: ProposalCreated.$typeName, fullTypeName: composeSuiType( ProposalCreated.$typeName, ...[] ) as `${typeof PKG_V1}::proposal::ProposalCreated`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ProposalCreated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ProposalCreated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ProposalCreated.fromBcs( data, ), bcs: ProposalCreated.bcs, fromJSONField: (field: any) => ProposalCreated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ProposalCreated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ProposalCreated.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ProposalCreated.fetch( client, id, ), new: ( fields: ProposalCreatedFields, ) => { return new ProposalCreated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ProposalCreated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ProposalCreated>> { return phantom(ProposalCreated.reified( )); } static get p() { return ProposalCreated.phantom() }

 static get bcs() { return bcs.struct("ProposalCreated", {

 workspace_id: ID.bcs, initiator: bcs.u16(), is_config: bcs.bool(), require_approval_users: bcs.vector(bcs.u16()), threshold: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): ProposalCreated { return ProposalCreated.reified( ).new( { workspaceId: decodeFromFields(ID.reified(), fields.workspace_id), initiator: decodeFromFields("u16", fields.initiator), isConfig: decodeFromFields("bool", fields.is_config), requireApprovalUsers: decodeFromFields(reified.vector("u16"), fields.require_approval_users), threshold: decodeFromFields("u16", fields.threshold) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ProposalCreated { if (!isProposalCreated(item.type)) { throw new Error("not a ProposalCreated type");

 }

 return ProposalCreated.reified( ).new( { workspaceId: decodeFromFieldsWithTypes(ID.reified(), item.fields.workspace_id), initiator: decodeFromFieldsWithTypes("u16", item.fields.initiator), isConfig: decodeFromFieldsWithTypes("bool", item.fields.is_config), requireApprovalUsers: decodeFromFieldsWithTypes(reified.vector("u16"), item.fields.require_approval_users), threshold: decodeFromFieldsWithTypes("u16", item.fields.threshold) } ) }

 static fromBcs( data: Uint8Array ): ProposalCreated { return ProposalCreated.fromFields( ProposalCreated.bcs.parse(data) ) }

 toJSONField() { return {

 workspaceId: this.workspaceId,initiator: this.initiator,isConfig: this.isConfig,requireApprovalUsers: fieldToJSON<Vector<"u16">>(`vector<u16>`, this.requireApprovalUsers),threshold: this.threshold,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ProposalCreated { return ProposalCreated.reified( ).new( { workspaceId: decodeFromJSONField(ID.reified(), field.workspaceId), initiator: decodeFromJSONField("u16", field.initiator), isConfig: decodeFromJSONField("bool", field.isConfig), requireApprovalUsers: decodeFromJSONField(reified.vector("u16"), field.requireApprovalUsers), threshold: decodeFromJSONField("u16", field.threshold) } ) }

 static fromJSON( json: Record<string, any> ): ProposalCreated { if (json.$typeName !== ProposalCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ProposalCreated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ProposalCreated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposalCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ProposalCreated object`); } return ProposalCreated.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ProposalCreated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ProposalCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposalCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ProposalCreated object`); }

 return ProposalCreated.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ProposalExecuted =============================== */

export function isProposalExecuted(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposal::ProposalExecuted`; }

export interface ProposalExecutedFields { txId: ToField<"u64"> }

export type ProposalExecutedReified = Reified< ProposalExecuted, ProposalExecutedFields >;

export class ProposalExecuted implements StructClass { static readonly $typeName = `${PKG_V1}::proposal::ProposalExecuted`; static readonly $numTypeParams = 0;

 readonly $typeName = ProposalExecuted.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::proposal::ProposalExecuted`;

 readonly $typeArgs: [];

 readonly txId: ToField<"u64">

 private constructor(typeArgs: [], fields: ProposalExecutedFields, ) { this.$fullTypeName = composeSuiType( ProposalExecuted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposal::ProposalExecuted`; this.$typeArgs = typeArgs;

 this.txId = fields.txId; }

 static reified( ): ProposalExecutedReified { return { typeName: ProposalExecuted.$typeName, fullTypeName: composeSuiType( ProposalExecuted.$typeName, ...[] ) as `${typeof PKG_V1}::proposal::ProposalExecuted`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ProposalExecuted.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ProposalExecuted.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ProposalExecuted.fromBcs( data, ), bcs: ProposalExecuted.bcs, fromJSONField: (field: any) => ProposalExecuted.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ProposalExecuted.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ProposalExecuted.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ProposalExecuted.fetch( client, id, ), new: ( fields: ProposalExecutedFields, ) => { return new ProposalExecuted( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ProposalExecuted.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ProposalExecuted>> { return phantom(ProposalExecuted.reified( )); } static get p() { return ProposalExecuted.phantom() }

 static get bcs() { return bcs.struct("ProposalExecuted", {

 tx_id: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): ProposalExecuted { return ProposalExecuted.reified( ).new( { txId: decodeFromFields("u64", fields.tx_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ProposalExecuted { if (!isProposalExecuted(item.type)) { throw new Error("not a ProposalExecuted type");

 }

 return ProposalExecuted.reified( ).new( { txId: decodeFromFieldsWithTypes("u64", item.fields.tx_id) } ) }

 static fromBcs( data: Uint8Array ): ProposalExecuted { return ProposalExecuted.fromFields( ProposalExecuted.bcs.parse(data) ) }

 toJSONField() { return {

 txId: this.txId.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ProposalExecuted { return ProposalExecuted.reified( ).new( { txId: decodeFromJSONField("u64", field.txId) } ) }

 static fromJSON( json: Record<string, any> ): ProposalExecuted { if (json.$typeName !== ProposalExecuted.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ProposalExecuted.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ProposalExecuted { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposalExecuted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ProposalExecuted object`); } return ProposalExecuted.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ProposalExecuted> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ProposalExecuted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposalExecuted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ProposalExecuted object`); }

 return ProposalExecuted.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== ProposalType =============================== */

export function isProposalType(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::proposal::ProposalType` + '<') }

export type ProposalTypeVariants = EnumOutputShapeWithKeys< { configProposalQuorum: true; mpcTxProposalQuorum: true; mpcTxProposalSpecific: { require_approval_users: ToField<Vector<"u16">>; threshold: ToField<"u16"> } }, "configProposalQuorum" | "mpcTxProposalQuorum" | "mpcTxProposalSpecific" >;

export type ProposalTypeReified = Reified< ProposalType, ProposalTypeVariants >;

export class ProposalType implements EnumClass { static readonly $typeName = `${PKG_V1}::proposal::ProposalType`; static readonly $numTypeParams = 0;

 readonly $typeName = ProposalType.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::proposal::ProposalType`;

 readonly $typeArgs: []; readonly $data: ProposalTypeVariants

 private constructor(typeArgs: [], data: ProposalTypeVariants) { this.$fullTypeName = composeSuiType( ProposalType.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposal::ProposalType`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): ProposalTypeReified { return { typeName: ProposalType.$typeName, fullTypeName: composeSuiType( ProposalType.$typeName, ...[] ) as `${typeof PKG_V1}::proposal::ProposalType`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => ProposalType.fromBcs( data, ), bcs: ProposalType.bcs, new: (data: ProposalTypeVariants ) => { return new ProposalType( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return ProposalType.reified() }

 static get bcs() { return bcs.enum("ProposalType", {

 configProposalQuorum: null

, mpcTxProposalQuorum: null

, mpcTxProposalSpecific: { require_approval_users: bcs.vector(bcs.u16()), threshold: bcs.u16() }

 });

 } static fromBcs( data: Uint8Array ): ProposalType {

 const parsed: ProposalTypeVariants = ProposalType.bcs.parse(data);

 return new ProposalType([], parsed);

 }

 }
