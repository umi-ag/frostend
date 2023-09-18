import Link from "next/link";
import toast from "react-hot-toast";
import { SuiSignAndExecuteTransactionBlockOutput } from '@mysten/wallet-standard';

export const noticeTxnResultMessage = (
  transactionBlockOutput: SuiSignAndExecuteTransactionBlockOutput
) => {
  const { digest } = transactionBlockOutput
  const href = `https://suiexplorer.com/txblock/${digest}?network=testnet`
  console.log(href)

  toast.success((
    <div>
      <p>Transaction Success!</p>
      <p>
        <Link className="text-blue-500 underline" target="_blank" href={href} rel="noreferrer">
          Open Explorer
        </Link>
      </p>
    </div>
  ), {
    duration: 4000,
    position: 'bottom-right',
  })
}
