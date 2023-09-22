import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, unstsui: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::unstsui::init`, arguments: [ obj(txb, unstsui) ], }) }

export interface MintArgs { unstSuiTreasuryCap: ObjectArg; u641: bigint | TransactionArgument; u642: bigint | TransactionArgument }

export function mint( txb: TransactionBlock, args: MintArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::unstsui::mint`, arguments: [ obj(txb, args.unstSuiTreasuryCap), pure(txb, args.u641, `u64`), pure(txb, args.u642, `u64`) ], }) }

export interface BurnArgs { unstSuiTreasuryCap: ObjectArg; unstakeTicket: ObjectArg }

export function burn( txb: TransactionBlock, args: BurnArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::unstsui::burn`, arguments: [ obj(txb, args.unstSuiTreasuryCap), obj(txb, args.unstakeTicket) ], }) }
