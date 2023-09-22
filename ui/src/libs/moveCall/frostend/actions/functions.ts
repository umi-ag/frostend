import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj} from "../../_framework/util";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init`, arguments: [ ], }) }

export interface SwapSyToPt_Args { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapSyToPt_( txb: TransactionBlock, typeArg: Type, args: SwapSyToPt_Args ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_sy_to_pt_`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapPtToSy_Args { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapPtToSy_( txb: TransactionBlock, typeArg: Type, args: SwapPtToSy_Args ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_pt_to_sy_`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapSyToYt_Args { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapSyToYt_( txb: TransactionBlock, typeArg: Type, args: SwapSyToYt_Args ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_sy_to_yt_`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapYtToSy_Args { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapYtToSy_( txb: TransactionBlock, typeArg: Type, args: SwapYtToSy_Args ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_yt_to_sy_`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapPtToYt_Args { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapPtToYt_( txb: TransactionBlock, typeArg: Type, args: SwapPtToYt_Args ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_pt_to_yt_`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface SwapYtToPt_Args { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg }

export function swapYtToPt_( txb: TransactionBlock, typeArg: Type, args: SwapYtToPt_Args ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_yt_to_pt_`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank) ], }) }
