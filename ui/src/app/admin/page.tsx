"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { createBank, createVault } from 'src/moveCall/frostend/root/functions';
import { BANK, ROOT, VAULT } from 'src/config/frostend';
import Link from 'next/link';
import { moveCallFaucet } from 'src/frostendLib';
import { sharbetMoveCall } from 'src/sharbetLib';
import { MoveCallCard } from 'src/components/MoveCallCard';

const ViewObject = (props: {
  objectId: string,
  display: string,
}) => {
  const url = () => {
    return `https://suiexplorer.com/object/${props.objectId}?network=testnet`
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          {props.display}
        </div>
        <Link href={url()} target='_blank'>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
            explorer
          </button>
        </Link>
      </div>
    </div>
  );
};

const Page = () => {
  const wallet = useWallet();

  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <MoveCallCard
            title='stSUI 100'
            buttonText='faucet'
            moveCall={async (txb) => {
              await moveCallFaucet(txb, { amount: BigInt(100e8) })
            }}
          />
          <MoveCallCard
            title='stSUI 100'
            buttonText='faucet'
            moveCall={async (txb) => {
              await moveCallFaucet(txb, { amount: BigInt(100e3 * 1e8) })
            }}
          />
          <MoveCallCard
            title="new Bank and Vault for stSUI"
            buttonText="create"
            moveCall={async (txb) => {
              await createBank(txb, STSUI_COIN.$typeName, ROOT);
              await createVault(txb, STSUI_COIN.$typeName, ROOT);
            }}
          />
          <ViewObject objectId={BANK} display='View BANK for stSUI' />
          <ViewObject objectId={VAULT} display='View VAULT for stSUI' />
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
        </div>
      </main>
    </div>
  );
};

export default Page;
