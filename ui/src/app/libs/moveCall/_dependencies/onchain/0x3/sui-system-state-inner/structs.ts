import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Bag} from "../../0x2/bag/structs";
import {Balance} from "../../0x2/balance/structs";
import {VecMap} from "../../0x2/vec-map/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {StakeSubsidy} from "../stake-subsidy/structs";
import {StorageFund} from "../storage-fund/structs";
import {ValidatorSet} from "../validator-set/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== SystemParameters =============================== */

bcs.registerStructType( "0x3::sui_system_state_inner::SystemParameters", {
epoch_duration_ms: `u64`,
stake_subsidy_start_epoch: `u64`,
max_validator_count: `u64`,
min_validator_joining_stake: `u64`,
validator_low_stake_threshold: `u64`,
validator_very_low_stake_threshold: `u64`,
validator_low_stake_grace_period: `u64`,
extra_fields: `0x2::bag::Bag`,
} )

export function isSystemParameters(type: Type): boolean { return type === "0x3::sui_system_state_inner::SystemParameters"; }

export interface SystemParametersFields { epochDurationMs: bigint; stakeSubsidyStartEpoch: bigint; maxValidatorCount: bigint; minValidatorJoiningStake: bigint; validatorLowStakeThreshold: bigint; validatorVeryLowStakeThreshold: bigint; validatorLowStakeGracePeriod: bigint; extraFields: Bag }

export class SystemParameters { static readonly $typeName = "0x3::sui_system_state_inner::SystemParameters"; static readonly $numTypeParams = 0;

  readonly epochDurationMs: bigint; readonly stakeSubsidyStartEpoch: bigint; readonly maxValidatorCount: bigint; readonly minValidatorJoiningStake: bigint; readonly validatorLowStakeThreshold: bigint; readonly validatorVeryLowStakeThreshold: bigint; readonly validatorLowStakeGracePeriod: bigint; readonly extraFields: Bag

