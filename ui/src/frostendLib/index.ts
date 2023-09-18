import { TransactionBlock } from "@mysten/sui.js/transactions";
import { STSUI_COIN } from "src/moveCall/frostend/stsui-coin/structs";
import { Connection, JsonRpcProvider } from "@mysten/sui.js";
import { maybeSplitCoinsAndTransferRest } from "src/moveCall/frostend/coin-utils/functions";
import { BANK, ROOT, TRESURY_CAP, VAULT } from "src/config/frostend";
import { PUBLISHED_AT } from "src/moveCall/frostend";
import {
  swapPtToSy,
  swapSyToPt,
  swapSyToYt,
  swapYtToSy,
} from "src/moveCall/frostend/swap/functions";
import { mintTo } from "src/moveCall/stsui/stsui-coin/functions";
import { createBank, initVault } from "src/moveCall/frostend/actions/functions";

const provider = new JsonRpcProvider(
  new Connection({
    // fullnode: "https://fullnode.testnet.sui.io:443",
    fullnode: "https://fullnode.testnet.sui.io",
  }),
);

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

export const moveCallCreateBank = async (txb: TransactionBlock) => {
  createBank(txb, STSUI_COIN.$typeName, ROOT);
  return txb;
};

export const moveCallInitVault = async (
  txb: TransactionBlock,
  args: {
    address: string;
    issuedAt: bigint,
    maturesAt: bigint,
    amountSY: bigint,
    amountSupply: bigint,
  }
) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coins_sy = await provider.getCoins({
      owner: args.address,
      coinType: STSUI_COIN.$typeName,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin = await maybeSplitCoinsAndTransferRest(txb, STSUI_COIN.$typeName, {
    vecCoin: txb.makeMoveVec({
      objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
    }),
    u64: args.amountSY,
    address: args.address,
  });

  const coin_yt = initVault(txb, STSUI_COIN.$typeName, {
    u641: args.issuedAt,
    u642: args.maturesAt,
    vecCoin: txb.makeMoveVec({
      objects: [coin],
    }),
    u643: args.amountSupply,
    bank: BANK,
  });

  txb.transferObjects([coin_yt], txb.pure(args.address));
}

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
    amount: bigint;
  },
) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coins_sy = await provider.getCoins({
      owner: args.address,
      coinType: STSUI_SYCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_sy = await maybeSplitCoinsAndTransferRest(
    txb,
    STSUI_SYCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: args.amount,
      address: args.address,
    },
  );

  const coin_pt = await swapSyToPt(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
    vault: VAULT,
    clock: "0x6",
  });

  txb.transferObjects([coin_pt], txb.pure(args.address));

  return txb;
};

export const moveCallSwapPtToSy = async (
  txb: TransactionBlock,
  args: {
    address: string;
    amount: bigint;
  },
) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coins_sy = await provider.getCoins({
      owner: args.address,
      coinType: STSUI_PTCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_pt = await maybeSplitCoinsAndTransferRest(
    txb,
    STSUI_PTCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: args.amount,
      address: args.address,
    },
  );

  const coin_sy = await swapPtToSy(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_pt] }),
    vault: VAULT,
    clock: "0x6",
  });

  txb.transferObjects([coin_sy], txb.pure(args.address));

  return txb;
};

export const moveCallSwapSyToYt = async (
  txb: TransactionBlock,
  args: {
    address: string;
    amount: bigint;
  },
) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coins_sy = await provider.getCoins({
      owner: args.address,
      coinType: STSUI_SYCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_sy = await maybeSplitCoinsAndTransferRest(
    txb,
    STSUI_SYCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: args.amount,
      address: args.address,
    },
  );

  const coin_yt = await swapSyToYt(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
    vault: VAULT,
    bank: BANK,
    clock: "0x6",
  });

  txb.transferObjects([coin_yt], txb.pure(args.address));

  return txb;
};

export const moveCallSwapYtToSy = async (
  txb: TransactionBlock,
  args: {
    address: string;
    amount: bigint;
  },
) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coins_sy = await provider.getCoins({
      owner: args.address,
      coinType: STSUI_YTCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_yt = await maybeSplitCoinsAndTransferRest(
    txb,
    STSUI_YTCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: args.amount,
      address: args.address,
    },
  );

  const coin_sy = await swapYtToSy(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_yt] }),
    vault: VAULT,
    bank: BANK,
    clock: "0x6",
  });

  txb.transferObjects([coin_sy], txb.pure(args.address));

  return txb;
};
