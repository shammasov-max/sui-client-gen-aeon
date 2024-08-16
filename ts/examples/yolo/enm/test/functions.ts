import {PUBLISHED_AT} from "..";
import {obj} from "../../_framework/util";
import {Transaction, TransactionObjectInput} from "@mysten/sui/transactions";

export function getVal( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::test::get_val`, arguments: [ obj(tx, auth) ], }) }
