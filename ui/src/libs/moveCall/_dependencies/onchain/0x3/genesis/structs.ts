import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Option} from "../../0x1/option/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== GenesisValidatorMetadata =============================== */

bcs.registerStructType( "0x3::genesis::GenesisValidatorMetadata", {
name: `vector<u8>`,
description: `vector<u8>`,
image_url: `vector<u8>`,
project_url: `vector<u8>`,
sui_address: `address`,
gas_price: `u64`,
commission_rate: `u64`,
protocol_public_key: `vector<u8>`,
proof_of_possession: `vector<u8>`,
network_public_key: `vector<u8>`,
worker_public_key: `vector<u8>`,
network_address: `vector<u8>`,
p2p_address: `vector<u8>`,
primary_address: `vector<u8>`,
worker_address: `vector<u8>`,
} )

export function isGenesisValidatorMetadata(type: Type): boolean { return type === "0x3::genesis::GenesisValidatorMetadata"; }

export interface GenesisValidatorMetadataFields { name: Array<number>; description: Array<number>; imageUrl: Array<number>; projectUrl: Array<number>; suiAddress: string; gasPrice: bigint; commissionRate: bigint; protocolPublicKey: Array<number>; proofOfPossession: Array<number>; networkPublicKey: Array<number>; workerPublicKey: Array<number>; networkAddress: Array<number>; p2PAddress: Array<number>; primaryAddress: Array<number>; workerAddress: Array<number> }

export class GenesisValidatorMetadata { static readonly $typeName = "0x3::genesis::GenesisValidatorMetadata"; static readonly $numTypeParams = 0;

  readonly name: Array<number>; readonly description: Array<number>; readonly imageUrl: Array<number>; readonly projectUrl: Array<number>; readonly suiAddress: string; readonly gasPrice: bigint; readonly commissionRate: bigint; readonly protocolPublicKey: Array<number>; readonly proofOfPossession: Array<number>; readonly networkPublicKey: Array<number>; readonly workerPublicKey: Array<number>; readonly networkAddress: Array<number>; readonly p2PAddress: Array<number>; readonly primaryAddress: Array<number>; readonly workerAddress: Array<number>

 constructor( fields: GenesisValidatorMetadataFields, ) { this.name = fields.name; this.description = fields.description; this.imageUrl = fields.imageUrl; this.projectUrl = fields.projectUrl; this.suiAddress = fields.suiAddress; this.gasPrice = fields.gasPrice; this.commissionRate = fields.commissionRate; this.protocolPublicKey = fields.protocolPublicKey; this.proofOfPossession = fields.proofOfPossession; this.networkPublicKey = fields.networkPublicKey; this.workerPublicKey = fields.workerPublicKey; this.networkAddress = fields.networkAddress; this.p2PAddress = fields.p2PAddress; this.primaryAddress = fields.primaryAddress; this.workerAddress = fields.workerAddress; }

