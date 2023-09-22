import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, Type, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, stsuiCoin: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::init`, arguments: [ obj(txb, stsuiCoin) ], }) }

export interface TransferArgs { treasuryCap: ObjectArg; address: string | TransactionArgument }

export function transfer( txb: TransactionBlock, args: TransferArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::transfer`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.address, `address`) ], }) }

export function new_( txb: TransactionBlock, typeArg: Type, t0: GenericArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::new`, typeArguments: [typeArg], arguments: [ generic(txb, `${typeArg}`, t0) ], }) }

export interface MintArgs { treasuryCap: ObjectArg; u64: bigint | TransactionArgument }

export function mint( txb: TransactionBlock, args: MintArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::mint`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.u64, `u64`) ], }) }

export interface MintToArgs { treasuryCap: ObjectArg; u64: bigint | TransactionArgument }

export function mintTo( txb: TransactionBlock, args: MintToArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stsui_coin::mint_to`, arguments: [ obj(txb, args.treasuryCap), pure(txb, args.u64, `u64`) ], }) }
