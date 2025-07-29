import React, { useState } from "react";
import { Shield, Award, Heart, X, Info } from "lucide-react";
import { User } from "../../../types/user";
import { Notification } from "../../../types/notification";
import { motion, AnimatePresence } from "framer-motion";

interface DiscoverViewProps {
  currentUsers: User[];
  currentUserIndex: number;
  setCurrentUserIndex: (fn: (prev: number) => number) => void;
  setShowProfile: (show: boolean) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  notifications: Notification[];
  onStartQuest?: () => void;
}

const chemistryEmoji = (compat: number) => {
  if (compat >= 90) return "💖";
  if (compat >= 70) return "🔥";
  if (compat >= 50) return "✨";
  if (compat >= 30) return "😊";
  return "🤔";
};

const DiscoverView: React.FC<DiscoverViewProps> = ({
  currentUsers,
  currentUserIndex,
  setCurrentUserIndex,
  setShowProfile,
  setNotifications,
  onStartQuest,
}) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const currentUser = currentUsers[currentUserIndex];
  if (!currentUser)
    return (
      <div className="text-center text-gray-500 mt-20">
        No more users to discover!
      </div>
    );

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setSwipeDirection(null);
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
        setShowConfetti(true);
        setShowMatchModal(true);
        setXp((prev) => {
          const newXp = prev + 20;
          if (newXp >= 100) {
            setLevel((l) => l + 1);
            return newXp - 100;
          }
          return newXp;
        });
      } else {
        setXp((prev) => (prev + 5) % 100);
      }
      setCurrentUserIndex((prev) => prev + 1);
      setTimeout(() => setShowConfetti(false), 1500);
    }, 400);
  };

  // Chemistry meter as animated progress bar
  const chemistry = currentUser.compatibility;

  return (
    <div className="pt-20 pb-24 px-4 relative">
      {/* XP/Level Bar */}
      <div className="fixed top-0 left-0 w-full z-30 flex items-center justify-center py-2 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Level {level}</span>
          <div className="w-40 h-3 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xp}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-gray-500">XP: {xp}/100</span>
        </div>
      </div>

      {/* Chemistry Meter */}
      <div className="flex flex-col items-center mb-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-pink-600">Chemistry</span>
          <span className="text-2xl">{chemistryEmoji(chemistry)}</span>
        </div>
        <div className="w-48 h-3 bg-purple-100 rounded-full overflow-hidden mt-1">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${chemistry}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs text-purple-600 font-semibold mt-1">
          {chemistry}% compatible
        </span>
      </div>

      {/* Animated Profile Card */}
      <div className="max-w-sm mx-auto">
        <div className="relative">
          <AnimatePresence>
            {currentUser && (
              <motion.div
                key={currentUser.id}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  y: swipeDirection === "right" ? -200 : 200,
                  rotate: swipeDirection === "right" ? 30 : -30,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border-4 border-pink-200/50 hover:shadow-pink-300/30 transition-all duration-300"
              >
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
                <div className="flex justify-center space-x-4 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSwipe("left")}
                    className="w-16 h-16 bg-red-100 hover:bg-red-200 rounded-full flex flex-col items-center justify-center transition-all border-2 border-red-200 hover:border-red-300 shadow-lg hover:shadow-red-200/50 text-red-600 text-2xl font-bold"
                    title="Skip (swipe left)"
                  >
                    <X size={28} />
                    <span className="text-xs mt-1">Skip</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProfile(true)}
                    className="w-16 h-16 bg-blue-100 hover:bg-blue-200 rounded-full flex flex-col items-center justify-center transition-all border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-blue-200/50 text-blue-600 text-2xl font-bold"
                    title="View Details"
                  >
                    <Info size={28} />
                    <span className="text-xs mt-1">Info</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSwipe("right")}
                    className="w-16 h-16 bg-green-100 hover:bg-green-200 rounded-full flex flex-col items-center justify-center transition-all border-2 border-green-200 hover:border-green-300 shadow-lg hover:shadow-green-200/50 text-green-600 text-2xl font-bold"
                    title="Like (swipe right)"
                  >
                    <Heart size={28} />
                    <span className="text-xs mt-1">Like</span>
                  </motion.button>
                </div>
                {/* Clear Prompt */}
                <div className="mt-6 text-center">
                  <span className="text-base text-gray-500 font-medium">
                    Swipe{" "}
                    <span className="text-green-600 font-bold">right</span> to
                    like (💚),{" "}
                    <span className="text-red-600 font-bold">left</span> to skip
                    (❌)
                  </span>
                  <div className="flex justify-center gap-2 mt-2">
                    <span className="text-2xl animate-bounce">⬅️</span>
                    <span className="text-2xl animate-bounce">➡️</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <span className="text-6xl animate-bounce">🎉</span>
        </div>
      )}

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-pink-200 flex flex-col items-center max-w-xs">
              <div className="text-5xl mb-2 animate-bounce">💖</div>
              <h2 className="text-2xl font-bold text-pink-600 mb-2">
                It's a Match!
              </h2>
              <p className="text-gray-700 mb-4 text-center">
                You and{" "}
                <span className="font-semibold">{currentUser.username}</span>{" "}
                liked each other!
              </p>
              <div className="mb-4">
                <span className="text-lg font-semibold text-purple-600">
                  +20 XP
                </span>
              </div>
              <button
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg mt-2"
                onClick={() => {
                  setShowMatchModal(false);
                  if (typeof onStartQuest === "function") onStartQuest();
                }}
              >
                Start Your First Quest Together
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverView;
