"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { moveCallTakeCoin } from 'src/sharbetLib';
import { SHASUI } from 'src/moveCall/sharbet/shasui/structs';
import { MoveCallCard } from 'src/components/MoveCallCard';

const Page = () => {
  const wallet = useWallet();
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <MoveCallCard
            title="new Bank and Vault for stSUI"
            buttonText=''
            moveCall={async (txb) => {
              const coinSource = await moveCallTakeCoin(txb, {
                coinType: SHASUI.$typeName,
                address: wallet.address!,
                amount: BigInt(100),
              })
              txb.transferObjects([coinSource], txb.pure(wallet.address!))
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
