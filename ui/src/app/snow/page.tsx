"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';

const imageUrl = "https://user-images.githubusercontent.com/14998939/256967328-b7870445-e873-416e-a1a0-ee1d60c7993c.jpg";


const PlayerScreen = () => (
  <div className='bg-gray-800 px-10 py-5 rounded-2xl'>
    <div className='flex items-center justify-between pb-5'>
      <span className='text-2xl text-yellow-300 font-bold '>
        Player&apos;s screen
      </span>
      <span className='text-xl text-blue-200'>
        (UI inside the game screen)
      </span>
    </div>
  </div>
);

const Page = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar />
      <main className="flex justify-center mt-[120px]">
        <div className="text-white flex flex-col gap-[40px]">
          <PlayerScreen />
        </div>
      </main>
    </div>
  )
}

export default Page;
