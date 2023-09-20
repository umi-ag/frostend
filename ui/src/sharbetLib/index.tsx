
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { STAKE_PROFILE, TREASURY_SHASUI } from "./config";
import { Connection, JsonRpcProvider } from "@mysten/sui.js";
import { SUI_SYSTEM_STATE_OBJECT_ID } from "@suiet/wallet-kit";
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { stakeSuiToMintShasui, unstakeSuiToBurnShasui } from "src/moveCall/sharbet/actions/functions";
import { SHASUI } from "src/moveCall/sharbet/shasui/structs";


const provider = new JsonRpcProvider(
  new Connection({
    // fullnode: "https://fullnode.testnet.sui.io:443",
    fullnode: "https://fullnode.testnet.sui.io",
  }),
)

const VALIDATOR_ADDRESS = '0x70977fada000eb0da05483191f19de7cda9a9aa63db18d17bb55c69756b8454e'


export const moveCallStakeSuiToMintShasui = async (txb: TransactionBlock, args: {
  address: string
  amount: bigint,
}) => {
  const coinSource = await moveCallTakeCoin(txb, {
    coinType: SUI_TYPE_ARG,
    address: args.address,
    amount: args.amount,
  })
  const coinTarget = stakeSuiToMintShasui(txb, {
    coin: coinSource,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
    address: VALIDATOR_ADDRESS,
  })
  txb.transferObjects([coinTarget], txb.pure(args.address))
}

export const moveCallunstakeSuiToBurnShasui = async (txb: TransactionBlock, args: {
  address: string
  amount: bigint,
}) => {
  const coinSource = await moveCallTakeCoin(txb, {
    coinType: SHASUI.$typeName,
    address: args.address,
    amount: args.amount,
  })
  const coinTarget = unstakeSuiToBurnShasui(txb, {
    coin: coinSource,
    stakeProfile: STAKE_PROFILE,
    treasuryCap: TREASURY_SHASUI,
    suiSystemState: SUI_SYSTEM_STATE_OBJECT_ID,
  })
  txb.transferObjects([coinTarget], txb.pure(args.address))
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
