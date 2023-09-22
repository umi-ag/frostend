"use client";

import { AppBar } from 'src/components/AppBar';
import { SwapComponent } from 'src/components/SwapComponent';
import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from 'src/libs/frostendLib';
import { useTradeStore } from 'src/store/trade';
import { match } from 'ts-pattern';
import { whichCoinType } from '../../libs';
import { FaucetButton } from 'src/components/FaucetButton';


const ToggleToken = () => {
  const { sourceCoinType, targetCoinType, setSwapPair } = useTradeStore()

  const isPTPair = match([whichCoinType(sourceCoinType), whichCoinType(targetCoinType)])
    .with(['sy', 'pt'], () => true)
    .with(['pt', 'sy'], () => true)
    .otherwise(() => false)
  const isYTPair = match([whichCoinType(sourceCoinType), whichCoinType(targetCoinType)])
    .with(['sy', 'yt'], () => true)
    .with(['yt', 'sy'], () => true)
    .otherwise(() => false)

  const normal = 'w-full h-full rounded-xl bg-gray-50 text-gray-700';
  const ptClassName = isPTPair
    ? 'w-full h-full rounded-xl border-2 border-green-800 bg-green-100 text-green-800'
    : normal;

  const ytClassName = isYTPair
    ? 'w-full h-full rounded-xl border-2 border-blue-800 bg-blue-100 text-blue-900'
    : normal;

  return (
    <div className='grid grid-cols-2 min-h-[4em] rounded-xl text-black bg-gray-50 transition-all duration-200 shadow-xl'>
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

const StatsCard = () => {
  const { sourceCoinType, targetCoinType } = useTradeStore()

  const StatsRow = ({ title, value }: { title: string, value: string }) => (
    <div className='text-center'>
      <p className='text-gray-500 mb-2'>{title}</p>
      <p className='font-semibold'>{value}</p>
    </div>
  );

  const displayAPYTitle = () => {
    return match([whichCoinType(sourceCoinType), whichCoinType(targetCoinType)])
      .with(['sy', 'pt'], () => "Fixed APY")
      .with(['pt', 'sy'], () => "Fixed APY")
      .with(['sy', 'yt'], () => "Long Yield APY")
      .with(['yt', 'sy'], () => "Long Yield APY")
      .otherwise(() => { throw new Error('invalid coinType') })
  }

  return (
    <div className='flex justify-around w-full rounded-xl bg-gray-50 text-gray-700 p-4 shadow-xl'>
      <StatsRow title="Liquidity" value="$123,456,789" />
      <StatsRow title="24h volume" value="$123,456,789" />
      <StatsRow title="Underlying APY" value="10%" />
      {/* <StatsRow title={displayAPYTitle()} value="10%" /> */}
    </div>
  )
}

const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[120px] gap-8">
        <div>
          <div className="text-white mb-8">
            <ToggleToken />
          </div>
          <div className="text-white mb-8 text-md flex items-center gap-3 justify-end">
            <span> If you need shaSUI, </span>
            <FaucetButton />
          </div>
          <div className='mb-8'>
            <SwapComponent />
          </div>
          <StatsCard />
        </div>
      </main>
    </div>
  )
}

export default Page;
