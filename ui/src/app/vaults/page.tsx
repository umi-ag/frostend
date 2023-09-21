"use client";

import { VaultCard } from 'src/components/VaultCard';
import { Vault } from 'src/types';
import { vaults } from './const';

const vaultId = (v: Vault) => `${v.underlyingCoin.coinType}-${v.maturityCode}-${v.maturity.toISOString()}`;

const Page = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {vaults.map(v => <VaultCard vault={v} key={vaultId(v)} />)}
    </div>
  );
}

export default Page;
