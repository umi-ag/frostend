import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ctoken::init`, arguments: [ ], }) }

export interface WithdrawArgs { u64: bigint | TransactionArgument; bank: ObjectArg }

export function withdraw( txb: TransactionBlock, typeArg: Type, args: WithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ctoken::withdraw`, typeArguments: [typeArg], arguments: [ pure(txb, args.u64, `u64`), obj(txb, args.bank) ], }) }

export interface DepositArgs { balance: ObjectArg; bank: ObjectArg }

export function deposit( txb: TransactionBlock, typeArg: Type, args: DepositArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ctoken::deposit`, typeArguments: [typeArg], arguments: [ obj(txb, args.balance), obj(txb, args.bank) ], }) }
