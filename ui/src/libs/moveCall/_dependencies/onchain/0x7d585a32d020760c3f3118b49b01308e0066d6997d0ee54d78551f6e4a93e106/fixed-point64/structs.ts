import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== FixedPoint64 =============================== */

bcs.registerStructType( "0x7d585a32d020760c3f3118b49b01308e0066d6997d0ee54d78551f6e4a93e106::fixed_point64::FixedPoint64", {
value: `u128`,
} )

export function isFixedPoint64(type: Type): boolean { return type === "0x7d585a32d020760c3f3118b49b01308e0066d6997d0ee54d78551f6e4a93e106::fixed_point64::FixedPoint64"; }

export interface FixedPoint64Fields { value: bigint }

export class FixedPoint64 { static readonly $typeName = "0x7d585a32d020760c3f3118b49b01308e0066d6997d0ee54d78551f6e4a93e106::fixed_point64::FixedPoint64"; static readonly $numTypeParams = 0;

  readonly value: bigint

 constructor( value: bigint, ) { this.value = value; }

 static fromFields( fields: Record<string, any> ): FixedPoint64 { return new FixedPoint64( BigInt(fields.value) ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): FixedPoint64 { if (!isFixedPoint64(item.type)) { throw new Error("not a FixedPoint64 type");

 } return new FixedPoint64( BigInt(item.fields.value) ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): FixedPoint64 { return FixedPoint64.fromFields( bcs.de([FixedPoint64.$typeName, ], data, encoding) ) }

 }
