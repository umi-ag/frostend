import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj} from "../../_framework/util";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::init`, arguments: [ ], }) }

export interface GetPricePtToSyArgs { vault: ObjectArg; clock: ObjectArg }

export function getPricePtToSy( txb: TransactionBlock, typeArg: Type, args: GetPricePtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::get_price_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface GetPriceYtToSyArgs { vault: ObjectArg; clock: ObjectArg }

export function getPriceYtToSy( txb: TransactionBlock, typeArg: Type, args: GetPriceYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::get_price_yt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface ComputeDeltaYArgs { fixedPoint321: ObjectArg; fixedPoint322: ObjectArg; fixedPoint323: ObjectArg; fixedPoint324: ObjectArg }

export function computeDeltaY( txb: TransactionBlock, args: ComputeDeltaYArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::compute_delta_y`, arguments: [ obj(txb, args.fixedPoint321), obj(txb, args.fixedPoint322), obj(txb, args.fixedPoint323), obj(txb, args.fixedPoint324) ], }) }

export interface SwapSyToPtArgs { balance: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function swapSyToPt( txb: TransactionBlock, typeArg: Type, args: SwapSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::swap_sy_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface SwapPtToSyArgs { balance: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function swapPtToSy( txb: TransactionBlock, typeArg: Type, args: SwapPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::pt_amm::swap_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.clock) ], }) }