 static fromFields( fields: Record<string, any> ): GenesisValidatorMetadata { return new GenesisValidatorMetadata( { name: fields.name.map((item: any) => item), description: fields.description.map((item: any) => item), imageUrl: fields.image_url.map((item: any) => item), projectUrl: fields.project_url.map((item: any) => item), suiAddress: `0x${fields.sui_address}`, gasPrice: BigInt(fields.gas_price), commissionRate: BigInt(fields.commission_rate), protocolPublicKey: fields.protocol_public_key.map((item: any) => item), proofOfPossession: fields.proof_of_possession.map((item: any) => item), networkPublicKey: fields.network_public_key.map((item: any) => item), workerPublicKey: fields.worker_public_key.map((item: any) => item), networkAddress: fields.network_address.map((item: any) => item), p2PAddress: fields.p2p_address.map((item: any) => item), primaryAddress: fields.primary_address.map((item: any) => item), workerAddress: fields.worker_address.map((item: any) => item) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): GenesisValidatorMetadata { if (!isGenesisValidatorMetadata(item.type)) { throw new Error("not a GenesisValidatorMetadata type");

 } return new GenesisValidatorMetadata( { name: item.fields.name.map((item: any) => item), description: item.fields.description.map((item: any) => item), imageUrl: item.fields.image_url.map((item: any) => item), projectUrl: item.fields.project_url.map((item: any) => item), suiAddress: `0x${item.fields.sui_address}`, gasPrice: BigInt(item.fields.gas_price), commissionRate: BigInt(item.fields.commission_rate), protocolPublicKey: item.fields.protocol_public_key.map((item: any) => item), proofOfPossession: item.fields.proof_of_possession.map((item: any) => item), networkPublicKey: item.fields.network_public_key.map((item: any) => item), workerPublicKey: item.fields.worker_public_key.map((item: any) => item), networkAddress: item.fields.network_address.map((item: any) => item), p2PAddress: item.fields.p2p_address.map((item: any) => item), primaryAddress: item.fields.primary_address.map((item: any) => item), workerAddress: item.fields.worker_address.map((item: any) => item) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): GenesisValidatorMetadata { return GenesisValidatorMetadata.fromFields( bcs.de([GenesisValidatorMetadata.$typeName, ], data, encoding) ) }

 }

/* ============================== GenesisChainParameters =============================== */

bcs.registerStructType( "0x3::genesis::GenesisChainParameters", {
protocol_version: `u64`,
chain_start_timestamp_ms: `u64`,
epoch_duration_ms: `u64`,
stake_subsidy_start_epoch: `u64`,
stake_subsidy_initial_distribution_amount: `u64`,
stake_subsidy_period_length: `u64`,
stake_subsidy_decrease_rate: `u16`,
max_validator_count: `u64`,
min_validator_joining_stake: `u64`,
validator_low_stake_threshold: `u64`,
validator_very_low_stake_threshold: `u64`,
validator_low_stake_grace_period: `u64`,
} )

export function isGenesisChainParameters(type: Type): boolean { return type === "0x3::genesis::GenesisChainParameters"; }

export interface GenesisChainParametersFields { protocolVersion: bigint; chainStartTimestampMs: bigint; epochDurationMs: bigint; stakeSubsidyStartEpoch: bigint; stakeSubsidyInitialDistributionAmount: bigint; stakeSubsidyPeriodLength: bigint; stakeSubsidyDecreaseRate: number; maxValidatorCount: bigint; minValidatorJoiningStake: bigint; validatorLowStakeThreshold: bigint; validatorVeryLowStakeThreshold: bigint; validatorLowStakeGracePeriod: bigint }

export class GenesisChainParameters { static readonly $typeName = "0x3::genesis::GenesisChainParameters"; static readonly $numTypeParams = 0;

  readonly protocolVersion: bigint; readonly chainStartTimestampMs: bigint; readonly epochDurationMs: bigint; readonly stakeSubsidyStartEpoch: bigint; readonly stakeSubsidyInitialDistributionAmount: bigint; readonly stakeSubsidyPeriodLength: bigint; readonly stakeSubsidyDecreaseRate: number; readonly maxValidatorCount: bigint; readonly minValidatorJoiningStake: bigint; readonly validatorLowStakeThreshold: bigint; readonly validatorVeryLowStakeThreshold: bigint; readonly validatorLowStakeGracePeriod: bigint

 constructor( fields: GenesisChainParametersFields, ) { this.protocolVersion = fields.protocolVersion; this.chainStartTimestampMs = fields.chainStartTimestampMs; this.epochDurationMs = fields.epochDurationMs; this.stakeSubsidyStartEpoch = fields.stakeSubsidyStartEpoch; this.stakeSubsidyInitialDistributionAmount = fields.stakeSubsidyInitialDistributionAmount; this.stakeSubsidyPeriodLength = fields.stakeSubsidyPeriodLength; this.stakeSubsidyDecreaseRate = fields.stakeSubsidyDecreaseRate; this.maxValidatorCount = fields.maxValidatorCount; this.minValidatorJoiningStake = fields.minValidatorJoiningStake; this.validatorLowStakeThreshold = fields.validatorLowStakeThreshold; this.validatorVeryLowStakeThreshold = fields.validatorVeryLowStakeThreshold; this.validatorLowStakeGracePeriod = fields.validatorLowStakeGracePeriod; }

 static fromFields( fields: Record<string, any> ): GenesisChainParameters { return new GenesisChainParameters( { protocolVersion: BigInt(fields.protocol_version), chainStartTimestampMs: BigInt(fields.chain_start_timestamp_ms), epochDurationMs: BigInt(fields.epoch_duration_ms), stakeSubsidyStartEpoch: BigInt(fields.stake_subsidy_start_epoch), stakeSubsidyInitialDistributionAmount: BigInt(fields.stake_subsidy_initial_distribution_amount), stakeSubsidyPeriodLength: BigInt(fields.stake_subsidy_period_length), stakeSubsidyDecreaseRate: fields.stake_subsidy_decrease_rate, maxValidatorCount: BigInt(fields.max_validator_count), minValidatorJoiningStake: BigInt(fields.min_validator_joining_stake), validatorLowStakeThreshold: BigInt(fields.validator_low_stake_threshold), validatorVeryLowStakeThreshold: BigInt(fields.validator_very_low_stake_threshold), validatorLowStakeGracePeriod: BigInt(fields.validator_low_stake_grace_period) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): GenesisChainParameters { if (!isGenesisChainParameters(item.type)) { throw new Error("not a GenesisChainParameters type");

 } return new GenesisChainParameters( { protocolVersion: BigInt(item.fields.protocol_version), chainStartTimestampMs: BigInt(item.fields.chain_start_timestamp_ms), epochDurationMs: BigInt(item.fields.epoch_duration_ms), stakeSubsidyStartEpoch: BigInt(item.fields.stake_subsidy_start_epoch), stakeSubsidyInitialDistributionAmount: BigInt(item.fields.stake_subsidy_initial_distribution_amount), stakeSubsidyPeriodLength: BigInt(item.fields.stake_subsidy_period_length), stakeSubsidyDecreaseRate: item.fields.stake_subsidy_decrease_rate, maxValidatorCount: BigInt(item.fields.max_validator_count), minValidatorJoiningStake: BigInt(item.fields.min_validator_joining_stake), validatorLowStakeThreshold: BigInt(item.fields.validator_low_stake_threshold), validatorVeryLowStakeThreshold: BigInt(item.fields.validator_very_low_stake_threshold), validatorLowStakeGracePeriod: BigInt(item.fields.validator_low_stake_grace_period) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): GenesisChainParameters { return GenesisChainParameters.fromFields( bcs.de([GenesisChainParameters.$typeName, ], data, encoding) ) }

 }

/* ============================== TokenDistributionSchedule =============================== */

bcs.registerStructType( "0x3::genesis::TokenDistributionSchedule", {
stake_subsidy_fund_mist: `u64`,
allocations: `vector<0x3::genesis::TokenAllocation>`,
} )

export function isTokenDistributionSchedule(type: Type): boolean { return type === "0x3::genesis::TokenDistributionSchedule"; }

export interface TokenDistributionScheduleFields { stakeSubsidyFundMist: bigint; allocations: Array<TokenAllocation> }

export class TokenDistributionSchedule { static readonly $typeName = "0x3::genesis::TokenDistributionSchedule"; static readonly $numTypeParams = 0;

  readonly stakeSubsidyFundMist: bigint; readonly allocations: Array<TokenAllocation>

 constructor( fields: TokenDistributionScheduleFields, ) { this.stakeSubsidyFundMist = fields.stakeSubsidyFundMist; this.allocations = fields.allocations; }

 static fromFields( fields: Record<string, any> ): TokenDistributionSchedule { return new TokenDistributionSchedule( { stakeSubsidyFundMist: BigInt(fields.stake_subsidy_fund_mist), allocations: fields.allocations.map((item: any) => TokenAllocation.fromFields(item)) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): TokenDistributionSchedule { if (!isTokenDistributionSchedule(item.type)) { throw new Error("not a TokenDistributionSchedule type");

 } return new TokenDistributionSchedule( { stakeSubsidyFundMist: BigInt(item.fields.stake_subsidy_fund_mist), allocations: item.fields.allocations.map((item: any) => TokenAllocation.fromFieldsWithTypes(item)) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): TokenDistributionSchedule { return TokenDistributionSchedule.fromFields( bcs.de([TokenDistributionSchedule.$typeName, ], data, encoding) ) }

 }

/* ============================== TokenAllocation =============================== */

bcs.registerStructType( "0x3::genesis::TokenAllocation", {
recipient_address: `address`,
amount_mist: `u64`,
staked_with_validator: `0x1::option::Option<address>`,
} )

export function isTokenAllocation(type: Type): boolean { return type === "0x3::genesis::TokenAllocation"; }

export interface TokenAllocationFields { recipientAddress: string; amountMist: bigint; stakedWithValidator: (string | null) }

export class TokenAllocation { static readonly $typeName = "0x3::genesis::TokenAllocation"; static readonly $numTypeParams = 0;

  readonly recipientAddress: string; readonly amountMist: bigint; readonly stakedWithValidator: (string | null)

 constructor( fields: TokenAllocationFields, ) { this.recipientAddress = fields.recipientAddress; this.amountMist = fields.amountMist; this.stakedWithValidator = fields.stakedWithValidator; }

 static fromFields( fields: Record<string, any> ): TokenAllocation { return new TokenAllocation( { recipientAddress: `0x${fields.recipient_address}`, amountMist: BigInt(fields.amount_mist), stakedWithValidator: Option.fromFields<string>(`address`, fields.staked_with_validator).vec[0] || null } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): TokenAllocation { if (!isTokenAllocation(item.type)) { throw new Error("not a TokenAllocation type");

 } return new TokenAllocation( { recipientAddress: `0x${item.fields.recipient_address}`, amountMist: BigInt(item.fields.amount_mist), stakedWithValidator: item.fields.staked_with_validator !== null ? Option.fromFieldsWithTypes<string>({ type: "0x1::option::Option<" + `address` + ">", fields: { vec: [item.fields.staked_with_validator] } }).vec[0] : null } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): TokenAllocation { return TokenAllocation.fromFields( bcs.de([TokenAllocation.$typeName, ], data, encoding) ) }

 }
