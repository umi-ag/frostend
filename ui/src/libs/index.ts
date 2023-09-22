import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  frostendMoveCall,
  whichCoinTypeIsSyPtYt,
} from "src/libs/frostendLib";
import { match } from "ts-pattern";
import { isSHASUI } from "src/libs/moveCall/sharbet/shasui/structs";
import { isSUI } from "src/libs/moveCall/sui/sui/structs";
import { sharbetMoveCall } from "src/libs/sharbetLib";
import { isUNSTSUI } from "src/libs/moveCall/sharbet/unstsui/structs";

export const whichCoinType = (
  coinType: string,
): "sui" | "shasui" | "sy" | "pt" | "yt" | "unstsui" => {
  if (isSUI(coinType)) return "sui";
  if (isSHASUI(coinType)) return "shasui";
  if (isUNSTSUI(coinType)) return "unstsui";
  return whichCoinTypeIsSyPtYt(coinType);
};

export const moveCallSwap = async (txb: TransactionBlock, args: {
  sourceCoinType: string;
  targetCoinType: string;
  address: string;
  // TODO: Uncomment this when bigint is supported
  // amount: bigint,
}) => {
  console.log("moveCallSwap", args);
  const { address } = args;
  await match([
    whichCoinType(args.sourceCoinType),
    whichCoinType(args.targetCoinType),
  ])
    .with(["sui", "shasui"], async () => {
      console.log("stakeSuiToMintShasui", args);
      await sharbetMoveCall.stakeSuiToMintShasui(txb, {
        address,
        amount: BigInt(100),
      });
    })
    .with(["shasui", "unstsui"], async () => {
      console.log("burnShasuiToMintUnstsui", args);
      await sharbetMoveCall.burnShasuiToMintUnstsui(txb, {
        address,
        amount: BigInt(100),
      });
    })
    .with(["unstsui", "sui"], async () => {
      console.log("burnUnstsuiToUnstakeSui", args);
      await sharbetMoveCall.burnUnstsuiToUnstakeSui(txb, {
        address,
        amount: BigInt(100),
      });
    })
    .with(["sy", "pt"], async () => {
      console.log("swapSyToPt", args);
      await frostendMoveCall.swapSyToPt(txb, {
        address,
        amount: BigInt(10_000),
      });
    })
    .with(["pt", "sy"], async () => {
      console.log("swapPtToSy", args);
      await frostendMoveCall.swapPtToSy(txb, {
        address,
        amount: BigInt(10_000),
      });
    })
    .with(["sy", "yt"], async () => {
      console.log("swapSyToYt", args);
      await frostendMoveCall.swapSyToYt(txb, {
        address,
        amount: BigInt(10_000),
      });
    })
    .with(["yt", "sy"], async () => {
      console.log("swapYtToSy", args);
      await frostendMoveCall.swapYtToSy(txb, {
        address,
        amount: BigInt(10_000),
      });
    })
    .otherwise(() => {
      throw new Error("invalid coinType");
    });
};
