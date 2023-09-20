import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::init`, arguments: [ ], }) }

export interface StakeSuiToMintShasuiArgs { stakeProfile: ObjectArg; coin: ObjectArg; suiSystemState: ObjectArg; treasuryCap: ObjectArg; address: string | TransactionArgument }

export function stakeSuiToMintShasui( txb: TransactionBlock, args: StakeSuiToMintShasuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::stake_sui_to_mint_shasui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.suiSystemState), obj(txb, args.treasuryCap), pure(txb, args.address, `address`) ], }) }

export interface UnstakeSuiToBurnShasuiArgs { stakeProfile: ObjectArg; coin: ObjectArg; suiSystemState: ObjectArg; treasuryCap: ObjectArg }

export function unstakeSuiToBurnShasui( txb: TransactionBlock, args: UnstakeSuiToBurnShasuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::unstake_sui_to_burn_shasui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.suiSystemState), obj(txb, args.treasuryCap) ], }) }

export interface MintShasuiFromAmountSuiArgs { stakeProfile: ObjectArg; u64: bigint | TransactionArgument; treasuryCap: ObjectArg }

export function mintShasuiFromAmountSui( txb: TransactionBlock, args: MintShasuiFromAmountSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::mint_shasui_from_amount_sui`, arguments: [ obj(txb, args.stakeProfile), pure(txb, args.u64, `u64`), obj(txb, args.treasuryCap) ], }) }

export interface BurnShasuiIntoAmountSuiArgs { stakeProfile: ObjectArg; coin: ObjectArg; treasuryCap: ObjectArg }

export function burnShasuiIntoAmountSui( txb: TransactionBlock, args: BurnShasuiIntoAmountSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::burn_shasui_into_amount_sui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.treasuryCap) ], }) }

export interface ComputeAmountShasuiToMintArgs { stakeProfile: ObjectArg; u64: bigint | TransactionArgument; treasuryCap: ObjectArg }

export function computeAmountShasuiToMint( txb: TransactionBlock, args: ComputeAmountShasuiToMintArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::compute_amount_shasui_to_mint`, arguments: [ obj(txb, args.stakeProfile), pure(txb, args.u64, `u64`), obj(txb, args.treasuryCap) ], }) }

export interface ComputeAmountSuiToWithdrawArgs { stakeProfile: ObjectArg; coin: ObjectArg; treasuryCap: ObjectArg }

export function computeAmountSuiToWithdraw( txb: TransactionBlock, args: ComputeAmountSuiToWithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::sha_manager::compute_amount_sui_to_withdraw`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin), obj(txb, args.treasuryCap) ], }) }
