"use client";

import { AppBar } from 'src/components/AppBar';
import { SwapComponent } from 'src/components/SwapComponent';
import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from 'src/frostendLib';
import { useTradeStore } from 'src/store/trade';

const ToggleToken = () => {
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
      <button className={ytClassName} onClick={() => setSwapPair(STSUI_SYCoinType, STSUI_YTCoinType)}>
        <p>YT: Long Yield APY</p>
        <p>50%</p>
      </button>
      <button className={ptClassName} onClick={async () => setSwapPair(STSUI_SYCoinType, STSUI_PTCoinType)}>
        <p>PT: Fixed APY</p>
        <p>50%</p>
      </button>
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
            <ToggleToken />
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
