import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Bag} from "../../0x2/bag/structs";
import {ID} from "../../0x2/object/structs";
import {TableVec} from "../../0x2/table-vec/structs";
import {Table} from "../../0x2/table/structs";
import {VecMap} from "../../0x2/vec-map/structs";
import {PoolTokenExchangeRate} from "../staking-pool/structs";
import {Validator} from "../validator/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== ValidatorSet =============================== */

bcs.registerStructType( "0x3::validator_set::ValidatorSet", {
total_stake: `u64`,
active_validators: `vector<0x3::validator::Validator>`,
pending_active_validators: `0x2::table_vec::TableVec<0x3::validator::Validator>`,
pending_removals: `vector<u64>`,
staking_pool_mappings: `0x2::table::Table<0x2::object::ID, address>`,
inactive_validators: `0x2::table::Table<0x2::object::ID, 0x3::validator_wrapper::ValidatorWrapper>`,
validator_candidates: `0x2::table::Table<address, 0x3::validator_wrapper::ValidatorWrapper>`,
at_risk_validators: `0x2::vec_map::VecMap<address, u64>`,
extra_fields: `0x2::bag::Bag`,
} )

export function isValidatorSet(type: Type): boolean { return type === "0x3::validator_set::ValidatorSet"; }

export interface ValidatorSetFields { totalStake: bigint; activeValidators: Array<Validator>; pendingActiveValidators: TableVec; pendingRemovals: Array<bigint>; stakingPoolMappings: Table; inactiveValidators: Table; validatorCandidates: Table; atRiskValidators: VecMap<string, bigint>; extraFields: Bag }

export class ValidatorSet { static readonly $typeName = "0x3::validator_set::ValidatorSet"; static readonly $numTypeParams = 0;

  readonly totalStake: bigint; readonly activeValidators: Array<Validator>; readonly pendingActiveValidators: TableVec; readonly pendingRemovals: Array<bigint>; readonly stakingPoolMappings: Table; readonly inactiveValidators: Table; readonly validatorCandidates: Table; readonly atRiskValidators: VecMap<string, bigint>; readonly extraFields: Bag

