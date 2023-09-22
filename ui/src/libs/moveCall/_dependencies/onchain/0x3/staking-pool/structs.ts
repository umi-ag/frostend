import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Option} from "../../0x1/option/structs";
import {Bag} from "../../0x2/bag/structs";
import {Balance} from "../../0x2/balance/structs";
import {ID, UID} from "../../0x2/object/structs";
import {Table} from "../../0x2/table/structs";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== StakingPool =============================== */

bcs.registerStructType( "0x3::staking_pool::StakingPool", {
id: `0x2::object::UID`,
activation_epoch: `0x1::option::Option<u64>`,
deactivation_epoch: `0x1::option::Option<u64>`,
sui_balance: `u64`,
rewards_pool: `0x2::balance::Balance<0x2::sui::SUI>`,
pool_token_balance: `u64`,
exchange_rates: `0x2::table::Table<u64, 0x3::staking_pool::PoolTokenExchangeRate>`,
pending_stake: `u64`,
pending_total_sui_withdraw: `u64`,
pending_pool_token_withdraw: `u64`,
extra_fields: `0x2::bag::Bag`,
} )

export function isStakingPool(type: Type): boolean { return type === "0x3::staking_pool::StakingPool"; }

export interface StakingPoolFields { id: string; activationEpoch: (bigint | null); deactivationEpoch: (bigint | null); suiBalance: bigint; rewardsPool: Balance; poolTokenBalance: bigint; exchangeRates: Table; pendingStake: bigint; pendingTotalSuiWithdraw: bigint; pendingPoolTokenWithdraw: bigint; extraFields: Bag }

export class StakingPool { static readonly $typeName = "0x3::staking_pool::StakingPool"; static readonly $numTypeParams = 0;

  readonly id: string; readonly activationEpoch: (bigint | null); readonly deactivationEpoch: (bigint | null); readonly suiBalance: bigint; readonly rewardsPool: Balance; readonly poolTokenBalance: bigint; readonly exchangeRates: Table; readonly pendingStake: bigint; readonly pendingTotalSuiWithdraw: bigint; readonly pendingPoolTokenWithdraw: bigint; readonly extraFields: Bag

