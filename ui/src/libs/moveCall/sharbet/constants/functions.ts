import {PUBLISHED_AT} from "..";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export function oneSui( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::constants::ONE_SUI`, arguments: [ ], }) }

export function maxU64( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::constants::MAX_U64`, arguments: [ ], }) }
