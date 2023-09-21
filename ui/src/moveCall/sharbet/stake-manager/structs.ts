import {Balance} from "../../_dependencies/onchain/0x2/balance/structs";
import {LinkedTable} from "../../_dependencies/onchain/0x2/linked-table/structs";
import {UID} from "../../_dependencies/onchain/0x2/object/structs";
import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== StakeProfile =============================== */

bcs.registerStructType( "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::stake_manager::StakeProfile", {
id: `0x2::object::UID`,
reserve_stakedsui: `0x2::linked_table::LinkedTable<0x2::object::ID, 0x3::staking_pool::StakedSui>`,
amount_staked_sui: `u64`,
amount_reward_sui: `u64`,
pending_sui: `0x2::balance::Balance<0x2::sui::SUI>`,
} )

export function isStakeProfile(type: Type): boolean { return type === "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::stake_manager::StakeProfile"; }

export interface StakeProfileFields { id: string; reserveStakedsui: LinkedTable<string>; amountStakedSui: bigint; amountRewardSui: bigint; pendingSui: Balance }

export class StakeProfile { static readonly $typeName = "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::stake_manager::StakeProfile"; static readonly $numTypeParams = 0;

  readonly id: string; readonly reserveStakedsui: LinkedTable<string>; readonly amountStakedSui: bigint; readonly amountRewardSui: bigint; readonly pendingSui: Balance

 constructor( fields: StakeProfileFields, ) { this.id = fields.id; this.reserveStakedsui = fields.reserveStakedsui; this.amountStakedSui = fields.amountStakedSui; this.amountRewardSui = fields.amountRewardSui; this.pendingSui = fields.pendingSui; }

 static fromFields( fields: Record<string, any> ): StakeProfile { return new StakeProfile( { id: UID.fromFields(fields.id).id, reserveStakedsui: LinkedTable.fromFields<string>([`0x2::object::ID`, `0x3::staking_pool::StakedSui`], fields.reserve_stakedsui), amountStakedSui: BigInt(fields.amount_staked_sui), amountRewardSui: BigInt(fields.amount_reward_sui), pendingSui: Balance.fromFields(`0x2::sui::SUI`, fields.pending_sui) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): StakeProfile { if (!isStakeProfile(item.type)) { throw new Error("not a StakeProfile type");

 } return new StakeProfile( { id: item.fields.id.id, reserveStakedsui: LinkedTable.fromFieldsWithTypes<string>(item.fields.reserve_stakedsui), amountStakedSui: BigInt(item.fields.amount_staked_sui), amountRewardSui: BigInt(item.fields.amount_reward_sui), pendingSui: new Balance( `0x2::sui::SUI`, BigInt(item.fields.pending_sui) ) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): StakeProfile { return StakeProfile.fromFields( bcs.de([StakeProfile.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isStakeProfile(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a StakeProfile object`); } return StakeProfile.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<StakeProfile> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching StakeProfile object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isStakeProfile(res.data.content.type)) { throw new Error(`object at id ${id} is not a StakeProfile object`); }
 return StakeProfile.fromFieldsWithTypes(res.data.content); }

 }
