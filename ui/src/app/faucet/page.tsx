"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { mint } from 'src/moveCall/frostend/stsui-coin/functions';
import * as bank from 'src/moveCall/frostend/bank/functions';
import * as vault from 'src/moveCall/frostend/vault/functions';
import { STSUI } from 'src/coinList';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { KeyObject } from 'crypto';
import { create } from 'domain';
import { createBank, createVault } from 'src/moveCall/frostend/root/functions';

const FaucetCard = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

  const faucet = async () => {
    const txb = new TransactionBlock();

    mint(txb, {
      treasuryCap: '0x2a5305b839da3b7d0776913d8c3b95bf342d1ed7b3fe001a693ab47778654cfc',
      u64: BigInt(100*1e8),
    })

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

const VaultAndBankCard = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const faucet = async () => {
    const txb = new TransactionBlock();
    // bank.new_(txb, STSUI_COIN.$typeName);
    // vault.new_(txb, STSUI_COIN.$typeName);

    createBank(txb, STSUI_COIN.$typeName,
      '0xce53626998d9151bc6bc5a8f1e5eccde11d94950f485d6f0f343a630d0307d2d',
    );
    createVault(txb, STSUI_COIN.$typeName,
      '0xce53626998d9151bc6bc5a8f1e5eccde11d94950f485d6f0f343a630d0307d2d',
    );

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
          new Bank and Vault for stSUI
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await faucet();
          }}
        >
          create
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
        <div className="text-white flex flex-wrap gap-10">
          <FaucetCard />
          <VaultAndBankCard />
        </div>
      </main>
    </div>
  )
}

export default Page;
