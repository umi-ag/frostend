import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { moveCallFaucet } from 'src/libs/frostendLib';
import { noticeTxnResultMessage } from './TransactionToast';


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
    noticeTxnResultMessage(r)
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
