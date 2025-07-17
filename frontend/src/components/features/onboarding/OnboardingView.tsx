import React from "react";

const OnboardingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Ether-Connect</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        Connect your wallet and choose your journey: find love, friendship, or
        both—all onchain!
      </p>
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold mb-4 shadow-lg">
        Connect Wallet
      </button>
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
          Dating Mode
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
          Friendship Mode
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;
