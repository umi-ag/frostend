import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface StakeSuiToMintShasuiArgs { stakeProfile: ObjectArg; coin: ObjectArg; suiSystemState: ObjectArg; treasuryCap: ObjectArg; address: string | TransactionArgument }

export function stakeSuiToMintShasui( txb: TransactionBlock, args: StakeSuiToMintShasuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::stake_sui_to_mint_shasui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.suiSystemState), obj(txb, args.treasuryCap), pure(txb, args.address, `address`) ], }) }

export interface BurnShasuiToMintUnstsuiArgs { stakeProfile: ObjectArg; coin: ObjectArg; treasuryCap: ObjectArg; unstSuiTreasuryCap: ObjectArg }

export function burnShasuiToMintUnstsui( txb: TransactionBlock, args: BurnShasuiToMintUnstsuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::burn_shasui_to_mint_unstsui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.treasuryCap), obj(txb, args.unstSuiTreasuryCap) ], }) }

export interface BurnUnstsuiToUnstakeSuiArgs { stakeProfile: ObjectArg; unstakeTicket: ObjectArg; suiSystemState: ObjectArg; unstSuiTreasuryCap: ObjectArg }

export function burnUnstsuiToUnstakeSui( txb: TransactionBlock, args: BurnUnstsuiToUnstakeSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::actions::burn_unstsui_to_unstake_sui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.unstakeTicket), obj(txb, args.suiSystemState), obj(txb, args.unstSuiTreasuryCap) ], }) }
