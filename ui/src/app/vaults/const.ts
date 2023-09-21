import Decimal from 'decimal.js';
import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType, } from 'src/frostendLib';
import { SUI } from 'src/moveCall/sui/sui/structs';
import { Vault } from 'src/types';

const _01Y = new Date('2023-12-26');
const _02Y = new Date('2024-12-26');

export const vaults: Vault[] = [
  {
    protocol: 'Sharbet',
    syAssetType: STSUI_SYCoinType,
    ptAssetType: STSUI_PTCoinType,
    ytAssetType: STSUI_YTCoinType,
    principalAssetType: SUI.$typeName,
    maturity: _01Y,
    maturityCode: '01Y',
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
  },
  {
    protocol: 'Sharbet',
    syAssetType: STSUI_SYCoinType,
    ptAssetType: STSUI_PTCoinType,
    ytAssetType: STSUI_YTCoinType,
    principalAssetType: SUI.$typeName,
    maturity: _02Y,
    maturityCode: '02Y',
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
  }
]

