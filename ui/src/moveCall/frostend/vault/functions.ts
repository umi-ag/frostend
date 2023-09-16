import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface NewArgs { u641: bigint | TransactionArgument; u642: bigint | TransactionArgument }

export function new_( txb: TransactionBlock, typeArg: Type, args: NewArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::new`, typeArguments: [typeArg], arguments: [ pure(txb, args.u641, `u64`), pure(txb, args.u642, `u64`) ], }) }

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::init`, arguments: [ ], }) }

export function getTypeName( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::get_type_name`, typeArguments: [typeArg], arguments: [ ], }) }

export interface DepositSyArgs { balance: ObjectArg; vault: ObjectArg }

export function depositSy( txb: TransactionBlock, typeArg: Type, args: DepositSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::deposit_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface WithdrawSyArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function withdrawSy( txb: TransactionBlock, typeArg: Type, args: WithdrawSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_sy`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export function coinSyReserve( txb: TransactionBlock, typeArg: Type, vault: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::coin_sy_reserve`, typeArguments: [typeArg], arguments: [ obj(txb, vault) ], }) }

export function coinPtReserve( txb: TransactionBlock, typeArg: Type, vault: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::coin_pt_reserve`, typeArguments: [typeArg], arguments: [ obj(txb, vault) ], }) }

export interface GetTimeToMaturityArgs { vault: ObjectArg; clock: ObjectArg }

export function getTimeToMaturity( txb: TransactionBlock, typeArg: Type, args: GetTimeToMaturityArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::get_time_to_maturity`, typeArguments: [typeArg], arguments: [ obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface DepositPtArgs { balance: ObjectArg; vault: ObjectArg }

export function depositPt( txb: TransactionBlock, typeArg: Type, args: DepositPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::deposit_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface DepositYtArgs { balance: ObjectArg; vault: ObjectArg }

export function depositYt( txb: TransactionBlock, typeArg: Type, args: DepositYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::deposit_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface WithdrawPtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function withdrawPt( txb: TransactionBlock, typeArg: Type, args: WithdrawPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_pt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface WithdrawYtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function withdrawYt( txb: TransactionBlock, typeArg: Type, args: WithdrawYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_yt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface MintPtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function mintPt( txb: TransactionBlock, typeArg: Type, args: MintPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::mint_pt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface BurnPtArgs { balance: ObjectArg; vault: ObjectArg }

export function burnPt( txb: TransactionBlock, typeArg: Type, args: BurnPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::burn_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface MintYtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function mintYt( txb: TransactionBlock, typeArg: Type, args: MintYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::mint_yt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface BurnYtArgs { balance: ObjectArg; vault: ObjectArg }

export function burnYt( txb: TransactionBlock, typeArg: Type, args: BurnYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::burn_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface MintPtAndYtArgs { balance: ObjectArg; vault: ObjectArg }

export function mintPtAndYt( txb: TransactionBlock, typeArg: Type, args: MintPtAndYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::mint_pt_and_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface BurnPtAndYtArgs { balance1: ObjectArg; balance2: ObjectArg; vault: ObjectArg }

export function burnPtAndYt( txb: TransactionBlock, typeArg: Type, args: BurnPtAndYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::burn_pt_and_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance1), obj(txb, args.balance2), obj(txb, args.vault) ], }) }

export function allIsZero( txb: TransactionBlock, typeArg: Type, vault: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::all_is_zero`, typeArguments: [typeArg], arguments: [ obj(txb, vault) ], }) }
