import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init`, arguments: [ ], }) }

export interface StakeArgs { suiSystemState: ObjectArg; address: string | TransactionArgument; stakeProfile: ObjectArg; treasuryCap: ObjectArg; coin: ObjectArg }

export function stake( txb: TransactionBlock, args: StakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::stake`, arguments: [ obj(txb, args.suiSystemState), pure(txb, args.address, `address`), obj(txb, args.stakeProfile), obj(txb, args.treasuryCap), obj(txb, args.coin) ], }) }

export interface UnstakeArgs { stakeProfile: ObjectArg; coin: ObjectArg; suiSystemState: ObjectArg; treasuryCap: ObjectArg }

export function unstake( txb: TransactionBlock, args: UnstakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::unstake`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.suiSystemState), obj(txb, args.treasuryCap) ], }) }
