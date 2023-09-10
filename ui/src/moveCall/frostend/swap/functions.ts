import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj} from "../../_framework/util";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::init`, arguments: [ ], }) }

export interface SwapSyToPtArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapSyToPt( txb: TransactionBlock, typeArg: Type, args: SwapSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_sy_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapPtToSyArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapPtToSy( txb: TransactionBlock, typeArg: Type, args: SwapPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapSyToYtArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapSyToYt( txb: TransactionBlock, typeArg: Type, args: SwapSyToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_sy_to_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapYtToSyArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapYtToSy( txb: TransactionBlock, typeArg: Type, args: SwapYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_yt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapPtToYtArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapPtToYt( txb: TransactionBlock, typeArg: Type, args: SwapPtToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_pt_to_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapYtToPtArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapYtToPt( txb: TransactionBlock, typeArg: Type, args: SwapYtToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::swap::swap_yt_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank) ], }) }
