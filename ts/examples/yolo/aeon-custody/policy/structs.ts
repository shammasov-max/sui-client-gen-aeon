import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {EnumClass, PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {PKG_V1} from "../index";
import {NetworkAddress} from "../library/structs";
import {EnumOutputShapeWithKeys, bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== AllowedAction =============================== */

export function isAllowedAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::policy::AllowedAction`; }

export interface AllowedActionFields { action: ToField<AllowedActionModules>; allowedInteractions: ToField<AllowedInteractionAddresses>; allowedRecipients: ToField<AllowedRecipient> }

export type AllowedActionReified = Reified< AllowedAction, AllowedActionFields >;

export class AllowedAction implements StructClass { static readonly $typeName = `${PKG_V1}::policy::AllowedAction`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedAction.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedAction`;

 readonly $typeArgs: [];

 readonly action: ToField<AllowedActionModules>; readonly allowedInteractions: ToField<AllowedInteractionAddresses>; readonly allowedRecipients: ToField<AllowedRecipient>

 private constructor(typeArgs: [], fields: AllowedActionFields, ) { this.$fullTypeName = composeSuiType( AllowedAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedAction`; this.$typeArgs = typeArgs;

 this.action = fields.action;; this.allowedInteractions = fields.allowedInteractions;; this.allowedRecipients = fields.allowedRecipients; }

 static reified( ): AllowedActionReified { return { typeName: AllowedAction.$typeName, fullTypeName: composeSuiType( AllowedAction.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedAction`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AllowedAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AllowedAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AllowedAction.fromBcs( data, ), bcs: AllowedAction.bcs, fromJSONField: (field: any) => AllowedAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AllowedAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AllowedAction.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => AllowedAction.fetch( client, id, ), new: ( fields: AllowedActionFields, ) => { return new AllowedAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AllowedAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AllowedAction>> { return phantom(AllowedAction.reified( )); } static get p() { return AllowedAction.phantom() }

 static get bcs() { return bcs.struct("AllowedAction", {

 action: AllowedActionModules.bcs, allowed_interactions: AllowedInteractionAddresses.bcs, allowed_recipients: AllowedRecipient.bcs

}) };

 static fromFields( fields: Record<string, any> ): AllowedAction { return AllowedAction.reified( ).new( { action: decodeFromFields(AllowedActionModules.reified(), fields.action), allowedInteractions: decodeFromFields(AllowedInteractionAddresses.reified(), fields.allowed_interactions), allowedRecipients: decodeFromFields(AllowedRecipient.reified(), fields.allowed_recipients) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AllowedAction { if (!isAllowedAction(item.type)) { throw new Error("not a AllowedAction type");

 }

 return AllowedAction.reified( ).new( { action: decodeFromFieldsWithTypes(AllowedActionModules.reified(), item.fields.action), allowedInteractions: decodeFromFieldsWithTypes(AllowedInteractionAddresses.reified(), item.fields.allowed_interactions), allowedRecipients: decodeFromFieldsWithTypes(AllowedRecipient.reified(), item.fields.allowed_recipients) } ) }

 static fromBcs( data: Uint8Array ): AllowedAction { return AllowedAction.fromFields( AllowedAction.bcs.parse(data) ) }

 toJSONField() { return {

 action: this.action.toJSONField(),allowedInteractions: this.allowedInteractions.toJSONField(),allowedRecipients: this.allowedRecipients.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AllowedAction { return AllowedAction.reified( ).new( { action: decodeFromJSONField(AllowedActionModules.reified(), field.action), allowedInteractions: decodeFromJSONField(AllowedInteractionAddresses.reified(), field.allowedInteractions), allowedRecipients: decodeFromJSONField(AllowedRecipient.reified(), field.allowedRecipients) } ) }

 static fromJSON( json: Record<string, any> ): AllowedAction { if (json.$typeName !== AllowedAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AllowedAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AllowedAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAllowedAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AllowedAction object`); } return AllowedAction.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<AllowedAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AllowedAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAllowedAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AllowedAction object`); }

 return AllowedAction.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== AllowedAmountAsset =============================== */

export function isAllowedAmountAsset(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::policy::AllowedAmountAsset`; }

export interface AllowedAmountAssetFields { ruleAmount: ToField<AllowedAmount>; ruleAsset: ToField<AllowedAsset> }

export type AllowedAmountAssetReified = Reified< AllowedAmountAsset, AllowedAmountAssetFields >;

export class AllowedAmountAsset implements StructClass { static readonly $typeName = `${PKG_V1}::policy::AllowedAmountAsset`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedAmountAsset.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedAmountAsset`;

 readonly $typeArgs: [];

 readonly ruleAmount: ToField<AllowedAmount>; readonly ruleAsset: ToField<AllowedAsset>

 private constructor(typeArgs: [], fields: AllowedAmountAssetFields, ) { this.$fullTypeName = composeSuiType( AllowedAmountAsset.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedAmountAsset`; this.$typeArgs = typeArgs;

 this.ruleAmount = fields.ruleAmount;; this.ruleAsset = fields.ruleAsset; }

 static reified( ): AllowedAmountAssetReified { return { typeName: AllowedAmountAsset.$typeName, fullTypeName: composeSuiType( AllowedAmountAsset.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedAmountAsset`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AllowedAmountAsset.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AllowedAmountAsset.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AllowedAmountAsset.fromBcs( data, ), bcs: AllowedAmountAsset.bcs, fromJSONField: (field: any) => AllowedAmountAsset.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AllowedAmountAsset.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AllowedAmountAsset.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => AllowedAmountAsset.fetch( client, id, ), new: ( fields: AllowedAmountAssetFields, ) => { return new AllowedAmountAsset( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AllowedAmountAsset.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AllowedAmountAsset>> { return phantom(AllowedAmountAsset.reified( )); } static get p() { return AllowedAmountAsset.phantom() }

 static get bcs() { return bcs.struct("AllowedAmountAsset", {

 rule_amount: AllowedAmount.bcs, rule_asset: AllowedAsset.bcs

}) };

 static fromFields( fields: Record<string, any> ): AllowedAmountAsset { return AllowedAmountAsset.reified( ).new( { ruleAmount: decodeFromFields(AllowedAmount.reified(), fields.rule_amount), ruleAsset: decodeFromFields(AllowedAsset.reified(), fields.rule_asset) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AllowedAmountAsset { if (!isAllowedAmountAsset(item.type)) { throw new Error("not a AllowedAmountAsset type");

 }

 return AllowedAmountAsset.reified( ).new( { ruleAmount: decodeFromFieldsWithTypes(AllowedAmount.reified(), item.fields.rule_amount), ruleAsset: decodeFromFieldsWithTypes(AllowedAsset.reified(), item.fields.rule_asset) } ) }

 static fromBcs( data: Uint8Array ): AllowedAmountAsset { return AllowedAmountAsset.fromFields( AllowedAmountAsset.bcs.parse(data) ) }

 toJSONField() { return {

 ruleAmount: this.ruleAmount.toJSONField(),ruleAsset: this.ruleAsset.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AllowedAmountAsset { return AllowedAmountAsset.reified( ).new( { ruleAmount: decodeFromJSONField(AllowedAmount.reified(), field.ruleAmount), ruleAsset: decodeFromJSONField(AllowedAsset.reified(), field.ruleAsset) } ) }

 static fromJSON( json: Record<string, any> ): AllowedAmountAsset { if (json.$typeName !== AllowedAmountAsset.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AllowedAmountAsset.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AllowedAmountAsset { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAllowedAmountAsset(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AllowedAmountAsset object`); } return AllowedAmountAsset.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<AllowedAmountAsset> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AllowedAmountAsset object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAllowedAmountAsset(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AllowedAmountAsset object`); }

 return AllowedAmountAsset.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== MatchedPolicyEvent =============================== */

export function isMatchedPolicyEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::policy::MatchedPolicyEvent`; }

export interface MatchedPolicyEventFields { matchedPolicyIndex: ToField<"u64">; followAction: ToField<FollowAction> }

export type MatchedPolicyEventReified = Reified< MatchedPolicyEvent, MatchedPolicyEventFields >;

export class MatchedPolicyEvent implements StructClass { static readonly $typeName = `${PKG_V1}::policy::MatchedPolicyEvent`; static readonly $numTypeParams = 0;

 readonly $typeName = MatchedPolicyEvent.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::MatchedPolicyEvent`;

 readonly $typeArgs: [];

 readonly matchedPolicyIndex: ToField<"u64">; readonly followAction: ToField<FollowAction>

 private constructor(typeArgs: [], fields: MatchedPolicyEventFields, ) { this.$fullTypeName = composeSuiType( MatchedPolicyEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::MatchedPolicyEvent`; this.$typeArgs = typeArgs;

 this.matchedPolicyIndex = fields.matchedPolicyIndex;; this.followAction = fields.followAction; }

 static reified( ): MatchedPolicyEventReified { return { typeName: MatchedPolicyEvent.$typeName, fullTypeName: composeSuiType( MatchedPolicyEvent.$typeName, ...[] ) as `${typeof PKG_V1}::policy::MatchedPolicyEvent`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MatchedPolicyEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MatchedPolicyEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MatchedPolicyEvent.fromBcs( data, ), bcs: MatchedPolicyEvent.bcs, fromJSONField: (field: any) => MatchedPolicyEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MatchedPolicyEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MatchedPolicyEvent.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => MatchedPolicyEvent.fetch( client, id, ), new: ( fields: MatchedPolicyEventFields, ) => { return new MatchedPolicyEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MatchedPolicyEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MatchedPolicyEvent>> { return phantom(MatchedPolicyEvent.reified( )); } static get p() { return MatchedPolicyEvent.phantom() }

 static get bcs() { return bcs.struct("MatchedPolicyEvent", {

 matched_policy_index: bcs.u64(), follow_action: FollowAction.bcs

}) };

 static fromFields( fields: Record<string, any> ): MatchedPolicyEvent { return MatchedPolicyEvent.reified( ).new( { matchedPolicyIndex: decodeFromFields("u64", fields.matched_policy_index), followAction: decodeFromFields(FollowAction.reified(), fields.follow_action) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MatchedPolicyEvent { if (!isMatchedPolicyEvent(item.type)) { throw new Error("not a MatchedPolicyEvent type");

 }

 return MatchedPolicyEvent.reified( ).new( { matchedPolicyIndex: decodeFromFieldsWithTypes("u64", item.fields.matched_policy_index), followAction: decodeFromFieldsWithTypes(FollowAction.reified(), item.fields.follow_action) } ) }

 static fromBcs( data: Uint8Array ): MatchedPolicyEvent { return MatchedPolicyEvent.fromFields( MatchedPolicyEvent.bcs.parse(data) ) }

 toJSONField() { return {

 matchedPolicyIndex: this.matchedPolicyIndex.toString(),followAction: this.followAction.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MatchedPolicyEvent { return MatchedPolicyEvent.reified( ).new( { matchedPolicyIndex: decodeFromJSONField("u64", field.matchedPolicyIndex), followAction: decodeFromJSONField(FollowAction.reified(), field.followAction) } ) }

 static fromJSON( json: Record<string, any> ): MatchedPolicyEvent { if (json.$typeName !== MatchedPolicyEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MatchedPolicyEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MatchedPolicyEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMatchedPolicyEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MatchedPolicyEvent object`); } return MatchedPolicyEvent.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<MatchedPolicyEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MatchedPolicyEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMatchedPolicyEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MatchedPolicyEvent object`); }

 return MatchedPolicyEvent.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Policy =============================== */

export function isPolicy(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::policy::Policy`; }

export interface PolicyFields { policyRules: ToField<Vector<PolicyRule>> }

export type PolicyReified = Reified< Policy, PolicyFields >;

export class Policy implements StructClass { static readonly $typeName = `${PKG_V1}::policy::Policy`; static readonly $numTypeParams = 0;

 readonly $typeName = Policy.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::Policy`;

 readonly $typeArgs: [];

 readonly policyRules: ToField<Vector<PolicyRule>>

 private constructor(typeArgs: [], fields: PolicyFields, ) { this.$fullTypeName = composeSuiType( Policy.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::Policy`; this.$typeArgs = typeArgs;

 this.policyRules = fields.policyRules; }

 static reified( ): PolicyReified { return { typeName: Policy.$typeName, fullTypeName: composeSuiType( Policy.$typeName, ...[] ) as `${typeof PKG_V1}::policy::Policy`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Policy.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Policy.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Policy.fromBcs( data, ), bcs: Policy.bcs, fromJSONField: (field: any) => Policy.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Policy.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Policy.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Policy.fetch( client, id, ), new: ( fields: PolicyFields, ) => { return new Policy( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Policy.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Policy>> { return phantom(Policy.reified( )); } static get p() { return Policy.phantom() }

 static get bcs() { return bcs.struct("Policy", {

 policy_rules: bcs.vector(PolicyRule.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Policy { return Policy.reified( ).new( { policyRules: decodeFromFields(reified.vector(PolicyRule.reified()), fields.policy_rules) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Policy { if (!isPolicy(item.type)) { throw new Error("not a Policy type");

 }

 return Policy.reified( ).new( { policyRules: decodeFromFieldsWithTypes(reified.vector(PolicyRule.reified()), item.fields.policy_rules) } ) }

 static fromBcs( data: Uint8Array ): Policy { return Policy.fromFields( Policy.bcs.parse(data) ) }

 toJSONField() { return {

 policyRules: fieldToJSON<Vector<PolicyRule>>(`vector<${PolicyRule.$typeName}>`, this.policyRules),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Policy { return Policy.reified( ).new( { policyRules: decodeFromJSONField(reified.vector(PolicyRule.reified()), field.policyRules) } ) }

 static fromJSON( json: Record<string, any> ): Policy { if (json.$typeName !== Policy.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Policy.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Policy { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPolicy(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Policy object`); } return Policy.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Policy> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Policy object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPolicy(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Policy object`); }

 return Policy.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== PolicyRule =============================== */

export function isPolicyRule(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::policy::PolicyRule`; }

export interface PolicyRuleFields { id: ToField<"u64">; name: ToField<String>; initiatorRule: ToField<AllowedInitiators>; sourceRule: ToField<AllowedSource>; actionRule: ToField<AllowedActions>; assetAmountRule: ToField<AllowedAmountAsset>; followAction: ToField<FollowAction> }

export type PolicyRuleReified = Reified< PolicyRule, PolicyRuleFields >;

export class PolicyRule implements StructClass { static readonly $typeName = `${PKG_V1}::policy::PolicyRule`; static readonly $numTypeParams = 0;

 readonly $typeName = PolicyRule.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::PolicyRule`;

 readonly $typeArgs: [];

 readonly id: ToField<"u64">; readonly name: ToField<String>; readonly initiatorRule: ToField<AllowedInitiators>; readonly sourceRule: ToField<AllowedSource>; readonly actionRule: ToField<AllowedActions>; readonly assetAmountRule: ToField<AllowedAmountAsset>; readonly followAction: ToField<FollowAction>

 private constructor(typeArgs: [], fields: PolicyRuleFields, ) { this.$fullTypeName = composeSuiType( PolicyRule.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::PolicyRule`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.name = fields.name;; this.initiatorRule = fields.initiatorRule;; this.sourceRule = fields.sourceRule;; this.actionRule = fields.actionRule;; this.assetAmountRule = fields.assetAmountRule;; this.followAction = fields.followAction; }

 static reified( ): PolicyRuleReified { return { typeName: PolicyRule.$typeName, fullTypeName: composeSuiType( PolicyRule.$typeName, ...[] ) as `${typeof PKG_V1}::policy::PolicyRule`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PolicyRule.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PolicyRule.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PolicyRule.fromBcs( data, ), bcs: PolicyRule.bcs, fromJSONField: (field: any) => PolicyRule.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PolicyRule.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PolicyRule.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => PolicyRule.fetch( client, id, ), new: ( fields: PolicyRuleFields, ) => { return new PolicyRule( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PolicyRule.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PolicyRule>> { return phantom(PolicyRule.reified( )); } static get p() { return PolicyRule.phantom() }

 static get bcs() { return bcs.struct("PolicyRule", {

 id: bcs.u64(), name: String.bcs, initiator_rule: AllowedInitiators.bcs, source_rule: AllowedSource.bcs, action_rule: AllowedActions.bcs, asset_amount_rule: AllowedAmountAsset.bcs, follow_action: FollowAction.bcs

}) };

 static fromFields( fields: Record<string, any> ): PolicyRule { return PolicyRule.reified( ).new( { id: decodeFromFields("u64", fields.id), name: decodeFromFields(String.reified(), fields.name), initiatorRule: decodeFromFields(AllowedInitiators.reified(), fields.initiator_rule), sourceRule: decodeFromFields(AllowedSource.reified(), fields.source_rule), actionRule: decodeFromFields(AllowedActions.reified(), fields.action_rule), assetAmountRule: decodeFromFields(AllowedAmountAsset.reified(), fields.asset_amount_rule), followAction: decodeFromFields(FollowAction.reified(), fields.follow_action) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PolicyRule { if (!isPolicyRule(item.type)) { throw new Error("not a PolicyRule type");

 }

 return PolicyRule.reified( ).new( { id: decodeFromFieldsWithTypes("u64", item.fields.id), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), initiatorRule: decodeFromFieldsWithTypes(AllowedInitiators.reified(), item.fields.initiator_rule), sourceRule: decodeFromFieldsWithTypes(AllowedSource.reified(), item.fields.source_rule), actionRule: decodeFromFieldsWithTypes(AllowedActions.reified(), item.fields.action_rule), assetAmountRule: decodeFromFieldsWithTypes(AllowedAmountAsset.reified(), item.fields.asset_amount_rule), followAction: decodeFromFieldsWithTypes(FollowAction.reified(), item.fields.follow_action) } ) }

 static fromBcs( data: Uint8Array ): PolicyRule { return PolicyRule.fromFields( PolicyRule.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id.toString(),name: this.name,initiatorRule: this.initiatorRule.toJSONField(),sourceRule: this.sourceRule.toJSONField(),actionRule: this.actionRule.toJSONField(),assetAmountRule: this.assetAmountRule.toJSONField(),followAction: this.followAction.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PolicyRule { return PolicyRule.reified( ).new( { id: decodeFromJSONField("u64", field.id), name: decodeFromJSONField(String.reified(), field.name), initiatorRule: decodeFromJSONField(AllowedInitiators.reified(), field.initiatorRule), sourceRule: decodeFromJSONField(AllowedSource.reified(), field.sourceRule), actionRule: decodeFromJSONField(AllowedActions.reified(), field.actionRule), assetAmountRule: decodeFromJSONField(AllowedAmountAsset.reified(), field.assetAmountRule), followAction: decodeFromJSONField(FollowAction.reified(), field.followAction) } ) }

 static fromJSON( json: Record<string, any> ): PolicyRule { if (json.$typeName !== PolicyRule.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PolicyRule.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PolicyRule { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPolicyRule(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PolicyRule object`); } return PolicyRule.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<PolicyRule> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PolicyRule object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPolicyRule(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PolicyRule object`); }

 return PolicyRule.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== AllowedActionModules =============================== */

export function isAllowedActionModules(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedActionModules` + '<') }

export type AllowedActionModulesVariants = EnumOutputShapeWithKeys< { any: true; specific: { allowed_action_effect_ids: ToField<Vector<ID>>; allowed_action_groups: ToField<Vector<"u16">> } }, "any" | "specific" >;

export type AllowedActionModulesReified = Reified< AllowedActionModules, AllowedActionModulesVariants >;

export class AllowedActionModules implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedActionModules`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedActionModules.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedActionModules`;

 readonly $typeArgs: []; readonly $data: AllowedActionModulesVariants

 private constructor(typeArgs: [], data: AllowedActionModulesVariants) { this.$fullTypeName = composeSuiType( AllowedActionModules.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedActionModules`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedActionModulesReified { return { typeName: AllowedActionModules.$typeName, fullTypeName: composeSuiType( AllowedActionModules.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedActionModules`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedActionModules.fromBcs( data, ), bcs: AllowedActionModules.bcs, new: (data: AllowedActionModulesVariants ) => { return new AllowedActionModules( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedActionModules.reified() }

 static get bcs() { return bcs.enum("AllowedActionModules", {

 any: null

, specific: { allowed_action_effect_ids: bcs.vector(ID.bcs), allowed_action_groups: bcs.vector(bcs.u16()) }

 });

 } static fromBcs( data: Uint8Array ): AllowedActionModules {

 const parsed: AllowedActionModulesVariants = AllowedActionModules.bcs.parse(data);

 return new AllowedActionModules([], parsed);

 }

 }

/* ============================== AllowedActions =============================== */

export function isAllowedActions(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedActions` + '<') }

export type AllowedActionsVariants = EnumOutputShapeWithKeys< { any: true; specific: { actions: ToField<Vector<AllowedAction>> } }, "any" | "specific" >;

export type AllowedActionsReified = Reified< AllowedActions, AllowedActionsVariants >;

export class AllowedActions implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedActions`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedActions.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedActions`;

 readonly $typeArgs: []; readonly $data: AllowedActionsVariants

 private constructor(typeArgs: [], data: AllowedActionsVariants) { this.$fullTypeName = composeSuiType( AllowedActions.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedActions`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedActionsReified { return { typeName: AllowedActions.$typeName, fullTypeName: composeSuiType( AllowedActions.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedActions`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedActions.fromBcs( data, ), bcs: AllowedActions.bcs, new: (data: AllowedActionsVariants ) => { return new AllowedActions( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedActions.reified() }

 static get bcs() { return bcs.enum("AllowedActions", {

 any: null

, specific: { actions: bcs.vector(AllowedAction.bcs) }

 });

 } static fromBcs( data: Uint8Array ): AllowedActions {

 const parsed: AllowedActionsVariants = AllowedActions.bcs.parse(data);

 return new AllowedActions([], parsed);

 }

 }

/* ============================== AllowedAmount =============================== */

export function isAllowedAmount(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedAmount` + '<') }

export type AllowedAmountVariants = EnumOutputShapeWithKeys< { any: true; amountNative: { amount_native: ToField<"u256"> }; amountDollar: { amount_dollar: ToField<"u256"> } }, "any" | "amountNative" | "amountDollar" >;

export type AllowedAmountReified = Reified< AllowedAmount, AllowedAmountVariants >;

export class AllowedAmount implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedAmount`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedAmount.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedAmount`;

 readonly $typeArgs: []; readonly $data: AllowedAmountVariants

 private constructor(typeArgs: [], data: AllowedAmountVariants) { this.$fullTypeName = composeSuiType( AllowedAmount.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedAmount`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedAmountReified { return { typeName: AllowedAmount.$typeName, fullTypeName: composeSuiType( AllowedAmount.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedAmount`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedAmount.fromBcs( data, ), bcs: AllowedAmount.bcs, new: (data: AllowedAmountVariants ) => { return new AllowedAmount( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedAmount.reified() }

 static get bcs() { return bcs.enum("AllowedAmount", {

 any: null

, amountNative: { amount_native: bcs.u256() }

, amountDollar: { amount_dollar: bcs.u256() }

 });

 } static fromBcs( data: Uint8Array ): AllowedAmount {

 const parsed: AllowedAmountVariants = AllowedAmount.bcs.parse(data);

 return new AllowedAmount([], parsed);

 }

 }

/* ============================== AllowedAsset =============================== */

export function isAllowedAsset(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedAsset` + '<') }

export type AllowedAssetVariants = EnumOutputShapeWithKeys< { any: true; specific: { assets: ToField<Vector<NetworkAddress>> } }, "any" | "specific" >;

export type AllowedAssetReified = Reified< AllowedAsset, AllowedAssetVariants >;

export class AllowedAsset implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedAsset`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedAsset.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedAsset`;

 readonly $typeArgs: []; readonly $data: AllowedAssetVariants

 private constructor(typeArgs: [], data: AllowedAssetVariants) { this.$fullTypeName = composeSuiType( AllowedAsset.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedAsset`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedAssetReified { return { typeName: AllowedAsset.$typeName, fullTypeName: composeSuiType( AllowedAsset.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedAsset`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedAsset.fromBcs( data, ), bcs: AllowedAsset.bcs, new: (data: AllowedAssetVariants ) => { return new AllowedAsset( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedAsset.reified() }

 static get bcs() { return bcs.enum("AllowedAsset", {

 any: null

, specific: { assets: bcs.vector(NetworkAddress.bcs) }

 });

 } static fromBcs( data: Uint8Array ): AllowedAsset {

 const parsed: AllowedAssetVariants = AllowedAsset.bcs.parse(data);

 return new AllowedAsset([], parsed);

 }

 }

/* ============================== AllowedInitiators =============================== */

export function isAllowedInitiators(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedInitiators` + '<') }

export type AllowedInitiatorsVariants = EnumOutputShapeWithKeys< { any: true; specific: { group_ids: ToField<Vector<"u16">>; user_ids: ToField<Vector<"u16">> } }, "any" | "specific" >;

export type AllowedInitiatorsReified = Reified< AllowedInitiators, AllowedInitiatorsVariants >;

export class AllowedInitiators implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedInitiators`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedInitiators.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedInitiators`;

 readonly $typeArgs: []; readonly $data: AllowedInitiatorsVariants

 private constructor(typeArgs: [], data: AllowedInitiatorsVariants) { this.$fullTypeName = composeSuiType( AllowedInitiators.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedInitiators`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedInitiatorsReified { return { typeName: AllowedInitiators.$typeName, fullTypeName: composeSuiType( AllowedInitiators.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedInitiators`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedInitiators.fromBcs( data, ), bcs: AllowedInitiators.bcs, new: (data: AllowedInitiatorsVariants ) => { return new AllowedInitiators( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedInitiators.reified() }

 static get bcs() { return bcs.enum("AllowedInitiators", {

 any: null

, specific: { group_ids: bcs.vector(bcs.u16()), user_ids: bcs.vector(bcs.u16()) }

 });

 } static fromBcs( data: Uint8Array ): AllowedInitiators {

 const parsed: AllowedInitiatorsVariants = AllowedInitiators.bcs.parse(data);

 return new AllowedInitiators([], parsed);

 }

 }

/* ============================== AllowedInteractionAddresses =============================== */

export function isAllowedInteractionAddresses(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedInteractionAddresses` + '<') }

export type AllowedInteractionAddressesVariants = EnumOutputShapeWithKeys< { any: true; specific: { interactions: ToField<Vector<NetworkAddress>> } }, "any" | "specific" >;

export type AllowedInteractionAddressesReified = Reified< AllowedInteractionAddresses, AllowedInteractionAddressesVariants >;

export class AllowedInteractionAddresses implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedInteractionAddresses`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedInteractionAddresses.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedInteractionAddresses`;

 readonly $typeArgs: []; readonly $data: AllowedInteractionAddressesVariants

 private constructor(typeArgs: [], data: AllowedInteractionAddressesVariants) { this.$fullTypeName = composeSuiType( AllowedInteractionAddresses.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedInteractionAddresses`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedInteractionAddressesReified { return { typeName: AllowedInteractionAddresses.$typeName, fullTypeName: composeSuiType( AllowedInteractionAddresses.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedInteractionAddresses`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedInteractionAddresses.fromBcs( data, ), bcs: AllowedInteractionAddresses.bcs, new: (data: AllowedInteractionAddressesVariants ) => { return new AllowedInteractionAddresses( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedInteractionAddresses.reified() }

 static get bcs() { return bcs.enum("AllowedInteractionAddresses", {

 any: null

, specific: { interactions: bcs.vector(NetworkAddress.bcs) }

 });

 } static fromBcs( data: Uint8Array ): AllowedInteractionAddresses {

 const parsed: AllowedInteractionAddressesVariants = AllowedInteractionAddresses.bcs.parse(data);

 return new AllowedInteractionAddresses([], parsed);

 }

 }

/* ============================== AllowedRecipient =============================== */

export function isAllowedRecipient(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedRecipient` + '<') }

export type AllowedRecipientVariants = EnumOutputShapeWithKeys< { any: true; specific: { address_book_ids: ToField<Vector<"u16">>; address_book_group_ids: ToField<Vector<"u16">>; vault_ids: ToField<Vector<"u16">>; vault_group_ids: ToField<Vector<"u16">> } }, "any" | "specific" >;

export type AllowedRecipientReified = Reified< AllowedRecipient, AllowedRecipientVariants >;

export class AllowedRecipient implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedRecipient`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedRecipient.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedRecipient`;

 readonly $typeArgs: []; readonly $data: AllowedRecipientVariants

 private constructor(typeArgs: [], data: AllowedRecipientVariants) { this.$fullTypeName = composeSuiType( AllowedRecipient.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedRecipient`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedRecipientReified { return { typeName: AllowedRecipient.$typeName, fullTypeName: composeSuiType( AllowedRecipient.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedRecipient`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedRecipient.fromBcs( data, ), bcs: AllowedRecipient.bcs, new: (data: AllowedRecipientVariants ) => { return new AllowedRecipient( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedRecipient.reified() }

 static get bcs() { return bcs.enum("AllowedRecipient", {

 any: null

, specific: { address_book_ids: bcs.vector(bcs.u16()), address_book_group_ids: bcs.vector(bcs.u16()), vault_ids: bcs.vector(bcs.u16()), vault_group_ids: bcs.vector(bcs.u16()) }

 });

 } static fromBcs( data: Uint8Array ): AllowedRecipient {

 const parsed: AllowedRecipientVariants = AllowedRecipient.bcs.parse(data);

 return new AllowedRecipient([], parsed);

 }

 }

/* ============================== AllowedSource =============================== */

export function isAllowedSource(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::AllowedSource` + '<') }

export type AllowedSourceVariants = EnumOutputShapeWithKeys< { any: true; specific: { vault_group_ids: ToField<Vector<"u16">>; vault_ids: ToField<Vector<"u16">> } }, "any" | "specific" >;

export type AllowedSourceReified = Reified< AllowedSource, AllowedSourceVariants >;

export class AllowedSource implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::AllowedSource`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowedSource.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::AllowedSource`;

 readonly $typeArgs: []; readonly $data: AllowedSourceVariants

 private constructor(typeArgs: [], data: AllowedSourceVariants) { this.$fullTypeName = composeSuiType( AllowedSource.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::AllowedSource`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): AllowedSourceReified { return { typeName: AllowedSource.$typeName, fullTypeName: composeSuiType( AllowedSource.$typeName, ...[] ) as `${typeof PKG_V1}::policy::AllowedSource`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => AllowedSource.fromBcs( data, ), bcs: AllowedSource.bcs, new: (data: AllowedSourceVariants ) => { return new AllowedSource( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return AllowedSource.reified() }

 static get bcs() { return bcs.enum("AllowedSource", {

 any: null

, specific: { vault_group_ids: bcs.vector(bcs.u16()), vault_ids: bcs.vector(bcs.u16()) }

 });

 } static fromBcs( data: Uint8Array ): AllowedSource {

 const parsed: AllowedSourceVariants = AllowedSource.bcs.parse(data);

 return new AllowedSource([], parsed);

 }

 }

/* ============================== FollowAction =============================== */

export function isFollowAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::FollowAction` + '<') }

export type FollowActionVariants = EnumOutputShapeWithKeys< { approve: true; approverRoleApprovalRequired: { threshold: ToField<"u16"> }; quorumApprovalRequired: true; specificApprovalRequired: { require_approval_users: ToField<Vector<"u16">>; require_approval_groups: ToField<Vector<"u16">>; threshold: ToField<"u16"> }; block: true }, "approve" | "approverRoleApprovalRequired" | "quorumApprovalRequired" | "specificApprovalRequired" | "block" >;

export type FollowActionReified = Reified< FollowAction, FollowActionVariants >;

export class FollowAction implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::FollowAction`; static readonly $numTypeParams = 0;

 readonly $typeName = FollowAction.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::FollowAction`;

 readonly $typeArgs: []; readonly $data: FollowActionVariants

 private constructor(typeArgs: [], data: FollowActionVariants) { this.$fullTypeName = composeSuiType( FollowAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::FollowAction`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): FollowActionReified { return { typeName: FollowAction.$typeName, fullTypeName: composeSuiType( FollowAction.$typeName, ...[] ) as `${typeof PKG_V1}::policy::FollowAction`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => FollowAction.fromBcs( data, ), bcs: FollowAction.bcs, new: (data: FollowActionVariants ) => { return new FollowAction( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return FollowAction.reified() }

 static get bcs() { return bcs.enum("FollowAction", {

 approve: null

, approverRoleApprovalRequired: { threshold: bcs.u16() }

, quorumApprovalRequired: null

, specificApprovalRequired: { require_approval_users: bcs.vector(bcs.u16()), require_approval_groups: bcs.vector(bcs.u16()), threshold: bcs.u16() }

, block: null

 });

 } static fromBcs( data: Uint8Array ): FollowAction {

 const parsed: FollowActionVariants = FollowAction.bcs.parse(data);

 return new FollowAction([], parsed);

 }

 }

/* ============================== PolicyResult =============================== */

export function isPolicyResult(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::policy::PolicyResult` + '<') }

export type PolicyResultVariants = EnumOutputShapeWithKeys< { autoApproved: true; quorumApprovalRequired: true; specificApprovalRequired: { require_approval_users: ToField<Vector<"u16">>; threshold: ToField<"u16"> }; blocked: true }, "autoApproved" | "quorumApprovalRequired" | "specificApprovalRequired" | "blocked" >;

export type PolicyResultReified = Reified< PolicyResult, PolicyResultVariants >;

export class PolicyResult implements EnumClass { static readonly $typeName = `${PKG_V1}::policy::PolicyResult`; static readonly $numTypeParams = 0;

 readonly $typeName = PolicyResult.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::policy::PolicyResult`;

 readonly $typeArgs: []; readonly $data: PolicyResultVariants

 private constructor(typeArgs: [], data: PolicyResultVariants) { this.$fullTypeName = composeSuiType( PolicyResult.$typeName, ...typeArgs ) as `${typeof PKG_V1}::policy::PolicyResult`; this.$typeArgs = typeArgs;

 this.$data = data;

 }

 toJSONField() { throw new Error ("NOT IMPLEMENTED"); }

 static reified( ): PolicyResultReified { return { typeName: PolicyResult.$typeName, fullTypeName: composeSuiType( PolicyResult.$typeName, ...[] ) as `${typeof PKG_V1}::policy::PolicyResult`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromBcs: (data: Uint8Array) => PolicyResult.fromBcs( data, ), bcs: PolicyResult.bcs, new: (data: PolicyResultVariants ) => { return new PolicyResult( [], data ) }, kind: "EnumClassReified", } }

 static get r() { return PolicyResult.reified() }

 static get bcs() { return bcs.enum("PolicyResult", {

 autoApproved: null

, quorumApprovalRequired: null

, specificApprovalRequired: { require_approval_users: bcs.vector(bcs.u16()), threshold: bcs.u16() }

, blocked: null

 });

 } static fromBcs( data: Uint8Array ): PolicyResult {

 const parsed: PolicyResultVariants = PolicyResult.bcs.parse(data);

 return new PolicyResult([], parsed);

 }

 }
