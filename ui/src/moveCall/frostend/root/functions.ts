import {PUBLISHED_AT} from "..";
import {ObjectArg, Type, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function new_( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::root::new`, arguments: [ ], }) }

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::root::init`, arguments: [ ], }) }

export function bankExists( txb: TransactionBlock, typeArg: Type, root: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::root::bank_exists`, typeArguments: [typeArg], arguments: [ obj(txb, root) ], }) }

export function createBank( txb: TransactionBlock, typeArg: Type, root: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::root::create_bank`, typeArguments: [typeArg], arguments: [ obj(txb, root) ], }) }

export interface CreateVaultArgs { u641: bigint | TransactionArgument; u642: bigint | TransactionArgument }

export function createVault( txb: TransactionBlock, typeArg: Type, args: CreateVaultArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::root::create_vault`, typeArguments: [typeArg], arguments: [ pure(txb, args.u641, `u64`), pure(txb, args.u642, `u64`) ], }) }