 constructor( fields: SystemParametersFields, ) { this.epochDurationMs = fields.epochDurationMs; this.stakeSubsidyStartEpoch = fields.stakeSubsidyStartEpoch; this.maxValidatorCount = fields.maxValidatorCount; this.minValidatorJoiningStake = fields.minValidatorJoiningStake; this.validatorLowStakeThreshold = fields.validatorLowStakeThreshold; this.validatorVeryLowStakeThreshold = fields.validatorVeryLowStakeThreshold; this.validatorLowStakeGracePeriod = fields.validatorLowStakeGracePeriod; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): SystemParameters { return new SystemParameters( { epochDurationMs: BigInt(fields.epoch_duration_ms), stakeSubsidyStartEpoch: BigInt(fields.stake_subsidy_start_epoch), maxValidatorCount: BigInt(fields.max_validator_count), minValidatorJoiningStake: BigInt(fields.min_validator_joining_stake), validatorLowStakeThreshold: BigInt(fields.validator_low_stake_threshold), validatorVeryLowStakeThreshold: BigInt(fields.validator_very_low_stake_threshold), validatorLowStakeGracePeriod: BigInt(fields.validator_low_stake_grace_period), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SystemParameters { if (!isSystemParameters(item.type)) { throw new Error("not a SystemParameters type");

 } return new SystemParameters( { epochDurationMs: BigInt(item.fields.epoch_duration_ms), stakeSubsidyStartEpoch: BigInt(item.fields.stake_subsidy_start_epoch), maxValidatorCount: BigInt(item.fields.max_validator_count), minValidatorJoiningStake: BigInt(item.fields.min_validator_joining_stake), validatorLowStakeThreshold: BigInt(item.fields.validator_low_stake_threshold), validatorVeryLowStakeThreshold: BigInt(item.fields.validator_very_low_stake_threshold), validatorLowStakeGracePeriod: BigInt(item.fields.validator_low_stake_grace_period), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SystemParameters { return SystemParameters.fromFields( bcs.de([SystemParameters.$typeName, ], data, encoding) ) }

 }

/* ============================== SystemParametersV2 =============================== */

bcs.registerStructType( "0x3::sui_system_state_inner::SystemParametersV2", {
epoch_duration_ms: `u64`,
stake_subsidy_start_epoch: `u64`,
min_validator_count: `u64`,
max_validator_count: `u64`,
min_validator_joining_stake: `u64`,
validator_low_stake_threshold: `u64`,
validator_very_low_stake_threshold: `u64`,
validator_low_stake_grace_period: `u64`,
extra_fields: `0x2::bag::Bag`,
} )

export function isSystemParametersV2(type: Type): boolean { return type === "0x3::sui_system_state_inner::SystemParametersV2"; }

export interface SystemParametersV2Fields { epochDurationMs: bigint; stakeSubsidyStartEpoch: bigint; minValidatorCount: bigint; maxValidatorCount: bigint; minValidatorJoiningStake: bigint; validatorLowStakeThreshold: bigint; validatorVeryLowStakeThreshold: bigint; validatorLowStakeGracePeriod: bigint; extraFields: Bag }

export class SystemParametersV2 { static readonly $typeName = "0x3::sui_system_state_inner::SystemParametersV2"; static readonly $numTypeParams = 0;

  readonly epochDurationMs: bigint; readonly stakeSubsidyStartEpoch: bigint; readonly minValidatorCount: bigint; readonly maxValidatorCount: bigint; readonly minValidatorJoiningStake: bigint; readonly validatorLowStakeThreshold: bigint; readonly validatorVeryLowStakeThreshold: bigint; readonly validatorLowStakeGracePeriod: bigint; readonly extraFields: Bag

 constructor( fields: SystemParametersV2Fields, ) { this.epochDurationMs = fields.epochDurationMs; this.stakeSubsidyStartEpoch = fields.stakeSubsidyStartEpoch; this.minValidatorCount = fields.minValidatorCount; this.maxValidatorCount = fields.maxValidatorCount; this.minValidatorJoiningStake = fields.minValidatorJoiningStake; this.validatorLowStakeThreshold = fields.validatorLowStakeThreshold; this.validatorVeryLowStakeThreshold = fields.validatorVeryLowStakeThreshold; this.validatorLowStakeGracePeriod = fields.validatorLowStakeGracePeriod; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): SystemParametersV2 { return new SystemParametersV2( { epochDurationMs: BigInt(fields.epoch_duration_ms), stakeSubsidyStartEpoch: BigInt(fields.stake_subsidy_start_epoch), minValidatorCount: BigInt(fields.min_validator_count), maxValidatorCount: BigInt(fields.max_validator_count), minValidatorJoiningStake: BigInt(fields.min_validator_joining_stake), validatorLowStakeThreshold: BigInt(fields.validator_low_stake_threshold), validatorVeryLowStakeThreshold: BigInt(fields.validator_very_low_stake_threshold), validatorLowStakeGracePeriod: BigInt(fields.validator_low_stake_grace_period), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SystemParametersV2 { if (!isSystemParametersV2(item.type)) { throw new Error("not a SystemParametersV2 type");

 } return new SystemParametersV2( { epochDurationMs: BigInt(item.fields.epoch_duration_ms), stakeSubsidyStartEpoch: BigInt(item.fields.stake_subsidy_start_epoch), minValidatorCount: BigInt(item.fields.min_validator_count), maxValidatorCount: BigInt(item.fields.max_validator_count), minValidatorJoiningStake: BigInt(item.fields.min_validator_joining_stake), validatorLowStakeThreshold: BigInt(item.fields.validator_low_stake_threshold), validatorVeryLowStakeThreshold: BigInt(item.fields.validator_very_low_stake_threshold), validatorLowStakeGracePeriod: BigInt(item.fields.validator_low_stake_grace_period), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SystemParametersV2 { return SystemParametersV2.fromFields( bcs.de([SystemParametersV2.$typeName, ], data, encoding) ) }

 }

/* ============================== SuiSystemStateInner =============================== */

bcs.registerStructType( "0x3::sui_system_state_inner::SuiSystemStateInner", {
epoch: `u64`,
protocol_version: `u64`,
system_state_version: `u64`,
validators: `0x3::validator_set::ValidatorSet`,
storage_fund: `0x3::storage_fund::StorageFund`,
parameters: `0x3::sui_system_state_inner::SystemParameters`,
reference_gas_price: `u64`,
validator_report_records: `0x2::vec_map::VecMap<address, 0x2::vec_set::VecSet<address>>`,
stake_subsidy: `0x3::stake_subsidy::StakeSubsidy`,
safe_mode: `bool`,
safe_mode_storage_rewards: `0x2::balance::Balance<0x2::sui::SUI>`,
safe_mode_computation_rewards: `0x2::balance::Balance<0x2::sui::SUI>`,
safe_mode_storage_rebates: `u64`,
safe_mode_non_refundable_storage_fee: `u64`,
epoch_start_timestamp_ms: `u64`,
extra_fields: `0x2::bag::Bag`,
} )

export function isSuiSystemStateInner(type: Type): boolean { return type === "0x3::sui_system_state_inner::SuiSystemStateInner"; }

export interface SuiSystemStateInnerFields { epoch: bigint; protocolVersion: bigint; systemStateVersion: bigint; validators: ValidatorSet; storageFund: StorageFund; parameters: SystemParameters; referenceGasPrice: bigint; validatorReportRecords: VecMap<string, VecSet<string>>; stakeSubsidy: StakeSubsidy; safeMode: boolean; safeModeStorageRewards: Balance; safeModeComputationRewards: Balance; safeModeStorageRebates: bigint; safeModeNonRefundableStorageFee: bigint; epochStartTimestampMs: bigint; extraFields: Bag }

export class SuiSystemStateInner { static readonly $typeName = "0x3::sui_system_state_inner::SuiSystemStateInner"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly protocolVersion: bigint; readonly systemStateVersion: bigint; readonly validators: ValidatorSet; readonly storageFund: StorageFund; readonly parameters: SystemParameters; readonly referenceGasPrice: bigint; readonly validatorReportRecords: VecMap<string, VecSet<string>>; readonly stakeSubsidy: StakeSubsidy; readonly safeMode: boolean; readonly safeModeStorageRewards: Balance; readonly safeModeComputationRewards: Balance; readonly safeModeStorageRebates: bigint; readonly safeModeNonRefundableStorageFee: bigint; readonly epochStartTimestampMs: bigint; readonly extraFields: Bag

 constructor( fields: SuiSystemStateInnerFields, ) { this.epoch = fields.epoch; this.protocolVersion = fields.protocolVersion; this.systemStateVersion = fields.systemStateVersion; this.validators = fields.validators; this.storageFund = fields.storageFund; this.parameters = fields.parameters; this.referenceGasPrice = fields.referenceGasPrice; this.validatorReportRecords = fields.validatorReportRecords; this.stakeSubsidy = fields.stakeSubsidy; this.safeMode = fields.safeMode; this.safeModeStorageRewards = fields.safeModeStorageRewards; this.safeModeComputationRewards = fields.safeModeComputationRewards; this.safeModeStorageRebates = fields.safeModeStorageRebates; this.safeModeNonRefundableStorageFee = fields.safeModeNonRefundableStorageFee; this.epochStartTimestampMs = fields.epochStartTimestampMs; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): SuiSystemStateInner { return new SuiSystemStateInner( { epoch: BigInt(fields.epoch), protocolVersion: BigInt(fields.protocol_version), systemStateVersion: BigInt(fields.system_state_version), validators: ValidatorSet.fromFields(fields.validators), storageFund: StorageFund.fromFields(fields.storage_fund), parameters: SystemParameters.fromFields(fields.parameters), referenceGasPrice: BigInt(fields.reference_gas_price), validatorReportRecords: VecMap.fromFields<string, VecSet<string>>([`address`, `0x2::vec_set::VecSet<address>`], fields.validator_report_records), stakeSubsidy: StakeSubsidy.fromFields(fields.stake_subsidy), safeMode: fields.safe_mode, safeModeStorageRewards: Balance.fromFields(`0x2::sui::SUI`, fields.safe_mode_storage_rewards), safeModeComputationRewards: Balance.fromFields(`0x2::sui::SUI`, fields.safe_mode_computation_rewards), safeModeStorageRebates: BigInt(fields.safe_mode_storage_rebates), safeModeNonRefundableStorageFee: BigInt(fields.safe_mode_non_refundable_storage_fee), epochStartTimestampMs: BigInt(fields.epoch_start_timestamp_ms), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SuiSystemStateInner { if (!isSuiSystemStateInner(item.type)) { throw new Error("not a SuiSystemStateInner type");

 } return new SuiSystemStateInner( { epoch: BigInt(item.fields.epoch), protocolVersion: BigInt(item.fields.protocol_version), systemStateVersion: BigInt(item.fields.system_state_version), validators: ValidatorSet.fromFieldsWithTypes(item.fields.validators), storageFund: StorageFund.fromFieldsWithTypes(item.fields.storage_fund), parameters: SystemParameters.fromFieldsWithTypes(item.fields.parameters), referenceGasPrice: BigInt(item.fields.reference_gas_price), validatorReportRecords: VecMap.fromFieldsWithTypes<string, VecSet<string>>(item.fields.validator_report_records), stakeSubsidy: StakeSubsidy.fromFieldsWithTypes(item.fields.stake_subsidy), safeMode: item.fields.safe_mode, safeModeStorageRewards: new Balance( `0x2::sui::SUI`, BigInt(item.fields.safe_mode_storage_rewards) ), safeModeComputationRewards: new Balance( `0x2::sui::SUI`, BigInt(item.fields.safe_mode_computation_rewards) ), safeModeStorageRebates: BigInt(item.fields.safe_mode_storage_rebates), safeModeNonRefundableStorageFee: BigInt(item.fields.safe_mode_non_refundable_storage_fee), epochStartTimestampMs: BigInt(item.fields.epoch_start_timestamp_ms), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SuiSystemStateInner { return SuiSystemStateInner.fromFields( bcs.de([SuiSystemStateInner.$typeName, ], data, encoding) ) }

 }

/* ============================== SuiSystemStateInnerV2 =============================== */

bcs.registerStructType( "0x3::sui_system_state_inner::SuiSystemStateInnerV2", {
epoch: `u64`,
protocol_version: `u64`,
system_state_version: `u64`,
validators: `0x3::validator_set::ValidatorSet`,
storage_fund: `0x3::storage_fund::StorageFund`,
parameters: `0x3::sui_system_state_inner::SystemParametersV2`,
reference_gas_price: `u64`,
validator_report_records: `0x2::vec_map::VecMap<address, 0x2::vec_set::VecSet<address>>`,
stake_subsidy: `0x3::stake_subsidy::StakeSubsidy`,
safe_mode: `bool`,
safe_mode_storage_rewards: `0x2::balance::Balance<0x2::sui::SUI>`,
safe_mode_computation_rewards: `0x2::balance::Balance<0x2::sui::SUI>`,
safe_mode_storage_rebates: `u64`,
safe_mode_non_refundable_storage_fee: `u64`,
epoch_start_timestamp_ms: `u64`,
extra_fields: `0x2::bag::Bag`,
} )

export function isSuiSystemStateInnerV2(type: Type): boolean { return type === "0x3::sui_system_state_inner::SuiSystemStateInnerV2"; }

export interface SuiSystemStateInnerV2Fields { epoch: bigint; protocolVersion: bigint; systemStateVersion: bigint; validators: ValidatorSet; storageFund: StorageFund; parameters: SystemParametersV2; referenceGasPrice: bigint; validatorReportRecords: VecMap<string, VecSet<string>>; stakeSubsidy: StakeSubsidy; safeMode: boolean; safeModeStorageRewards: Balance; safeModeComputationRewards: Balance; safeModeStorageRebates: bigint; safeModeNonRefundableStorageFee: bigint; epochStartTimestampMs: bigint; extraFields: Bag }

export class SuiSystemStateInnerV2 { static readonly $typeName = "0x3::sui_system_state_inner::SuiSystemStateInnerV2"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly protocolVersion: bigint; readonly systemStateVersion: bigint; readonly validators: ValidatorSet; readonly storageFund: StorageFund; readonly parameters: SystemParametersV2; readonly referenceGasPrice: bigint; readonly validatorReportRecords: VecMap<string, VecSet<string>>; readonly stakeSubsidy: StakeSubsidy; readonly safeMode: boolean; readonly safeModeStorageRewards: Balance; readonly safeModeComputationRewards: Balance; readonly safeModeStorageRebates: bigint; readonly safeModeNonRefundableStorageFee: bigint; readonly epochStartTimestampMs: bigint; readonly extraFields: Bag

 constructor( fields: SuiSystemStateInnerV2Fields, ) { this.epoch = fields.epoch; this.protocolVersion = fields.protocolVersion; this.systemStateVersion = fields.systemStateVersion; this.validators = fields.validators; this.storageFund = fields.storageFund; this.parameters = fields.parameters; this.referenceGasPrice = fields.referenceGasPrice; this.validatorReportRecords = fields.validatorReportRecords; this.stakeSubsidy = fields.stakeSubsidy; this.safeMode = fields.safeMode; this.safeModeStorageRewards = fields.safeModeStorageRewards; this.safeModeComputationRewards = fields.safeModeComputationRewards; this.safeModeStorageRebates = fields.safeModeStorageRebates; this.safeModeNonRefundableStorageFee = fields.safeModeNonRefundableStorageFee; this.epochStartTimestampMs = fields.epochStartTimestampMs; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): SuiSystemStateInnerV2 { return new SuiSystemStateInnerV2( { epoch: BigInt(fields.epoch), protocolVersion: BigInt(fields.protocol_version), systemStateVersion: BigInt(fields.system_state_version), validators: ValidatorSet.fromFields(fields.validators), storageFund: StorageFund.fromFields(fields.storage_fund), parameters: SystemParametersV2.fromFields(fields.parameters), referenceGasPrice: BigInt(fields.reference_gas_price), validatorReportRecords: VecMap.fromFields<string, VecSet<string>>([`address`, `0x2::vec_set::VecSet<address>`], fields.validator_report_records), stakeSubsidy: StakeSubsidy.fromFields(fields.stake_subsidy), safeMode: fields.safe_mode, safeModeStorageRewards: Balance.fromFields(`0x2::sui::SUI`, fields.safe_mode_storage_rewards), safeModeComputationRewards: Balance.fromFields(`0x2::sui::SUI`, fields.safe_mode_computation_rewards), safeModeStorageRebates: BigInt(fields.safe_mode_storage_rebates), safeModeNonRefundableStorageFee: BigInt(fields.safe_mode_non_refundable_storage_fee), epochStartTimestampMs: BigInt(fields.epoch_start_timestamp_ms), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SuiSystemStateInnerV2 { if (!isSuiSystemStateInnerV2(item.type)) { throw new Error("not a SuiSystemStateInnerV2 type");

 } return new SuiSystemStateInnerV2( { epoch: BigInt(item.fields.epoch), protocolVersion: BigInt(item.fields.protocol_version), systemStateVersion: BigInt(item.fields.system_state_version), validators: ValidatorSet.fromFieldsWithTypes(item.fields.validators), storageFund: StorageFund.fromFieldsWithTypes(item.fields.storage_fund), parameters: SystemParametersV2.fromFieldsWithTypes(item.fields.parameters), referenceGasPrice: BigInt(item.fields.reference_gas_price), validatorReportRecords: VecMap.fromFieldsWithTypes<string, VecSet<string>>(item.fields.validator_report_records), stakeSubsidy: StakeSubsidy.fromFieldsWithTypes(item.fields.stake_subsidy), safeMode: item.fields.safe_mode, safeModeStorageRewards: new Balance( `0x2::sui::SUI`, BigInt(item.fields.safe_mode_storage_rewards) ), safeModeComputationRewards: new Balance( `0x2::sui::SUI`, BigInt(item.fields.safe_mode_computation_rewards) ), safeModeStorageRebates: BigInt(item.fields.safe_mode_storage_rebates), safeModeNonRefundableStorageFee: BigInt(item.fields.safe_mode_non_refundable_storage_fee), epochStartTimestampMs: BigInt(item.fields.epoch_start_timestamp_ms), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SuiSystemStateInnerV2 { return SuiSystemStateInnerV2.fromFields( bcs.de([SuiSystemStateInnerV2.$typeName, ], data, encoding) ) }

 }

/* ============================== SystemEpochInfoEvent =============================== */

bcs.registerStructType( "0x3::sui_system_state_inner::SystemEpochInfoEvent", {
epoch: `u64`,
protocol_version: `u64`,
reference_gas_price: `u64`,
total_stake: `u64`,
storage_fund_reinvestment: `u64`,
storage_charge: `u64`,
storage_rebate: `u64`,
storage_fund_balance: `u64`,
stake_subsidy_amount: `u64`,
total_gas_fees: `u64`,
total_stake_rewards_distributed: `u64`,
leftover_storage_fund_inflow: `u64`,
} )

export function isSystemEpochInfoEvent(type: Type): boolean { return type === "0x3::sui_system_state_inner::SystemEpochInfoEvent"; }

export interface SystemEpochInfoEventFields { epoch: bigint; protocolVersion: bigint; referenceGasPrice: bigint; totalStake: bigint; storageFundReinvestment: bigint; storageCharge: bigint; storageRebate: bigint; storageFundBalance: bigint; stakeSubsidyAmount: bigint; totalGasFees: bigint; totalStakeRewardsDistributed: bigint; leftoverStorageFundInflow: bigint }

export class SystemEpochInfoEvent { static readonly $typeName = "0x3::sui_system_state_inner::SystemEpochInfoEvent"; static readonly $numTypeParams = 0;

  readonly epoch: bigint; readonly protocolVersion: bigint; readonly referenceGasPrice: bigint; readonly totalStake: bigint; readonly storageFundReinvestment: bigint; readonly storageCharge: bigint; readonly storageRebate: bigint; readonly storageFundBalance: bigint; readonly stakeSubsidyAmount: bigint; readonly totalGasFees: bigint; readonly totalStakeRewardsDistributed: bigint; readonly leftoverStorageFundInflow: bigint

 constructor( fields: SystemEpochInfoEventFields, ) { this.epoch = fields.epoch; this.protocolVersion = fields.protocolVersion; this.referenceGasPrice = fields.referenceGasPrice; this.totalStake = fields.totalStake; this.storageFundReinvestment = fields.storageFundReinvestment; this.storageCharge = fields.storageCharge; this.storageRebate = fields.storageRebate; this.storageFundBalance = fields.storageFundBalance; this.stakeSubsidyAmount = fields.stakeSubsidyAmount; this.totalGasFees = fields.totalGasFees; this.totalStakeRewardsDistributed = fields.totalStakeRewardsDistributed; this.leftoverStorageFundInflow = fields.leftoverStorageFundInflow; }

 static fromFields( fields: Record<string, any> ): SystemEpochInfoEvent { return new SystemEpochInfoEvent( { epoch: BigInt(fields.epoch), protocolVersion: BigInt(fields.protocol_version), referenceGasPrice: BigInt(fields.reference_gas_price), totalStake: BigInt(fields.total_stake), storageFundReinvestment: BigInt(fields.storage_fund_reinvestment), storageCharge: BigInt(fields.storage_charge), storageRebate: BigInt(fields.storage_rebate), storageFundBalance: BigInt(fields.storage_fund_balance), stakeSubsidyAmount: BigInt(fields.stake_subsidy_amount), totalGasFees: BigInt(fields.total_gas_fees), totalStakeRewardsDistributed: BigInt(fields.total_stake_rewards_distributed), leftoverStorageFundInflow: BigInt(fields.leftover_storage_fund_inflow) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SystemEpochInfoEvent { if (!isSystemEpochInfoEvent(item.type)) { throw new Error("not a SystemEpochInfoEvent type");

 } return new SystemEpochInfoEvent( { epoch: BigInt(item.fields.epoch), protocolVersion: BigInt(item.fields.protocol_version), referenceGasPrice: BigInt(item.fields.reference_gas_price), totalStake: BigInt(item.fields.total_stake), storageFundReinvestment: BigInt(item.fields.storage_fund_reinvestment), storageCharge: BigInt(item.fields.storage_charge), storageRebate: BigInt(item.fields.storage_rebate), storageFundBalance: BigInt(item.fields.storage_fund_balance), stakeSubsidyAmount: BigInt(item.fields.stake_subsidy_amount), totalGasFees: BigInt(item.fields.total_gas_fees), totalStakeRewardsDistributed: BigInt(item.fields.total_stake_rewards_distributed), leftoverStorageFundInflow: BigInt(item.fields.leftover_storage_fund_inflow) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SystemEpochInfoEvent { return SystemEpochInfoEvent.fromFields( bcs.de([SystemEpochInfoEvent.$typeName, ], data, encoding) ) }

 }
