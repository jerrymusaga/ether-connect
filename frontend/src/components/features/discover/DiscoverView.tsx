import React from "react";
import { Shield, Award, Heart, X, Info } from "lucide-react";
import { User } from "../../../types/user";
import { Notification } from "../../../types/notification";

interface DiscoverViewProps {
  currentUsers: User[];
  currentUserIndex: number;
  setCurrentUserIndex: (fn: (prev: number) => number) => void;
  setShowProfile: (show: boolean) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  notifications: Notification[];
}

const DiscoverView: React.FC<DiscoverViewProps> = ({
  currentUsers,
  currentUserIndex,
  setCurrentUserIndex,
  setShowProfile,
  setNotifications,
}) => {
  const currentUser = currentUsers[currentUserIndex];
  if (!currentUser)
    return (
      <div className="text-center text-gray-400 mt-20">
        No more users to discover!
      </div>
    );

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // Simulate match
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "match",
        title: "New Match! 💕",
        message: `You and ${currentUser.username} liked each other!`,
        timestamp: "now",
        read: false,
        avatar: currentUser.avatar,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }
    setCurrentUserIndex((prev) => prev + 1);
  };

  return (
    <div className="pt-20 pb-24 px-4">
      <div className="max-w-sm mx-auto">
        <div className="relative">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-lg">
            {/* User Avatar and Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {currentUser.avatar}
                  </div>
                  {currentUser.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">
                      {currentUser.username}
                    </span>
                    {currentUser.verified && (
                      <Shield size={14} className="text-blue-400" />
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {currentUser.age} • {currentUser.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-pink-400">
                  {currentUser.compatibility}% Match
                </div>
                <div className="text-xs text-gray-400">
                  Level {currentUser.level}
                </div>
              </div>
            </div>
            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {currentUser.nftCount}
                </div>
                <div className="text-xs text-gray-400">NFTs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {currentUser.questsCompleted}
                </div>
                <div className="text-xs text-gray-400">Quests</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {currentUser.crushCount}
                </div>
                <div className="text-xs text-gray-400">Crushes</div>
              </div>
            </div>
            {/* Bio */}
            <div className="mb-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                {currentUser.bio}
              </p>
            </div>
            {/* Interests */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            {/* Badges */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30 flex items-center space-x-1"
                  >
                    <Award size={10} />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSwipe("left")}
                className="w-14 h-14 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all border border-red-500/30"
              >
                <X size={24} className="text-red-400" />
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="w-14 h-14 bg-blue-500/20 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-all border border-blue-500/30"
              >
                <Info size={24} className="text-blue-400" />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="w-14 h-14 bg-green-500/20 hover:bg-green-500/30 rounded-full flex items-center justify-center transition-all border border-green-500/30"
              >
                <Heart size={24} className="text-green-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverView;
