import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  swapPtToSy,
  swapSyToPt,
  swapSyToYt,
  swapYtToSy,
} from "src/moveCall/frostend/swap/functions";
import { STSUI_COIN } from "src/moveCall/frostend/stsui-coin/structs";
import { BANK, TRESURY_CAP, VAULT } from "src/config/frostend";
import { PUBLISHED_AT } from "src/moveCall/frostend";
import { mintTo } from "src/moveCall/frostend/stsui-coin/functions";
import { moveCallTakeCoin } from "src/sharbetLib";

export const STSUI_SYCoinType = STSUI_COIN.$typeName;
export const STSUI_PTCoinType =
  `${PUBLISHED_AT}::vault::PTCoin<${STSUI_SYCoinType}>`;
export const STSUI_YTCoinType =
  `${PUBLISHED_AT}::vault::YTCoin<${STSUI_SYCoinType}>`;

export const isPTCoinType = (coinType: string) => {
  return coinType.startsWith(`${PUBLISHED_AT}::vault::PTCoin<`);
};

export const isYTcoinType = (coinType: string) => {
  return coinType.startsWith(`${PUBLISHED_AT}::vault::YTCoin<`);
};

export const whichCoinTypeIsSyPtYt = (coinType: string): "sy" | "pt" | "yt" => {
  return isPTCoinType(coinType) ? "pt" : isYTcoinType(coinType) ? "yt" : "sy";
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

export const moveCallSwapSyToPt = async (
  txb: TransactionBlock,
  args: {
    address: string;
  },
) => {
  const coin_sy = await moveCallTakeCoin(txb, {
    coinType: STSUI_SYCoinType,
    address: args.address,
    amount: BigInt(10 * 1e8),
  });

  const coin_pt = await swapSyToPt(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
    vault: VAULT,
    bank: BANK,
  });

  txb.transferObjects([coin_pt], txb.pure(args.address));

  return txb;
};

export const moveCallSwapPtToSy = async (
  txb: TransactionBlock,
  args: {
    address: string;
  },
) => {
  const coin_pt = await moveCallTakeCoin(txb, {
    coinType: STSUI_PTCoinType,
    address: args.address,
    amount: BigInt(10 * 1e8),
  });

  const coin_sy = await swapPtToSy(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_pt] }),
    vault: VAULT,
    bank: BANK,
  });

  txb.transferObjects([coin_sy], txb.pure(args.address));

  return txb;
};

export const moveCallSwapSyToYt = async (
  txb: TransactionBlock,
  args: {
    address: string;
  },
) => {
  const coin_sy = await moveCallTakeCoin(txb, {
    coinType: STSUI_SYCoinType,
    address: args.address,
    amount: BigInt(10 * 1e8),
  });

  const coin_yt = await swapSyToYt(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
    vault: VAULT,
    bank: BANK,
  });

  txb.transferObjects([coin_yt], txb.pure(args.address));

  return txb;
};

export const moveCallSwapYtToSy = async (
  txb: TransactionBlock,
  args: {
    address: string;
  },
) => {
  const coin_yt = await moveCallTakeCoin(txb, {
    coinType: STSUI_YTCoinType,
    address: args.address,
    amount: BigInt(10 * 1e8),
  });

  const coin_sy = await swapYtToSy(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_yt] }),
    vault: VAULT,
    bank: BANK,
  });

  txb.transferObjects([coin_sy], txb.pure(args.address));

  return txb;
};
