import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init`, arguments: [ ], }) }

export interface WithdrawArgs { u64: bigint | TransactionArgument; bank: ObjectArg }

export function withdraw( txb: TransactionBlock, typeArg: Type, args: WithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::withdraw`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.bank) ], }) }

export interface DepositArgs { balance: ObjectArg; bank: ObjectArg }

export function deposit( txb: TransactionBlock, typeArg: Type, args: DepositArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::deposit`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.bank) ], }) }

export function createBank( txb: TransactionBlock, typeArg: Type, root: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::create_bank`, typeArguments: [typeArg], arguments: [ obj(txb, root) ], }) }

export interface InitVaultArgs { u641: bigint | TransactionArgument; u642: bigint | TransactionArgument; vecCoin: Array<ObjectArg> | TransactionArgument; u643: bigint | TransactionArgument; bank: ObjectArg }

export function initVault( txb: TransactionBlock, typeArg: Type, args: InitVaultArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init_vault`, typeArguments: [typeArg], arguments: [ pure(txb, args.u641, `u64`), pure(txb, args.u642, `u64`), vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), pure(txb, args.u643, `u64`), obj(txb, args.bank) ], }) }

export interface DepositCoinsArgs { vecCoin: Array<ObjectArg> | TransactionArgument; bank: ObjectArg }

export function depositCoins( txb: TransactionBlock, typeArg: Type, args: DepositCoinsArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::deposit_coins`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, args.vecCoin), obj(txb, args.bank) ], }) }

export interface ConvertSyToPtArgs { balance: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function convertSyToPt( txb: TransactionBlock, typeArg: Type, args: ConvertSyToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::convert_sy_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface ConvertPtToSyArgs { balance: ObjectArg; vault: ObjectArg; clock: ObjectArg }

export function convertPtToSy( txb: TransactionBlock, typeArg: Type, args: ConvertPtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::convert_pt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.clock) ], }) }

export interface ConvertSyToYtArgs { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function convertSyToYt( txb: TransactionBlock, typeArg: Type, args: ConvertSyToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::convert_sy_to_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface ConvertYtToSyArgs { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function convertYtToSy( txb: TransactionBlock, typeArg: Type, args: ConvertYtToSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::convert_yt_to_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface ConvertPtToYtArgs { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function convertPtToYt( txb: TransactionBlock, typeArg: Type, args: ConvertPtToYtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::convert_pt_to_yt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }

export interface ConvertYtToPtArgs { balance: ObjectArg; vault: ObjectArg; bank: ObjectArg; clock: ObjectArg }

export function convertYtToPt( txb: TransactionBlock, typeArg: Type, args: ConvertYtToPtArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::convert_yt_to_pt`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.vault), obj(txb, args.bank), obj(txb, args.clock) ], }) }
