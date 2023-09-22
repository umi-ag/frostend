import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Option} from "../../0x1/option/structs";
import {String} from "../../0x1/string/structs";
import {Bag} from "../../0x2/bag/structs";
import {ID} from "../../0x2/object/structs";
import {Url} from "../../0x2/url/structs";
import {StakingPool} from "../staking-pool/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== ValidatorMetadata =============================== */

bcs.registerStructType( "0x3::validator::ValidatorMetadata", {
sui_address: `address`,
protocol_pubkey_bytes: `vector<u8>`,
network_pubkey_bytes: `vector<u8>`,
worker_pubkey_bytes: `vector<u8>`,
proof_of_possession: `vector<u8>`,
name: `0x1::string::String`,
description: `0x1::string::String`,
image_url: `0x2::url::Url`,
project_url: `0x2::url::Url`,
net_address: `0x1::string::String`,
p2p_address: `0x1::string::String`,
primary_address: `0x1::string::String`,
worker_address: `0x1::string::String`,
next_epoch_protocol_pubkey_bytes: `0x1::option::Option<vector<u8>>`,
next_epoch_proof_of_possession: `0x1::option::Option<vector<u8>>`,
next_epoch_network_pubkey_bytes: `0x1::option::Option<vector<u8>>`,
next_epoch_worker_pubkey_bytes: `0x1::option::Option<vector<u8>>`,
next_epoch_net_address: `0x1::option::Option<0x1::string::String>`,
next_epoch_p2p_address: `0x1::option::Option<0x1::string::String>`,
next_epoch_primary_address: `0x1::option::Option<0x1::string::String>`,
next_epoch_worker_address: `0x1::option::Option<0x1::string::String>`,
extra_fields: `0x2::bag::Bag`,
} )

export function isValidatorMetadata(type: Type): boolean { return type === "0x3::validator::ValidatorMetadata"; }

export interface ValidatorMetadataFields { suiAddress: string; protocolPubkeyBytes: Array<number>; networkPubkeyBytes: Array<number>; workerPubkeyBytes: Array<number>; proofOfPossession: Array<number>; name: string; description: string; imageUrl: string; projectUrl: string; netAddress: string; p2PAddress: string; primaryAddress: string; workerAddress: string; nextEpochProtocolPubkeyBytes: (Array<number> | null); nextEpochProofOfPossession: (Array<number> | null); nextEpochNetworkPubkeyBytes: (Array<number> | null); nextEpochWorkerPubkeyBytes: (Array<number> | null); nextEpochNetAddress: (string | null); nextEpochP2PAddress: (string | null); nextEpochPrimaryAddress: (string | null); nextEpochWorkerAddress: (string | null); extraFields: Bag }

export class ValidatorMetadata { static readonly $typeName = "0x3::validator::ValidatorMetadata"; static readonly $numTypeParams = 0;

  readonly suiAddress: string; readonly protocolPubkeyBytes: Array<number>; readonly networkPubkeyBytes: Array<number>; readonly workerPubkeyBytes: Array<number>; readonly proofOfPossession: Array<number>; readonly name: string; readonly description: string; readonly imageUrl: string; readonly projectUrl: string; readonly netAddress: string; readonly p2PAddress: string; readonly primaryAddress: string; readonly workerAddress: string; readonly nextEpochProtocolPubkeyBytes: (Array<number> | null); readonly nextEpochProofOfPossession: (Array<number> | null); readonly nextEpochNetworkPubkeyBytes: (Array<number> | null); readonly nextEpochWorkerPubkeyBytes: (Array<number> | null); readonly nextEpochNetAddress: (string | null); readonly nextEpochP2PAddress: (string | null); readonly nextEpochPrimaryAddress: (string | null); readonly nextEpochWorkerAddress: (string | null); readonly extraFields: Bag

