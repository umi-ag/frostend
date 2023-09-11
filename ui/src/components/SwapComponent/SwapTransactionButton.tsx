import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { swapSyToPt } from 'src/moveCall/frostend/swap/functions';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { maybeSplitCoinsAndTransferRest } from 'src/moveCall/frostend/coin-utils/functions';
import { BANK, VAULT } from 'src/config/frostend';

const provider = new JsonRpcProvider(
  new Connection({
    // fullnode: "https://fullnode.testnet.sui.io:443",
    fullnode: "https://fullnode.testnet.sui.io",
  }),
);

const moveCallSwapSyToPt = async (txb: TransactionBlock, address: string) => {
  const coins = await (async () => {
    const coins: { coinObjectId: string }[] = [];
    const coins_sy = await provider.getCoins({
      owner: address,
      coinType: STSUI_COIN.$typeName,
    })
    coins.push(...coins_sy.data)
    return coins
  })()

  const coin_sy = await maybeSplitCoinsAndTransferRest(txb, STSUI_COIN.$typeName, {
    vecCoin: txb.makeMoveVec({
      objects: coins.map(coin => txb.pure(coin.coinObjectId)),
    }),
    u64: BigInt(10 * 1e8),
    address,
  })

  const coin_pt = await swapSyToPt(txb,
    STSUI_COIN.$typeName,
    {
      vecCoin: txb.makeMoveVec({ objects: [coin_sy] }),
      vault: VAULT,
      bank: BANK,
    },
  )

  txb.transferObjects([coin_pt], txb.pure(address))

  return txb
}

const SwapTransactionButton = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet()

  const executeTransaction = async () => {
    if (!address) return;
    const txb = new TransactionBlock()
    await moveCallSwapSyToPt(txb, address)

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
