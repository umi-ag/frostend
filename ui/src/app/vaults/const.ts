import Decimal from 'decimal.js';
import { getCoinProfileByCoinType } from 'src/coinList';
import { STSUI_SYCoinType, } from 'src/frostendLib';
import { Vault } from 'src/types';

const _01Y = new Date('2023-12-26');
const _02Y = new Date('2024-12-26');

export const vaults: Vault[] = [
  {
    coin: getCoinProfileByCoinType(STSUI_SYCoinType)!,
    maturity: _01Y,
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
  },
  {
    coin: getCoinProfileByCoinType(STSUI_SYCoinType)!,
    maturity: _02Y,
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
  }
]

