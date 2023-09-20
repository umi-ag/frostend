import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj} from "../../_framework/util";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export interface AddArgs { transferPolicy: ObjectArg; transferPolicyCap: ObjectArg }

export function add( txb: TransactionBlock, typeArg: Type, args: AddArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::unstake_policy::add`, typeArguments: [typeArg], arguments: [ obj(txb, args.transferPolicy), obj(txb, args.transferPolicyCap) ], }) }

export interface ConfirmArgs { transferPolicy: ObjectArg; transferRequest: ObjectArg }

export function confirm( txb: TransactionBlock, typeArg: Type, args: ConfirmArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::unstake_policy::confirm`, typeArguments: [typeArg], arguments: [ obj(txb, args.transferPolicy), obj(txb, args.transferRequest) ], }) }