 constructor( fields: StakingPoolFields, ) { this.id = fields.id; this.activationEpoch = fields.activationEpoch; this.deactivationEpoch = fields.deactivationEpoch; this.suiBalance = fields.suiBalance; this.rewardsPool = fields.rewardsPool; this.poolTokenBalance = fields.poolTokenBalance; this.exchangeRates = fields.exchangeRates; this.pendingStake = fields.pendingStake; this.pendingTotalSuiWithdraw = fields.pendingTotalSuiWithdraw; this.pendingPoolTokenWithdraw = fields.pendingPoolTokenWithdraw; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): StakingPool { return new StakingPool( { id: UID.fromFields(fields.id).id, activationEpoch: Option.fromFields<bigint>(`u64`, fields.activation_epoch).vec[0] || null, deactivationEpoch: Option.fromFields<bigint>(`u64`, fields.deactivation_epoch).vec[0] || null, suiBalance: BigInt(fields.sui_balance), rewardsPool: Balance.fromFields(`0x2::sui::SUI`, fields.rewards_pool), poolTokenBalance: BigInt(fields.pool_token_balance), exchangeRates: Table.fromFields([`u64`, `0x3::staking_pool::PoolTokenExchangeRate`], fields.exchange_rates), pendingStake: BigInt(fields.pending_stake), pendingTotalSuiWithdraw: BigInt(fields.pending_total_sui_withdraw), pendingPoolTokenWithdraw: BigInt(fields.pending_pool_token_withdraw), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): StakingPool { if (!isStakingPool(item.type)) { throw new Error("not a StakingPool type");

 } return new StakingPool( { id: item.fields.id.id, activationEpoch: item.fields.activation_epoch !== null ? Option.fromFieldsWithTypes<bigint>({ type: "0x1::option::Option<" + `u64` + ">", fields: { vec: [item.fields.activation_epoch] } }).vec[0] : null, deactivationEpoch: item.fields.deactivation_epoch !== null ? Option.fromFieldsWithTypes<bigint>({ type: "0x1::option::Option<" + `u64` + ">", fields: { vec: [item.fields.deactivation_epoch] } }).vec[0] : null, suiBalance: BigInt(item.fields.sui_balance), rewardsPool: new Balance( `0x2::sui::SUI`, BigInt(item.fields.rewards_pool) ), poolTokenBalance: BigInt(item.fields.pool_token_balance), exchangeRates: Table.fromFieldsWithTypes(item.fields.exchange_rates), pendingStake: BigInt(item.fields.pending_stake), pendingTotalSuiWithdraw: BigInt(item.fields.pending_total_sui_withdraw), pendingPoolTokenWithdraw: BigInt(item.fields.pending_pool_token_withdraw), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): StakingPool { return StakingPool.fromFields( bcs.de([StakingPool.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isStakingPool(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a StakingPool object`); } return StakingPool.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<StakingPool> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching StakingPool object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isStakingPool(res.data.content.type)) { throw new Error(`object at id ${id} is not a StakingPool object`); }
 return StakingPool.fromFieldsWithTypes(res.data.content); }

 }

/* ============================== PoolTokenExchangeRate =============================== */

bcs.registerStructType( "0x3::staking_pool::PoolTokenExchangeRate", {
sui_amount: `u64`,
pool_token_amount: `u64`,
} )

export function isPoolTokenExchangeRate(type: Type): boolean { return type === "0x3::staking_pool::PoolTokenExchangeRate"; }

export interface PoolTokenExchangeRateFields { suiAmount: bigint; poolTokenAmount: bigint }

export class PoolTokenExchangeRate { static readonly $typeName = "0x3::staking_pool::PoolTokenExchangeRate"; static readonly $numTypeParams = 0;

  readonly suiAmount: bigint; readonly poolTokenAmount: bigint

 constructor( fields: PoolTokenExchangeRateFields, ) { this.suiAmount = fields.suiAmount; this.poolTokenAmount = fields.poolTokenAmount; }

 static fromFields( fields: Record<string, any> ): PoolTokenExchangeRate { return new PoolTokenExchangeRate( { suiAmount: BigInt(fields.sui_amount), poolTokenAmount: BigInt(fields.pool_token_amount) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): PoolTokenExchangeRate { if (!isPoolTokenExchangeRate(item.type)) { throw new Error("not a PoolTokenExchangeRate type");

 } return new PoolTokenExchangeRate( { suiAmount: BigInt(item.fields.sui_amount), poolTokenAmount: BigInt(item.fields.pool_token_amount) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): PoolTokenExchangeRate { return PoolTokenExchangeRate.fromFields( bcs.de([PoolTokenExchangeRate.$typeName, ], data, encoding) ) }

 }

/* ============================== StakedSui =============================== */

bcs.registerStructType( "0x3::staking_pool::StakedSui", {
id: `0x2::object::UID`,
pool_id: `0x2::object::ID`,
stake_activation_epoch: `u64`,
principal: `0x2::balance::Balance<0x2::sui::SUI>`,
} )

export function isStakedSui(type: Type): boolean { return type === "0x3::staking_pool::StakedSui"; }

export interface StakedSuiFields { id: string; poolId: string; stakeActivationEpoch: bigint; principal: Balance }

export class StakedSui { static readonly $typeName = "0x3::staking_pool::StakedSui"; static readonly $numTypeParams = 0;

  readonly id: string; readonly poolId: string; readonly stakeActivationEpoch: bigint; readonly principal: Balance

 constructor( fields: StakedSuiFields, ) { this.id = fields.id; this.poolId = fields.poolId; this.stakeActivationEpoch = fields.stakeActivationEpoch; this.principal = fields.principal; }

 static fromFields( fields: Record<string, any> ): StakedSui { return new StakedSui( { id: UID.fromFields(fields.id).id, poolId: ID.fromFields(fields.pool_id).bytes, stakeActivationEpoch: BigInt(fields.stake_activation_epoch), principal: Balance.fromFields(`0x2::sui::SUI`, fields.principal) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): StakedSui { if (!isStakedSui(item.type)) { throw new Error("not a StakedSui type");

 } return new StakedSui( { id: item.fields.id.id, poolId: item.fields.pool_id, stakeActivationEpoch: BigInt(item.fields.stake_activation_epoch), principal: new Balance( `0x2::sui::SUI`, BigInt(item.fields.principal) ) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): StakedSui { return StakedSui.fromFields( bcs.de([StakedSui.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isStakedSui(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a StakedSui object`); } return StakedSui.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<StakedSui> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching StakedSui object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isStakedSui(res.data.content.type)) { throw new Error(`object at id ${id} is not a StakedSui object`); }
 return StakedSui.fromFieldsWithTypes(res.data.content); }

 }
