import { TransactionBlock } from "@mysten/sui.js/transactions";
import { frostendMoveCall, whichCoinTypeIsSyPtYt } from "src/frostendLib";
import { match } from "ts-pattern";
import { isSHASUI } from "src/moveCall/sharbet/shasui/structs";
import { isSUI } from "src/moveCall/sui/sui/structs";
import { sharbetMoveCall } from "src/sharbetLib";
import { isUNSTSUI } from "src/moveCall/sharbet/unstsui/structs";

export const whichCoinType = (
  coinType: string,
): "sui" | "shasui" | "sy" | "pt" | "yt" | "unstsui" => {
  if (isSUI(coinType)) return "sui";
  if (isSHASUI(coinType)) return "shasui";
  if (isUNSTSUI(coinType)) return "unstsui";
  return whichCoinTypeIsSyPtYt(coinType);
};

export const moveCallSwap = async (txb: TransactionBlock, args: {
  sourceCoinType: string,
  targetCoinType: string,
  address: string,
  // TODO: Uncomment this when bigint is supported
  // amount: bigint,
}) => {
  const { address } = args
  await match([whichCoinType(args.sourceCoinType), whichCoinType(args.targetCoinType)])
    .with(['sui', 'shasui'], async () => { await sharbetMoveCall.stakeSuiToMintShasui(txb, { address, amount: BigInt(100) }) })
    .with(['shasui', 'unstsui'], async () => { await sharbetMoveCall.burnShasuiToMintUnstsui(txb, { address, amount: BigInt(100) }) })
    .with(['unstsui','sui'], async () => { await sharbetMoveCall.burnUnstsuiToUnstakeSui(txb, { address, amount: BigInt(100) }) })
    .with(['sy', 'pt'], async () => { await frostendMoveCall.swapSyToPt(txb, { address, amount: BigInt(10_000) }) })
    .with(['pt', 'sy'], async () => { await frostendMoveCall.swapPtToSy(txb, { address, amount: BigInt(10_000) }) })
    .with(['sy', 'yt'], async () => { await frostendMoveCall.swapSyToYt(txb, { address, amount: BigInt(10_000) }) })
    .with(['yt', 'sy'], async () => { await frostendMoveCall.swapYtToSy(txb, { address, amount: BigInt(10_000) }) })
    .otherwise(() => { throw new Error('invalid coinType') })
}

