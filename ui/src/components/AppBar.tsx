import React from 'react';
import { ConnectButton } from '@suiet/wallet-kit';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaucetButton } from './FaucetButton';


const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={`text-xl font-semibold px-2 py-1 ${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-300 hover:scale-105 transform transition-all duration-300 ease-in-out`}
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
        <div className='flex items-center gap-5'>
          <NavLink href="/">/</NavLink>
          <NavLink href="/swap">swap</NavLink>
          <NavLink href="/admin">admin</NavLink>
          <NavLink href="/kiosk">kiosk</NavLink>
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
