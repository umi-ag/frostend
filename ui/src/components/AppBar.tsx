"use client";

import React from 'react';
import { ConnectButton } from '@suiet/wallet-kit';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTradeStore } from 'src/store/trade';
import { SUI } from 'src/libs/moveCall/sui/sui/structs';
import { isProduction } from 'src/config';
import { YTCoinType } from 'src/libs/frostendLib';
import { STSUI_COIN } from 'src/libs/moveCall/frostend/stsui-coin/structs';


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
            callback={() => { setSwapPair(SUI.$typeName, STSUI_COIN.$typeName) }}
          >
            stake
          </NavLink>
          <NavLink href="/vaults">vault</NavLink>
          <NavLink
            href="/swap"
            callback={() => { setSwapPair(STSUI_COIN.$typeName, YTCoinType(STSUI_COIN.$typeName)) }}
          >
            swap
          </NavLink>
          {!isProduction() && (
            <NavLink href="/validators">validators</NavLink>
          )}
          {!isProduction() && (
            <NavLink href="/admin">admin</NavLink>
          )}
        </div>
      </div>
      <div className="snowflake-neon"></div>
      <div className="flex items-center gap-6">
        <span className="bg-red-500 text-white text-md font-semibold px-3 py-1 rounded-lg">Sui Testnet</span>
        <div className="font-bold text-lg">
          <WalletConnectButton />
        </div>
      </div>
    </div>
  );
};
