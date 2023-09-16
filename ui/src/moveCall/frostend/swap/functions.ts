import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::init`, arguments: [ ], }) }

export interface SwapSyToPtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; clock: ObjectArg }

export function swapSyToPt( txb: TransactionBlock, typeArg: Type, args: SwapSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_sy_to_pt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface SwapPtToSyArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; clock: ObjectArg }

export function swapPtToSy( txb: TransactionBlock, typeArg: Type, args: SwapPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_pt_to_sy`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0xb9f67019f1b3a558086a1439f131f988be4e1d45fea98c4be82cbb42a6e32fed::vault::PTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface SwapSyToYtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapSyToYt( txb: TransactionBlock, typeArg: Type, args: SwapSyToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_sy_to_yt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface SwapYtToSyArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapYtToSy( txb: TransactionBlock, typeArg: Type, args: SwapYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_yt_to_sy`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0xb9f67019f1b3a558086a1439f131f988be4e1d45fea98c4be82cbb42a6e32fed::vault::YTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface SwapPtToYtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapPtToYt( txb: TransactionBlock, typeArg: Type, args: SwapPtToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_pt_to_yt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0xb9f67019f1b3a558086a1439f131f988be4e1d45fea98c4be82cbb42a6e32fed::vault::PTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface SwapYtToPtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapYtToPt( txb: TransactionBlock, typeArg: Type, args: SwapYtToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_yt_to_pt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0xb9f67019f1b3a558086a1439f131f988be4e1d45fea98c4be82cbb42a6e32fed::vault::YTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }
