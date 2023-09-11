import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { moveCallSwapPtToSy, moveCallSwapSyToPt, moveCallSwapSyToYt, moveCallSwapYtToSy, whichCoinTypeIsSyPtYt } from 'src/frostendLib';
import { useTradeStore } from 'src/store/trade';
import { match } from 'ts-pattern'

const SwapTransactionButton = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet()
  const {
    sourceCoinType, targetCoinType,
    sourceCoinAmount,
  } = useTradeStore()


  const executeTransaction = async () => {
    if (!address) return;
    const txb = new TransactionBlock()

    await match([whichCoinTypeIsSyPtYt(sourceCoinType), whichCoinTypeIsSyPtYt(targetCoinType)])
      .with(['sy', 'pt'], async () => { await moveCallSwapSyToPt(txb, { address }) })
      .with(['pt', 'sy'], async () => { await moveCallSwapPtToSy(txb, { address }) })
      .with(['sy', 'yt'], async () => { await moveCallSwapSyToYt(txb, { address }) })
      .with(['yt', 'sy'], async () => { await moveCallSwapYtToSy(txb, { address }) })
      .otherwise(() => { throw new Error('invalid coinType') })

    const r = await signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);

    alert(url)
  }

  const displayMessage = () => {
    return match([whichCoinTypeIsSyPtYt(sourceCoinType), whichCoinTypeIsSyPtYt(targetCoinType)])
      .with(['sy', 'pt'], () => "Deposit stSUI")
      .with(['pt', 'sy'], () => "Withdraw stSUI")
      .with(['sy', 'yt'], () => "Deposit stSUI")
      .with(['yt', 'sy'], () => "Withdraw stSUI")
      .otherwise(() => { throw new Error('invalid coinType') })
  }

  return (
    <div className="py-4 w-full text-black">
      {address ? (
        <button
          className="text-lg bg-green-300 hover:bg-green-400 w-full p-4 rounded-full transition duration-200
          disabled:bg-gray-200 dark:disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={executeTransaction}
        // disabled={networkName() === 'AptosMainnet' || disabled()}
        >
          {displayMessage()}
        </button>
      ) : (
        "Connect Wallet"
      )}
    </div>
  );
};

export default SwapTransactionButton;
