import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { moveCallSwapYtToSy } from 'src/frostendLib';

const SwapTransactionButton = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet()

  const executeTransaction = async () => {
    if (!address) return;
    const txb = new TransactionBlock()
    // await moveCallSwapSyToPt(txb, { address })
    // await moveCallSwapPtToSy(txb, { address })
    // await moveCallSwapSyToYt(txb, { address })
    await moveCallSwapYtToSy(txb, { address })

    const r = await signAndExecuteTransactionBlock({
      // @ts-ignore
      transactionBlock: txb
    });
    const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
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
          Desposit
        </button>
      ) : (
        "Connect Wallet"
      )}
    </div>
  );
};

export default SwapTransactionButton;
