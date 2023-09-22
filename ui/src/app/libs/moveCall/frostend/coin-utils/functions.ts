import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function mergeCoins( txb: TransactionBlock, typeArg: Type, vecCoin: Array<ObjectArg> | TransactionArgument ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_utils::merge_coins`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, vecCoin) ], }) }

export function returnRemainingCoin( txb: TransactionBlock, typeArg: Type, coin: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_utils::return_remaining_coin`, typeArguments: [typeArg], arguments: [ obj(txb, coin) ], }) }

export interface MaybeSplitCoinAndTransferRestArgs { coin: ObjectArg; u64: bigint | TransactionArgument; address: string | TransactionArgument }

export function maybeSplitCoinAndTransferRest( txb: TransactionBlock, typeArg: Type, args: MaybeSplitCoinAndTransferRestArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_utils::maybe_split_coin_and_transfer_rest`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), pure(txb, args.u64, `u64`), pure(txb, args.address, `address`) ], }) }

export interface MaybeSplitCoinsAndTransferRestArgs { vecCoin: Array<ObjectArg> | TransactionArgument; u64: bigint | TransactionArgument; address: string | TransactionArgument }

export function maybeSplitCoinsAndTransferRest( txb: TransactionBlock, typeArg: Type, args: MaybeSplitCoinsAndTransferRestArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_utils::maybe_split_coins_and_transfer_rest`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), pure(txb, args.u64, `u64`), pure(txb, args.address, `address`) ], }) }
