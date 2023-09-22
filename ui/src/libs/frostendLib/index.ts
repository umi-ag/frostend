import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  swapPtToSy,
  swapSyToPt,
  swapSyToYt,
  swapYtToSy,
} from "src/libs/moveCall/frostend/swap/functions";
import { STSUI_COIN } from "src/libs/moveCall/frostend/stsui-coin/structs";
import { BANK, TRESURY_CAP, VAULT } from "src/config/frostend";
import { mintTo } from "src/libs/moveCall/frostend/stsui-coin/functions";
import { moveCallTakeCoin } from "src/libs/sharbetLib";
import { YTCoin, isPTCoin, isYTCoin } from "src/libs/moveCall/frostend/vault/structs";
import { PTCoin } from "../moveCall/frostend/vault/structs";


export const STSUI_SYCoinType = STSUI_COIN.$typeName;
export const STSUI_PTCoinType = `${PTCoin.$typeName}<${STSUI_SYCoinType}>`;
export const STSUI_YTCoinType = `${YTCoin.$typeName}<${STSUI_SYCoinType}>`;


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
    address: string;
    amount: bigint;
  }) {
    const coin_sy = await moveCallTakeCoin(txb, {
      coinType: STSUI_SYCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_pt = await swapSyToPt(txb, STSUI_SYCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_pt], txb.pure(args.address));

    return txb;
  },

  async swapPtToSy(txb: TransactionBlock, args: {
    address: string;
    amount: bigint;
  }) {
    const coin_pt = await moveCallTakeCoin(txb, {
      coinType: STSUI_PTCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_sy = await swapPtToSy(txb, STSUI_SYCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_pt] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_sy], txb.pure(args.address));

    return txb;
  },

  async swapSyToYt(txb: TransactionBlock, args: {
    address: string;
    amount: bigint;
  }) {
    const coin_sy = await moveCallTakeCoin(txb, {
      coinType: STSUI_SYCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_yt = await swapSyToYt(txb, STSUI_SYCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_yt], txb.pure(args.address));

    return txb;
  },

  async swapYtToSy(txb: TransactionBlock, args: {
    address: string;
    amount: bigint;
  }) {
    const coin_yt = await moveCallTakeCoin(txb, {
      coinType: STSUI_YTCoinType,
      address: args.address,
      amount: args.amount,
    });

    const coin_sy = await swapYtToSy(txb, STSUI_SYCoinType, {
      vecCoin: txb.makeMoveVec({ objects: [coin_yt] }),
      vault: VAULT,
      bank: BANK,
    });

    txb.transferObjects([coin_sy], txb.pure(args.address));

    return txb;
  },
};
