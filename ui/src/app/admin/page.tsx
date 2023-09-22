"use client";

import { useWallet } from '@suiet/wallet-kit';
import { AppBar } from 'src/components/AppBar';
import { STSUI_COIN } from 'src/libs/moveCall/frostend/stsui-coin/structs';
import { createBank, createVault } from 'src/libs/moveCall/frostend/root/functions';
import { BANK, ROOT, VAULT } from 'src/config/frostend';
import { moveCallFaucet } from 'src/libs/frostendLib';
import { sharbetMoveCall } from 'src/libs/sharbetLib';
import { MoveCallCard, TransactionButtonCard } from 'src/components/MoveCallCard';
import { useRouter } from 'next/navigation';
import { suiClient } from 'src/config/sui';

const ViewObject = (props: {
  objectId: string,
  title: string,
}) => {
  const router = useRouter()
  const url = () => { return `https://suiexplorer.com/object/${props.objectId}?network=testnet` }

  return (
    <TransactionButtonCard
      title={props.title}
      buttonText="explorer"
      onClick={() => { router.push(url()) }}
    />
  )
};

const Page = () => {
  const wallet = useWallet();
  const router = useRouter()

  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex mx-auto items-center mt-[120px] max-w-[90%]">
        <div className="text-white flex flex-wrap gap-10">
          <MoveCallCard
            title='stSUI 100'
            buttonText='faucet'
            moveCall={async (txb) => {
              await moveCallFaucet(txb, { amount: BigInt(100e8) })
            }}
          />
          <MoveCallCard
            title='stSUI 100'
            buttonText='faucet'
            moveCall={async (txb) => {
              await moveCallFaucet(txb, { amount: BigInt(100e3 * 1e8) })
            }}
          />
          <MoveCallCard
            title="new Bank and Vault for stSUI"
            buttonText="create"
            moveCall={async (txb) => {
              await createBank(txb, STSUI_COIN.$typeName, ROOT);
              await createVault(txb, STSUI_COIN.$typeName, ROOT);
            }}
          />
          <ViewObject objectId={BANK} title='View BANK for stSUI' />
          <ViewObject objectId={VAULT} title='View VAULT for stSUI' />
          <MoveCallCard
            title="Satke SUI"
            buttonText="deposit"
            moveCall={async (txb) => {
              await sharbetMoveCall.stakeSuiToMintShasui(txb, {
                address: wallet.address!,
                amount: BigInt(100),
              })
            }}
          />
          <MoveCallCard
            title="Unstake SUI"
            buttonText="withdraw"
            moveCall={async (txb) => {
              await sharbetMoveCall.burnShasuiToMintUnstsui(txb, {
                address: wallet.address!,
                amount: BigInt(100),
              })
            }}
          />
          <TransactionButtonCard
            title="Active Validator"
            buttonText="view"
            onClick={async () => {
              const suiSystemState = await suiClient().getLatestSuiSystemState()
              const vals = suiSystemState.activeValidators
              console.log(vals)
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
