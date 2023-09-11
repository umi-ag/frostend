import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'

const SwapTransactionButton = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet()


  const sy2pt = async () => {
    console.log("sy2pt")
    const txb = new TransactionBlock();

    // swapSyToPt(txb,
    //   STSUI_COIN.$typeName,
    //   {
    //     coin: '0x55e0a6aa18a24cf88802d95641faa9b4ebf92440390fd87375ec4c93e35ea9ee',
    //     vault: '0x92ad2498dca224a562b40c8d0b0620a8d5aab2711560ddb5164a8e072b70d3e3',
    //     bank: '0x22a1e759d7e00545fa36dec0b574d077d0e837659b1599ad32c43577dd9e54ed',
    //   },
    // )

    // const r = await signAndExecuteTransactionBlock({
    //   transactionBlock: txb
    // });
    // const url = `https://suiexplorer.com/txblock/${r.digest}?network=testnet`
    // console.log(url);
  }


  return (
    <div className="py-4 w-full text-black">
      {address ? (
        <button
          className="text-lg bg-green-300 hover:bg-green-400 w-full p-4 rounded-full transition duration-200
          disabled:bg-gray-200 dark:disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={sy2pt}
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
