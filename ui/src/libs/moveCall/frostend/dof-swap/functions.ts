import {PUBLISHED_AT} from "..";
import {TransactionBlock} from "@mysten/sui.js/transactions";

export function init( txb: TransactionBlock, ) { return txb.moveCall({ target: `${PUBLISHED_AT}::dof_swap::init`, arguments: [ ], }) }
