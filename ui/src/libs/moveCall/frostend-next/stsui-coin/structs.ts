import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== STSUI_COIN =============================== */

bcs.registerStructType( "0x103ebb7a6bb84c8218126be46dd8ac71754396e8be8d8916a6fd93c72eef615f::stsui_coin::STSUI_COIN", {
dummy_field: `bool`,
} )

export function isSTSUI_COIN(type: Type): boolean { return type === "0x103ebb7a6bb84c8218126be46dd8ac71754396e8be8d8916a6fd93c72eef615f::stsui_coin::STSUI_COIN"; }

export interface STSUI_COINFields { dummyField: boolean }

export class STSUI_COIN { static readonly $typeName = "0x103ebb7a6bb84c8218126be46dd8ac71754396e8be8d8916a6fd93c72eef615f::stsui_coin::STSUI_COIN"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): STSUI_COIN { return new STSUI_COIN( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): STSUI_COIN { if (!isSTSUI_COIN(item.type)) { throw new Error("not a STSUI_COIN type");

 } return new STSUI_COIN( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): STSUI_COIN { return STSUI_COIN.fromFields( bcs.de([STSUI_COIN.$typeName, ], data, encoding) ) }

 }
