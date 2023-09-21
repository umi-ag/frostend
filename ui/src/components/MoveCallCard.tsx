
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { noticeTxnResultMessage } from 'src/components/TransactionToast';
import { sharbetMoveCall } from 'src/sharbetLib';
import { MouseEventHandler } from 'react';

export const TransactionButtonCard = (props: {
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


export const MoveCallCard = (props: {
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

  return (
    <TransactionButtonCard
      title={props.title}
      buttonText={props.buttonText}
      onClick={executeTransaction}
    />
  )
};
