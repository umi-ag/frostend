import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sys_manager::init`, arguments: [ ], }) }

export interface InitVaultArgs { u641: bigint | TransactionArgument; u642: bigint | TransactionArgument; balance: ObjectArg; u643: bigint | TransactionArgument; bank: ObjectArg }

export function initVault( txb: TransactionBlock, typeArg: Type, args: InitVaultArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sys_manager::init_vault`, typeArguments: [typeArg], arguments: [ pure(txb, args.u641, `u64`), pure(txb, args.u642, `u64`), obj(txb, args.balance), pure(txb, args.u643, `u64`), obj(txb, args.bank) ], }) }

export interface SwapSyToYtArgs { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapSyToYt( txb: TransactionBlock, typeArg: Type, args: SwapSyToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sys_manager::swap_sy_to_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface SwapYtToSyArgs { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function swapYtToSy( txb: TransactionBlock, typeArg: Type, args: SwapYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sys_manager::swap_yt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }
