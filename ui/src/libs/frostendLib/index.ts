import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  swapPtToSy,
  swapSyToPt,
  swapSyToYt,
  swapYtToSy,
} from "src/libs/moveCall/frostend/swap/functions";
import { mintTo } from "src/libs/moveCall/frostend/stsui-coin/functions";
import { moveCallTakeCoin } from "src/libs/sharbetLib";
import { YTCoin, isPTCoin, isYTCoin } from "src/libs/moveCall/frostend/vault/structs";
import { PTCoin } from "../moveCall/frostend/vault/structs";
import { BANK, TRESURY_CAP, VAULT } from "./config";




export const PTCoinType = (T: string) => `${PTCoin.$typeName}<${T}>`;
export const YTCoinType = (T: string) => `${YTCoin.$typeName}<${T}>`;


export const whichCoinTypeIsSyPtYt = (coinType: string): "sy" | "pt" | "yt" => {
  return isPTCoin(coinType) ? "pt" : isYTCoin(coinType) ? "yt" : "sy";
};

export const moveCallFaucet = async (
  txb: TransactionBlock,
  args: {
    amount: bigint;
  },
) => {
  mintTo(txb, {
    treasuryCap: TRESURY_CAP,
    u64: args.amount,
  });

  return txb;
};

export const frostendMoveCall = {
  async swapSyToPt(txb: TransactionBlock, args: {
    syCoinType: string;
    address: string;
    amount: bigint;
  }) {
    const coin_sy = await moveCallTakeCoin(txb, {
      coinType: args.syCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_pt = await swapSyToPt(txb, args.syCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_pt], txb.pure(args.address));

    return txb;
  },

  async swapPtToSy(txb: TransactionBlock, args: {
    syCoinType: string;
    address: string;
    amount: bigint;
  }) {
    const coin_pt = await moveCallTakeCoin(txb, {
      coinType: args.syCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_sy = await swapPtToSy(txb, args.syCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_pt] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_sy], txb.pure(args.address));

    return txb;
  },

  async swapSyToYt(txb: TransactionBlock, args: {
    syCoinType: string;
    address: string;
    amount: bigint;
  }) {
    const coin_sy = await moveCallTakeCoin(txb, {
      coinType: args.syCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_yt = await swapSyToYt(txb, args.syCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_yt], txb.pure(args.address));

    return txb;
  },

  async swapYtToSy(txb: TransactionBlock, args: {
    syCoinType: string;
    address: string;
    amount: bigint;
  }) {
    const coin_yt = await moveCallTakeCoin(txb, {
      coinType: args.syCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_sy = await swapYtToSy(txb, args.syCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_yt] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_sy], txb.pure(args.address));

    return txb;
  },
};
