"use client";

import { VaultCard } from 'src/components/VaultCard';
import { useVaultStore } from 'src/store/vaults';
import { Vault } from 'src/types';

const vaultId = (v: Vault) => `${v.syAssetType}-${v.maturityCode}-${v.maturity.toISOString()}`;

const Page = () => {
  const vaultStore = useVaultStore();

  return (
    <div className="grid max-w-[1024px] mx-auto my-0 xl:grid-cols-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-8">
      {vaultStore.vaults.map(v => <VaultCard vault={v} key={vaultId(v)} />)}
    </div>
  );
}

export default Page;
