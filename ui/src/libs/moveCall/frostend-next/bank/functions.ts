import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::init`, arguments: [ ], }) }

export function new_( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::new`, typeArguments: [typeArg], arguments: [ ], }) }

export function getTypeName( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::get_type_name`, typeArguments: [typeArg], arguments: [ ], }) }

export interface DepositSyArgs { balance: ObjectArg; bank: ObjectArg }

export function depositSy( txb: TransactionBlock, typeArg: Type, args: DepositSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::deposit_sy`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.bank) ], }) }

export interface WithdrawSyArgs { u64: bigint | TransactionArgument; bank: ObjectArg }

export function withdrawSy( txb: TransactionBlock, typeArg: Type, args: WithdrawSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::withdraw_sy`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.bank) ], }) }
