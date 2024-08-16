import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {pure} from "../../_framework/util";
import {Transaction, TransactionArgument} from "@mysten/sui/transactions";

export interface VerifySignatureEvmArgs { userAddress: Array<number | TransactionArgument> | TransactionArgument; initCapHolderAddressOpt: (string | TransactionArgument | TransactionArgument | null); approveCapHolderAddressOpt: (string | TransactionArgument | TransactionArgument | null); approveCapHolderPublicKeyOpt: (Array<number | TransactionArgument> | TransactionArgument | TransactionArgument | null); signature: Array<number | TransactionArgument> | TransactionArgument }

export function verifySignatureEvm( tx: Transaction, args: VerifySignatureEvmArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::registration::verify_signature_evm`, arguments: [ pure(tx, args.userAddress, `vector<u8>`), pure(tx, args.initCapHolderAddressOpt, `${Option.$typeName}<address>`), pure(tx, args.approveCapHolderAddressOpt, `${Option.$typeName}<address>`), pure(tx, args.approveCapHolderPublicKeyOpt, `${Option.$typeName}<vector<u8>>`), pure(tx, args.signature, `vector<u8>`) ], }) }
