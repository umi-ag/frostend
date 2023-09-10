import React from 'react';
import { ConnectButton } from '@suiet/wallet-kit';
import Link from 'next/link';
import Image from 'next/image';

const NavLink: React.FC<{
  href: string
  children: React.ReactNode,
}> = ({ href, children }) => {
  // const router = useRouter();
  // const isActive = router.pathname === href;

  const isActive = false;

  return (
    <Link href={href}>
      <span
        className={`text-lg ${isActive ? 'text-gray-300' : 'text-white'} hover:text-gray-300 transition duration-300`}
      >
        {children}
      </span>
    </Link>
  );
};

const WalletConnectButton: React.FC = () => {
  return <ConnectButton>Connect Wallet</ConnectButton>;
};

export const AppBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-sky-800 z-50">
      <div className="flex items-center gap-3 drop-shadow-3xl">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="Frostend Logo"
          className='drop-shadow-3xl border-blue-600 border-2 rounded-full bg-gray-800'
        />
        <span className="text-white font-black text-4xl font-genos">
          FrostEnd
        </span>
      </div>
      <div className="snowflake-neon"></div>
      <div className="flex items-center gap-6">
        <NavLink href="/">/</NavLink>
        <NavLink href="/swap">/swap</NavLink>
        <NavLink href="/faucet">/faucet</NavLink>
        <NavLink href="/admin">/admin</NavLink>
        <div className="font-bold text-lg">
          <WalletConnectButton />
        </div>
      </div>
    </div>
  );

};
