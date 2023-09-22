import Decimal from "decimal.js";
import {
  STSUI_PTCoinType,
  STSUI_SYCoinType,
  STSUI_YTCoinType,
} from "src/libs/frostendLib";
import { SUI } from "src/libs/moveCall/sui/sui/structs";
import { Vault } from "src/types";
import { create } from "zustand";

const _01Y = new Date("2023-12-26");
const _02Y = new Date("2024-12-26");

// TODO: rm
export const vaults: Vault[] = [
  {
    protocol: "Sharbet",
    syAssetType: STSUI_SYCoinType,
    ptAssetType: STSUI_PTCoinType,
    ytAssetType: STSUI_YTCoinType,
    principalAssetType: SUI.$typeName,
    maturity: _01Y,
    maturityCode: "01Y",
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
    status: "live",
  },
  {
    protocol: "Sharbet",
    syAssetType: STSUI_SYCoinType,
    ptAssetType: STSUI_PTCoinType,
    ytAssetType: STSUI_YTCoinType,
    principalAssetType: SUI.$typeName,
    maturity: _02Y,
    maturityCode: "02Y",
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
    status: "live",
  },
];

[
  {
    protocol: "Haedal",
    syAssetType: "0xhasui::hasui::HASUI",
    ptAssetType: STSUI_PTCoinType,
    ytAssetType: STSUI_YTCoinType,
    principalAssetType: SUI.$typeName,
    maturity: _02Y,
    maturityCode: "02Y",
    fixedAPY: new Decimal(0),
    longYieldAPY: new Decimal(0),
    impliedAPY: new Decimal(0),
    underlyingAPY: new Decimal(0),
    ptPrice: new Decimal(0),
    ytPrice: new Decimal(0),
    underlyingAssetPrice: new Decimal(0),
    status: "upcoming",
  },
  {
    protocol: "Volo",
    syAssetType: "0xvolo::volo::VOLO",
    ptAssetType: STSUI_PTCoinType,
    ytAssetType: STSUI_YTCoinType,
    principalAssetType: SUI.$typeName,
    maturity: _02Y,
    maturityCode: "02Y",
    fixedAPY: new Decimal(0),
    longYieldAPY: new Decimal(0),
    impliedAPY: new Decimal(0),
    underlyingAPY: new Decimal(0),
    ptPrice: new Decimal(0),
    ytPrice: new Decimal(0),
    underlyingAssetPrice: new Decimal(0),
    status: "upcoming",
  },
];

export const useVaultStore = create<{
  vaults: Vault[];
  setVaults: (vaults: Vault[]) => void;
}>((set) => ({
  vaults,
  setVaults: (vaults: Vault[]) => set({ vaults }),
}));
