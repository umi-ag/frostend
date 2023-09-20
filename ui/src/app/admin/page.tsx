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
import { moveCallStakeSuiToMintShasui } from 'src/sharbetLib';
import { MouseEventHandler } from 'react';

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

const provider = new JsonRpcProvider(
  new Connection({
    fullnode: "https://fullnode.testnet.sui.io",
  }),
);

const Card = (props: {
  title: string,
  buttonText: string,
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}) => (
  <div className='bg-gray-100 px-3 py-2 rounded-lg w-[200px] h-[200px] flex items-center justify-center'>
    <div className='flex flex-col items-center gap-3'>
      <div className='text-black text-lg font-bold'>
        {props.title}
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={props.onClick}
      >
        {props.buttonText}
      </button>
    </div>
  </div>
);

const FaucetCard = (props: {
  amount: bigint,
  coinType: string,
  display: string,
  buttonDisplay: string,
}) => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();
    moveCallFaucet(txb, { amount: props.amount })

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r);
  };

  return <Card title={props.display} buttonText={props.buttonDisplay} onClick={executeTransaction} />;
};

const VaultAndBankCard = () => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    const txb = new TransactionBlock();

    createBank(txb, STSUI_COIN.$typeName, ROOT);
    createVault(txb, STSUI_COIN.$typeName, ROOT);

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r);
  };

  return <Card title="new Bank and Vault for stSUI" buttonText="create" onClick={executeTransaction} />;
};


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
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
            explorer
          </button>
        </Link>
      </div>
    </div>
  );
};

const StakeCard = () => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    if (!wallet.address) return;
    const txb = new TransactionBlock();

    await moveCallStakeSuiToMintShasui(txb, {
      address: wallet.address!,
      amount: BigInt(100),
    })

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r);
  };

  return <Card title="Satke SUI" buttonText="deposit" onClick={executeTransaction} />;
};

const Page = () => {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <FaucetCard amount={BigInt(100e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100' buttonDisplay='faucet' />
          <FaucetCard amount={BigInt(100e3 * 1e8)} coinType={STSUI_COIN.$typeName} display='stSUI 100_000' buttonDisplay='faucet' />
          <VaultAndBankCard />
          <ViewObject objectId={BANK} display='View BANK for stSUI' />
          <ViewObject objectId={VAULT} display='View VAULT for stSUI' />
          <Card title="Test toast" buttonText="fire" onClick={() => toast.success('Swap success!')} />
          <StakeCard />
        </div>
      </main>
    </div>
  );
};

export default Page;
