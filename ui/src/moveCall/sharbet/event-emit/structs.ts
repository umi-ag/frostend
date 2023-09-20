import {bcsOnchain as bcs} from "../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../_framework/util";
import {Encoding} from "@mysten/bcs";

/* ============================== EventDebug =============================== */

bcs.registerStructType( "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::event_emit::EventDebug", {
value: `u64`,
} )

export function isEventDebug(type: Type): boolean { return type === "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::event_emit::EventDebug"; }

export interface EventDebugFields { value: bigint }

export class EventDebug { static readonly $typeName = "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::event_emit::EventDebug"; static readonly $numTypeParams = 0;

  readonly value: bigint

 constructor( value: bigint, ) { this.value = value; }

 static fromFields( fields: Record<string, any> ): EventDebug { return new EventDebug( BigInt(fields.value) ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventDebug { if (!isEventDebug(item.type)) { throw new Error("not a EventDebug type");

 } return new EventDebug( BigInt(item.fields.value) ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventDebug { return EventDebug.fromFields( bcs.de([EventDebug.$typeName, ], data, encoding) ) }

 }

/* ============================== EventVector =============================== */

bcs.registerStructType( "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::event_emit::EventVector", {
value: `vector<u64>`,
} )

export function isEventVector(type: Type): boolean { return type === "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::event_emit::EventVector"; }

export interface EventVectorFields { value: Array<bigint> }

export class EventVector { static readonly $typeName = "0x6a14eff987270fd32ef739731e60f8925ca36f0394a8b1da7d846798f3aa6a8::event_emit::EventVector"; static readonly $numTypeParams = 0;

  readonly value: Array<bigint>

 constructor( value: Array<bigint>, ) { this.value = value; }

 static fromFields( fields: Record<string, any> ): EventVector { return new EventVector( fields.value.map((item: any) => BigInt(item)) ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): EventVector { if (!isEventVector(item.type)) { throw new Error("not a EventVector type");

 } return new EventVector( item.fields.value.map((item: any) => BigInt(item)) ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): EventVector { return EventVector.fromFields( bcs.de([EventVector.$typeName, ], data, encoding) ) }

 }
