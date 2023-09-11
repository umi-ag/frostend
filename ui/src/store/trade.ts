import { STSUI_SYCoinType, STSUI_YTCoinType } from "src/frostendLib";
import { create } from "zustand";

export const useTradeStore = create<{
  sourceCoinType: string,
  targetCoinType: string,
  sourceCoinAmount: BigInt,
  targetCoinAmount: BigInt,
  setSourceCoinAmount: (sourceCoinAmount: BigInt)=> void,
  setTargetCoinAmount: (targetCoinAmount: BigInt)=> void,
  reverse: ()=>  void;
}>((set) => ({
  sourceCoinType: STSUI_SYCoinType,
  targetCoinType: STSUI_YTCoinType,
  sourceCoinAmount: BigInt(0),
  targetCoinAmount: BigInt(0),
  setSourceCoinAmount: (sourceCoinAmount: BigInt) => set({ sourceCoinAmount }),
  setTargetCoinAmount: (targetCoinAmount: BigInt) => set({ targetCoinAmount }),
  reverse: () => set((prev)=> ({
    sourceCoinType: prev.targetCoinType,
    targetCoinType: prev.sourceCoinType,
  }))
}));
