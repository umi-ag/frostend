
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { stake } from "src/moveCall/sharbet/actions/functions";
import { STAKE_PROFILE, TREASURY_SHASUI } from "./config";
import { Connection, JsonRpcProvider } from "@mysten/sui.js";
import { burnShasui, computeAmountShasuiToMint, mintShasui, mintShasuiFromAmountSui } from "src/moveCall/sharbet/sha-manager/functions";
import { depositSui, stakeSui } from "src/moveCall/sharbet/stake-manager/functions";
import { SUI_SYSTEM_STATE_OBJECT_ID } from "@suiet/wallet-kit";
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { SHASUI } from "src/moveCall/sharbet/shasui/structs";



const VALIDATOR_ADDRESS = '0x70977fada000eb0da05483191f19de7cda9a9aa63db18d17bb55c69756b8454e'

const provider = new JsonRpcProvider(
  new Connection({
    // fullnode: "https://fullnode.testnet.sui.io:443",
    fullnode: "https://fullnode.testnet.sui.io",
  }),
)

export const moveCallHot = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountSource = BigInt(1e9)
  const coinSource = await moveCallTakeCoin(txb, {
    coinType: SHASUI.$typeName,
    address: args.address,
    amount: amountSource,
  })
  const coinTarget = burnShasui(txb, {
    coin: coinSource,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
  })
  txb.transferObjects([coinTarget], txb.pure(args.address))
}

export const moveCallCool = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountSource = BigInt(120)
  const coinSource = await moveCallTakeCoin(txb, {
    coinType: SUI_TYPE_ARG,
    address: args.address,
    amount: amountSource,
  })
  txb.transferObjects([coinTarget], txb.pure(args.address))
}

export const moveCallWork8 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountSource = BigInt(1e9)
  const coinSource = await moveCallTakeCoin(txb, {
    coinType: SUI_TYPE_ARG,
    address: args.address,
    amount: amountSource,
  })
  const coinTarget = mintShasui(txb, {
    coin: coinSource,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
    address: VALIDATOR_ADDRESS,
  })
  txb.transferObjects([coinTarget], txb.pure(args.address))
}

export const moveCallWork7 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountSource = BigInt(100)
  const coinShasui = await moveCallTakeCoin(txb, {
    coinType: SHASUI.$typeName,
    address: args.address,
    amount: amountSource,
  })
  const coinSui = burnShasui(txb, {
    coin: coinShasui,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
  })
  txb.transferObjects([coinSui], txb.pure(args.address))
}

export const moveCallWork6 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountSui = BigInt(100)
  const coinSui = await moveCallCoinSui(txb, { amount: amountSui })
  const coinShasui = mintShasui(txb, {
    coin: coinSui,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
    address: VALIDATOR_ADDRESS,
  })
  txb.transferObjects([coinShasui], txb.pure(args.address))
}

export const moveCallWork5 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountSui = BigInt(100)
  const coinSui = await moveCallCoinSui(txb, { amount: amountSui })
  const coinShasui = mintShasuiFromAmountSui(txb, {
    u64: amountSui,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
  })
  depositSui(txb, {
    coin: coinSui,
    stakeProfile: STAKE_PROFILE,
  })
  stakeSui(txb, {
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
    stakeProfile: STAKE_PROFILE,
    address: VALIDATOR_ADDRESS,
  })
  txb.transferObjects([coinShasui], txb.pure(args.address))
}

export const moveCallWork4 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amount = BigInt(100)
  const coinSui = await moveCallCoinSui(txb, { amount })
  depositSui(txb, {
    coin: coinSui,
    stakeProfile: STAKE_PROFILE,
  })
  stakeSui(txb, {
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
    stakeProfile: STAKE_PROFILE,
    address: VALIDATOR_ADDRESS,
  })
}

export const moveCallWork3 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const coinShasui = mintShasuiFromAmountSui(txb, {
    u64: BigInt(100),
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
  })
  txb.transferObjects([coinShasui], txb.pure(args.address))
}

