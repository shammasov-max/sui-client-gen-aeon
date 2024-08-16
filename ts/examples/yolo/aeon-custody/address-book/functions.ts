import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ExecuteConfigAddressBookAddAddressArgs { book: TransactionObjectInput; name: string | TransactionArgument; networkAddress: Array<number | TransactionArgument> | TransactionArgument; networkIds: Array<string | TransactionArgument> | TransactionArgument }

export function executeConfigAddressBookAddAddress( tx: Transaction, args: ExecuteConfigAddressBookAddAddressArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::execute_config_address_book_add_address`, arguments: [ obj(tx, args.book), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.networkAddress, `vector<u8>`), pure(tx, args.networkIds, `vector<${String.$typeName}>`) ], }) }

export interface ExecuteConfigAddressBookAddGroupArgs { book: TransactionObjectInput; name: string | TransactionArgument; addressIds: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigAddressBookAddGroup( tx: Transaction, args: ExecuteConfigAddressBookAddGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::execute_config_address_book_add_group`, arguments: [ obj(tx, args.book), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addressIds, `vector<u16>`) ], }) }

export interface ExecuteConfigAddressBookDeleteAddressArgs { book: TransactionObjectInput; addressId: number | TransactionArgument }

export function executeConfigAddressBookDeleteAddress( tx: Transaction, args: ExecuteConfigAddressBookDeleteAddressArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::execute_config_address_book_delete_address`, arguments: [ obj(tx, args.book), pure(tx, args.addressId, `u16`) ], }) }

export interface ExecuteConfigAddressBookDeleteGroupArgs { book: TransactionObjectInput; groupDeleteId: number | TransactionArgument }

export function executeConfigAddressBookDeleteGroup( tx: Transaction, args: ExecuteConfigAddressBookDeleteGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::execute_config_address_book_delete_group`, arguments: [ obj(tx, args.book), pure(tx, args.groupDeleteId, `u16`) ], }) }

export interface ExecuteConfigAddressBookEditAddressArgs { book: TransactionObjectInput; addressId: number | TransactionArgument; newName: (string | TransactionArgument | TransactionArgument | null); newNetworkIds: (Array<string | TransactionArgument> | TransactionArgument | TransactionArgument | null) }

export function executeConfigAddressBookEditAddress( tx: Transaction, args: ExecuteConfigAddressBookEditAddressArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::execute_config_address_book_edit_address`, arguments: [ obj(tx, args.book), pure(tx, args.addressId, `u16`), pure(tx, args.newName, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.newNetworkIds, `${Option.$typeName}<vector<${String.$typeName}>>`) ], }) }

export interface ExecuteConfigAddressBookEditGroupArgs { book: TransactionObjectInput; groupId: number | TransactionArgument; nameNewOpt: (string | TransactionArgument | TransactionArgument | null); addressIdsAdd: Array<number | TransactionArgument> | TransactionArgument; addressIdsDelete: Array<number | TransactionArgument> | TransactionArgument }

export function executeConfigAddressBookEditGroup( tx: Transaction, args: ExecuteConfigAddressBookEditGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::execute_config_address_book_edit_group`, arguments: [ obj(tx, args.book), pure(tx, args.groupId, `u16`), pure(tx, args.nameNewOpt, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.addressIdsAdd, `vector<u16>`), pure(tx, args.addressIdsDelete, `vector<u16>`) ], }) }

export interface GetAddressGroupIdsArgs { book: TransactionObjectInput; addressId: number | TransactionArgument }

export function getAddressGroupIds( tx: Transaction, args: GetAddressGroupIdsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::get_address_group_ids`, arguments: [ obj(tx, args.book), pure(tx, args.addressId, `u16`) ], }) }

export interface GetEntryIdsByAddressArgs { book: TransactionObjectInput; addressRetrieve: TransactionObjectInput }

export function getEntryIdsByAddress( tx: Transaction, args: GetEntryIdsByAddressArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::get_entry_ids_by_address`, arguments: [ obj(tx, args.book), obj(tx, args.addressRetrieve) ], }) }

export function initAddressBook( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::init_address_book`, arguments: [ ], }) }

export interface IsAddressInAnyGroupArgs { book: TransactionObjectInput; addressId: number | TransactionArgument }

export function isAddressInAnyGroup( tx: Transaction, args: IsAddressInAnyGroupArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::address_book::is_address_in_any_group`, arguments: [ obj(tx, args.book), pure(tx, args.addressId, `u16`) ], }) }
