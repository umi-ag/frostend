import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {UID} from "../../0x2/object/structs";
import {Encoding} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== UnverifiedValidatorOperationCap =============================== */

bcs.registerStructType( "0x3::validator_cap::UnverifiedValidatorOperationCap", {
id: `0x2::object::UID`,
authorizer_validator_address: `address`,
} )

export function isUnverifiedValidatorOperationCap(type: Type): boolean { return type === "0x3::validator_cap::UnverifiedValidatorOperationCap"; }

export interface UnverifiedValidatorOperationCapFields { id: string; authorizerValidatorAddress: string }

export class UnverifiedValidatorOperationCap { static readonly $typeName = "0x3::validator_cap::UnverifiedValidatorOperationCap"; static readonly $numTypeParams = 0;

  readonly id: string; readonly authorizerValidatorAddress: string

 constructor( fields: UnverifiedValidatorOperationCapFields, ) { this.id = fields.id; this.authorizerValidatorAddress = fields.authorizerValidatorAddress; }

 static fromFields( fields: Record<string, any> ): UnverifiedValidatorOperationCap { return new UnverifiedValidatorOperationCap( { id: UID.fromFields(fields.id).id, authorizerValidatorAddress: `0x${fields.authorizer_validator_address}` } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): UnverifiedValidatorOperationCap { if (!isUnverifiedValidatorOperationCap(item.type)) { throw new Error("not a UnverifiedValidatorOperationCap type");

 } return new UnverifiedValidatorOperationCap( { id: item.fields.id.id, authorizerValidatorAddress: `0x${item.fields.authorizer_validator_address}` } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): UnverifiedValidatorOperationCap { return UnverifiedValidatorOperationCap.fromFields( bcs.de([UnverifiedValidatorOperationCap.$typeName, ], data, encoding) ) }

 static fromSuiParsedData(content: SuiParsedData) { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUnverifiedValidatorOperationCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UnverifiedValidatorOperationCap object`); } return UnverifiedValidatorOperationCap.fromFieldsWithTypes(content); }

 static async fetch(client: SuiClient, id: string ): Promise<UnverifiedValidatorOperationCap> { const res = await client.getObject({ id, options: { showContent: true, }, }); if (res.error) { throw new Error(`error fetching UnverifiedValidatorOperationCap object at id ${id}: ${res.error.code}`); } if (res.data?.content?.dataType !== "moveObject" || !isUnverifiedValidatorOperationCap(res.data.content.type)) { throw new Error(`object at id ${id} is not a UnverifiedValidatorOperationCap object`); }
 return UnverifiedValidatorOperationCap.fromFieldsWithTypes(res.data.content); }

 }

/* ============================== ValidatorOperationCap =============================== */

bcs.registerStructType( "0x3::validator_cap::ValidatorOperationCap", {
authorizer_validator_address: `address`,
} )

export function isValidatorOperationCap(type: Type): boolean { return type === "0x3::validator_cap::ValidatorOperationCap"; }

export interface ValidatorOperationCapFields { authorizerValidatorAddress: string }

export class ValidatorOperationCap { static readonly $typeName = "0x3::validator_cap::ValidatorOperationCap"; static readonly $numTypeParams = 0;

  readonly authorizerValidatorAddress: string

 constructor( authorizerValidatorAddress: string, ) { this.authorizerValidatorAddress = authorizerValidatorAddress; }

 static fromFields( fields: Record<string, any> ): ValidatorOperationCap { return new ValidatorOperationCap( `0x${fields.authorizer_validator_address}` ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): ValidatorOperationCap { if (!isValidatorOperationCap(item.type)) { throw new Error("not a ValidatorOperationCap type");

 } return new ValidatorOperationCap( `0x${item.fields.authorizer_validator_address}` ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): ValidatorOperationCap { return ValidatorOperationCap.fromFields( bcs.de([ValidatorOperationCap.$typeName, ], data, encoding) ) }

 }
