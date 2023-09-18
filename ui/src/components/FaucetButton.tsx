import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { moveCallFaucet } from 'src/frostendLib';
import toast from 'react-hot-toast';
import Link from 'next/link';

const notify = (props: {
  txHash: string,
  href: string,
}) => {
  console.log(props.txHash);
  toast.success((
    <div>
      <p>Transaction Success!</p>
      <p>
        <Link className="text-blue-500 underline" target="_blank" href={props.href} rel="noreferrer">Open Explorer</Link>
      </p>
    </div>
  ), {
    duration: 4000,
    position: 'bottom-right',
  })
}

export const FaucetButton: React.FC<{ buttonDisplay?: string }> = ({ buttonDisplay = "faucet stSUI" }) => {
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false)

  const executeTransaction = async () => {
    const txb = new TransactionBlock()
    moveCallFaucet(txb, { amount: BigInt(100e8) })

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    notify({ href: url, txHash: r.digest })
  }

  const style = "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
  return wallet.connected
    ? (
      <button
        className={style}
        onClick={async () => {
          await executeTransaction();
        }}
      >
        {buttonDisplay}
      </button>
    ) : (
      <ConnectModal
        open={showModal}
        onOpenChange={(open) => setShowModal(open)}
      >
        <button
          className={style}
          onClick={async () => {
            wallet.adapter?.connect()
            // await executeTransaction();
          }}
        >
          Connect Wallet
        </button>
      </ConnectModal>
    )
};
