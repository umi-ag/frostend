import {bcsOnchain as bcs} from "../../../../_framework/bcs";
import {FieldsWithTypes, Type} from "../../../../_framework/util";
import {Balance} from "../../0x2/balance/structs";
import {Encoding} from "@mysten/bcs";

/* ============================== StorageFund =============================== */

bcs.registerStructType( "0x3::storage_fund::StorageFund", {
total_object_storage_rebates: `0x2::balance::Balance<0x2::sui::SUI>`,
non_refundable_balance: `0x2::balance::Balance<0x2::sui::SUI>`,
} )

export function isStorageFund(type: Type): boolean { return type === "0x3::storage_fund::StorageFund"; }

export interface StorageFundFields { totalObjectStorageRebates: Balance; nonRefundableBalance: Balance }

export class StorageFund { static readonly $typeName = "0x3::storage_fund::StorageFund"; static readonly $numTypeParams = 0;

  readonly totalObjectStorageRebates: Balance; readonly nonRefundableBalance: Balance

 constructor( fields: StorageFundFields, ) { this.totalObjectStorageRebates = fields.totalObjectStorageRebates; this.nonRefundableBalance = fields.nonRefundableBalance; }

 static fromFields( fields: Record<string, any> ): StorageFund { return new StorageFund( { totalObjectStorageRebates: Balance.fromFields(`0x2::sui::SUI`, fields.total_object_storage_rebates), nonRefundableBalance: Balance.fromFields(`0x2::sui::SUI`, fields.non_refundable_balance) } ) }

 static fromFieldsWithTypes(item: FieldsWithTypes): StorageFund { if (!isStorageFund(item.type)) { throw new Error("not a StorageFund type");

 } return new StorageFund( { totalObjectStorageRebates: new Balance( `0x2::sui::SUI`, BigInt(item.fields.total_object_storage_rebates) ), nonRefundableBalance: new Balance( `0x2::sui::SUI`, BigInt(item.fields.non_refundable_balance) ) } ) }

 static fromBcs( data: Uint8Array | string, encoding?: Encoding ): StorageFund { return StorageFund.fromFields( bcs.de([StorageFund.$typeName, ], data, encoding) ) }

 }
