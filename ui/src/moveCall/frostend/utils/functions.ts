import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function mergeCoins( txb: TransactionBlock, typeArg: Type, vecCoin: Array<ObjectArg> | TransactionArgument ) { return txb.moveCall({ target: `${PUBLISHED_AT}::utils::merge_coins`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, vecCoin) ], }) }

export function returnRemainingCoin( txb: TransactionBlock, typeArg: Type, coin: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::utils::return_remaining_coin`, typeArguments: [typeArg], arguments: [ obj(txb, coin) ], }) }
