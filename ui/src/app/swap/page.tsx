"use client";

import { AppBar } from 'src/components/AppBar';
import { SwapComponent } from 'src/components/SwapComponent';
import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from 'src/frostendLib';
import { useTradeStore } from 'src/store/trade';

const FaucetCard = () => {
  const { targetCoinType, setSwapPair } = useTradeStore()

  const normal = 'w-full h-full rounded-xl bg-gray-50 text-gray-900';
  const ytClassName = targetCoinType === STSUI_YTCoinType
    ? 'w-full h-full rounded-xl border-2 border-blue-800 bg-blue-100 text-blue-900'
    : normal;
  const ptClassName = targetCoinType === STSUI_PTCoinType
    ? 'w-full h-full rounded-xl border-2 border-green-800 bg-green-50 text-green-800'
    : normal;

  return (
    <div className='grid grid-cols-2 min-h-[4em] rounded-xl text-black bg-gray-50 transition-all duration-200'>
      {/* <button className='w-full h-full rounded-xl border-2 border-blue-800 bg-blue-100 text-blue-900'> */}
      <button className={ytClassName} onClick={() => setSwapPair(STSUI_SYCoinType, STSUI_YTCoinType)}>
        <p>YT: Long Yield APY</p>
        <p>50%</p>
      </button>
      {/* <button className='w-full h-full rounded-r-xl border border-green-800 bg-green-50 text-green-800'>PT: Fixed APY</button> */}
      {/* <button className='w-full h-full bg-gray-50 text-gray-900'> */}
      <button className={ptClassName} onClick={async () => setSwapPair(STSUI_SYCoinType, STSUI_PTCoinType)}>
        <p>PT: Fixed APY</p>
        <p>50%</p>
      </button>
      {/* <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          stSUI 100
        </div>
        <div className='flex gap-3'>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-[200px]"
            onClick={async () => setSwapPair(STSUI_SYCoinType, STSUI_YTCoinType)}
          >
            YT: Long Yield APY
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-[200px]"
            onClick={async () => setSwapPair(STSUI_SYCoinType, STSUI_PTCoinType)}
          >
            PT: Fixed APY
          </button>
        </div>
      </div> */}
    </div>
  )
}


const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[120px] flex-wrap">
        <div>
          <div className="text-white mb-16">
            <FaucetCard />
          </div>
          <div className=''>
            <SwapComponent />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page;
