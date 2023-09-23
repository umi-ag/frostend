"use client";

import Link from 'next/link';
import numeral from 'numeral';
import { useSuiSystemState } from 'src/store/validators';
import { AppBar } from 'src/components/AppBar';
import { SuiSystemStateSummary, SuiValidatorSummary } from "@mysten/sui.js/client";

const TableHeader = () => (
  <thead className="">
    <tr>
      <th className="px-4 py-2 font-light">Name</th>
      <th className="px-4 py-2 font-light">Staked(SUI)</th>
      <th className="px-4 py-2 font-light">Voting Power</th>
      <th className="px-4 py-2 font-light">Commission</th>
      <th className="px-4 py-2 font-light">URL</th>
      <th className="px-4 py-2 font-light">Address</th>
    </tr>
  </thead>
);

const TableRow = ({ validator }: { validator: SuiValidatorSummary }) => {
  const suiAddressExplorer = () => `https://suiexplorer.com/address/${validator.suiAddress}?network=testnet`;
  const stakedSui = () => {
    const volume = parseInt(validator.poolTokenBalance) / 1e9;
    return numeral(volume).format('0,0');
  };

  const formattedAddress = () => {
    const address = validator.suiAddress;
    return address.slice(0, 4) + '...' + address.slice(-4);
  };

  return (
    <tr>
      <td className=" rounded-lg border-gray-300 px-4 py-2">{validator.name}</td>
      <td className=" px-4 py-2 font-light text-right">{stakedSui()}</td>
      <td className=" px-4 py-2 font-light text-right">{validator.votingPower}</td>
      <td className=" px-4 py-2 font-light text-right">{parseInt(validator.commissionRate) / 100}%</td>
      <td className=" px-4 py-2 font-light">
        {validator.projectUrl ? (
          <Link href={validator.projectUrl} passHref>
            <div>URL</div>
          </Link>
        ) : (
          'N/A'
        )}
      </td>
      <td className=" px-4 py-2 font-light">
        <Link href={suiAddressExplorer()} passHref>
          <div>{formattedAddress()}</div>
        </Link>
      </td>
    </tr>
  );
};

const SuiSystemStateView: React.FC<{
  suiSystemState: SuiSystemStateSummary
}> = (props) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-xl">
      <div className="mb-2 text-lg font-medium">Validators</div>
      <table className="table-auto w-full">
        <TableHeader />
        <tbody>
          {props.suiSystemState.activeValidators.map((validator, i) => (
            <TableRow key={i} validator={validator} />
          ))}
        </tbody>
      </table>
    </div>
  );
};


const Page = () => {
  const { data: suiSystemState } = useSuiSystemState()

  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[100px] gap-8">
        <div>
          <button onClick={() => {
            console.table(suiSystemState?.activeValidators);
          }}>print</button>
        </div>
        <div>
          {suiSystemState && (
            <SuiSystemStateView suiSystemState={suiSystemState} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
