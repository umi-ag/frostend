import {Balance, Supply} from "../../_dependencies/onchain/0x2/balance/structs";
import {UID} from "../../_dependencies/onchain/0x2/object/structs";
import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== UNSTSUI =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI", {
dummy_field: `bool`,
} )

export function isUNSTSUI(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI"; }

export interface UNSTSUIFields { dummyField: boolean }

export class UNSTSUI { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): UNSTSUI { return new UNSTSUI( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): UNSTSUI { if (!isUNSTSUI(item.type)) { throw new Error("not a UNSTSUI type");

 } return new UNSTSUI( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): UNSTSUI { return UNSTSUI.fromFields( bcs.de([UNSTSUI.$typeName, ], data, encoding) ) }

 }

/* ============================== UNSTSUI_COIN =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN", {
dummy_field: `bool`,
} )

export function isUNSTSUI_COIN(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN"; }

export interface UNSTSUI_COINFields { dummyField: boolean }

export class UNSTSUI_COIN { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): UNSTSUI_COIN { return new UNSTSUI_COIN( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): UNSTSUI_COIN { if (!isUNSTSUI_COIN(item.type)) { throw new Error("not a UNSTSUI_COIN type");

 } return new UNSTSUI_COIN( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): UNSTSUI_COIN { return UNSTSUI_COIN.fromFields( bcs.de([UNSTSUI_COIN.$typeName, ], data, encoding) ) }

 }

/* ============================== UnstakeTicket =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UnstakeTicket", {
id: `0x2::object::UID`,
balance: `0x2::balance::Balance<0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN>`,
unstake_timestamp: `u64`,
} )

export function isUnstakeTicket(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UnstakeTicket"; }

export interface UnstakeTicketFields { id: string; balance: Balance; unstakeTimestamp: bigint }

export class UnstakeTicket { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UnstakeTicket"; static readonly $numTypeParams = 0;

  readonly id: string; readonly balance: Balance; readonly unstakeTimestamp: bigint

 constructor( fields: UnstakeTicketFields, ) { this.id = fields.id; this.balance = fields.balance; this.unstakeTimestamp = fields.unstakeTimestamp; }

 static fromFields( fields: Record<string, any> ): UnstakeTicket { return new UnstakeTicket( { id: UID.fromFields(fields.id).id, balance: Balance.fromFields(`0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN`, fields.balance), unstakeTimestamp: BigInt(fields.unstake_timestamp) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): UnstakeTicket { if (!isUnstakeTicket(item.type)) { throw new Error("not a UnstakeTicket type");

 } return new UnstakeTicket( { id: item.fields.id.id, balance: new Balance( `0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN`, BigInt(item.fields.balance) ), unstakeTimestamp: BigInt(item.fields.unstake_timestamp) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): UnstakeTicket { return UnstakeTicket.fromFields( bcs.de([UnstakeTicket.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUnstakeTicket(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UnstakeTicket object`); } return UnstakeTicket.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<UnstakeTicket> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching UnstakeTicket object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isUnstakeTicket(res.data.content.type)) { throw new Error(`object at id ${id} is not a UnstakeTicket object`); }
 return UnstakeTicket.fromFieldsWithTypes(res.data.content); }

 }

/* ============================== UnstSuiTreasuryCap =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UnstSuiTreasuryCap", {
id: `0x2::object::UID`,
total_supply: `0x2::balance::Supply<0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN>`,
} )

export function isUnstSuiTreasuryCap(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UnstSuiTreasuryCap"; }

export interface UnstSuiTreasuryCapFields { id: string; totalSupply: Supply }

export class UnstSuiTreasuryCap { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UnstSuiTreasuryCap"; static readonly $numTypeParams = 0;

  readonly id: string; readonly totalSupply: Supply

 constructor( fields: UnstSuiTreasuryCapFields, ) { this.id = fields.id; this.totalSupply = fields.totalSupply; }

 static fromFields( fields: Record<string, any> ): UnstSuiTreasuryCap { return new UnstSuiTreasuryCap( { id: UID.fromFields(fields.id).id, totalSupply: Supply.fromFields(`0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::unstsui::UNSTSUI_COIN`, fields.total_supply) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): UnstSuiTreasuryCap { if (!isUnstSuiTreasuryCap(item.type)) { throw new Error("not a UnstSuiTreasuryCap type");

 } return new UnstSuiTreasuryCap( { id: item.fields.id.id, totalSupply: Supply.fromFieldsWithTypes(item.fields.total_supply) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): UnstSuiTreasuryCap { return UnstSuiTreasuryCap.fromFields( bcs.de([UnstSuiTreasuryCap.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUnstSuiTreasuryCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UnstSuiTreasuryCap object`); } return UnstSuiTreasuryCap.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<UnstSuiTreasuryCap> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching UnstSuiTreasuryCap object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isUnstSuiTreasuryCap(res.data.content.type)) { throw new Error(`object at id ${id} is not a UnstSuiTreasuryCap object`); }
 return UnstSuiTreasuryCap.fromFieldsWithTypes(res.data.content); }

 }
