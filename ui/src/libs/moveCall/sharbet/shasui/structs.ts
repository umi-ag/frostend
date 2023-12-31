import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== EventMint =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::EventMint", {
amount: `u64`,
user: `address`,
} )

export function isEventMint(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::EventMint"; }

export interface EventMintFields { amount: bigint; user: string }

export class EventMint { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::EventMint"; static readonly $numTypeParams = 0;

  readonly amount: bigint; readonly user: string

 constructor( fields: EventMintFields, ) { this.amount = fields.amount; this.user = fields.user; }

 static fromFields( fields: Record<string, any> ): EventMint { return new EventMint( { amount: BigInt(fields.amount), user: `0x${fields.user}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventMint { if (!isEventMint(item.type)) { throw new Error("not a EventMint type");

 } return new EventMint( { amount: BigInt(item.fields.amount), user: `0x${item.fields.user}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventMint { return EventMint.fromFields( bcs.de([EventMint.$typeName, ], data, encoding) ) }

 }

/* ============================== EventBurn =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::EventBurn", {
amount: `u64`,
user: `address`,
} )

export function isEventBurn(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::EventBurn"; }

export interface EventBurnFields { amount: bigint; user: string }

export class EventBurn { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::EventBurn"; static readonly $numTypeParams = 0;

  readonly amount: bigint; readonly user: string

 constructor( fields: EventBurnFields, ) { this.amount = fields.amount; this.user = fields.user; }

 static fromFields( fields: Record<string, any> ): EventBurn { return new EventBurn( { amount: BigInt(fields.amount), user: `0x${fields.user}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventBurn { if (!isEventBurn(item.type)) { throw new Error("not a EventBurn type");

 } return new EventBurn( { amount: BigInt(item.fields.amount), user: `0x${item.fields.user}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventBurn { return EventBurn.fromFields( bcs.de([EventBurn.$typeName, ], data, encoding) ) }

 }

/* ============================== SHASUI =============================== */

bcs.registerStructType( "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::SHASUI", {
dummy_field: `bool`,
} )

export function isSHASUI(type: Type): boolean { return type === "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::SHASUI"; }

export interface SHASUIFields { dummyField: boolean }

export class SHASUI { static readonly $typeName = "0x883e6ba8d9c14186f703e264455bbeae9cd2d4d56a86fde34386602e00e0df8f::shasui::SHASUI"; static readonly $numTypeParams = 0;

  readonly dummyField: boolean

 constructor( dummyField: boolean, ) { this.dummyField = dummyField; }

 static fromFields( fields: Record<string, any> ): SHASUI { return new SHASUI( fields.dummy_field ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): SHASUI { if (!isSHASUI(item.type)) { throw new Error("not a SHASUI type");

 } return new SHASUI( item.fields.dummy_field ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): SHASUI { return SHASUI.fromFields( bcs.de([SHASUI.$typeName, ], data, encoding) ) }

 }
