import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== Rule =============================== */

bcs.registerStructType( "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::unstake_policy::Rule", {
dummy_field: `bool`,
} )

export function isRule(type: Type): boolean { return type === "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::unstake_policy::Rule"; }

export interface RuleFields { dummyField: boolean }

export class Rule { static readonly $typeName = "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::unstake_policy::Rule"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): Rule { return new Rule( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): Rule { if (!isRule(item.type)) { throw new Error("not a Rule type");

 } return new Rule( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): Rule { return Rule.fromFields( bcs.de([Rule.$typeName, ], data, encoding) ) }

 }
