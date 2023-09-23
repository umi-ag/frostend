import Decimal from "decimal.js";
import { PTCoinType, YTCoinType } from "src/libs/frostendLib";
import { SSUI } from "src/libs/moveCall/coinhouse/ssui/structs";
import { SUSDC } from "src/libs/moveCall/coinhouse/susdc/structs";
import { USDC } from "src/libs/moveCall/coinhouse/usdc/structs";
import { STSUI_COIN } from "src/libs/moveCall/frostend/stsui-coin/structs";
import { SUI } from "src/libs/moveCall/sui/sui/structs";
import { Vault } from "src/types";
import { create } from "zustand";

const _01Y = new Date("2023-12-26");
const _02Y = new Date("2024-12-26");

// TODO: rm
export const vaults: Vault[] = [
  {
    protocol: "Sharbet",
    syAssetType: STSUI_COIN.$typeName,
    ptAssetType: PTCoinType(STSUI_COIN.$typeName),
    ytAssetType: YTCoinType(STSUI_COIN.$typeName),
    principalAssetType: SUI.$typeName,
    maturity: _01Y,
    maturityCode: "01Y",
    reserveSYAsset: BigInt(1514923e8),
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.08),
    impliedAPY: new Decimal(0.14),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
    status: "live",
  },
  {
    protocol: "Sharbet",
    syAssetType: STSUI_COIN.$typeName,
    ptAssetType: PTCoinType(STSUI_COIN.$typeName),
    ytAssetType: YTCoinType(STSUI_COIN.$typeName),
    principalAssetType: SUI.$typeName,
    maturity: _02Y,
    maturityCode: "02Y",
    reserveSYAsset: BigInt(9323e8),
    fixedAPY: new Decimal(0.12),
    longYieldAPY: new Decimal(0.14),
    impliedAPY: new Decimal(0.26),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.91),
    ytPrice: new Decimal(0.09),
    underlyingAssetPrice: new Decimal(1),
    status: "live",
  },
];

[
  {
    protocol: "Scallop",
    syAssetType: SSUI.$typeName,
    ptAssetType: PTCoinType(SSUI.$typeName),
    ytAssetType: YTCoinType(SSUI.$typeName),
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
    protocol: "Scallop",
    syAssetType: SUSDC.$typeName,
    ptAssetType: PTCoinType(SUSDC.$typeName),
    ytAssetType: YTCoinType(SUSDC.$typeName),
    principalAssetType: USDC.$typeName,
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
    protocol: "Haedal",
    syAssetType: "0xhasui::hasui::HASUI",
    ptAssetType: PTCoinType(STSUI_COIN.$typeName),
    ytAssetType: YTCoinType(STSUI_COIN.$typeName),
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
    ptAssetType: PTCoinType(STSUI_COIN.$typeName),
    ytAssetType: YTCoinType(STSUI_COIN.$typeName),
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
