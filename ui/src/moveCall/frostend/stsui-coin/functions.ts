import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface TransferArgs { treasuryCap: ObjectArg; address: string | TransactionArgument }

export function transfer( txb: TransactionBlock, args: TransferArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::transfer`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.address, `address`) ], }) }

export interface MintArgs { treasuryCap: ObjectArg; u64: bigint | TransactionArgument }

export function mint( txb: TransactionBlock, args: MintArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::mint`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.u64, `u64`) ], }) }

export function init( txb: TransactionBlock, stsuiCoin: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::init`, arguments: [ obj(txb, stsuiCoin) ], }) }
