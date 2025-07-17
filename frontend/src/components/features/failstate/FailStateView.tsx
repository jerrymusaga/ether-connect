import React from "react";
import { Heart, Gift, Award, Wallet, RotateCcw } from "lucide-react";

const FailStateView: React.FC = () => {
  const rewards = [
    {
      icon: <Gift size={20} />,
      title: "CrushDust tokens (ERC-20)",
      description: "Consolation tokens for your efforts",
      color: "purple"
    },
    {
      icon: <Award size={20} />,
      title: "Exclusive Badge NFTs",
      description: "Like \"Hopeless Romantic\" and \"Brave Heart\"",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-500'
        };
      case 'pink':
        return {
          bg: 'bg-pink-50',
          border: 'border-pink-200',
          icon: 'text-pink-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center">
        {/* Main Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-200">
            <Heart size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
            Rekt in Love 💔
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Not every connection works out, but you still win some Web3 love!
          </p>
        </div>

        {/* Rewards Card */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center space-x-2">
            <Gift size={20} className="text-yellow-500" />
            <span>Your Consolation Rewards</span>
          </h3>
          
          <div className="space-y-3">
            {rewards.map((reward, index) => {
              const colorClasses = getColorClasses(reward.color);
              return (
                <div
                  key={index}
                  className={`${colorClasses.bg} ${colorClasses.border} rounded-lg p-3 sm:p-4 border`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${colorClasses.icon} mt-1 flex-shrink-0`}>
                      {reward.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                        {reward.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        {reward.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wallet Check */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Wallet size={18} className="text-blue-500" />
            <span className="text-blue-700 font-medium text-sm sm:text-base">
              Check Your Wallet
            </span>
          </div>
          <p className="text-blue-600 text-xs sm:text-sm">
            Look for airdrops and new tokens in your wallet!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-md flex items-center justify-center space-x-2">
            <RotateCcw size={18} />
            <span>Try Again</span>
          </button>
          <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all border border-gray-300 flex items-center justify-center space-x-2">
            <Wallet size={18} />
            <span>View Wallet</span>
          </button>
        </div>

        {/* Encouragement Message */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-gray-700 text-sm sm:text-base">
            💪 <strong>Keep going!</strong> Every attempt makes you stronger in the Web3 dating game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FailStateView;
