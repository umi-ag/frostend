import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::init`, arguments: [ ], }) }

export interface RequestWithdrawStakeArgs { suiSystemState: ObjectArg; vecStakedSui: Array<ObjectArg> | TransactionArgument }

export function requestWithdrawStake( txb: TransactionBlock, args: RequestWithdrawStakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::request_withdraw_stake`, arguments: [ obj(txb, args.suiSystemState), vector(txb, `0x3::staking_pool::StakedSui`, args.vecStakedSui) ], }) }

export function amountStakedSui( txb: TransactionBlock, stakeProfile: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::amount_staked_sui`, arguments: [ obj(txb, stakeProfile) ], }) }

export function amountRewardSui( txb: TransactionBlock, stakeProfile: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::amount_reward_sui`, arguments: [ obj(txb, stakeProfile) ], }) }

export function amountPendingSui( txb: TransactionBlock, stakeProfile: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::amount_pending_sui`, arguments: [ obj(txb, stakeProfile) ], }) }

export interface DepositSuiArgs { stakeProfile: ObjectArg; coin: ObjectArg }

export function depositSui( txb: TransactionBlock, args: DepositSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::deposit_sui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.coin) ], }) }

export interface WithdrawSuiArgs { stakeProfile: ObjectArg; u64: bigint | TransactionArgument }

export function withdrawSui( txb: TransactionBlock, args: WithdrawSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::withdraw_sui`, arguments: [ obj(txb, args.stakeProfile), pure(txb, args.u64, `u64`) ], }) }

export interface WithdrawStakedsuiArgs { stakeProfile: ObjectArg; u64: bigint | TransactionArgument }

export function withdrawStakedsui( txb: TransactionBlock, args: WithdrawStakedsuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::withdraw_stakedsui`, arguments: [ obj(txb, args.stakeProfile), pure(txb, args.u64, `u64`) ], }) }

export interface StakeSuiArgs { stakeProfile: ObjectArg; suiSystemState: ObjectArg; address: string | TransactionArgument }

export function stakeSui( txb: TransactionBlock, args: StakeSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::stake_sui`, arguments: [ obj(txb, args.stakeProfile), obj(txb, args.suiSystemState), pure(txb, args.address, `address`) ], }) }

export interface UnstakeSuiArgs { stakeProfile: ObjectArg; u64: bigint | TransactionArgument; suiSystemState: ObjectArg }

export function unstakeSui( txb: TransactionBlock, args: UnstakeSuiArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::unstake_sui`, arguments: [ obj(txb, args.stakeProfile), pure(txb, args.u64, `u64`), obj(txb, args.suiSystemState) ], }) }

export interface UnstakeSuiFromStakedsuiListArgs { stakeProfile: ObjectArg; vecStakedSui: Array<ObjectArg> | TransactionArgument; suiSystemState: ObjectArg }

export function unstakeSuiFromStakedsuiList( txb: TransactionBlock, args: UnstakeSuiFromStakedsuiListArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::unstake_sui_from_stakedsui_list`, arguments: [ obj(txb, args.stakeProfile), vector(txb, `0x3::staking_pool::StakedSui`, args.vecStakedSui), obj(txb, args.suiSystemState) ], }) }

export interface RequestAddStakeFromBalanceArgs { suiSystemState: ObjectArg; address: string | TransactionArgument; balance: ObjectArg }

export function requestAddStakeFromBalance( txb: TransactionBlock, args: RequestAddStakeFromBalanceArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::stake_manager::request_add_stake_from_balance`, arguments: [ obj(txb, args.suiSystemState), pure(txb, args.address, `address`), obj(txb, args.balance) ], }) }
