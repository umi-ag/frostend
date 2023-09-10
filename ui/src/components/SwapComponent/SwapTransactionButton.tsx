import { useWallet } from '@suiet/wallet-kit';
import React, { useState, useEffect } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { PACKAGE_ID } from 'src/moveCall/frostend';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { swapPtToSy } from 'src/moveCall/frostend/swap/functions';

const SwapTransactionButton = () => {
  const { address } = useWallet()

  const faucet = async () => {
    const txb = new TransactionBlock();

    swapPtToSy(txb,
      STSUI_COIN.$typeName,
      {
        coin: '0x1',
        vault: '0x2',
        bank: '0x3',
      },
    )

    let r = await signAndExecuteTransactionBlock({
      transactionBlock: txb

    });
    let url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    console.log(url);
  }


  return (
    <div className="py-4 w-full text-black">
      {address ? (
        <button
          className="text-lg bg-green-300 hover:bg-green-400 w-full p-4 rounded-full transition duration-200
          disabled:bg-gray-200 dark:disabled:bg-gray-400 disabled:cursor-not-allowed"
        // onClick={swapTransaction}
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