 constructor( fields: ValidatorSetFields, ) { this.totalStake = fields.totalStake; this.activeValidators = fields.activeValidators; this.pendingActiveValidators = fields.pendingActiveValidators; this.pendingRemovals = fields.pendingRemovals; this.stakingPoolMappings = fields.stakingPoolMappings; this.inactiveValidators = fields.inactiveValidators; this.validatorCandidates = fields.validatorCandidates; this.atRiskValidators = fields.atRiskValidators; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): ValidatorSet { return new ValidatorSet( { totalStake: BigInt(fields.total_stake), activeValidators: fields.active_validators.map((item: any) => Validator.fromFields(item)), pendingActiveValidators: TableVec.fromFields(`0x3::validator::Validator`, fields.pending_active_validators), pendingRemovals: fields.pending_removals.map((item: any) => BigInt(item)), stakingPoolMappings: Table.fromFields([`0x2::object::ID`, `address`], fields.staking_pool_mappings), inactiveValidators: Table.fromFields([`0x2::object::ID`, `0x3::validator_wrapper::ValidatorWrapper`], fields.inactive_validators), validatorCandidates: Table.fromFields([`address`, `0x3::validator_wrapper::ValidatorWrapper`], fields.validator_candidates), atRiskValidators: VecMap.fromFields<string, bigint>([`address`, `u64`], fields.at_risk_validators), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorSet { if (!isValidatorSet(item.type)) { throw new Error("not a ValidatorSet type");

 } return new ValidatorSet( { totalStake: BigInt(item.fields.total_stake), activeValidators: item.fields.active_validators.map((item: any) => Validator.fromFieldsWithTypes(item)), pendingActiveValidators: TableVec.fromFieldsWithTypes(item.fields.pending_active_validators), pendingRemovals: item.fields.pending_removals.map((item: any) => BigInt(item)), stakingPoolMappings: Table.fromFieldsWithTypes(item.fields.staking_pool_mappings), inactiveValidators: Table.fromFieldsWithTypes(item.fields.inactive_validators), validatorCandidates: Table.fromFieldsWithTypes(item.fields.validator_candidates), atRiskValidators: VecMap.fromFieldsWithTypes<string, bigint>(item.fields.at_risk_validators), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorSet { return ValidatorSet.fromFields( bcs.de([ValidatorSet.$typeName, ], data, encoding) ) }

 }

/* ============================== ValidatorEpochInfoEvent =============================== */

bcs.registerStructType( "0x3::validator_set::ValidatorEpochInfoEvent", {
epoch: `u64`,
validator_address: `address`,
reference_gas_survey_quote: `u64`,
stake: `u64`,
commission_rate: `u64`,
pool_staking_reward: `u64`,
storage_fund_staking_reward: `u64`,
pool_token_exchange_rate: `0x3::staking_pool::PoolTokenExchangeRate`,
tallying_rule_reporters: `vector<address>`,
tallying_rule_global_score: `u64`,
} )

export function isValidatorEpochInfoEvent(type: Type): boolean { return type === "0x3::validator_set::ValidatorEpochInfoEvent"; }

export interface ValidatorEpochInfoEventFields { epoch: bigint; validatorAddress: string; referenceGasSurveyQuote: bigint; stake: bigint; commissionRate: bigint; poolStakingReward: bigint; storageFundStakingReward: bigint; poolTokenExchangeRate: PoolTokenExchangeRate; tallyingRuleReporters: Array<string>; tallyingRuleGlobalScore: bigint }

export class ValidatorEpochInfoEvent { static readonly $typeName = "0x3::validator_set::ValidatorEpochInfoEvent"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly validatorAddress: string; readonly referenceGasSurveyQuote: bigint; readonly stake: bigint; readonly commissionRate: bigint; readonly poolStakingReward: bigint; readonly storageFundStakingReward: bigint; readonly poolTokenExchangeRate: PoolTokenExchangeRate; readonly tallyingRuleReporters: Array<string>; readonly tallyingRuleGlobalScore: bigint

 constructor( fields: ValidatorEpochInfoEventFields, ) { this.epoch = fields.epoch; this.validatorAddress = fields.validatorAddress; this.referenceGasSurveyQuote = fields.referenceGasSurveyQuote; this.stake = fields.stake; this.commissionRate = fields.commissionRate; this.poolStakingReward = fields.poolStakingReward; this.storageFundStakingReward = fields.storageFundStakingReward; this.poolTokenExchangeRate = fields.poolTokenExchangeRate; this.tallyingRuleReporters = fields.tallyingRuleReporters; this.tallyingRuleGlobalScore = fields.tallyingRuleGlobalScore; }

 static fromFields( fields: Record<string, any> ): ValidatorEpochInfoEvent { return new ValidatorEpochInfoEvent( { epoch: BigInt(fields.epoch), validatorAddress: `0x${fields.validator_address}`, referenceGasSurveyQuote: BigInt(fields.reference_gas_survey_quote), stake: BigInt(fields.stake), commissionRate: BigInt(fields.commission_rate), poolStakingReward: BigInt(fields.pool_staking_reward), storageFundStakingReward: BigInt(fields.storage_fund_staking_reward), poolTokenExchangeRate: PoolTokenExchangeRate.fromFields(fields.pool_token_exchange_rate), tallyingRuleReporters: fields.tallying_rule_reporters.map((item: any) => `0x${item}`), tallyingRuleGlobalScore: BigInt(fields.tallying_rule_global_score) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorEpochInfoEvent { if (!isValidatorEpochInfoEvent(item.type)) { throw new Error("not a ValidatorEpochInfoEvent type");

 } return new ValidatorEpochInfoEvent( { epoch: BigInt(item.fields.epoch), validatorAddress: `0x${item.fields.validator_address}`, referenceGasSurveyQuote: BigInt(item.fields.reference_gas_survey_quote), stake: BigInt(item.fields.stake), commissionRate: BigInt(item.fields.commission_rate), poolStakingReward: BigInt(item.fields.pool_staking_reward), storageFundStakingReward: BigInt(item.fields.storage_fund_staking_reward), poolTokenExchangeRate: PoolTokenExchangeRate.fromFieldsWithTypes(item.fields.pool_token_exchange_rate), tallyingRuleReporters: item.fields.tallying_rule_reporters.map((item: any) => `0x${item}`), tallyingRuleGlobalScore: BigInt(item.fields.tallying_rule_global_score) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorEpochInfoEvent { return ValidatorEpochInfoEvent.fromFields( bcs.de([ValidatorEpochInfoEvent.$typeName, ], data, encoding) ) }

 }

/* ============================== ValidatorEpochInfoEventV2 =============================== */

bcs.registerStructType( "0x3::validator_set::ValidatorEpochInfoEventV2", {
epoch: `u64`,
validator_address: `address`,
reference_gas_survey_quote: `u64`,
stake: `u64`,
voting_power: `u64`,
commission_rate: `u64`,
pool_staking_reward: `u64`,
storage_fund_staking_reward: `u64`,
pool_token_exchange_rate: `0x3::staking_pool::PoolTokenExchangeRate`,
tallying_rule_reporters: `vector<address>`,
tallying_rule_global_score: `u64`,
} )

export function isValidatorEpochInfoEventV2(type: Type): boolean { return type === "0x3::validator_set::ValidatorEpochInfoEventV2"; }

export interface ValidatorEpochInfoEventV2Fields { epoch: bigint; validatorAddress: string; referenceGasSurveyQuote: bigint; stake: bigint; votingPower: bigint; commissionRate: bigint; poolStakingReward: bigint; storageFundStakingReward: bigint; poolTokenExchangeRate: PoolTokenExchangeRate; tallyingRuleReporters: Array<string>; tallyingRuleGlobalScore: bigint }

export class ValidatorEpochInfoEventV2 { static readonly $typeName = "0x3::validator_set::ValidatorEpochInfoEventV2"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly validatorAddress: string; readonly referenceGasSurveyQuote: bigint; readonly stake: bigint; readonly votingPower: bigint; readonly commissionRate: bigint; readonly poolStakingReward: bigint; readonly storageFundStakingReward: bigint; readonly poolTokenExchangeRate: PoolTokenExchangeRate; readonly tallyingRuleReporters: Array<string>; readonly tallyingRuleGlobalScore: bigint

 constructor( fields: ValidatorEpochInfoEventV2Fields, ) { this.epoch = fields.epoch; this.validatorAddress = fields.validatorAddress; this.referenceGasSurveyQuote = fields.referenceGasSurveyQuote; this.stake = fields.stake; this.votingPower = fields.votingPower; this.commissionRate = fields.commissionRate; this.poolStakingReward = fields.poolStakingReward; this.storageFundStakingReward = fields.storageFundStakingReward; this.poolTokenExchangeRate = fields.poolTokenExchangeRate; this.tallyingRuleReporters = fields.tallyingRuleReporters; this.tallyingRuleGlobalScore = fields.tallyingRuleGlobalScore; }

 static fromFields( fields: Record<string, any> ): ValidatorEpochInfoEventV2 { return new ValidatorEpochInfoEventV2( { epoch: BigInt(fields.epoch), validatorAddress: `0x${fields.validator_address}`, referenceGasSurveyQuote: BigInt(fields.reference_gas_survey_quote), stake: BigInt(fields.stake), votingPower: BigInt(fields.voting_power), commissionRate: BigInt(fields.commission_rate), poolStakingReward: BigInt(fields.pool_staking_reward), storageFundStakingReward: BigInt(fields.storage_fund_staking_reward), poolTokenExchangeRate: PoolTokenExchangeRate.fromFields(fields.pool_token_exchange_rate), tallyingRuleReporters: fields.tallying_rule_reporters.map((item: any) => `0x${item}`), tallyingRuleGlobalScore: BigInt(fields.tallying_rule_global_score) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorEpochInfoEventV2 { if (!isValidatorEpochInfoEventV2(item.type)) { throw new Error("not a ValidatorEpochInfoEventV2 type");

 } return new ValidatorEpochInfoEventV2( { epoch: BigInt(item.fields.epoch), validatorAddress: `0x${item.fields.validator_address}`, referenceGasSurveyQuote: BigInt(item.fields.reference_gas_survey_quote), stake: BigInt(item.fields.stake), votingPower: BigInt(item.fields.voting_power), commissionRate: BigInt(item.fields.commission_rate), poolStakingReward: BigInt(item.fields.pool_staking_reward), storageFundStakingReward: BigInt(item.fields.storage_fund_staking_reward), poolTokenExchangeRate: PoolTokenExchangeRate.fromFieldsWithTypes(item.fields.pool_token_exchange_rate), tallyingRuleReporters: item.fields.tallying_rule_reporters.map((item: any) => `0x${item}`), tallyingRuleGlobalScore: BigInt(item.fields.tallying_rule_global_score) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorEpochInfoEventV2 { return ValidatorEpochInfoEventV2.fromFields( bcs.de([ValidatorEpochInfoEventV2.$typeName, ], data, encoding) ) }

 }

/* ============================== ValidatorJoinEvent =============================== */

bcs.registerStructType( "0x3::validator_set::ValidatorJoinEvent", {
epoch: `u64`,
validator_address: `address`,
staking_pool_id: `0x2::object::ID`,
} )

export function isValidatorJoinEvent(type: Type): boolean { return type === "0x3::validator_set::ValidatorJoinEvent"; }

export interface ValidatorJoinEventFields { epoch: bigint; validatorAddress: string; stakingPoolId: string }

export class ValidatorJoinEvent { static readonly $typeName = "0x3::validator_set::ValidatorJoinEvent"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly validatorAddress: string; readonly stakingPoolId: string

 constructor( fields: ValidatorJoinEventFields, ) { this.epoch = fields.epoch; this.validatorAddress = fields.validatorAddress; this.stakingPoolId = fields.stakingPoolId; }

 static fromFields( fields: Record<string, any> ): ValidatorJoinEvent { return new ValidatorJoinEvent( { epoch: BigInt(fields.epoch), validatorAddress: `0x${fields.validator_address}`, stakingPoolId: ID.fromFields(fields.staking_pool_id).bytes } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorJoinEvent { if (!isValidatorJoinEvent(item.type)) { throw new Error("not a ValidatorJoinEvent type");

 } return new ValidatorJoinEvent( { epoch: BigInt(item.fields.epoch), validatorAddress: `0x${item.fields.validator_address}`, stakingPoolId: item.fields.staking_pool_id } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorJoinEvent { return ValidatorJoinEvent.fromFields( bcs.de([ValidatorJoinEvent.$typeName, ], data, encoding) ) }

 }

/* ============================== ValidatorLeaveEvent =============================== */

bcs.registerStructType( "0x3::validator_set::ValidatorLeaveEvent", {
epoch: `u64`,
validator_address: `address`,
staking_pool_id: `0x2::object::ID`,
is_voluntary: `bool`,
} )

export function isValidatorLeaveEvent(type: Type): boolean { return type === "0x3::validator_set::ValidatorLeaveEvent"; }

export interface ValidatorLeaveEventFields { epoch: bigint; validatorAddress: string; stakingPoolId: string; isVoluntary: boolean }

export class ValidatorLeaveEvent { static readonly $typeName = "0x3::validator_set::ValidatorLeaveEvent"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly validatorAddress: string; readonly stakingPoolId: string; readonly isVoluntary: boolean

 constructor( fields: ValidatorLeaveEventFields, ) { this.epoch = fields.epoch; this.validatorAddress = fields.validatorAddress; this.stakingPoolId = fields.stakingPoolId; this.isVoluntary = fields.isVoluntary; }

 static fromFields( fields: Record<string, any> ): ValidatorLeaveEvent { return new ValidatorLeaveEvent( { epoch: BigInt(fields.epoch), validatorAddress: `0x${fields.validator_address}`, stakingPoolId: ID.fromFields(fields.staking_pool_id).bytes, isVoluntary: fields.is_voluntary } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorLeaveEvent { if (!isValidatorLeaveEvent(item.type)) { throw new Error("not a ValidatorLeaveEvent type");

 } return new ValidatorLeaveEvent( { epoch: BigInt(item.fields.epoch), validatorAddress: `0x${item.fields.validator_address}`, stakingPoolId: item.fields.staking_pool_id, isVoluntary: item.fields.is_voluntary } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorLeaveEvent { return ValidatorLeaveEvent.fromFields( bcs.de([ValidatorLeaveEvent.$typeName, ], data, encoding) ) }

 }
