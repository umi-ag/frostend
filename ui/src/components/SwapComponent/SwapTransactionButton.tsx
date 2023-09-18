import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { moveCallSwapPtToSy, moveCallSwapSyToPt, moveCallSwapSyToYt, moveCallSwapYtToSy, whichCoinTypeIsSyPtYt } from 'src/frostendLib';
import { useTradeStore } from 'src/store/trade';
import { match } from 'ts-pattern'
import { noticeTxnResultMessage } from '../TransactionToast';

const SwapTransactionButton = () => {
  const { address } = useWallet()
  const wallet = useWallet()
  const [showModal, setShowModal] = useState(false)

  const { sourceCoinType, targetCoinType } = useTradeStore()

  const executeTransaction = async () => {
    if (!address) return;
    const txb = new TransactionBlock()

    await match([whichCoinTypeIsSyPtYt(sourceCoinType), whichCoinTypeIsSyPtYt(targetCoinType)])
      .with(['sy', 'pt'], async () => { await moveCallSwapSyToPt(txb, { address }) })
      .with(['pt', 'sy'], async () => { await moveCallSwapPtToSy(txb, { address }) })
      .with(['sy', 'yt'], async () => { await moveCallSwapSyToYt(txb, { address }) })
      .with(['yt', 'sy'], async () => { await moveCallSwapYtToSy(txb, { address }) })
      .otherwise(() => { throw new Error('invalid coinType') })

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    noticeTxnResultMessage({ href: url, txHash: r.digest })
  }

  const displayMessage = () => {
    return match([whichCoinTypeIsSyPtYt(sourceCoinType), whichCoinTypeIsSyPtYt(targetCoinType)])
      .with(['sy', 'pt'], () => "Deposit stSUI")
      .with(['pt', 'sy'], () => "Withdraw stSUI")
      .with(['sy', 'yt'], () => "Deposit stSUI")
      .with(['yt', 'sy'], () => "Withdraw stSUI")
      .otherwise(() => { throw new Error('invalid coinType') })
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
        {displayMessage()}
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
