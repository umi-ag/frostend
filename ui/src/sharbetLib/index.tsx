import { STAKE_PROFILE, TREASURY_SHASUI } from "./config";
import { SUI_SYSTEM_STATE_OBJECT_ID } from "@suiet/wallet-kit";
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { stakeSuiToMintShasui, unstakeSuiToBurnShasui } from "src/moveCall/sharbet/actions/functions";
import { SHASUI } from "src/moveCall/sharbet/shasui/structs";
import { TransactionBlock, TransactionArgument } from "@mysten/sui.js/transactions";
import { suiClient } from "src/config/sui";
import { confirmRequest, placeAndList, purchase } from '@mysten/kiosk';
import { add, confirm } from "src/moveCall/sharbet/unstake-policy/functions";
import { zero } from "src/moveCall/sui/coin/functions";


const VALIDATOR_ADDRESS = '0x70977fada000eb0da05483191f19de7cda9a9aa63db18d17bb55c69756b8454e'

export const sharbetMoveCall = {
  async stakeSuiToMintShasui(txb: TransactionBlock, args: {
    address: string
    amount: bigint,
  }) {
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
  ,
  async unstakeSuiToBurnShasui(txb: TransactionBlock, args: {
    address: string
    amount: bigint,
  }) {
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
      const coinsShasui = await suiClient().getCoins({
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

export const moveCallOpenKiosk = async (txb: TransactionBlock, args: {
}) => {
  txb.moveCall({
    target: '0x2::kiosk::default'
  });
}

export const moveCallCreateTransferPolicy = async (txb: TransactionBlock, args: {
  address: string
}) => {
  // const transferPolicyCap = createTransferPolicy(
  //   txb,
  //   SUI_TYPE_ARG,
  //   txb.pure(PUBLISHED_AT),
  // );
  // txb.transferObjects([transferPolicyCap], txb.pure(args.address));
}

export const moveCAllAttachProofPolicy = async (props: {
  txb: TransactionBlock;
  type: string;
  policy_id: string;
  policy_cap_id: string;
}) => {
  const { txb } = props;
  add(txb, SUI_TYPE_ARG, {
    transferPolicy: props.policy_id,
    transferPolicyCap: props.policy_cap_id,
  })
};

export const moveCallPlaceAndList = async (txb: TransactionBlock, args: {
  address: string
  kioskId: string
  kioskCapId: string
  targetAssetId: string
}) => {
  placeAndList(txb, SUI_TYPE_ARG,
    txb.object(args.kioskId),
    txb.object(args.kioskCapId),
    txb.object(args.targetAssetId),
    BigInt(0),
  )
}

export const moveCallConfirmRequest = async (txb: TransactionBlock, args: {
  address: string
  policyId: string
  transferRequest: any,
}) => {
  confirmRequest(txb, SUI_TYPE_ARG,
    args.policyId,
    args.transferRequest,
  )
}

export const moveCallConfirmPolicy = async (txb: TransactionBlock, args: {
  txb: TransactionBlock;
  policy_id: string;
  transferRequest: TransactionArgument;
}) => {
  confirm(txb, SUI_TYPE_ARG, {
    transferPolicy: args.policy_id,
    transferRequest: args.transferRequest,
  })
}

export const moveCallPurchase = async (txb: TransactionBlock, args: {
  txb: TransactionBlock;
  kioskId: string;
  asetId: string;
  policy_id: string;
}) => {
  purchase(txb, SUI_TYPE_ARG,
    txb.object(args.kioskId),
    args.asetId,
    zero(txb, SUI_TYPE_ARG),
  )
}
