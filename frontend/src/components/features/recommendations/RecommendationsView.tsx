import React from "react";

const RecommendationsView: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recommendations Feed</h2>
      <div className="bg-white/10 rounded-lg p-4 shadow-md">
        <p className="mb-2">
          Here you'll see personalized suggestions to boost your chemistry,
          visibility, and engagement!
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Complete a DeFi quest to increase your chemistry with BlockchainBro.
          </li>
          <li>
            Stake in protocol Z to unlock higher visibility for your profile.
          </li>
          <li>Attend an Etherlink onchain event to earn XP.</li>
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsView;
