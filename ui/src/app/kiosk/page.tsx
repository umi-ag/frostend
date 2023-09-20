"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { noticeTxnResultMessage } from 'src/components/TransactionToast';
import { moveCallTakeCoin, sharbetMoveCall } from 'src/sharbetLib';
import { MouseEventHandler } from 'react';
import { SHASUI } from 'src/moveCall/sharbet/shasui/structs';


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


const MoveCallCard = (props: {
  title: string,
  buttonText: string,
  moveCall: (txb: TransactionBlock) => void,
}) => {
  const wallet = useWallet();

  const executeTransaction = async () => {
    if (!wallet.address) return;
    const txb = new TransactionBlock();
    await props.moveCall(txb)
    await sharbetMoveCall.stakeSuiToMintShasui(txb, {
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
  const wallet = useWallet();
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <MoveCallCard
            title="new Bank and Vault for stSUI"
            buttonText=''
            moveCall={async (txb) => {
              const coinSource = await moveCallTakeCoin(txb, {
                coinType: SHASUI.$typeName,
                address: wallet.address!,
                amount: BigInt(100),
              })
              txb.transferObjects([coinSource], txb.pure(wallet.address!))
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
