"use client";

import { AppBar } from 'src/components/AppBar';
import { SuiSystemStateSummary, SuiValidatorSummary } from "@mysten/sui.js/client";
import { useEffect } from 'react';
import { useSuiSystemState } from 'src/store/validators';
import Link from 'next/link';
// import { numeral } from 'numeral'
import numeral from 'numeral'


const StatsCard = () => {
  const StatsRow = ({ title, value }: { title: string, value: string }) => (
    <div className='text-center'>
      <p className='text-gray-500 mb-2'>{title}</p>
      <p className='font-semibold'>{value}</p>
    </div>
  );

  return (
    <div className='flex justify-around w-full rounded-xl bg-gray-50 text-gray-700 p-4 shadow-xl'>
      <StatsRow title="Liquidity" value="$123,456,789" />
      <StatsRow title="24h volume" value="$123,456,789" />
      <StatsRow title="Underlying APY" value="10%" />
    </div>
  )
}

const SuiValidatorStateView: React.FC<{
  validator: SuiValidatorSummary
}> = (props) => {
  const size = 36

  const suiAddressExplorer = () => `https://suiexplorer.com/address/${props.validator.suiAddress}?network=testnet`
  const display = {
    stakedSui: () => {
      const volume = parseInt(props.validator.poolTokenBalance) / 1e9
      return numeral(volume).format('0,0')
    }
  }


  return (
    <div
      className="bg-white rounded-full flex items-center justify-between gap-2 px-2 py-1"
    >
      {/* {
        <Image
          src={props.validator.imageUrl ?? ""} alt={""}
          width={size} height={size}
          layout="fixed"
          className='rounded-full'
        />
      } */}
      <div className='w-30' > {props.validator.name} </div>
      <div className='w-30' > Staked: {display.stakedSui()} SUI</div>
      <div className='w-30' > voting power: {props.validator.votingPower} </div>
      <div className='w-30' > commission: {parseInt(props.validator.commissionRate) / 100}% </div>
      {
        props.validator.projectUrl
          ? (
            <Link href={props.validator.projectUrl} target='_blank'>
              <div className='w-30' > url </div>
            </Link>
          ) : (
            <div>url</div>
          )
      }
      <Link href={suiAddressExplorer()} target='_blank'>
        <div className='w-30' > address </div>
      </Link>
    </div>
  )
}

const SuiSystemStateView: React.FC<{
  suiSystemState: SuiSystemStateSummary
}> = (props) => {
  return (
    <div className='flex flex-col gap-3'>
      {props.suiSystemState.activeValidators.map((v, i) => (
        <SuiValidatorStateView key={i} validator={v} />
      ))}
    </div>
  )
}



const Page = () => {
  const { fetch, suiSystemState } = useSuiSystemState()

  useEffect(() => {
    fetch()
  }, []);

  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[120px] gap-8">
        <div>
          <button onClick={() => {
            console.table(suiSystemState?.activeValidators)
          }}>print</button>
        </div>
        <div>
          {suiSystemState && (
            <SuiSystemStateView suiSystemState={suiSystemState} />
          )}
          <StatsCard />
        </div>
      </main>
    </div>
  )
}

export default Page;