 constructor( fields: ValidatorMetadataFields, ) { this.suiAddress = fields.suiAddress; this.protocolPubkeyBytes = fields.protocolPubkeyBytes; this.networkPubkeyBytes = fields.networkPubkeyBytes; this.workerPubkeyBytes = fields.workerPubkeyBytes; this.proofOfPossession = fields.proofOfPossession; this.name = fields.name; this.description = fields.description; this.imageUrl = fields.imageUrl; this.projectUrl = fields.projectUrl; this.netAddress = fields.netAddress; this.p2PAddress = fields.p2PAddress; this.primaryAddress = fields.primaryAddress; this.workerAddress = fields.workerAddress; this.nextEpochProtocolPubkeyBytes = fields.nextEpochProtocolPubkeyBytes; this.nextEpochProofOfPossession = fields.nextEpochProofOfPossession; this.nextEpochNetworkPubkeyBytes = fields.nextEpochNetworkPubkeyBytes; this.nextEpochWorkerPubkeyBytes = fields.nextEpochWorkerPubkeyBytes; this.nextEpochNetAddress = fields.nextEpochNetAddress; this.nextEpochP2PAddress = fields.nextEpochP2PAddress; this.nextEpochPrimaryAddress = fields.nextEpochPrimaryAddress; this.nextEpochWorkerAddress = fields.nextEpochWorkerAddress; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): ValidatorMetadata { return new ValidatorMetadata( { suiAddress: `0x${fields.sui_address}`, protocolPubkeyBytes: fields.protocol_pubkey_bytes.map((item: any) => item), networkPubkeyBytes: fields.network_pubkey_bytes.map((item: any) => item), workerPubkeyBytes: fields.worker_pubkey_bytes.map((item: any) => item), proofOfPossession: fields.proof_of_possession.map((item: any) => item), name: (new TextDecoder()).decode(Uint8Array.from(String.fromFields(fields.name).bytes)).toString(), description: (new TextDecoder()).decode(Uint8Array.from(String.fromFields(fields.description).bytes)).toString(), imageUrl: Url.fromFields(fields.image_url).url, projectUrl: Url.fromFields(fields.project_url).url, netAddress: (new TextDecoder()).decode(Uint8Array.from(String.fromFields(fields.net_address).bytes)).toString(), p2PAddress: (new TextDecoder()).decode(Uint8Array.from(String.fromFields(fields.p2p_address).bytes)).toString(), primaryAddress: (new TextDecoder()).decode(Uint8Array.from(String.fromFields(fields.primary_address).bytes)).toString(), workerAddress: (new TextDecoder()).decode(Uint8Array.from(String.fromFields(fields.worker_address).bytes)).toString(), nextEpochProtocolPubkeyBytes: Option.fromFields<Array<number>>(`vector<u8>`, fields.next_epoch_protocol_pubkey_bytes).vec[0] || null, nextEpochProofOfPossession: Option.fromFields<Array<number>>(`vector<u8>`, fields.next_epoch_proof_of_possession).vec[0] || null, nextEpochNetworkPubkeyBytes: Option.fromFields<Array<number>>(`vector<u8>`, fields.next_epoch_network_pubkey_bytes).vec[0] || null, nextEpochWorkerPubkeyBytes: Option.fromFields<Array<number>>(`vector<u8>`, fields.next_epoch_worker_pubkey_bytes).vec[0] || null, nextEpochNetAddress: Option.fromFields<string>(`0x1::string::String`, fields.next_epoch_net_address).vec[0] || null, nextEpochP2PAddress: Option.fromFields<string>(`0x1::string::String`, fields.next_epoch_p2p_address).vec[0] || null, nextEpochPrimaryAddress: Option.fromFields<string>(`0x1::string::String`, fields.next_epoch_primary_address).vec[0] || null, nextEpochWorkerAddress: Option.fromFields<string>(`0x1::string::String`, fields.next_epoch_worker_address).vec[0] || null, extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorMetadata { if (!isValidatorMetadata(item.type)) { throw new Error("not a ValidatorMetadata type");

 } return new ValidatorMetadata( { suiAddress: `0x${item.fields.sui_address}`, protocolPubkeyBytes: item.fields.protocol_pubkey_bytes.map((item: any) => item), networkPubkeyBytes: item.fields.network_pubkey_bytes.map((item: any) => item), workerPubkeyBytes: item.fields.worker_pubkey_bytes.map((item: any) => item), proofOfPossession: item.fields.proof_of_possession.map((item: any) => item), name: item.fields.name, description: item.fields.description, imageUrl: item.fields.image_url, projectUrl: item.fields.project_url, netAddress: item.fields.net_address, p2PAddress: item.fields.p2p_address, primaryAddress: item.fields.primary_address, workerAddress: item.fields.worker_address, nextEpochProtocolPubkeyBytes: item.fields.next_epoch_protocol_pubkey_bytes !== null ? Option.fromFieldsWithTypes<Array<number>>({ type: "0x1::option::Option<" + `vector<u8>` + ">", fields: { vec: [item.fields.next_epoch_protocol_pubkey_bytes] } }).vec[0] : null, nextEpochProofOfPossession: item.fields.next_epoch_proof_of_possession !== null ? Option.fromFieldsWithTypes<Array<number>>({ type: "0x1::option::Option<" + `vector<u8>` + ">", fields: { vec: [item.fields.next_epoch_proof_of_possession] } }).vec[0] : null, nextEpochNetworkPubkeyBytes: item.fields.next_epoch_network_pubkey_bytes !== null ? Option.fromFieldsWithTypes<Array<number>>({ type: "0x1::option::Option<" + `vector<u8>` + ">", fields: { vec: [item.fields.next_epoch_network_pubkey_bytes] } }).vec[0] : null, nextEpochWorkerPubkeyBytes: item.fields.next_epoch_worker_pubkey_bytes !== null ? Option.fromFieldsWithTypes<Array<number>>({ type: "0x1::option::Option<" + `vector<u8>` + ">", fields: { vec: [item.fields.next_epoch_worker_pubkey_bytes] } }).vec[0] : null, nextEpochNetAddress: item.fields.next_epoch_net_address !== null ? Option.fromFieldsWithTypes<string>({ type: "0x1::option::Option<" + `0x1::string::String` + ">", fields: { vec: [item.fields.next_epoch_net_address] } }).vec[0] : null, nextEpochP2PAddress: item.fields.next_epoch_p2p_address !== null ? Option.fromFieldsWithTypes<string>({ type: "0x1::option::Option<" + `0x1::string::String` + ">", fields: { vec: [item.fields.next_epoch_p2p_address] } }).vec[0] : null, nextEpochPrimaryAddress: item.fields.next_epoch_primary_address !== null ? Option.fromFieldsWithTypes<string>({ type: "0x1::option::Option<" + `0x1::string::String` + ">", fields: { vec: [item.fields.next_epoch_primary_address] } }).vec[0] : null, nextEpochWorkerAddress: item.fields.next_epoch_worker_address !== null ? Option.fromFieldsWithTypes<string>({ type: "0x1::option::Option<" + `0x1::string::String` + ">", fields: { vec: [item.fields.next_epoch_worker_address] } }).vec[0] : null, extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorMetadata { return ValidatorMetadata.fromFields( bcs.de([ValidatorMetadata.$typeName, ], data, encoding) ) }

 }

/* ============================== Validator =============================== */

bcs.registerStructType( "0x3::validator::Validator", {
metadata: `0x3::validator::ValidatorMetadata`,
voting_power: `u64`,
operation_cap_id: `0x2::object::ID`,
gas_price: `u64`,
staking_pool: `0x3::staking_pool::StakingPool`,
commission_rate: `u64`,
next_epoch_stake: `u64`,
next_epoch_gas_price: `u64`,
next_epoch_commission_rate: `u64`,
extra_fields: `0x2::bag::Bag`,
} )

export function isValidator(type: Type): boolean { return type === "0x3::validator::Validator"; }

export interface ValidatorFields { metadata: ValidatorMetadata; votingPower: bigint; operationCapId: string; gasPrice: bigint; stakingPool: StakingPool; commissionRate: bigint; nextEpochStake: bigint; nextEpochGasPrice: bigint; nextEpochCommissionRate: bigint; extraFields: Bag }

export class Validator { static readonly $typeName = "0x3::validator::Validator"; static readonly $numTypeParams = 0;

  readonly metadata: ValidatorMetadata; readonly votingPower: bigint; readonly operationCapId: string; readonly gasPrice: bigint; readonly stakingPool: StakingPool; readonly commissionRate: bigint; readonly nextEpochStake: bigint; readonly nextEpochGasPrice: bigint; readonly nextEpochCommissionRate: bigint; readonly extraFields: Bag

 constructor( fields: ValidatorFields, ) { this.metadata = fields.metadata; this.votingPower = fields.votingPower; this.operationCapId = fields.operationCapId; this.gasPrice = fields.gasPrice; this.stakingPool = fields.stakingPool; this.commissionRate = fields.commissionRate; this.nextEpochStake = fields.nextEpochStake; this.nextEpochGasPrice = fields.nextEpochGasPrice; this.nextEpochCommissionRate = fields.nextEpochCommissionRate; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): Validator { return new Validator( { metadata: ValidatorMetadata.fromFields(fields.metadata), votingPower: BigInt(fields.voting_power), operationCapId: ID.fromFields(fields.operation_cap_id).bytes, gasPrice: BigInt(fields.gas_price), stakingPool: StakingPool.fromFields(fields.staking_pool), commissionRate: BigInt(fields.commission_rate), nextEpochStake: BigInt(fields.next_epoch_stake), nextEpochGasPrice: BigInt(fields.next_epoch_gas_price), nextEpochCommissionRate: BigInt(fields.next_epoch_commission_rate), extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): Validator { if (!isValidator(item.type)) { throw new Error("not a Validator type");

 } return new Validator( { metadata: ValidatorMetadata.fromFieldsWithTypes(item.fields.metadata), votingPower: BigInt(item.fields.voting_power), operationCapId: item.fields.operation_cap_id, gasPrice: BigInt(item.fields.gas_price), stakingPool: StakingPool.fromFieldsWithTypes(item.fields.staking_pool), commissionRate: BigInt(item.fields.commission_rate), nextEpochStake: BigInt(item.fields.next_epoch_stake), nextEpochGasPrice: BigInt(item.fields.next_epoch_gas_price), nextEpochCommissionRate: BigInt(item.fields.next_epoch_commission_rate), extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): Validator { return Validator.fromFields( bcs.de([Validator.$typeName, ], data, encoding) ) }

 }

/* ============================== StakingRequestEvent =============================== */

bcs.registerStructType( "0x3::validator::StakingRequestEvent", {
pool_id: `0x2::object::ID`,
validator_address: `address`,
staker_address: `address`,
epoch: `u64`,
amount: `u64`,
} )

export function isStakingRequestEvent(type: Type): boolean { return type === "0x3::validator::StakingRequestEvent"; }

export interface StakingRequestEventFields { poolId: string; validatorAddress: string; stakerAddress: string; epoch: bigint; amount: bigint }

export class StakingRequestEvent { static readonly $typeName = "0x3::validator::StakingRequestEvent"; static readonly $numTypeParams = 0;

  readonly poolId: string; readonly validatorAddress: string; readonly stakerAddress: string; readonly epoch: bigint; readonly amount: bigint

 constructor( fields: StakingRequestEventFields, ) { this.poolId = fields.poolId; this.validatorAddress = fields.validatorAddress; this.stakerAddress = fields.stakerAddress; this.epoch = fields.epoch; this.amount = fields.amount; }

 static fromFields( fields: Record<string, any> ): StakingRequestEvent { return new StakingRequestEvent( { poolId: ID.fromFields(fields.pool_id).bytes, validatorAddress: `0x${fields.validator_address}`, stakerAddress: `0x${fields.staker_address}`, epoch: BigInt(fields.epoch), amount: BigInt(fields.amount) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): StakingRequestEvent { if (!isStakingRequestEvent(item.type)) { throw new Error("not a StakingRequestEvent type");

 } return new StakingRequestEvent( { poolId: item.fields.pool_id, validatorAddress: `0x${item.fields.validator_address}`, stakerAddress: `0x${item.fields.staker_address}`, epoch: BigInt(item.fields.epoch), amount: BigInt(item.fields.amount) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): StakingRequestEvent { return StakingRequestEvent.fromFields( bcs.de([StakingRequestEvent.$typeName, ], data, encoding) ) }

 }

/* ============================== UnstakingRequestEvent =============================== */

bcs.registerStructType( "0x3::validator::UnstakingRequestEvent", {
pool_id: `0x2::object::ID`,
validator_address: `address`,
staker_address: `address`,
stake_activation_epoch: `u64`,
unstaking_epoch: `u64`,
principal_amount: `u64`,
reward_amount: `u64`,
} )

export function isUnstakingRequestEvent(type: Type): boolean { return type === "0x3::validator::UnstakingRequestEvent"; }

export interface UnstakingRequestEventFields { poolId: string; validatorAddress: string; stakerAddress: string; stakeActivationEpoch: bigint; unstakingEpoch: bigint; principalAmount: bigint; rewardAmount: bigint }

export class UnstakingRequestEvent { static readonly $typeName = "0x3::validator::UnstakingRequestEvent"; static readonly $numTypeParams = 0;

  readonly poolId: string; readonly validatorAddress: string; readonly stakerAddress: string; readonly stakeActivationEpoch: bigint; readonly unstakingEpoch: bigint; readonly principalAmount: bigint; readonly rewardAmount: bigint

 constructor( fields: UnstakingRequestEventFields, ) { this.poolId = fields.poolId; this.validatorAddress = fields.validatorAddress; this.stakerAddress = fields.stakerAddress; this.stakeActivationEpoch = fields.stakeActivationEpoch; this.unstakingEpoch = fields.unstakingEpoch; this.principalAmount = fields.principalAmount; this.rewardAmount = fields.rewardAmount; }

 static fromFields( fields: Record<string, any> ): UnstakingRequestEvent { return new UnstakingRequestEvent( { poolId: ID.fromFields(fields.pool_id).bytes, validatorAddress: `0x${fields.validator_address}`, stakerAddress: `0x${fields.staker_address}`, stakeActivationEpoch: BigInt(fields.stake_activation_epoch), unstakingEpoch: BigInt(fields.unstaking_epoch), principalAmount: BigInt(fields.principal_amount), rewardAmount: BigInt(fields.reward_amount) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): UnstakingRequestEvent { if (!isUnstakingRequestEvent(item.type)) { throw new Error("not a UnstakingRequestEvent type");

 } return new UnstakingRequestEvent( { poolId: item.fields.pool_id, validatorAddress: `0x${item.fields.validator_address}`, stakerAddress: `0x${item.fields.staker_address}`, stakeActivationEpoch: BigInt(item.fields.stake_activation_epoch), unstakingEpoch: BigInt(item.fields.unstaking_epoch), principalAmount: BigInt(item.fields.principal_amount), rewardAmount: BigInt(item.fields.reward_amount) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): UnstakingRequestEvent { return UnstakingRequestEvent.fromFields( bcs.de([UnstakingRequestEvent.$typeName, ], data, encoding) ) }

 }
