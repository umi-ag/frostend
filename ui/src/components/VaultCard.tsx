import Decimal from 'decimal.js';
import { Vault } from 'src/types';
import dayjs from 'dayjs';
import { match } from 'ts-pattern';
import { CoinIcon } from './CoinIcon';
import { useRouter } from 'next/navigation';
import { useTradeStore } from 'src/store/trade';
import { getCoinProfileByCoinType } from 'src/libs/coinList';
import { ProtocolIcon, } from './ProtocolIcon';

const percent = (d: Decimal) => d.mul(100).toNumber();

const VaultIcon: React.FC<{ vault: Vault }> = (props) => {
  const syCoinProfile = getCoinProfileByCoinType(props.vault.syAssetType)!

  const shouldShowProtocolIcon = () => !syCoinProfile.iconUrl;

  // If syCoinProfile doesn't have `iconUrl`, then use principalAsset instead.
  const coin = shouldShowProtocolIcon()
    ? getCoinProfileByCoinType(props.vault.principalAssetType)!
    : syCoinProfile;

  return (
    <div className="relative">
      <CoinIcon coin={coin} size={50} />
      {
        shouldShowProtocolIcon() && <span className="absolute right-0 bottom-0">
          <ProtocolIcon protocolName={props.vault.protocol} size={20} />
        </span>
      }
    </div>
  );
}

const CardHeader: React.FC<{ vault: Vault }> = (props) => {
  const syCoinProfile = getCoinProfileByCoinType(props.vault.syAssetType)!
  const principalCoinProfile = getCoinProfileByCoinType(props.vault.principalAssetType)!
  const displayName = () => `${principalCoinProfile?.symbol} staked in ${props.vault.protocol}`;

  return (
    <div className="flex gap-4 px-4 mb-4">
      <VaultIcon vault={props.vault} />
      <div className="">
        <p className="text-left text-2xl font-bold">{syCoinProfile.symbol}</p>
        <p className="flex items-center gap-1">
          <CoinIcon coin={principalCoinProfile} size={14} />
          <span className="text-sm text-gray-400">
            {displayName()}
          </span>
        </p>
      </div>
    </div>
  );
};

const Maturity: React.FC<{ vault: Vault }> = (props) => {
  const d = dayjs(props.vault.maturity);
  const remaining = d.diff(dayjs(), 'day');

  const barColor = match(remaining)
    .when(x => x > 365, () => 'bg-blue-400')
    .when(x => x > 7, () => 'bg-orange-500')
    .otherwise(() => 'bg-red-400');

  return (
    <div className={`flex justify-between px-4 py-2 text-white mb-4 ${barColor}`}>
      <span>Maturity</span>
      <span suppressHydrationWarning>{props.vault.maturity.toLocaleDateString()} ({remaining} days)</span>
    </div>
  );
};

const YtAPY: React.FC<{ vault: Vault }> = (props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 px-4 mb-2">
      <p className='w-12 rounded border border-blue-600 text-blue-600 bg-blue-50 text-center'>YT</p>
      <div className="">
        <div className="flex justify-between items-center">
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
      <div className="">
        <div className="flex justify-between items-center">
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
  const tradeStore = useTradeStore();
  const router = useRouter();

  const goSwap = () => {
    if (props.vault.status == 'live') {
      tradeStore.setSwapPair(props.vault.syAssetType, props.vault.ptAssetType);
      router.push('/swap');
    }
  }

  const liveClass = "py-4 w-[300px] rounded-xl shadow-xl hover:shadow-2xl bg-white hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300"
  const notLiveClass = "w-[300px] rounded-xl shadow-xl bg-white opacity-80"

  return (
    <button
      className={
        props.vault.status == 'live'
          ? liveClass
          : notLiveClass
      }
      disabled={props.vault.status !== 'live'}
      onClick={goSwap}
    >
      {
        props.vault.status === 'upcoming'
          ? (
            <div className="h-7 mb-3 font-bold bg-green-400 text-white text-center py-0.5 rounded-t-xl">
              Upcoming
            </div>
          ) : (
            <></>
          )
      }
      <CardHeader vault={props.vault} />
      <Maturity vault={props.vault} />
      <YtAPY vault={props.vault} />
      <PtAPY vault={props.vault} />
      <UnderlyingAPY vault={props.vault} />
      <ImpliedAPY vault={props.vault} />
    </button>
  );
}
