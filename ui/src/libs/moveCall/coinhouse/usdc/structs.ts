import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== EventMint =============================== */

bcs.registerStructType( "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::EventMint", {
amount: `u64`,
user: `address`,
} )

export function isEventMint(type: Type): boolean { return type === "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::EventMint"; }

export interface EventMintFields { amount: bigint; user: string }

export class EventMint { static readonly $typeName = "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::EventMint"; static readonly $numTypeParams = 0;

  readonly amount: bigint; readonly user: string

 constructor( fields: EventMintFields, ) { this.amount = fields.amount; this.user = fields.user; }

 static fromFields( fields: Record<string, any> ): EventMint { return new EventMint( { amount: BigInt(fields.amount), user: `0x${fields.user}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventMint { if (!isEventMint(item.type)) { throw new Error("not a EventMint type");

 } return new EventMint( { amount: BigInt(item.fields.amount), user: `0x${item.fields.user}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventMint { return EventMint.fromFields( bcs.de([EventMint.$typeName, ], data, encoding) ) }

 }

/* ============================== EventBurn =============================== */

bcs.registerStructType( "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::EventBurn", {
amount: `u64`,
user: `address`,
} )

export function isEventBurn(type: Type): boolean { return type === "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::EventBurn"; }

export interface EventBurnFields { amount: bigint; user: string }

export class EventBurn { static readonly $typeName = "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::EventBurn"; static readonly $numTypeParams = 0;

  readonly amount: bigint; readonly user: string

 constructor( fields: EventBurnFields, ) { this.amount = fields.amount; this.user = fields.user; }

 static fromFields( fields: Record<string, any> ): EventBurn { return new EventBurn( { amount: BigInt(fields.amount), user: `0x${fields.user}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventBurn { if (!isEventBurn(item.type)) { throw new Error("not a EventBurn type");

 } return new EventBurn( { amount: BigInt(item.fields.amount), user: `0x${item.fields.user}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventBurn { return EventBurn.fromFields( bcs.de([EventBurn.$typeName, ], data, encoding) ) }

 }

/* ============================== USDC =============================== */

bcs.registerStructType( "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::USDC", {
dummy_field: `bool`,
} )

export function isUSDC(type: Type): boolean { return type === "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::USDC"; }

export interface USDCFields { dummyField: boolean }

export class USDC { static readonly $typeName = "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::usdc::USDC"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): USDC { return new USDC( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): USDC { if (!isUSDC(item.type)) { throw new Error("not a USDC type");

 } return new USDC( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): USDC { return USDC.fromFields( bcs.de([USDC.$typeName, ], data, encoding) ) }

 }
