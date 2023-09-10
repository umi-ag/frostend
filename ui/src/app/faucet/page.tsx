"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { mintSTSUI } from 'src/moveCall/frostend';

const FaucetCard = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

  const faucet = async () => {
    const txb = new TransactionBlock();
    mintSTSUI({ txb, volume: 100 })
    let r = await signAndExecuteTransactionBlock({
      transactionBlock: txb

    });
    let url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          stSUI 100
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await faucet();
          }}
        >
          Faucet
        </button>
      </div>
    </div>
  )
}


const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[120px] flex-wrap">
        <div className="text-white flex flex-col gap-[40px]">
          <FaucetCard />
        </div>
      </main>
    </div>
  )
}

export default Page;
