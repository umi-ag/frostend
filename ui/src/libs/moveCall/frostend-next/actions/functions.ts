import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init`, arguments: [ ], }) }

export interface WithdrawArgs { u64: bigint | TransactionArgument; bank: ObjectArg }

export function withdraw( txb: TransactionBlock, typeArg: Type, args: WithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::withdraw`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.bank) ], }) }

export interface DepositArgs { coin: ObjectArg; bank: ObjectArg }

export function deposit( txb: TransactionBlock, typeArg: Type, args: DepositArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::deposit`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.bank) ], }) }

export interface SwapSyToPtArgs { coin: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function swapSyToPt( txb: TransactionBlock, typeArg: Type, args: SwapSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_sy_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface SwapPtToSyArgs { coin: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function swapPtToSy( txb: TransactionBlock, typeArg: Type, args: SwapPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export function createBank( txb: TransactionBlock, typeArg: Type, root: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::create_bank`, typeArguments: [typeArg], arguments: [ obj(txb, root) ], }) }

export interface InitVaultArgs { u641: bigint | TransactionArgument; u642: bigint | TransactionArgument; coin: ObjectArg; u643: bigint | TransactionArgument; bank: ObjectArg }

export function initVault( txb: TransactionBlock, typeArg: Type, args: InitVaultArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init_vault`, typeArguments: [typeArg], arguments: [ pure(txb, args.u641, `u64`), pure(txb, args.u642, `u64`), obj(txb, args.coin), pure(txb, args.u643, `u64`), obj(txb, args.bank) ], }) }

export interface SwapSyToYtArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapSyToYt( txb: TransactionBlock, typeArg: Type, args: SwapSyToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::swap_sy_to_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface CoinYtToSyArgs { coin: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function coinYtToSy( txb: TransactionBlock, typeArg: Type, args: CoinYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::coin_yt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.coin), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }
