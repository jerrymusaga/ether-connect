'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ConnectWalletButton from '@/components/common/ConnectWalletButton';
import { useActiveAccount } from 'thirdweb/react'; // Correct hook for checking wallet connection


const LandingPage = () => {
  const router = useRouter();
  const account = useActiveAccount(); // Hook to get active account (null if not connected)
  const isConnected = !!account; // Convert to boolean
  const [mode, setMode] = useState<'dating' | 'friendship' | null>(null); // Track selected mode
  const [showOnboarding, setShowOnboarding] = useState(false); // Control onboarding visibility

  // Redirect to home page after wallet connection and mode selection
  useEffect(() => {
    if (isConnected && mode) {
      // Simulate saving mode to user profile or context (you can integrate with your backend or context)
      console.log(`Mode selected: ${mode}`);
      router.push('/home'); // Redirect to home page
    }
  }, [isConnected, mode, router]);

  // Show onboarding after wallet connection
  useEffect(() => {
    if (isConnected) {
      setShowOnboarding(true);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black/5 justify-center relative overflow-hidden">
      {/* Soft overlay for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 z-0" />

      <main className="z-10 relative flex flex-col items-center justify-center px-4 py-16 w-full">
        {!showOnboarding ? (
          <>
            {/* Landing Page Content */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#FDA7FF] bg-clip-text mb-6 text-center drop-shadow-lg">
              Ether-Connect
            </h1>
            <p className="max-w-xl text-base sm:text-lg md:text-2xl text-gray-200 mb-8 text-center font-medium">
              Onchain Dating, Friendship, and Social Quest Platform on Etherlink.
              <br />
              <span className="text-pink-200">
                Make meaningful, provable, and gamified connections in Web3.
              </span>
            </p>
            {/* Match card visuals */}
            <div className="w-full flex flex-col items-center mb-8">
              <div className="relative flex flex-row items-center justify-center gap-2 sm:gap-6 md:gap-10">
                <Image
                  width={120}
                  height={120}
                  alt="love2"
                  src="/love2.png"
                  className="hidden sm:block h-20 w-20 object-contain absolute -bottom-8 -right-8 z-10 animate-float"
                />
                <Image
                  width={120}
                  height={120}
                  alt="love"
                  src="/love.png"
                  className="hidden sm:block h-20 w-20 object-contain absolute -top-8 -left-8 z-10 animate-float"
                />
                <Image
                  width={320}
                  height={320}
                  alt="match1"
                  src="/avater2.jpeg"
                  className="w-32 h-32 sm:w-60 sm:h-60 md:w-80 md:h-80 object-cover rounded-full shadow-xl bg-white/10"
                />
                <Image
                  width={320}
                  height={320}
                  alt="match2"
                  src="/avater1.jpg"
                  className="w-32 h-32 sm:w-60 sm:h-60 md:w-80 md:h-80 object-cover rounded-full shadow-xl bg-white/10"
                />
                <Image
                  width={80}
                  height={80}
                  alt="love2"
                  src="/love2.png"
                  className="block sm:hidden h-10 w-10 object-contain absolute -left-3 md:left-2 -top-5 md:top-2 z-10 animate-float"
                />
                <Image
                  width={80}
                  height={80}
                  alt="love"
                  src="/love.png"
                  className="block sm:hidden h-10 w-10 object-contain absolute -bottom-2 -right-3 md:right-2 md:bottom-2 z-10 animate-float"
                />
              </div>
            </div>
            {/* Connect Wallet Button */}
            <div className="mt-4">
              <ConnectWalletButton className="bg-[#FDA7FF] text-white hover:bg-[#fd7bff] transition-colors" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 animate-fade-in relative">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Animated sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-16 left-16 w-2 h-2 bg-[#FDA7FF] rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-32 right-24 w-1 h-1 bg-white rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute bottom-16 right-16 w-1 h-1 bg-purple-300 rounded-full animate-bounce delay-500"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-[#FDA7FF] drop-shadow-2xl text-center animate-bounce">
                Welcome to Ether-Connect
              </h1>
              
              <div className="mb-8 text-center">
                <p className="text-xl sm:text-2xl text-gray-200 mb-2 font-medium">
                  Choose your journey:
                </p>
                <p className="text-lg text-pink-200 animate-pulse">
                  Find love, friendship, or both—all onchain! ✨
                </p>
              </div>

              {/* Mode selection cards */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-4">
                {/* Dating Mode Card */}
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2" onClick={() => setMode('dating')}>
                  <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-3 animate-bounce">💕</div>
                      <h3 className="text-xl font-bold text-blue-200 mb-2">Dating Mode</h3>
                      <p className="text-gray-300 text-sm">Find your perfect match</p>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500/20 rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Friendship Mode Card */}
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2" onClick={() => setMode('friendship')}>
                  <div className="relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-green-500/25 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-3 animate-bounce delay-200">🤝</div>
                      <h3 className="text-xl font-bold text-green-200 mb-2">Friendship Mode</h3>
                      <p className="text-gray-300 text-sm">Build lasting friendships</p>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500/20 rounded-full animate-ping delay-300"></div>
                  </div>
                </div>
              </div>

              {/* Fun subtitle */}
              <div className="mt-8 text-center animate-pulse">
                <p className="text-gray-400 text-sm">
                  🚀 Ready to connect? Pick your adventure!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Mobile bottom gradient overlay */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#ff61a6]/40 to-transparent z-0 pointer-events-none" />
    </div>
  );
};

export default LandingPage;