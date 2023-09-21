"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import {  sharbetMoveCall } from 'src/sharbetLib';
import { MoveCallCard } from 'src/components/MoveCallCard';

const Page = () => {
  const wallet = useWallet();

  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <MoveCallCard
            title="Satke SUI"
            buttonText="deposit"
            moveCall={async (txb) => {
              await sharbetMoveCall.stakeSuiToMintShasui(txb, {
                address: wallet.address!,
                amount: BigInt(100),
              })
            }}
          />
          <MoveCallCard
            title="Unstake SUI"
            buttonText="withdraw"
            moveCall={async (txb) => {
              await sharbetMoveCall.burnShasuiToMintUnstsui(txb, {
                address: wallet.address!,
                amount: BigInt(100),
              })
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
