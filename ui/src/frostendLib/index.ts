import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  swapPtToSy,
  swapSyToPt,
  swapSyToYt,
  swapYtToSy,
} from "src/moveCall/frostend/swap/functions";
import { STSUI_COIN } from "src/moveCall/frostend/stsui-coin/structs";
import { Connection, JsonRpcProvider } from "@mysten/sui.js";
import { maybeSplitCoinsAndTransferRest } from "src/moveCall/frostend/coin-utils/functions";
import { BANK, VAULT } from "src/config/frostend";
import { PUBLISHED_AT } from "src/moveCall/frostend";

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

export const moveCallSwapSyToPt = async (
  txb: TransactionBlock,
  args: {
    address: string;
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
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

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
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

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
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

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
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

  const coin_sy = await swapYtToSy(txb, STSUI_SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_yt] }),
    vault: VAULT,
    bank: BANK,
  });

  txb.transferObjects([coin_sy], txb.pure(args.address));

  return txb;
};
