import {Balance, Supply} from "../../_dependencies/onchain/0x2/balance/structs";
import {UID} from "../../_dependencies/onchain/0x2/object/structs";
import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type, parseTypeName} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== PTCoin =============================== */

bcs.registerStructType( "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<T0>", {
dummy_field: `bool`,
} )

export function isPTCoin(type: Type): boolean { return type.startsWith("0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<"); }

export interface PTCoinFields { dummyField: boolean }

export class PTCoin { static readonly $typeName = "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin"; static readonly $numTypeParams = 1;

 readonly $typeArg: Type;

 readonly dummyField: boolean

 constructor(typeArg: Type, dummyField: boolean, ) { this.$typeArg = typeArg;

 this.dummyField = dummyField; }

 static fromFields( typeArg: Type, fields: Record<string, any> ): PTCoin { return new PTCoin( typeArg, fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): PTCoin { if (!isPTCoin(item.type)) { throw new Error("not a PTCoin type");

 } const { typeArgs } = parseTypeName(item.type);

 return new PTCoin( typeArgs[0], item.fields.dummy_field ) }

 static fromBcs( typeArg: Type, data: Uint8Array | string, encoding?: Encoding ): PTCoin { return PTCoin.fromFields( typeArg, bcs.de([PTCoin.$typeName, typeArg,], data, encoding) ) }

 }

/* ============================== YTCoin =============================== */

bcs.registerStructType( "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<T0>", {
dummy_field: `bool`,
} )

export function isYTCoin(type: Type): boolean { return type.startsWith("0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<"); }

export interface YTCoinFields { dummyField: boolean }

export class YTCoin { static readonly $typeName = "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin"; static readonly $numTypeParams = 1;

 readonly $typeArg: Type;

 readonly dummyField: boolean

 constructor(typeArg: Type, dummyField: boolean, ) { this.$typeArg = typeArg;

 this.dummyField = dummyField; }

 static fromFields( typeArg: Type, fields: Record<string, any> ): YTCoin { return new YTCoin( typeArg, fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): YTCoin { if (!isYTCoin(item.type)) { throw new Error("not a YTCoin type");

 } const { typeArgs } = parseTypeName(item.type);

 return new YTCoin( typeArgs[0], item.fields.dummy_field ) }

 static fromBcs( typeArg: Type, data: Uint8Array | string, encoding?: Encoding ): YTCoin { return YTCoin.fromFields( typeArg, bcs.de([YTCoin.$typeName, typeArg,], data, encoding) ) }

 }

/* ============================== Vault =============================== */

bcs.registerStructType( "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::Vault<T0>", {
id: `0x2::object::UID`,
coin_sy_reserve: `0x2::balance::Balance<T0>`,
coin_pt_reserve: `0x2::balance::Balance<0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<T0>>`,
coin_yt_reserve: `0x2::balance::Balance<0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<T0>>`,
coin_pt_supply: `0x2::balance::Supply<0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<T0>>`,
coin_yt_supply: `0x2::balance::Supply<0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<T0>>`,
} )

export function isVault(type: Type): boolean { return type.startsWith("0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::Vault<"); }

export interface VaultFields { id: string; coinSyReserve: Balance; coinPtReserve: Balance; coinYtReserve: Balance; coinPtSupply: Supply; coinYtSupply: Supply }

export class Vault { static readonly $typeName = "0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::Vault"; static readonly $numTypeParams = 1;

 readonly $typeArg: Type;

 readonly id: string; readonly coinSyReserve: Balance; readonly coinPtReserve: Balance; readonly coinYtReserve: Balance; readonly coinPtSupply: Supply; readonly coinYtSupply: Supply

 constructor(typeArg: Type, fields: VaultFields, ) { this.$typeArg = typeArg;

 this.id = fields.id; this.coinSyReserve = fields.coinSyReserve; this.coinPtReserve = fields.coinPtReserve; this.coinYtReserve = fields.coinYtReserve; this.coinPtSupply = fields.coinPtSupply; this.coinYtSupply = fields.coinYtSupply; }

 static fromFields( typeArg: Type, fields: Record<string, any> ): Vault { return new Vault( typeArg, { id: UID.fromFields(fields.id).id, coinSyReserve: Balance.fromFields(`${typeArg}`, fields.coin_sy_reserve), coinPtReserve: Balance.fromFields(`0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<${typeArg}>`, fields.coin_pt_reserve), coinYtReserve: Balance.fromFields(`0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<${typeArg}>`, fields.coin_yt_reserve), coinPtSupply: Supply.fromFields(`0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<${typeArg}>`, fields.coin_pt_supply), coinYtSupply: Supply.fromFields(`0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<${typeArg}>`, fields.coin_yt_supply) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): Vault { if (!isVault(item.type)) { throw new Error("not a Vault type");

 } const { typeArgs } = parseTypeName(item.type);

 return new Vault( typeArgs[0], { id: item.fields.id.id, coinSyReserve: new Balance( `${typeArgs[0]}`, BigInt(item.fields.coin_sy_reserve) ), coinPtReserve: new Balance( `0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::PTCoin<${typeArgs[0]}>`, BigInt(item.fields.coin_pt_reserve) ), coinYtReserve: new Balance( `0xfb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286::vault::YTCoin<${typeArgs[0]}>`, BigInt(item.fields.coin_yt_reserve) ), coinPtSupply: Supply.fromFieldsWithTypes(item.fields.coin_pt_supply), coinYtSupply: Supply.fromFieldsWithTypes(item.fields.coin_yt_supply) } ) }

 static fromBcs( typeArg: Type, data: Uint8Array | string, encoding?: Encoding ): Vault { return Vault.fromFields( typeArg, bcs.de([Vault.$typeName, typeArg,], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVault(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Vault object`); } return Vault.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<Vault> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching Vault object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isVault(res.data.content.type)) { throw new Error(`object at id ${id} is not a Vault object`); }
 return Vault.fromFieldsWithTypes(res.data.content); }

 }
