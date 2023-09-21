import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { frostendMoveCall, whichCoinTypeIsSyPtYt } from 'src/frostendLib';
import { useTradeStore } from 'src/store/trade';
import { match } from 'ts-pattern'
import { noticeTxnResultMessage } from '../TransactionToast';
import { isSHASUI } from 'src/moveCall/sharbet/shasui/structs';
import { isSUI } from 'src/moveCall/sui/sui/structs';
import { sharbetMoveCall } from 'src/sharbetLib';

const whichCoinType = (coinType: string): "sui" | "shasui" | "sy" | "pt" | "yt" => {
  if (isSUI(coinType)) { return 'sui' }
  if (isSHASUI(coinType)) { return 'shasui' }
  return whichCoinTypeIsSyPtYt(coinType)
}

const SwapTransactionButton = () => {
  const wallet = useWallet()
  const [showModal, setShowModal] = useState(false)

  const { sourceCoinType, targetCoinType } = useTradeStore()

  const executeTransaction = async () => {
    if (!wallet.address) return;
    const txb = new TransactionBlock()

    const { address } = wallet
    await match([whichCoinType(sourceCoinType), whichCoinType(targetCoinType)])
      .with(['sui', 'shasui'], async () => { await sharbetMoveCall.stakeSuiToMintShasui(txb, { address, amount: BigInt(100) }) })
      .with(['shasui', 'sui'], async () => { await sharbetMoveCall.burnShasuiToMintUnstsui(txb, { address, amount: BigInt(100) }) })
      .with(['sy', 'pt'], async () => { await frostendMoveCall.swapSyToPt(txb, { address, amount: BigInt(10_000) }) })
      .with(['pt', 'sy'], async () => { await frostendMoveCall.swapPtToSy(txb, { address, amount: BigInt(10_000) }) })
      .with(['sy', 'yt'], async () => { await frostendMoveCall.swapSyToYt(txb, { address, amount: BigInt(10_000) }) })
      .with(['yt', 'sy'], async () => { await frostendMoveCall.swapYtToSy(txb, { address, amount: BigInt(10_000) }) })
      .otherwise(() => { throw new Error('invalid coinType') })

    const r = await wallet.signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    noticeTxnResultMessage(r)
  }

  const displayMessage = () => {
    return match([whichCoinType(sourceCoinType), whichCoinType(targetCoinType)])
      .with(['sui', 'shasui'], async () => "Stake SUI")
      .with(['shasui', 'sui'], async () => "Withdraw SUI")
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
