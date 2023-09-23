import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj} from "../../_framework/util";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export interface GetPricePtToSyArgs { vault: ObjectArg; clock: ObjectArg }

export function getPricePtToSy( txb: TransactionBlock, typeArg: Type, args: GetPricePtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::get_price_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface GetPriceYtToSyArgs { vault: ObjectArg; clock: ObjectArg }

export function getPriceYtToSy( txb: TransactionBlock, typeArg: Type, args: GetPriceYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::get_price_yt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface ComputeDeltaYArgs { fixedPoint641: ObjectArg; fixedPoint642: ObjectArg; fixedPoint643: ObjectArg; fixedPoint644: ObjectArg }

export function computeDeltaY( txb: TransactionBlock, args: ComputeDeltaYArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::compute_delta_y`, arguments: [ obj(txb, args.fixedPoint641), obj(txb, args.fixedPoint642), obj(txb, args.fixedPoint643), obj(txb, args.fixedPoint644) ], }) }

export interface SwapSyToPtArgs { balance: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function swapSyToPt( txb: TransactionBlock, typeArg: Type, args: SwapSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::swap_sy_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface SwapPtToSyArgs { balance: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function swapPtToSy( txb: TransactionBlock, typeArg: Type, args: SwapPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::swap_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.clock) ], }) }
