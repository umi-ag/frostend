import { suiClient } from "src/config/sui";
import { create } from "zustand";
import { SuiSystemStateSummary } from "@mysten/sui.js/client";

export const useSuiSystemState = create<{
  suiSystemState: SuiSystemStateSummary | null;
  fetch: () => void;
}>((set) => ({
  suiSystemState: null,
  fetch: async () => {
    const suiSystemState = await suiClient().getLatestSuiSystemState();
    set({ suiSystemState });
  },
}));
