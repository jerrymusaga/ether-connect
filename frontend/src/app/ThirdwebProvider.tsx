'use client';

import { ThirdwebProvider } from 'thirdweb/react';
import client from '@/lib/client/client';
import { sepolia } from 'thirdweb/chains'; // Example chain, adjust as needed

export default function ThirdwebProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      client={client}
      activeChain={sepolia} // Specify your chain here
      supportedChains={[sepolia]} // Add other supported chains if needed
    >
      {children}
    </ThirdwebProvider>
  );
}