import { YTCoinType } from 'src/libs/frostendLib';
import { getPriceByCoinType } from 'src/libs/frostendLib/priceList';
import { STSUI_COIN } from "src/libs/moveCall/frostend/stsui-coin/structs";
import { create } from "zustand";

export const useTradeStore = create<{
  sourceCoinType: string,
  targetCoinType: string,
  sourceCoinAmount: BigInt,
  targetCoinAmount: BigInt,
  setSourceCoinType: (sourceCoinType: string) => void,
  setTargetCoinType: (targetCoinType: string) => void,
  setSourceCoinAmount: (sourceCoinAmount: BigInt) => void,
  setTargetCoinAmount: (targetCoinAmount: BigInt) => void,
  setSwapPair: (sourceCoinType: string, targetCoinType: string) => void,
  reverse: () => void;
}>((set) => ({
  sourceCoinType: STSUI_COIN.$typeName,
  targetCoinType: YTCoinType(STSUI_COIN.$typeName),
  sourceCoinAmount: BigInt(0),
  targetCoinAmount: BigInt(0),
  setSourceCoinType: (sourceCoinType: string) => set({ sourceCoinType }),
  setTargetCoinType: (targetCoinType: string) => set({ targetCoinType }),
  setSourceCoinAmount: (sourceCoinAmount: BigInt) => set({ sourceCoinAmount }),
  setTargetCoinAmount: (targetCoinAmount: BigInt) => set({ targetCoinAmount }),
  setSwapPair: (sourceCoinType: string, targetCoinType: string) => {
    const sourceCoinPrice = getPriceByCoinType(sourceCoinType);
    const targetCoinPrice = getPriceByCoinType(targetCoinType);
    set({
      sourceCoinType,
      targetCoinType,
      sourceCoinAmount: BigInt(1e8),
      targetCoinAmount: BigInt(Math.round(1e8 / sourceCoinPrice * targetCoinPrice))
    });
  },
  reverse: () => set((prev) => ({
    sourceCoinType: prev.targetCoinType,
    targetCoinType: prev.sourceCoinType,
    sourceCoinAmount: prev.targetCoinAmount,
    targetCoinAmount: prev.sourceCoinAmount,
  }))
}));
