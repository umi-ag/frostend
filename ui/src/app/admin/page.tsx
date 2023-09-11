"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { mintTo } from 'src/moveCall/frostend/stsui-coin/functions';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { createBank, createVault } from 'src/moveCall/frostend/root/functions';
import { BANK, ROOT, TRESURY_CAP } from 'src/config/frostend';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { maybeSplitCoinsAndTransferRest } from 'src/moveCall/frostend/coin-utils/functions';
import * as bank from 'src/moveCall/frostend/bank/functions';


const provider = new JsonRpcProvider(
  new Connection({
    // fullnode: "https://fullnode.testnet.sui.io:443",
    fullnode: "https://fullnode.testnet.sui.io",
  }),
);

const FaucetCard = (props: {
  amount: BigInt,
  coinType: string,
  display: string,
  buttonDisplay: string,
}) => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

  const executeTransaction = async () => {
    if (!address) return;
    const txb = new TransactionBlock()
    mintTo(txb, {
      treasuryCap: TRESURY_CAP,
      u64: props.amount,
    })

    const r = await signAndExecuteTransactionBlock({
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
  }


  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          {props.display}
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await executeTransaction();
          }}
        >
          {props.buttonDisplay}
        </button>
      </div>
    </div>
  )
}

const VaultAndBankCard = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const faucet = async () => {
    const txb = new TransactionBlock();

    createBank(txb, STSUI_COIN.$typeName, ROOT)
    createVault(txb, STSUI_COIN.$typeName, ROOT)

    const r = await signAndExecuteTransactionBlock({
      transactionBlock: txb

    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
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

const bankDeposit = async (txb: TransactionBlock, address: string) => {
  const coins = await (async () => {
    const coins: CoinObject[] = [];

    const coins_sy = await provider.getCoins({
      owner: address,
      coinType: STSUI_COIN.$typeName,
    })
    coins.push(...coins_sy.data)
    return coins
  })()

  const coin = await maybeSplitCoinsAndTransferRest(txb, STSUI_COIN.$typeName, {
    vecCoin: txb.makeMoveVec({
      objects: coins.map(coin => txb.pure(coin.coinObjectId)),
    }),
    u64: BigInt(1000 * 1e8),
    address: address,
  })

  bank.deposit(txb, STSUI_COIN.$typeName, {
    vecCoin: txb.makeMoveVec({
      objects: [coin]
    }),
    bank: BANK,
  })

  return txb
}

const BankDespositCard = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

  const executeTransaction = async () => {
    if (!address) return;
    const txb = new TransactionBlock()
    await bankDeposit(txb, address)

    const r = await signAndExecuteTransactionBlock({
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          Bank for stSUI
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await executeTransaction();
          }}
        >
          deposit
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
          <FaucetCard amount={BigInt(100e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100' buttonDisplay='faucet' />
          <FaucetCard amount={BigInt(100e3 * 1e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100_000' buttonDisplay='faucet' />
          <VaultAndBankCard />
          <BankDespositCard />
        </div>
      </main>
    </div>
  )
}

export default Page;