export const moveCallWork2 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amountShaSui = computeAmountShasuiToMint(txb, {
    u64: BigInt(100),
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
  })
  console.log(amountShaSui)
  // const coinShasui = mintShasuiFromAmountSui(txb, {
  //   coin: coinSui,
  //   stakeProfile: STAKE_PROFILE,
  //   treasuryCap: TREASURY_SHASUI,
  // })
  // txb.transferObjects([coinShasui], txb.pure(args.address))
}

export const moveCallWork1 = async (txb: TransactionBlock, args: {
  address: string
}) => {
  const amount = BigInt(100)
  const coinSui = await moveCallCoinSui(txb, { amount })
  txb.transferObjects([coinSui], txb.pure(args.address))
  const coinShasui = mint(txb, {
    treasuryCap: TREASURY_SHASUI,
    // treasuryCap: txb.pure(TREASURY_SHASUI),
    u64: amount,
  })
  txb.transferObjects([coinShasui], txb.pure(args.address))
}

export const moveCallTakeCoin = async (txb: TransactionBlock, args: {
  coinType: string
  address: string
  amount: bigint
}) => {
  if (args.coinType === SUI_TYPE_ARG) {
    return txb.splitCoins(txb.gas, [txb.pure(args.amount)]);
  } else {
    const coins = await (async () => {
      const coins: { coinObjectId: string }[] = [];
      const coinsShasui = await provider.getCoins({
        owner: args.address,
        coinType: args.coinType
      });
      coins.push(...coinsShasui.data);
      return coins;
    })();

    const [primaryCoin, ...mergeCoins] = coins

    const primaryCoinInput = txb.object(primaryCoin.coinObjectId);
    if (mergeCoins.length) {
      // TODO: This could just merge a subset of coins that meet the balance requirements instead of all of them.
      txb.mergeCoins(
        primaryCoinInput,
        mergeCoins.map((coin) => txb.object(coin.coinObjectId)),
      );
    }
    return txb.splitCoins(primaryCoinInput, [txb.pure(args.amount)]);
  }
}

export const moveCallCoinShasui = async (txb: TransactionBlock, args: {
  coinType: string
  address: string
  amount: bigint
}) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coinsShasui = await provider.getCoins({
      owner: args.address,
      coinType: args.coinType
    });
    coins.push(...coinsShasui.data);
    return coins;
  })();

  const [primaryCoin, ...mergeCoins] = coins

  const primaryCoinInput = txb.object(primaryCoin.coinObjectId);
  if (mergeCoins.length) {
    // TODO: This could just merge a subset of coins that meet the balance requirements instead of all of them.
    txb.mergeCoins(
      primaryCoinInput,
      mergeCoins.map((coin) => txb.object(coin.coinObjectId)),
    );
  }
  return txb.splitCoins(primaryCoinInput, [txb.pure(args.amount)]);
}

export const moveCallCoinSui = async (txb: TransactionBlock, args: {
  amount: bigint
}) => {
  return txb.splitCoins(txb.gas, [txb.pure(args.amount)]);

  // const coins = await (async () => {
  //   const coins: { coinObjectId: string }[] = [];
  //   const coins_sy = await provider.getCoins({
  //     owner: args.address,
  //     coinType: "0x2::sui::SUI",
  //   });
  //   coins.push(...coins_sy.data);
  //   return coins;
  // })();

  // console.log({coins})

  // txb.splitCoins(txb.gas, [txb.pure(args.amount)]);

  // const coinSui = await maybeSplitCoinsAndTransferRest(
  //   txb,
  //   "0x2::sui::SUI",
  //   {
  //     vecCoin: txb.makeMoveVec({
  //       objects: coins.map((coin) => txb.pure(coin.coinObjectId)),
  //     }),
  //     u64: args.amount,
  //     address: args.address,
  //   },
  // );

  // return coinSui
}

export const moveCallStake = async (txb: TransactionBlock, args: {
  intentAddress: string
  validatorAddress: string
  amount: bigint
}) => {
  const coin_sui = await moveCallCoinSui(txb, {
    address: args.intentAddress,
    amount: args.amount,
  })

  const coin_shasui = stake(txb, {
    suiSystemState: '0x3',
    address: args.validatorAddress,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    coin: coin_sui,
  })

  txb.transferObjects([coin_shasui], txb.pure(args.intentAddress))
}
