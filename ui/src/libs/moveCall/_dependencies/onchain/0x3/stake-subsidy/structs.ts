import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Bag} from "../../0x2/bag/structs";
import {Balance} from "../../0x2/balance/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== StakeSubsidy =============================== */

bcs.registerStructType( "0x3::stake_subsidy::StakeSubsidy", {
balance: `0x2::balance::Balance<0x2::sui::SUI>`,
distribution_counter: `u64`,
current_distribution_amount: `u64`,
stake_subsidy_period_length: `u64`,
stake_subsidy_decrease_rate: `u16`,
extra_fields: `0x2::bag::Bag`,
} )

export function isStakeSubsidy(type: Type): boolean { return type === "0x3::stake_subsidy::StakeSubsidy"; }

export interface StakeSubsidyFields { balance: Balance; distributionCounter: bigint; currentDistributionAmount: bigint; stakeSubsidyPeriodLength: bigint; stakeSubsidyDecreaseRate: number; extraFields: Bag }

export class StakeSubsidy { static readonly $typeName = "0x3::stake_subsidy::StakeSubsidy"; static readonly $numTypeParams = 0;

  readonly balance: Balance; readonly distributionCounter: bigint; readonly currentDistributionAmount: bigint; readonly stakeSubsidyPeriodLength: bigint; readonly stakeSubsidyDecreaseRate: number; readonly extraFields: Bag

 constructor( fields: StakeSubsidyFields, ) { this.balance = fields.balance; this.distributionCounter = fields.distributionCounter; this.currentDistributionAmount = fields.currentDistributionAmount; this.stakeSubsidyPeriodLength = fields.stakeSubsidyPeriodLength; this.stakeSubsidyDecreaseRate = fields.stakeSubsidyDecreaseRate; this.extraFields = fields.extraFields; }

 static fromFields( fields: Record<string, any> ): StakeSubsidy { return new StakeSubsidy( { balance: Balance.fromFields(`0x2::sui::SUI`, fields.balance), distributionCounter: BigInt(fields.distribution_counter), currentDistributionAmount: BigInt(fields.current_distribution_amount), stakeSubsidyPeriodLength: BigInt(fields.stake_subsidy_period_length), stakeSubsidyDecreaseRate: fields.stake_subsidy_decrease_rate, extraFields: Bag.fromFields(fields.extra_fields) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): StakeSubsidy { if (!isStakeSubsidy(item.type)) { throw new Error("not a StakeSubsidy type");

 } return new StakeSubsidy( { balance: new Balance( `0x2::sui::SUI`, BigInt(item.fields.balance) ), distributionCounter: BigInt(item.fields.distribution_counter), currentDistributionAmount: BigInt(item.fields.current_distribution_amount), stakeSubsidyPeriodLength: BigInt(item.fields.stake_subsidy_period_length), stakeSubsidyDecreaseRate: item.fields.stake_subsidy_decrease_rate, extraFields: Bag.fromFieldsWithTypes(item.fields.extra_fields) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): StakeSubsidy { return StakeSubsidy.fromFields( bcs.de([StakeSubsidy.$typeName, ], data, encoding) ) }

 }
