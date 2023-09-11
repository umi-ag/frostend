import { TransactionBlock } from "@mysten/sui.js/transactions";
import { swapPtToSy, swapSyToPt, swapSyToYt, swapYtToSy } from "src/moveCall/frostend/swap/functions";
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

const SYCoinType = STSUI_COIN.$typeName;
const PTCoinType = `${PUBLISHED_AT}::vault::PTCoin<${SYCoinType}>`;
const YTCoinType = `${PUBLISHED_AT}::vault::YTCoin<${SYCoinType}>`;

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
      coinType: SYCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_sy = await maybeSplitCoinsAndTransferRest(
    txb,
    SYCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

  const coin_pt = await swapSyToPt(txb, SYCoinType, {
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
      coinType: PTCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_pt = await maybeSplitCoinsAndTransferRest(
    txb,
    PTCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

  const coin_sy = await swapPtToSy(txb, SYCoinType, {
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
      coinType: SYCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_sy = await maybeSplitCoinsAndTransferRest(
    txb,
    SYCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

  const coin_yt = await swapSyToYt(txb, SYCoinType, {
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
      coinType: YTCoinType,
    });
    coins.push(...coins_sy.data);
    return coins;
  })();

  const coin_yt = await maybeSplitCoinsAndTransferRest(
    txb,
    YTCoinType,
    {
      vecCoin: txb.makeMoveVec({
        objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
      }),
      u64: BigInt(10 * 1e8),
      address: args.address,
    },
  );

  const coin_sy = await swapYtToSy(txb, SYCoinType, {
    vecCoin: txb.makeMoveVec({ objects: [coin_yt] }),
    vault: VAULT,
    bank: BANK,
  });

  txb.transferObjects([coin_sy], txb.pure(args.address));

  return txb;
};
