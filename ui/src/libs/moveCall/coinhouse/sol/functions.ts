import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, Type, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, sol: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sol::init`, arguments: [ obj(txb, sol) ], }) }

export interface TransferArgs { treasuryCap: ObjectArg; address: string | TransactionArgument }

export function transfer( txb: TransactionBlock, args: TransferArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sol::transfer`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.address, `address`) ], }) }

export function new_( txb: TransactionBlock, typeArg: Type, t0: GenericArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sol::new`, typeArguments: [typeArg], arguments: [ generic(txb, `${typeArg}`, t0) ], }) }

export function totalSupply( txb: TransactionBlock, treasuryCap: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sol::total_supply`, arguments: [ obj(txb, treasuryCap) ], }) }

export interface MintArgs { treasuryCap: ObjectArg; u64: bigint | TransactionArgument }

export function mint( txb: TransactionBlock, args: MintArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sol::mint`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.u64, `u64`) ], }) }

export interface BurnArgs { treasuryCap: ObjectArg; coin: ObjectArg }

export function burn( txb: TransactionBlock, args: BurnArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sol::burn`, arguments: [ obj(txb, args.treasuryCap), obj(txb, args.coin) ], }) }
