import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::init`, arguments: [ ], }) }

export interface SwapSyToPtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function swapSyToPt( txb: TransactionBlock, typeArg: Type, args: SwapSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_sy_to_pt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapPtToSyArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function swapPtToSy( txb: TransactionBlock, typeArg: Type, args: SwapPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_pt_to_sy`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0x165eacd90f3bfa192ccbe0fbd512898ea5db088220e3401e213514ec1d21d400::vault::PTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapSyToYtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function swapSyToYt( txb: TransactionBlock, typeArg: Type, args: SwapSyToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_sy_to_yt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapYtToSyArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function swapYtToSy( txb: TransactionBlock, typeArg: Type, args: SwapYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_yt_to_sy`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0x165eacd90f3bfa192ccbe0fbd512898ea5db088220e3401e213514ec1d21d400::vault::YTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapPtToYtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function swapPtToYt( txb: TransactionBlock, typeArg: Type, args: SwapPtToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_pt_to_yt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0x165eacd90f3bfa192ccbe0fbd512898ea5db088220e3401e213514ec1d21d400::vault::PTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapYtToPtArgs { vecCoin: Array<ObjectArg> | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function swapYtToPt( txb: TransactionBlock, typeArg: Type, args: SwapYtToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_yt_to_pt`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<0x165eacd90f3bfa192ccbe0fbd512898ea5db088220e3401e213514ec1d21d400::vault::YTCoin<${typeArg}>>`, args.vecCoin), obj(txb, args.vault), obj(txb, args.bank) ], }) }
