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
    <div className="flex items-center justify-between px-6 py-4 bg-blue-200 shadow-md">
      <div className="flex items-center gap-3 drop-shadow-3xl">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="Frostend Logo"
          className='drop-shadow-3xl border-blue-600 border-2 rounded-full bg-gray-700'
        />
        <span className="text-black font-black text-4xl font-genos">
          FrostEnd
        </span>
        <span className="text-black font-black text-2xl font-qld">
          FrostEnd
        </span>
        <span className="text-black font-bold text-2xl font-tourney">
          FrostEnd
        </span>
        <span className="text-black text-2xl font-crisis">
          FrostEnd
        </span>
        <span className="text-black font-bold text-4xl font-teko">
          FrostEnd
        </span>
        <span className="text-black font-bold font-prism text-2xl font-">
          FrostEnd
        </span>
        <span className="text-black font-bold font-lalezar text-2xl">
          FROSTEND
        </span>
        <span className="text-black font-bold font-popone text-2xl">
          FROSTEND
        </span>
      </div>
    </div>
  );
};
