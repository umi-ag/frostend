import Decimal from 'decimal.js';
import { getCoinProfileByCoinType } from 'src/coinList';
import { VaultCard } from 'src/components/VaultCard';
import { STSUI_SYCoinType } from 'src/frostendLib';
import { Vault } from 'src/types';

export const Page = () => {
  const vault: Vault = {
    coin: getCoinProfileByCoinType(STSUI_SYCoinType)!,
    maturity: new Date(),
    fixedAPY: new Decimal(0.06),
    longYieldAPY: new Decimal(0.24),
    impliedAPY: new Decimal(0.3),
    underlyingAPY: new Decimal(0.3),
    ptPrice: new Decimal(0.96),
    ytPrice: new Decimal(0.04),
    underlyingAssetPrice: new Decimal(1),
  }

  return (
    <VaultCard vault={vault} />
  );
}

export default Page;