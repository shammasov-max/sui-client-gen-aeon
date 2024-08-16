import {PUBLISHED_AT} from "..";
import {Transaction} from "@mysten/sui/transactions";

export function effectActionForVaultNotAuthorized( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::errors::effect_action_for_vault_not_authorized`, arguments: [ ], }) }

export function invalidModuleId( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_module_id`, arguments: [ ], }) }

export function notAuthorized( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::errors::not_authorized`, arguments: [ ], }) }
