import {UID} from "../../_dependencies/onchain/0x2/object/structs";
import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== Root =============================== */

bcs.registerStructType( "0x103ebb7a6bb84c8218126be46dd8ac71754396e8be8d8916a6fd93c72eef615f::root::Root", {
id: `0x2::object::UID`,
} )

export function isRoot(type: Type): boolean { return type === "0x103ebb7a6bb84c8218126be46dd8ac71754396e8be8d8916a6fd93c72eef615f::root::Root"; }

export interface RootFields { id: string }

export class Root { static readonly $typeName = "0x103ebb7a6bb84c8218126be46dd8ac71754396e8be8d8916a6fd93c72eef615f::root::Root"; static readonly $numTypeParams = 0;

  readonly id: string

 constructor( id: string, ) { this.id = id; }

 static fromFields( fields: Record<string, any> ): Root { return new Root( UID.fromFields(fields.id).id ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): Root { if (!isRoot(item.type)) { throw new Error("not a Root type");

 } return new Root( item.fields.id.id ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): Root { return Root.fromFields( bcs.de([Root.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRoot(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Root object`); } return Root.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<Root> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching Root object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isRoot(res.data.content.type)) { throw new Error(`object at id ${id} is not a Root object`); }
 return Root.fromFieldsWithTypes(res.data.content); }

 }
