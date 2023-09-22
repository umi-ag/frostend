import React from 'react';
import { ConnectButton } from '@suiet/wallet-kit';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaucetButton } from './FaucetButton';
import { useTradeStore } from 'src/store/trade';
import { SHASUI } from 'src/moveCall/sharbet/shasui/structs';
import { SUI } from 'src/moveCall/sui/sui/structs';
import { STSUI_COIN } from 'src/moveCall/frostend/stsui-coin/structs';
import { STSUI_YTCoinType } from 'src/frostendLib';


const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  callback?: () => void
}> = ({ href, children, callback }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const router = useRouter()

  return (
    <button onClick={() => {
      callback?.()
      router.push(href)
    }}
    >
      <span
        className={`text-xl font-semibold px-2 py-1 ${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-300 hover:scale-105 transform transition-all duration-300 ease-in-out`}
      >
        {children}
      </span>
    </button>
  );
};

const WalletConnectButton: React.FC = () => {
  return <ConnectButton>Connect Wallet</ConnectButton>;
};

const Logo = () => {
  const size = 48
  return (
    <Image
      src="/logo.png" width={size} height={size}
      alt="Frostend Logo"
    // className='drop-shadow-3xl border-blue-600 border-2 rounded-full bg-gray-800'
    />
  )
}

export const AppBar: React.FC = () => {
  const { setSwapPair } = useTradeStore()

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-sky-800 z-50">
      <div className="flex items-center gap-8 drop-shadow-3xl">
        <div className="flex items-center gap-1">
          <Logo />
          <span className="text-white font-black mb-1 text-4xl font-genos">
            FrostEnd
          </span>
        </div>
        <div className='flex items-center gap-6'>
          <NavLink
            href="/stake"
            callback={() => { setSwapPair(SUI.$typeName, SHASUI.$typeName) }}
          >
            stake
          </NavLink>
          <NavLink href="/vaults">vault</NavLink>
          <NavLink
            href="/swap"
            callback={() => { setSwapPair(STSUI_COIN.$typeName, STSUI_YTCoinType) }}
          >
            swap
          </NavLink>
          <NavLink href="/admin">admin</NavLink>
        </div>
      </div>
      <div className="snowflake-neon"></div>
      <div className="flex items-center gap-6">
        <span className="bg-red-500 text-white text-md font-semibold px-3 py-1 rounded-lg">Sui Testnet</span>
        <FaucetButton />
        <div className="font-bold text-lg">
          <WalletConnectButton />
        </div>
      </div>
    </div>
  );
};
