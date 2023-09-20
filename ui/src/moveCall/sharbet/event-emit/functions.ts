import {PUBLISHED_AT} from "..";
import {pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function debug( txb: TransactionBlock, u64: bigint | TransactionArgument ) { return txb.moveCall({ target: `${PUBLISHED_AT}::event_emit::debug`, arguments: [ pure(txb, u64, `u64`) ], }) }

export function vec( txb: TransactionBlock, vecU64: Array<bigint | TransactionArgument> | TransactionArgument ) { return txb.moveCall({ target: `${PUBLISHED_AT}::event_emit::vec`, arguments: [ pure(txb, vecU64, `vector<u64>`) ], }) }
