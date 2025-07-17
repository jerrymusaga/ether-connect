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
      <div className="text-center text-gray-500 mt-20">
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
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border-2 border-pink-200/50 shadow-2xl hover:shadow-pink-300/30 transition-all duration-300">
            {/* User Avatar and Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {currentUser.avatar}
                  </div>
                  {currentUser.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">
                      {currentUser.username}
                    </span>
                    {currentUser.verified && (
                      <Shield size={14} className="text-blue-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentUser.age} • {currentUser.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-pink-600">
                  {currentUser.compatibility}% Match
                </div>
                <div className="text-xs text-gray-500">
                  Level {currentUser.level}
                </div>
              </div>
            </div>
            
            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                <div className="text-lg font-bold text-gray-800">
                  {currentUser.nftCount}
                </div>
                <div className="text-xs text-gray-500">NFTs</div>
              </div>
              <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
                <div className="text-lg font-bold text-gray-800">
                  {currentUser.questsCompleted}
                </div>
                <div className="text-xs text-gray-500">Quests</div>
              </div>
              <div className="text-center bg-gradient-to-br from-pink-50 to-red-50 rounded-lg p-3 border border-pink-100">
                <div className="text-lg font-bold text-gray-800">
                  {currentUser.crushCount}
                </div>
                <div className="text-xs text-gray-500">Crushes</div>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                {currentUser.bio}
              </p>
            </div>
            
            {/* Interests */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs border border-purple-200 hover:bg-purple-200 transition-colors"
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
                    className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs border border-yellow-200 flex items-center space-x-1 hover:bg-yellow-200 transition-colors"
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
                className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-all border-2 border-red-200 hover:border-red-300 shadow-lg hover:shadow-red-200/50"
              >
                <X size={24} className="text-red-600" />
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="w-14 h-14 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-all border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-blue-200/50"
              >
                <Info size={24} className="text-blue-600" />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="w-14 h-14 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-all border-2 border-green-200 hover:border-green-300 shadow-lg hover:shadow-green-200/50"
              >
                <Heart size={24} className="text-green-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverView;