import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::init`, arguments: [ ], }) }

export function new_( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::new`, typeArguments: [typeArg], arguments: [ ], }) }

export function getTypeName( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::get_type_name`, typeArguments: [typeArg], arguments: [ ], }) }

export interface DepositSyArgs { balance: ObjectArg; vault: ObjectArg }

export function depositSy( txb: TransactionBlock, typeArg: Type, args: DepositSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::deposit_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface DepositPtArgs { balance: ObjectArg; vault: ObjectArg }

export function depositPt( txb: TransactionBlock, typeArg: Type, args: DepositPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::deposit_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface DepositYtArgs { balance: ObjectArg; vault: ObjectArg }

export function depositYt( txb: TransactionBlock, typeArg: Type, args: DepositYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::deposit_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault) ], }) }

export interface WithdrawSyArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function withdrawSy( txb: TransactionBlock, typeArg: Type, args: WithdrawSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_sy`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface WithdrawPtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function withdrawPt( txb: TransactionBlock, typeArg: Type, args: WithdrawPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_pt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface WithdrawYtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function withdrawYt( txb: TransactionBlock, typeArg: Type, args: WithdrawYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_yt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface MintPtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function mintPt( txb: TransactionBlock, typeArg: Type, args: MintPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::mint_pt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface BurnPtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function burnPt( txb: TransactionBlock, typeArg: Type, args: BurnPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::burn_pt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface MintPtAndYtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function mintPtAndYt( txb: TransactionBlock, typeArg: Type, args: MintPtAndYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::mint_pt_and_yt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export interface BurnPtAndYtArgs { u64: bigint | TransactionArgument; vault: ObjectArg }

export function burnPtAndYt( txb: TransactionBlock, typeArg: Type, args: BurnPtAndYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::burn_pt_and_yt`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault) ], }) }

export function allIsZero( txb: TransactionBlock, typeArg: Type, vault: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::vault::all_is_zero`, typeArguments: [typeArg], arguments: [ obj(txb, vault) ], }) }
