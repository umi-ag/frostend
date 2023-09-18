"use client";

import { AppBar } from 'src/components/AppBar';
import { SwapComponent } from 'src/components/SwapComponent';
import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from 'src/frostendLib';
import { getPriceByCoinType } from 'src/frostendLib/priceList';
import { useTradeStore } from 'src/store/trade';


const FaucetCard = () => {
  const {
    setSourceCoinType, setTargetCoinType,
    setSourceCoinAmount, setTargetCoinAmount,
  } = useTradeStore()

  return (
    <div className='bg-gray-100 px-4 py-5 rounded-lg flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          stSUI 100
        </div>
        <div className='flex gap-3'>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-[200px]"
            onClick={async () => {
              setSourceCoinType(STSUI_SYCoinType)
              setTargetCoinType(STSUI_YTCoinType)

              const sourceCoinPrice = getPriceByCoinType(STSUI_SYCoinType)
              const targetCoinPrice = getPriceByCoinType(STSUI_YTCoinType)
              setSourceCoinAmount(BigInt(1e8))
              setTargetCoinAmount(
                BigInt(Math.round(1e8 / targetCoinPrice * sourceCoinPrice))
              )
            }}
          >
            YT: Long Yield APY
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-[200px]"
            onClick={async () => {
              setSourceCoinType(STSUI_SYCoinType)
              setTargetCoinType(STSUI_PTCoinType)

              const sourceCoinPrice = getPriceByCoinType(STSUI_SYCoinType)
              const targetCoinPrice = getPriceByCoinType(STSUI_PTCoinType)
              setSourceCoinAmount(BigInt(1e8))
              setTargetCoinAmount(
                BigInt(Math.round(1e8 / targetCoinPrice * sourceCoinPrice))
              )
            }}
          >
            PT: Fixed APY
          </button>
        </div>
      </div>
    </div>
  )
}


const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[120px] flex-wrap">
        <div>
          <div className="text-white flex flex-col gap-[40px]">
            <FaucetCard />
          </div>
          <div className='mt-10'>
            <SwapComponent />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page;
