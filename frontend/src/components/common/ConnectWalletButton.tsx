'use client';

import { ConnectButton } from 'thirdweb/react';
import client from '@/lib/client/client';
import { sepolia } from 'thirdweb/chains';

interface ConnectWalletButtonProps {
  className?: string;
}

export default function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  return (
    <ConnectButton
      client={client}
      chain={sepolia}
      connectButton={{
        label: 'Connect Wallet',
        className: `bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors ${className || ''}`,
      }}
      connectModal={{
        size: 'compact',
        title: 'Connect to Your Wallet',
        showThirdwebBranding: false,
      }}
      onConnect={(wallet) => {
        console.log('Wallet connected:', wallet);
      }}
      onDisconnect={() => {
        console.log('Wallet disconnected');
      }}
    />
  );
}