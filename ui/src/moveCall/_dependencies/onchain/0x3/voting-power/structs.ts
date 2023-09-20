import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== VotingPowerInfo =============================== */

bcs.registerStructType( "0x3::voting_power::VotingPowerInfo", {
validator_index: `u64`,
voting_power: `u64`,
} )

export function isVotingPowerInfo(type: Type): boolean { return type === "0x3::voting_power::VotingPowerInfo"; }

export interface VotingPowerInfoFields { validatorIndex: bigint; votingPower: bigint }

export class VotingPowerInfo { static readonly $typeName = "0x3::voting_power::VotingPowerInfo"; static readonly $numTypeParams = 0;

  readonly validatorIndex: bigint; readonly votingPower: bigint

 constructor( fields: VotingPowerInfoFields, ) { this.validatorIndex = fields.validatorIndex; this.votingPower = fields.votingPower; }

 static fromFields( fields: Record<string, any> ): VotingPowerInfo { return new VotingPowerInfo( { validatorIndex: BigInt(fields.validator_index), votingPower: BigInt(fields.voting_power) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): VotingPowerInfo { if (!isVotingPowerInfo(item.type)) { throw new Error("not a VotingPowerInfo type");

 } return new VotingPowerInfo( { validatorIndex: BigInt(item.fields.validator_index), votingPower: BigInt(item.fields.voting_power) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): VotingPowerInfo { return VotingPowerInfo.fromFields( bcs.de([VotingPowerInfo.$typeName, ], data, encoding) ) }

 }

/* ============================== VotingPowerInfoV2 =============================== */

bcs.registerStructType( "0x3::voting_power::VotingPowerInfoV2", {
validator_index: `u64`,
voting_power: `u64`,
stake: `u64`,
} )

export function isVotingPowerInfoV2(type: Type): boolean { return type === "0x3::voting_power::VotingPowerInfoV2"; }

export interface VotingPowerInfoV2Fields { validatorIndex: bigint; votingPower: bigint; stake: bigint }

export class VotingPowerInfoV2 { static readonly $typeName = "0x3::voting_power::VotingPowerInfoV2"; static readonly $numTypeParams = 0;

  readonly validatorIndex: bigint; readonly votingPower: bigint; readonly stake: bigint

 constructor( fields: VotingPowerInfoV2Fields, ) { this.validatorIndex = fields.validatorIndex; this.votingPower = fields.votingPower; this.stake = fields.stake; }

 static fromFields( fields: Record<string, any> ): VotingPowerInfoV2 { return new VotingPowerInfoV2( { validatorIndex: BigInt(fields.validator_index), votingPower: BigInt(fields.voting_power), stake: BigInt(fields.stake) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): VotingPowerInfoV2 { if (!isVotingPowerInfoV2(item.type)) { throw new Error("not a VotingPowerInfoV2 type");

 } return new VotingPowerInfoV2( { validatorIndex: BigInt(item.fields.validator_index), votingPower: BigInt(item.fields.voting_power), stake: BigInt(item.fields.stake) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): VotingPowerInfoV2 { return VotingPowerInfoV2.fromFields( bcs.de([VotingPowerInfoV2.$typeName, ], data, encoding) ) }

 }
