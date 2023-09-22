import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== STSUI_COIN =============================== */

bcs.registerStructType( "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::stsui_coin::STSUI_COIN", {
dummy_field: `bool`,
} )

export function isSTSUI_COIN(type: Type): boolean { return type === "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::stsui_coin::STSUI_COIN"; }

export interface STSUI_COINFields { dummyField: boolean }

export class STSUI_COIN { static readonly $typeName = "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::stsui_coin::STSUI_COIN"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): STSUI_COIN { return new STSUI_COIN( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): STSUI_COIN { if (!isSTSUI_COIN(item.type)) { throw new Error("not a STSUI_COIN type");

 } return new STSUI_COIN( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): STSUI_COIN { return STSUI_COIN.fromFields( bcs.de([STSUI_COIN.$typeName, ], data, encoding) ) }

 }
