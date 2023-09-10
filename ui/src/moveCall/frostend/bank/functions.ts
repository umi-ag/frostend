import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function new_( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::new`, typeArguments: [typeArg], arguments: [ ], }) }

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::init`, arguments: [ ], }) }

export function getTypeName( txb: TransactionBlock, typeArg: Type, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::get_type_name`, typeArguments: [typeArg], arguments: [ ], }) }

export interface BorrowSyArgs { u64: bigint | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function borrowSy( txb: TransactionBlock, typeArg: Type, args: BorrowSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::borrow_sy`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault), obj(txb, args.bank) ], }) }

export interface PaybackSyArgs { u64: bigint | TransactionArgument; vault: ObjectArg; bank: ObjectArg }

export function paybackSy( txb: TransactionBlock, typeArg: Type, args: PaybackSyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::bank::payback_sy`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.vault), obj(txb, args.bank) ], }) }
