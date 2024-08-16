import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {VecMap} from "../../sui/vec-map/structs";
import {VecSet} from "../../sui/vec-set/structs";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== ActionGroup =============================== */

export function isActionGroup(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::settings::ActionGroup`; }

export interface ActionGroupFields { name: ToField<String>; ids: ToField<VecSet<ID>> }

export type ActionGroupReified = Reified< ActionGroup, ActionGroupFields >;

export class ActionGroup implements StructClass { static readonly $typeName = `${PKG_V1}::settings::ActionGroup`; static readonly $numTypeParams = 0;

 readonly $typeName = ActionGroup.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::settings::ActionGroup`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly ids: ToField<VecSet<ID>>

 private constructor(typeArgs: [], fields: ActionGroupFields, ) { this.$fullTypeName = composeSuiType( ActionGroup.$typeName, ...typeArgs ) as `${typeof PKG_V1}::settings::ActionGroup`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.ids = fields.ids; }

 static reified( ): ActionGroupReified { return { typeName: ActionGroup.$typeName, fullTypeName: composeSuiType( ActionGroup.$typeName, ...[] ) as `${typeof PKG_V1}::settings::ActionGroup`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ActionGroup.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ActionGroup.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ActionGroup.fromBcs( data, ), bcs: ActionGroup.bcs, fromJSONField: (field: any) => ActionGroup.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ActionGroup.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ActionGroup.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => ActionGroup.fetch( client, id, ), new: ( fields: ActionGroupFields, ) => { return new ActionGroup( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ActionGroup.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ActionGroup>> { return phantom(ActionGroup.reified( )); } static get p() { return ActionGroup.phantom() }

 static get bcs() { return bcs.struct("ActionGroup", {

 name: String.bcs, ids: VecSet.bcs(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): ActionGroup { return ActionGroup.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), ids: decodeFromFields(VecSet.reified(ID.reified()), fields.ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ActionGroup { if (!isActionGroup(item.type)) { throw new Error("not a ActionGroup type");

 }

 return ActionGroup.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), ids: decodeFromFieldsWithTypes(VecSet.reified(ID.reified()), item.fields.ids) } ) }

 static fromBcs( data: Uint8Array ): ActionGroup { return ActionGroup.fromFields( ActionGroup.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,ids: this.ids.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ActionGroup { return ActionGroup.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), ids: decodeFromJSONField(VecSet.reified(ID.reified()), field.ids) } ) }

 static fromJSON( json: Record<string, any> ): ActionGroup { if (json.$typeName !== ActionGroup.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ActionGroup.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ActionGroup { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isActionGroup(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ActionGroup object`); } return ActionGroup.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<ActionGroup> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ActionGroup object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isActionGroup(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ActionGroup object`); }

 return ActionGroup.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== WorkspaceSettings =============================== */

export function isWorkspaceSettings(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::settings::WorkspaceSettings`; }

export interface WorkspaceSettingsFields { name: ToField<String>; allowedTxEffectModuleIds: ToField<VecSet<ID>>; txEffectModuleGroups: ToField<VecMap<"u16", ActionGroup>>; idCounter: ToField<"u16"> }

export type WorkspaceSettingsReified = Reified< WorkspaceSettings, WorkspaceSettingsFields >;

export class WorkspaceSettings implements StructClass { static readonly $typeName = `${PKG_V1}::settings::WorkspaceSettings`; static readonly $numTypeParams = 0;

 readonly $typeName = WorkspaceSettings.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::settings::WorkspaceSettings`;

 readonly $typeArgs: [];

 readonly name: ToField<String>; readonly allowedTxEffectModuleIds: ToField<VecSet<ID>>; readonly txEffectModuleGroups: ToField<VecMap<"u16", ActionGroup>>; readonly idCounter: ToField<"u16">

 private constructor(typeArgs: [], fields: WorkspaceSettingsFields, ) { this.$fullTypeName = composeSuiType( WorkspaceSettings.$typeName, ...typeArgs ) as `${typeof PKG_V1}::settings::WorkspaceSettings`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.allowedTxEffectModuleIds = fields.allowedTxEffectModuleIds;; this.txEffectModuleGroups = fields.txEffectModuleGroups;; this.idCounter = fields.idCounter; }

 static reified( ): WorkspaceSettingsReified { return { typeName: WorkspaceSettings.$typeName, fullTypeName: composeSuiType( WorkspaceSettings.$typeName, ...[] ) as `${typeof PKG_V1}::settings::WorkspaceSettings`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => WorkspaceSettings.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WorkspaceSettings.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => WorkspaceSettings.fromBcs( data, ), bcs: WorkspaceSettings.bcs, fromJSONField: (field: any) => WorkspaceSettings.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => WorkspaceSettings.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => WorkspaceSettings.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => WorkspaceSettings.fetch( client, id, ), new: ( fields: WorkspaceSettingsFields, ) => { return new WorkspaceSettings( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return WorkspaceSettings.reified() }

 static phantom( ): PhantomReified<ToTypeStr<WorkspaceSettings>> { return phantom(WorkspaceSettings.reified( )); } static get p() { return WorkspaceSettings.phantom() }

 static get bcs() { return bcs.struct("WorkspaceSettings", {

 name: String.bcs, allowed_tx_effect_module_ids: VecSet.bcs(ID.bcs), tx_effect_module_groups: VecMap.bcs(bcs.u16(), ActionGroup.bcs), id_counter: bcs.u16()

}) };

 static fromFields( fields: Record<string, any> ): WorkspaceSettings { return WorkspaceSettings.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), allowedTxEffectModuleIds: decodeFromFields(VecSet.reified(ID.reified()), fields.allowed_tx_effect_module_ids), txEffectModuleGroups: decodeFromFields(VecMap.reified("u16", ActionGroup.reified()), fields.tx_effect_module_groups), idCounter: decodeFromFields("u16", fields.id_counter) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): WorkspaceSettings { if (!isWorkspaceSettings(item.type)) { throw new Error("not a WorkspaceSettings type");

 }

 return WorkspaceSettings.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), allowedTxEffectModuleIds: decodeFromFieldsWithTypes(VecSet.reified(ID.reified()), item.fields.allowed_tx_effect_module_ids), txEffectModuleGroups: decodeFromFieldsWithTypes(VecMap.reified("u16", ActionGroup.reified()), item.fields.tx_effect_module_groups), idCounter: decodeFromFieldsWithTypes("u16", item.fields.id_counter) } ) }

 static fromBcs( data: Uint8Array ): WorkspaceSettings { return WorkspaceSettings.fromFields( WorkspaceSettings.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,allowedTxEffectModuleIds: this.allowedTxEffectModuleIds.toJSONField(),txEffectModuleGroups: this.txEffectModuleGroups.toJSONField(),idCounter: this.idCounter,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): WorkspaceSettings { return WorkspaceSettings.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), allowedTxEffectModuleIds: decodeFromJSONField(VecSet.reified(ID.reified()), field.allowedTxEffectModuleIds), txEffectModuleGroups: decodeFromJSONField(VecMap.reified("u16", ActionGroup.reified()), field.txEffectModuleGroups), idCounter: decodeFromJSONField("u16", field.idCounter) } ) }

 static fromJSON( json: Record<string, any> ): WorkspaceSettings { if (json.$typeName !== WorkspaceSettings.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return WorkspaceSettings.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): WorkspaceSettings { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWorkspaceSettings(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WorkspaceSettings object`); } return WorkspaceSettings.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<WorkspaceSettings> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WorkspaceSettings object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWorkspaceSettings(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WorkspaceSettings object`); }

 return WorkspaceSettings.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
