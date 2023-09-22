import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { useTradeStore } from 'src/store/trade';
import { match } from 'ts-pattern'
import { noticeTxnResultMessage } from '../TransactionToast';
import { moveCallSwap, whichCoinType } from 'src/libs';


const getTransactionMessage = (sourceCoinType: string, targetCoinType: string) => {
  return match([whichCoinType(sourceCoinType), whichCoinType(targetCoinType)])
    .with(['sui', 'shasui'], () => "Stake SUI")
    .with(['shasui', 'unstsui'], () => "Unstake SUI")
    .with(['unstsui', 'sui'], () => "Redeem SUI")
    .with(['sy', 'pt'], () => "Deposit stSUI")
    .with(['pt', 'sy'], () => "Withdraw stSUI")
    .with(['sy', 'yt'], () => "Deposit stSUI")
    .with(['yt', 'sy'], () => "Withdraw stSUI")
    .otherwise(() => { throw new Error('invalid coinType') });
}

const SwapTransactionButton = () => {
  const wallet = useWallet()
  const [showModal, setShowModal] = useState(false)
  const { sourceCoinType, targetCoinType } = useTradeStore()

  const executeTransaction = async () => {
    if (!wallet.address) return;
    const txb = new TransactionBlock()
    await moveCallSwap(txb, { sourceCoinType, targetCoinType, address: wallet.address })
    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
  }

  const style = `text-lg bg-green-300 hover:bg-green-400 w-full p-4 rounded-full transition duration-200
          disabled:bg-gray-200 dark:disabled:bg-gray-400 disabled:cursor-not-allowed`
  return wallet.connected
    ? (
      <button
        className={style}
        onClick={async () => {
          await executeTransaction();
        }}
      >
        {getTransactionMessage(sourceCoinType, targetCoinType)}
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

export default SwapTransactionButton;
