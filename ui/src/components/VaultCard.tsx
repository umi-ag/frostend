import Decimal from 'decimal.js';
import Image from 'next/image';
import { CoinProfile } from 'src/coinList';
import { Vault } from 'src/types';

const percent = (d: Decimal) => d.mul(100).toNumber();

export const CoinIcon: React.FC<{ coin: CoinProfile }> = (props) => (
  <Image src={props.coin.iconUrl as string} alt={props.coin.name} width={50} height={50} />
);

const CardHeader: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="flex gap-4 px-4 mb-4">
      <CoinIcon coin={props.vault.coin} />
      <div className="">
        <p className="text-2xl font-bold">stSUI</p>
        <p className="text-sm text-gray-400">Staked SUI</p>
      </div>
    </div>
  );
};

const Maturity: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="flex justify-between px-4 py-2 bg-blue-400 text-white mb-4">
      <span>Maturity</span>
      <span>{props.vault.maturity.toLocaleDateString()} (153 days)</span>
    </div>
  );
};

const YtAPY: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 px-4 mb-2">
      <p className='w-12 rounded border border-blue-600 text-blue-600 bg-blue-50 text-center'>YT</p>
      <div className="pb-3">
        <div className="flex justify-between items-end">
          <span className='text-sm'>Long Yield APY</span>
          <span className='text-2xl font-bold'>{percent(props.vault.longYieldAPY)}%</span>
        </div>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <span>Price</span>
          <span className=''>${props.vault.ytPrice.toNumber()}</span>
        </div>
      </div>
    </div>
  );
};

const PtAPY: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 px-4 mb-2">
      <p className='w-12 rounded border border-green-600 text-green-600 bg-green-50 text-center'>PT</p>
      <div className="pb-3">
        <div className="flex justify-between items-end">
          <span className="text-sm">Fixed APY</span>
          <span className='text-2xl font-bold'>{percent(props.vault.fixedAPY)}%</span>
        </div>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <span>Price</span>
          <span className=''>${props.vault.ptPrice.toNumber()}</span>
        </div>
      </div>
    </div>
  );
};

const UnderlyingAPY: React.FC<{ vault: Vault }> = (props) => {
  return (
    <>
      <div className="flex justify-between px-4 text-sm">
        <span>Underlying APY</span>
        <span>{percent(props.vault.underlyingAPY)}%</span>
      </div>
      <div className="flex justify-between px-4 text-sm text-gray-500 mb-4">
        <span>Price</span>
        <span>${props.vault.underlyingAssetPrice.toNumber()}</span>
      </div>
    </>
  );
};

const ImpliedAPY: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="flex justify-between px-4 text-sm mb-2">
      <span>Implied APY</span>
      <span>{percent(props.vault.impliedAPY)}%</span>
    </div>
  );
};

export const VaultCard: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="w-[300px] rounded-xl shadow-xl bg-white py-4">
      <CardHeader vault={props.vault} />
      <Maturity vault={props.vault} />
      <YtAPY vault={props.vault} />
      <PtAPY vault={props.vault} />
      <UnderlyingAPY vault={props.vault} />
      <ImpliedAPY vault={props.vault} />
    </div>
  );
}