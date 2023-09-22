"use client";

import { VaultCard } from 'src/components/VaultCard';
import { useVaultStore } from 'src/store/vault';
import { Vault } from 'src/types';

const vaultId = (v: Vault) => `${v.syAssetType}-${v.maturityCode}-${v.maturity.toISOString()}`;

const Page = () => {
  const vaultStore = useVaultStore();

  return (
    <div className="grid grid-cols-3 gap-8">
      {vaultStore.vaults.map(v => <VaultCard vault={v} key={vaultId(v)} />)}
    </div>
  );
}

export default Page;
