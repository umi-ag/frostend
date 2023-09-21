import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::init`, arguments: [ ], }) }

export interface StakeSuiToMintShasuiArgs { suiSystemState: ObjectArg; address: string | TransactionArgument; stakeProfile: ObjectArg; treasuryCap: ObjectArg; coin: ObjectArg }

export function stakeSuiToMintShasui( txb: TransactionBlock, args: StakeSuiToMintShasuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::stake_sui_to_mint_shasui`, arguments: [ obj(txb, args.suiSystemState), pure(txb, args.address, `address`), obj(txb, args.stakeProfile), obj(txb, args.treasuryCap), obj(txb, args.coin) ], }) }

export interface UnstakeSuiToBurnShasuiArgs { stakeProfile: ObjectArg; coin: ObjectArg; suiSystemState: ObjectArg; treasuryCap: ObjectArg }

export function unstakeSuiToBurnShasui( txb: TransactionBlock, args: UnstakeSuiToBurnShasuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::unstake_sui_to_burn_shasui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.suiSystemState), obj(txb, args.treasuryCap) ], }) }
