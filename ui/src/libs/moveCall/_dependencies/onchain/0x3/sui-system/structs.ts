import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {UID} from "../../0x2/object/structs";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== SuiSystemState =============================== */

bcs.registerStructType( "0x3::sui_system::SuiSystemState", {
id: `0x2::object::UID`,
version: `u64`,
} )

export function isSuiSystemState(type: Type): boolean { return type === "0x3::sui_system::SuiSystemState"; }

export interface SuiSystemStateFields { id: string; version: bigint }

export class SuiSystemState { static readonly $typeName = "0x3::sui_system::SuiSystemState"; static readonly $numTypeParams = 0;

  readonly id: string; readonly version: bigint

 constructor( fields: SuiSystemStateFields, ) { this.id = fields.id; this.version = fields.version; }

 static fromFields( fields: Record<string, any> ): SuiSystemState { return new SuiSystemState( { id: UID.fromFields(fields.id).id, version: BigInt(fields.version) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SuiSystemState { if (!isSuiSystemState(item.type)) { throw new Error("not a SuiSystemState type");

 } return new SuiSystemState( { id: item.fields.id.id, version: BigInt(item.fields.version) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SuiSystemState { return SuiSystemState.fromFields( bcs.de([SuiSystemState.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSuiSystemState(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a SuiSystemState object`); } return SuiSystemState.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<SuiSystemState> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching SuiSystemState object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isSuiSystemState(res.data.content.type)) { throw new Error(`object at id ${id} is not a SuiSystemState object`); }
 return SuiSystemState.fromFieldsWithTypes(res.data.content); }

 }
