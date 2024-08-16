import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure, vector} from "../../_framework/util";
import {NetworkAddress} from "./structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddressEqualsArgs { a: TransactionObjectInput; b: TransactionObjectInput }

export function addressEquals( tx: Transaction, args: AddressEqualsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::library::address_equals`, arguments: [ obj(tx, args.a), obj(tx, args.b) ], }) }

export interface CreateNetworkAddressArgs { network: string | TransactionArgument; addressRaw: Array<number | TransactionArgument> | TransactionArgument }

export function createNetworkAddress( tx: Transaction, args: CreateNetworkAddressArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::library::create_network_address`, arguments: [ pure(tx, args.network, `${String.$typeName}`), pure(tx, args.addressRaw, `vector<u8>`) ], }) }

export function getAddressRaw( tx: Transaction, networkAddress: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::library::get_address_raw`, arguments: [ obj(tx, networkAddress) ], }) }

export function getNetworkId( tx: Transaction, networkAddress: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::library::get_network_id`, arguments: [ obj(tx, networkAddress) ], }) }

export interface IsAddressInVectorArgs { networkAddress: TransactionObjectInput; networkAddressVector: Array<TransactionObjectInput> | TransactionArgument }

export function isAddressInVector( tx: Transaction, args: IsAddressInVectorArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::library::is_address_in_vector`, arguments: [ obj(tx, args.networkAddress), vector(tx, `${NetworkAddress.$typeName}`, args.networkAddressVector) ], }) }

export function parseNamespaceColonChainId( tx: Transaction, networkId: string | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::library::parse_namespace_colon_chain_id`, arguments: [ pure(tx, networkId, `${String.$typeName}`) ], }) }
