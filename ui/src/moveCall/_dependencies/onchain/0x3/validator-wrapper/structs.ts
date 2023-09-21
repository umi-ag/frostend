import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Versioned} from "../../0x2/versioned/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== ValidatorWrapper =============================== */

bcs.registerStructType( "0x3::validator_wrapper::ValidatorWrapper", {
inner: `0x2::versioned::Versioned`,
} )

export function isValidatorWrapper(type: Type): boolean { return type === "0x3::validator_wrapper::ValidatorWrapper"; }

export interface ValidatorWrapperFields { inner: Versioned }

export class ValidatorWrapper { static readonly $typeName = "0x3::validator_wrapper::ValidatorWrapper"; static readonly $numTypeParams = 0;

  readonly inner: Versioned

 constructor( inner: Versioned, ) { this.inner = inner; }

 static fromFields( fields: Record<string, any> ): ValidatorWrapper { return new ValidatorWrapper( Versioned.fromFields(fields.inner) ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorWrapper { if (!isValidatorWrapper(item.type)) { throw new Error("not a ValidatorWrapper type");

 } return new ValidatorWrapper( Versioned.fromFieldsWithTypes(item.fields.inner) ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorWrapper { return ValidatorWrapper.fromFields( bcs.de([ValidatorWrapper.$typeName, ], data, encoding) ) }

 }
