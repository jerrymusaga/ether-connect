"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConnectWalletButton from "@/components/common/ConnectWalletButton";
import { useActiveAccount } from "thirdweb/react"; // Correct hook for checking wallet connection
import OnboardingModal, {
  type OnboardingData,
} from "@/components/features/onboarding/OnboardingModal";

const LandingPage = () => {
  const router = useRouter();
  const account = useActiveAccount(); // Hook to get active account (null if not connected)
  const isConnected = !!account; // Convert to boolean
  const [showOnboarding, setShowOnboarding] = useState(false); // Control onboarding visibility
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );

  // Show onboarding after wallet connection
  useEffect(() => {
    if (isConnected) {
      setShowOnboarding(true);
    }
  }, [isConnected]);

  // Redirect to home page after onboarding is complete
  useEffect(() => {
    if (onboardingData) {
      // Save onboardingData to context/backend here if needed
      router.push("/home");
    }
  }, [onboardingData, router]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFF0F7] justify-center relative overflow-hidden">
      <main className="z-10 relative flex flex-col items-center justify-center px-4 py-16 w-full">
        {!showOnboarding ? (
          <>
            {/* Landing Page Content */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#C41E3A] bg-clip-text mb-6 text-center drop-shadow-lg">
              Ether-Connect
            </h1>
            <p className="max-w-xl text-base sm:text-lg md:text-2xl text-gray-700 mb-8 text-center font-medium">
              Onchain Dating, Friendship, and Social Quest Platform on
              Etherlink.
              <br />
              <span className="text-pink-600">
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
                  className="w-32 h-32 sm:w-60 sm:h-60 md:w-80 md:h-80 object-cover rounded-full shadow-xl bg-white/20 border-4 border-pink-200/50"
                />
                <Image
                  width={320}
                  height={320}
                  alt="match2"
                  src="/avater1.jpg"
                  className="w-32 h-32 sm:w-60 sm:h-60 md:w-80 md:h-80 object-cover rounded-full shadow-xl bg-white/20 border-4 border-pink-200/50"
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
              <ConnectWalletButton className="bg-[#C41E3A] text-white hover:bg-[#A01729] transition-colors shadow-lg" />
            </div>
          </>
        ) : (
          <OnboardingModal
            onComplete={(data) => {
              setOnboardingData(data);
            }}
          />
        )}
      </main>
      {/* Mobile bottom gradient overlay */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-200/40 to-transparent z-0 pointer-events-none" />
    </div>
  );
};

export default LandingPage;
