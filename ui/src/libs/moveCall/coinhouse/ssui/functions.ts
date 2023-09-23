import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, Type, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ssui: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ssui::init`, arguments: [ obj(txb, ssui) ], }) }

export interface TransferArgs { treasuryCap: ObjectArg; address: string | TransactionArgument }

export function transfer( txb: TransactionBlock, args: TransferArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ssui::transfer`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.address, `address`) ], }) }

export function new_( txb: TransactionBlock, typeArg: Type, t0: GenericArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ssui::new`, typeArguments: [typeArg], arguments: [ generic(txb, `${typeArg}`, t0) ], }) }

export function totalSupply( txb: TransactionBlock, treasuryCap: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ssui::total_supply`, arguments: [ obj(txb, treasuryCap) ], }) }

export interface MintArgs { treasuryCap: ObjectArg; u64: bigint | TransactionArgument }

export function mint( txb: TransactionBlock, args: MintArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ssui::mint`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.u64, `u64`) ], }) }

export interface BurnArgs { treasuryCap: ObjectArg; coin: ObjectArg }

export function burn( txb: TransactionBlock, args: BurnArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::ssui::burn`, arguments: [ obj(txb, args.treasuryCap), obj(txb, args.coin) ], }) }
