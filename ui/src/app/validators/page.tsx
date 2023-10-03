"use client";

import { AppBar } from 'src/components/AppBar';
import { SuiSystemStateSummary, SuiValidatorSummary } from "@mysten/sui.js/client";
import { useSuiSystemState } from 'src/store/validators';
import Link from 'next/link';
import numeral from 'numeral'
import { ValidatorTable } from './table';

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
      className="bg-white rounded-xl flex items-center justify-between gap-2 px-2 py-1"
    >
      {
        <img
          src={props.validator.imageUrl ?? ""}
          alt={""}
          width={size} height={size}
          className='rounded-full'
        />
      }
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
  const { data: suiSystemState } = useSuiSystemState()

  return (
    <div className="h-screen">
      <AppBar />
      <main className="grid place-items-center mx-auto mt-[120px] gap-8">

        <div className="px-8 py-2 bg-white shadow-lg rounded-lg">
          <ValidatorTable />
        </div>

        {/* <div>
          <button onClick={() => {
            console.table(suiSystemState?.activeValidators)
          }}>print</button>
        </div>
        <div>
          {suiSystemState && (
            <SuiSystemStateView suiSystemState={suiSystemState} />
          )}
        </div> */}
      </main>
    </div>
  )
}

export default Page;
