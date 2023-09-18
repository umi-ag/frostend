import Link from "next/link";
import toast from "react-hot-toast";

export const noticeTxnResultMessage = (props: {
  txHash: string,
  href: string,
}) => {
  console.log(props.txHash);
  toast.success((
    <div>
      <p>Transaction Success!</p>
      <p>
        <Link className="text-blue-500 underline" target="_blank" href={props.href} rel="noreferrer">Open Explorer</Link>
      </p>
    </div>
  ), {
    duration: 4000,
    position: 'bottom-right',
  })
}
