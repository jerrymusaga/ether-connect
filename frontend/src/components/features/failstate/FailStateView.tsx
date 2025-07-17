import React from "react";

const FailStateView: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Rekt in Love 💔</h2>
      <div className="bg-white/10 rounded-lg p-4 shadow-md text-center">
        <p className="mb-2">
          Not every connection works out, but you still win some Web3 love!
        </p>
        <ul className="list-disc pl-6 text-left mb-4">
          <li>CrushDust tokens (ERC-20) as consolation</li>
          <li>Exclusive Badge NFTs like "Hopeless Romantic"</li>
        </ul>
        <p className="text-sm text-gray-400">
          Check your wallet for airdrops and try again!
        </p>
      </div>
    </div>
  );
};

export default FailStateView;
