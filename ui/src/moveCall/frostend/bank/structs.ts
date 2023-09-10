import {Balance} from "../../_dependencies/onchain/0x2/balance/structs";
import {UID} from "../../_dependencies/onchain/0x2/object/structs";
import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type, parseTypeName} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== Bank =============================== */

bcs.registerStructType( "0x3af8a3597faf9e5a7eb48d4be3ce7a9493d5acea3b8630fb8be9bc8fde2a5ad6::bank::Bank<T0>", {
id: `0x2::object::UID`,
coin_sy_reserve: `0x2::balance::Balance<T0>`,
} )

export function isBank(type: Type): boolean { return type.startsWith("0x3af8a3597faf9e5a7eb48d4be3ce7a9493d5acea3b8630fb8be9bc8fde2a5ad6::bank::Bank<"); }

export interface BankFields { id: string; coinSyReserve: Balance }

export class Bank { static readonly $typeName = "0x3af8a3597faf9e5a7eb48d4be3ce7a9493d5acea3b8630fb8be9bc8fde2a5ad6::bank::Bank"; static readonly $numTypeParams = 1;

 readonly $typeArg: Type;

; readonly id: string; readonly coinSyReserve: Balance

 constructor(typeArg: Type, fields: BankFields, ) { this.$typeArg = typeArg;

 this.id = fields.id;; this.coinSyReserve = fields.coinSyReserve; }

 static fromFields( typeArg: Type, fields: Record<string, any> ): Bank { return new Bank( typeArg, { id: UID.fromFields(fields.id).id, coinSyReserve: Balance.fromFields(`${typeArg}`, fields.coin_sy_reserve) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): Bank { if (!isBank(item.type)) { throw new Error("not a Bank type");

 } const { typeArgs } = parseTypeName(item.type);

 return new Bank( typeArgs[0], { id: item.fields.id.id, coinSyReserve: new Balance( `${typeArgs[0]}`, BigInt(item.fields.coin_sy_reserve) ) } ) }

 static fromBcs( typeArg: Type, data: Uint8Array | string, encoding?: Encoding ): Bank { return Bank.fromFields( typeArg, bcs.de([Bank.$typeName, typeArg,], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBank(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Bank object`); } return Bank.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<Bank> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching Bank object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isBank(res.data.content.type)) { throw new Error(`object at id ${id} is not a Bank object`); }
 return Bank.fromFieldsWithTypes(res.data.content); }

 }
