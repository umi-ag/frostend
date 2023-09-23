import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== ETH =============================== */

bcs.registerStructType( "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::ETH", {
dummy_field: `bool`,
} )

export function isETH(type: Type): boolean { return type === "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::ETH"; }

export interface ETHFields { dummyField: boolean }

export class ETH { static readonly $typeName = "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::ETH"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): ETH { return new ETH( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ETH { if (!isETH(item.type)) { throw new Error("not a ETH type");

 } return new ETH( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ETH { return ETH.fromFields( bcs.de([ETH.$typeName, ], data, encoding) ) }

 }

/* ============================== EventMint =============================== */

bcs.registerStructType( "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::EventMint", {
amount: `u64`,
user: `address`,
} )

export function isEventMint(type: Type): boolean { return type === "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::EventMint"; }

export interface EventMintFields { amount: bigint; user: string }

export class EventMint { static readonly $typeName = "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::EventMint"; static readonly $numTypeParams = 0;

  readonly amount: bigint; readonly user: string

 constructor( fields: EventMintFields, ) { this.amount = fields.amount; this.user = fields.user; }

 static fromFields( fields: Record<string, any> ): EventMint { return new EventMint( { amount: BigInt(fields.amount), user: `0x${fields.user}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventMint { if (!isEventMint(item.type)) { throw new Error("not a EventMint type");

 } return new EventMint( { amount: BigInt(item.fields.amount), user: `0x${item.fields.user}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventMint { return EventMint.fromFields( bcs.de([EventMint.$typeName, ], data, encoding) ) }

 }

/* ============================== EventBurn =============================== */

bcs.registerStructType( "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::EventBurn", {
amount: `u64`,
user: `address`,
} )

export function isEventBurn(type: Type): boolean { return type === "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::EventBurn"; }

export interface EventBurnFields { amount: bigint; user: string }

export class EventBurn { static readonly $typeName = "0x2d484eb3ad956818923e850ee7df41dee476cb75d675159dbf9aa725d7b88919::eth::EventBurn"; static readonly $numTypeParams = 0;

  readonly amount: bigint; readonly user: string

 constructor( fields: EventBurnFields, ) { this.amount = fields.amount; this.user = fields.user; }

 static fromFields( fields: Record<string, any> ): EventBurn { return new EventBurn( { amount: BigInt(fields.amount), user: `0x${fields.user}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventBurn { if (!isEventBurn(item.type)) { throw new Error("not a EventBurn type");

 } return new EventBurn( { amount: BigInt(item.fields.amount), user: `0x${item.fields.user}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventBurn { return EventBurn.fromFields( bcs.de([EventBurn.$typeName, ], data, encoding) ) }

 }
