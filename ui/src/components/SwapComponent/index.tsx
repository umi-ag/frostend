import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useWallet } from '@suiet/wallet-kit';
import Image from 'next/image';
import { STSUI } from 'src/coinList';
import { FaChevronDown } from "react-icons/fa6";
import SwapTransactionButton from './SwapTransactionButton';


const ReverseSourceTargetButton: React.FC = () => {
  return (
    <div className='my-1 w-full h-0 flex items-center justify-center gap-10 bg-slate-200 dark:bg-sea-500'>
      <button
        className="rounded-full w-10 h-10 grid place-items-center bg-white hover:bg-gray-100 dark:bg-gray-800 hover:dark:bg-sea-900 dark:text-gray-100 border border-gray-100 dark:border-gray-800 shadow-md"
      >
        <AiOutlineArrowDown size={28} />
      </button>
    </div>
  );
};

export const SwapComponent = () => {

  const { address } = useWallet()

  const SourceHeader = () => {
    // ... (元のSourceHeaderの内容をReactに合わせて変更)
    return (
      <div className='flex justify-between items-center px-3'>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-500">
          From
        </div>
        <div className="text-sm text-white-600 dark:text-gray-300">
          {address ? "Connected" : "Not connected"}
        </div>
      </div>
    );

  };

  const SourceBody = () => {
    return (
      <div className='flex justify-between items-center pl-1 pr-3'>
        <button className='w-[200px] flex items-center gap-2 hover:bg-slate-200'>
          <div className='flex items-center gap-2'>
            <Image src={STSUI.imageUrl} width={24} height={24} alt={STSUI.imageUrl} />
            <span className='text-xl text-black font-medium'>{STSUI.symbol}</span>
          </div>
          <FaChevronDown size={16} />
        </button>
        <input
          className="outline-none w-full text-right text-2xl font-bold bg-slate-100 dark:bg-sea-800"
          type="number"
          value={30}
        // onChange={handleAmountChange}
        />
      </div>
    );
  };

  const SourceFooter = () => {
    // ... (元のSourceFooterの内容をReactに合わせて変更)
    return (
      <div className='select-coin-footer px-3'>
        {/* Implement the logic for displaying the coin name and market value */}
      </div>
    );
  };


  const TargetHeader = () => {
    return (
      <div className='flex justify-between items-center px-3'>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-500">
          To
        </div>
        <div className="text-sm text-white-600 dark:text-gray-300">
          {/* {targetAsset ? `balance: ${targetAsset}` : null} */}
        </div>
      </div>
    );
  };

  const TargetBody = () => {
    return (
      <div className='flex justify-between items-center pl-1 pr-3'>
        <button className='w-[200px] flex items-center gap-2 hover:bg-slate-200'>
          <div className='flex items-center gap-2'>
            <Image src={""} width={24} height={24} alt={""} />
            <span className='text-xl text-black font-medium'>PT-stSUI</span>
          </div>
          <FaChevronDown size={16} />
        </button>
        <input
          className="outline-none w-full text-right text-2xl font-bold"
          type="number"
          value={30}
        // disabled={true}
        />
      </div>
    );
  };

  const TargetFooter = () => {
    // ... (元のTargetFooterの内容をReactに合わせて変更)
    return (
      <div className='select-coin-footer px-3'>
        {/* Implement the logic for displaying the coin name and market value */}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-sea-700 border border-gray-200 dark:border-sea-500 rounded-3xl p-3 sm:p-4 md:w-112 shadow-lg">
      <div className="flex justify-between items-center mb-1">
        <div className="text-md font-semibold text-white-600">Swap</div>
        <span className="flex items-center gap-1">
          {/* Implement the logic for the reload button and settings button */}
        </span>
      </div>

      <div className="flex flex-col gap-2 bg-slate-100 dark:bg-sea-800 py-2 rounded-2xl">
        <SourceHeader />
        <SourceBody />
        {/* <SourceFooter /> */}
      </div>
      <ReverseSourceTargetButton />

      <div className="flex flex-col gap-2 border-1 border-gray-300 dark:border-gray-600 py-2 rounded-2xl">
        <TargetHeader />
        <TargetBody />
        <TargetFooter />
      </div>
      <SwapTransactionButton />
    </div>
  );
};

