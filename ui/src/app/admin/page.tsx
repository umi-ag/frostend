"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { mintTo } from 'src/moveCall/frostend/stsui-coin/functions';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { BANK, TRESURY_CAP, VAULT } from 'src/config/frostend';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { maybeSplitCoinsAndTransferRest } from 'src/moveCall/frostend/coin-utils/functions';
import Link from 'next/link';
import dayjs from 'dayjs';
import { depositCoins } from 'src/moveCall/frostend/actions/functions';
import { moveCallCreateBank, moveCallInitVault } from 'src/frostendLib';


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
      // @ts-ignore
      u64: props.amount,
    })

    const r = await signAndExecuteTransactionBlock({
      // @ts-ignore
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

const CreateBankCard = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();
    moveCallCreateBank(txb)

    const r = await signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          new Bank for stSUI
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

const CreateVaultCard = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

  const executeTransaction = async () => {
    if (!address) return;

    const maturesAt2024 = dayjs().add(193, 'day')
    const issuedAt = maturesAt2024.subtract(1, 'year')
    const maturesAt2025 = maturesAt2024.add(1, 'year')

    console.log(issuedAt.valueOf());
    console.log(maturesAt2024.valueOf());
    console.log(maturesAt2025.valueOf());

    const txb = new TransactionBlock();
    moveCallInitVault(txb, {
      address,
      issuedAt: BigInt(issuedAt.valueOf()),
      maturesAt: BigInt(maturesAt2024.valueOf()),
      amountSY: BigInt(1e8),
      amountSupply: BigInt(100e8),
    })

    const r = await signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
  }

  return (
    <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-black text-lg font-bold'>
          new Vault for stSUI
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

  depositCoins(txb, STSUI_COIN.$typeName, {
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
      // @ts-ignore
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

const ViewObject = (props: {
  objectId: string,
  display: string,
}) => {
  const { address, signAndExecuteTransactionBlock } = useWallet();

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

const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <FaucetCard amount={BigInt(100e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100' buttonDisplay='faucet' />
          <FaucetCard amount={BigInt(100e3 * 1e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100_000' buttonDisplay='faucet' />
          <CreateBankCard />
          <BankDespositCard />
          <CreateVaultCard />
          <ViewObject objectId={BANK} display='View BANK for stSUI' />
          <ViewObject objectId={VAULT} display='View VAULT for stSUI' />
        </div>
      </main>
    </div>
  )
}

export default Page;
