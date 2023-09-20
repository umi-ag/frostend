"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { createBank, createVault } from 'src/moveCall/frostend/root/functions';
import { BANK, ROOT, VAULT } from 'src/config/frostend';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { maybeSplitCoinsAndTransferRest } from 'src/moveCall/frostend/coin-utils/functions';
import * as bank from 'src/moveCall/frostend/bank/functions';
import Link from 'next/link';
import { moveCallFaucet } from 'src/frostendLib';
import { toast } from 'react-hot-toast';
import { noticeTxnResultMessage } from 'src/components/TransactionToast';
import { moveCallCoinSui, moveCallHot, moveCallStake } from 'src/sharbetLib';

const provider = new JsonRpcProvider(
  new Connection({
    // fullnode: "https://fullnode.testnet.sui.io:443",
    fullnode: "https://fullnode.testnet.sui.io",
  }),
);

const FaucetCard = (props: {
  amount: bigint,
  coinType: string,
  display: string,
  buttonDisplay: string,
}) => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock()
    moveCallFaucet(txb, { amount: props.amount })

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
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
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();

    createBank(txb, STSUI_COIN.$typeName, ROOT)
    createVault(txb, STSUI_COIN.$typeName, ROOT)

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
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
            await executeTransaction();
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
    const coins: { coinObjectId: string }[] = [];
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
  const wallet = useWallet();

  const executeTransaction = async () => {
    if (!wallet.address) return;
    const txb = new TransactionBlock()
    await bankDeposit(txb, wallet.address)

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
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

const ViewObject = (props: {
  objectId: string,
  display: string,
}) => {
  const url = () => {
    return `https://suiexplorer.com/object/${props.objectId}?network=testnet`
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          {props.display}
        </div>
        <Link href={url()} target='_blank'>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          >
            explorer
          </button>
        </Link>
      </div>
    </div>
  )
}

const TestToast = () => {
  const fire = () => {
    // toast.success('Swap success!');
    toast.success(<div>
      <p>Swap success!</p>
      <p>explorer url: <a className="text-blue-500 underline" target="_blank" href="https://suiexplorer.com" rel="noreferrer">https://suiexplorer.com</a></p>
    </div>, {
      duration: 4000,
      position: 'bottom-left',
    })
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          Test toast
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={fire}
        >
          fire
        </button>
      </div>
    </div>
  )
}

const StakeCard = () => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();

    moveCallStake(txb, {
      intentAddress: wallet.address!,
      validatorAddress: '0x70977fada000eb0da05483191f19de7cda9a9aa63db18d17bb55c69756b8454e',
      amount: BigInt(1e9)
    },)

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          shaSUI
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await executeTransaction();
          }}
        >
          stake
        </button>
      </div>
    </div>
  )
}

const CoolCard = () => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();
    {
      const amount = BigInt(100)
      const coinSui = await moveCallCoinSui(txb, { amount })
      txb.transferObjects([coinSui], txb.pure(wallet.address!))
    }
    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          Sharbet
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await executeTransaction();
          }}
        >
          Cool
        </button>
      </div>
    </div>
  )
}


const EventCard = () => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();
    await moveCallHot(txb, {
      address: wallet.address!,
    })
    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          Sharbet
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            await executeTransaction();
          }}
        >
          Hot
        </button>
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <FaucetCard amount={BigInt(100e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100' buttonDisplay='faucet' />
          <FaucetCard amount={BigInt(100e3 * 1e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100_000' buttonDisplay='faucet' />
          <VaultAndBankCard />
          <BankDespositCard />
          <ViewObject objectId={BANK} display='View BANK for stSUI' />
          <ViewObject objectId={VAULT} display='View VAULT for stSUI' />
          <TestToast />
          <StakeCard />
          <CoolCard />
          <EventCard />
        </div>
      </main>
    </div>
  )
}

export default Page;
