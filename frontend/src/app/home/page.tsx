"use client";

import React, { useState, useEffect, useCallback } from "react";
import DiscoverView from "@/components/features/discover/DiscoverView";
import MatchesView from "@/components/features/matches/MatchesView";
import QuestsView from "@/components/features/quests/QuestsView";
import ProfileView from "@/components/features/profile/ProfileView";
import Navigation from "@/components/ui/Navigation";
import Header from "@/components/ui/Header";
import NotificationPanel from "@/components/ui/NotificationPanel";
import MatchDetailModal from "@/components/ui/MatchDetailModal";
import RecommendationsView from "@/components/features/recommendations/RecommendationsView";
import FailStateView from "@/components/features/failstate/FailStateView";
import MomentNFTView from "@/components/features/nft/MomentNFTView";
import { User } from "@/types/user";
import { Match } from "@/types/match";
import { Quest } from "@/types/quest";
import { Notification } from "@/types/notification";
import { motion } from "framer-motion"; // For animations
import Confetti from "react-confetti"; // For match celebrations

const EtherConnect: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    | "discover"
    | "matches"
    | "quests"
    | "profile"
    | "recommendations"
    | "failstate"
  >("discover"); // Default to discover
  const [isDarkMode] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mode, setMode] = useState<"dating" | "friendship">("dating"); // From onboarding
  const [showWelcome, setShowWelcome] = useState(true); // For welcome message
  const [showConfetti, setShowConfetti] = useState(false); // For match celebration
  const [showNFTCelebration, setShowNFTCelebration] = useState(false);
  const [evolvedNFT, setEvolvedNFT] = useState<{
    level: number;
    name: string;
    image: string;
  } | null>(null);

  // Mock data with comprehensive user profiles
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "user-1",
        username: "CryptoQueen.eth",
        walletAddress: "0x1234...5678",
        avatar: "👑",
        bio: "DeFi enthusiast & NFT collector. Looking for someone to explore the metaverse with! 🚀",
        interests: ["DeFi", "NFTs", "Gaming", "Music", "Travel"],
        age: 24,
        location: "New York",
        nftCount: 247,
        crushCount: 89,
        questsCompleted: 156,
        level: 22,
        isOnline: true,
        lastSeen: "now",
        verified: true,
        badges: ["Pioneer", "NFT Collector", "DeFi Master"],
        compatibility: 92,
      },
      {
        id: "user-2",
        username: "MetaBuilder.eth",
        walletAddress: "0x9876...4321",
        avatar: "🛠️",
        bio: "Building the future of Web3. Smart contracts are my love language 💻",
        interests: [
          "Development",
          "Smart Contracts",
          "DAOs",
          "Coffee",
          "Hiking",
        ],
        age: 28,
        location: "San Francisco",
        nftCount: 89,
        crushCount: 34,
        questsCompleted: 203,
        level: 28,
        isOnline: true,
        lastSeen: "now",
        verified: true,
        badges: ["Developer", "DAO Founder", "Code Warrior"],
        compatibility: 87,
      },
      {
        id: "user-3",
        username: "ArtisticSoul.eth",
        walletAddress: "0x5555...7777",
        avatar: "🎨",
        bio: "Digital artist creating NFTs that touch souls. Art is my passion, blockchain is my canvas ✨",
        interests: [
          "Digital Art",
          "NFTs",
          "Photography",
          "Poetry",
          "Meditation",
        ],
        age: 26,
        location: "Los Angeles",
        nftCount: 412,
        crushCount: 127,
        questsCompleted: 95,
        level: 19,
        isOnline: false,
        lastSeen: "2 hours ago",
        verified: true,
        badges: ["Artist", "Creator", "Visionary"],
        compatibility: 78,
      },
      {
        id: "user-4",
        username: "GameMaster.eth",
        walletAddress: "0xaaaa...bbbb",
        avatar: "🎮",
        bio: "P2E gaming legend. Let's conquer virtual worlds together! Ready player one? 🕹️",
        interests: ["Gaming", "P2E", "Esports", "Streaming", "Anime"],
        age: 23,
        location: "Tokyo",
        nftCount: 156,
        crushCount: 67,
        questsCompleted: 234,
        level: 31,
        isOnline: true,
        lastSeen: "now",
        verified: false,
        badges: ["Gamer", "Champion", "Streamer"],
        compatibility: 95,
      },
      {
        id: "user-5",
        username: "MusicDAO.eth",
        walletAddress: "0xcccc...dddd",
        avatar: "🎵",
        bio: "Music NFT collector & DAO member. Life is better with good vibes and great tunes 🎶",
        interests: ["Music", "NFTs", "DAOs", "Concerts", "Vinyl"],
        age: 29,
        location: "Berlin",
        nftCount: 89,
        crushCount: 45,
        questsCompleted: 78,
        level: 16,
        isOnline: true,
        lastSeen: "now",
        verified: true,
        badges: ["Music Lover", "DAO Member", "Collector"],
        compatibility: 83,
      },
      {
        id: "user-6",
        username: "TradingPro.eth",
        walletAddress: "0xeeee...ffff",
        avatar: "📈",
        bio: "Trading wizard by day, hopeless romantic by night. Let's make some gains together! 💰",
        interests: ["Trading", "DeFi", "Analytics", "Fitness", "Cooking"],
        age: 31,
        location: "London",
        nftCount: 67,
        crushCount: 23,
        questsCompleted: 145,
        level: 25,
        isOnline: false,
        lastSeen: "1 hour ago",
        verified: true,
        badges: ["Trader", "Analyst", "Profit Master"],
        compatibility: 74,
      },
    ];

    const mockMatches: Match[] = [
      {
        id: "match-1",
        user: mockUsers.find((u) => u.id === "user-1")!,
        matchedAt: "2024-01-15T10:30:00Z",
        crushNFT: "", // Add appropriate value if needed
        momentNFT: {
          level: 1,
          image: "/nft-moment-1.jpg",
          name: "First Connection",
        },
        status: "active",
      },
      {
        id: "match-2",
        user: mockUsers.find((u) => u.id === "user-2")!,
        matchedAt: "2024-01-14T16:45:00Z",
        crushNFT: "", // Add appropriate value if needed
        momentNFT: {
          level: 2,
          image: "/nft-moment-2.jpg",
          name: "Builder Bond",
        },
        status: "active",
      },
    ];

    const mockQuests: Quest[] = [
      {
        id: "quest-1",
        title: "First Match Magic",
        description: "Get your first match on Ether-Connect",
        reward: "100 ETHER tokens",
        difficulty: "easy",
        category: "social",
        progress: 0,
        timeLimit: "5 minutes",
        completed: false,
      },
      {
        id: "quest-2",
        title: "Conversation Starter",
        description: "Send 5 messages to your matches",
        reward: "50 ETHER tokens + Profile Badge",
        difficulty: "medium",
        category: "social",
        progress: 2,
        timeLimit: "30 minutes",
        completed: false,
      },
      {
        id: "quest-3",
        title: "NFT Showcase",
        description: "Add 3 NFTs to your profile showcase",
        reward: "200 ETHER tokens + Collector Badge",
        difficulty: "easy",
        category: "nft",
        progress: 0,
        timeLimit: "10 minutes",
        completed: false,
      },
    ];

    const mockNotifications: Notification[] = [
      {
        id: "notif-1",
        type: "match",
        title: "New Match! 🎉",
        message: "You and CryptoQueen.eth liked each other!",
        timestamp: "2024-01-15T10:30:00Z",
        read: false,
      },
      {
        id: "notif-2",
        type: "message",
        title: "New Message 💬",
        message: "MetaBuilder.eth sent you a message",
        timestamp: "2024-01-14T18:10:00Z",
        read: false,
      },
      {
        id: "notif-3",
        type: "quest",
        title: "Quest Completed! ✅",
        message: 'You completed "Profile Master" quest!',
        timestamp: "2024-01-14T12:00:00Z",
        read: true,
      },
    ];

    setCurrentUsers(mockUsers);
    setMatches(mockMatches);
    setActiveQuests(mockQuests);
    setNotifications(mockNotifications);
    setUser({
      id: "current-user",
      username: "EtherRomantic.eth",
      walletAddress: "0xabcd...efgh",
      avatar: "💖",
      bio: "Web3 enthusiast looking for meaningful connections in the metaverse",
      interests: ["DeFi", "NFTs", "Gaming", "Music", "Art"],
      age: 26,
      location: "London",
      nftCount: 156,
      crushCount: 42,
      questsCompleted: 89,
      level: 15,
      isOnline: true,
      lastSeen: "now",
      verified: true,
      badges: ["Pioneer", "Match Master", "Quest Warrior"],
      compatibility: 0,
    });
  }, []);

  // Hide welcome message after 5 seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Trigger confetti on new match
  useEffect(() => {
    if (notifications.some((n) => n.type === "match" && !n.read)) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Handler for quest completion
  const handleCompleteQuest = useCallback((questId: string) => {
    setActiveQuests((prev) =>
      prev.map((q) =>
        q.id === questId ? { ...q, completed: true, progress: 100 } : q
      )
    );
    setMatches((prev) =>
      prev.map((m) => {
        if (m.currentQuest && m.currentQuest.id === questId) {
          // Evolve the MomentNFT: level up, new name/art (simulate)
          const newLevel = m.momentNFT.level + 1;
          const newName = `Evolved Moment Lv.${newLevel}`;
          const newImage = newLevel === 2 ? "🌟" : newLevel === 3 ? "💎" : "🔥";
          setEvolvedNFT({ level: newLevel, name: newName, image: newImage });
          setShowNFTCelebration(true);
          return {
            ...m,
            momentNFT: {
              ...m.momentNFT,
              level: newLevel,
              name: newName,
              image: newImage,
            },
          };
        }
        return m;
      })
    );
  }, []);

  return (
    <div
      className={`min-h-screen transition-all ${
        isDarkMode ? "bg-white" : "bg-gray-100"
      }`}
    >
      {/* Confetti for new matches */}
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* NFT Evolution Celebration Modal */}
      {showNFTCelebration && evolvedNFT && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-pink-200 flex flex-col items-center max-w-xs animate-pulse">
            <div className="text-6xl mb-2 animate-bounce">
              {evolvedNFT.image}
            </div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">
              MomentNFT Evolved!
            </h2>
            <p className="text-lg font-semibold text-purple-700 mb-2">
              {evolvedNFT.name}
            </p>
            <p className="text-gray-700 mb-4 text-center">
              Your relationship NFT has evolved to{" "}
              <span className="font-bold">Level {evolvedNFT.level}</span>! Keep
              completing quests to unlock more.
            </p>
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg mt-2"
              onClick={() => setShowNFTCelebration(false)}
            >
              Awesome!
            </button>
          </div>
          {/* Confetti */}
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <span className="text-6xl animate-bounce">🎉</span>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-10">
        {currentView === "discover" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DiscoverView
              currentUsers={currentUsers}
              currentUserIndex={currentUserIndex}
              setCurrentUserIndex={setCurrentUserIndex}
              setShowProfile={() => {}}
              setNotifications={setNotifications}
              notifications={notifications}
              onStartQuest={() => setCurrentView("quests")}
            />
            {/* Highlight recommended quest */}
            {activeQuests[0] && (
              <div className="max-w-sm mx-auto mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
                <div className="mb-2 text-sm text-pink-100 font-medium">
                  Quests help you and your match connect, earn XP, and unlock
                  new features! Complete quests together to evolve your
                  MomentNFT and earn rewards.
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Recommended Quest
                </h3>
                <p className="text-sm text-gray-300">{activeQuests[0].title}</p>
                <button
                  className="mt-3 bg-[#FDA7FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#fd7bff]"
                  onClick={() => setCurrentView("quests")}
                >
                  View Quest Details
                </button>
              </div>
            )}
          </motion.div>
        )}
        {currentView === "matches" && (
          <div>
            <MatchesView
              matches={matches}
              setSelectedMatch={setSelectedMatch}
            />
            {matches[0] && matches[0].momentNFT && (
              <MomentNFTView
                level={matches[0].momentNFT.level}
                name={matches[0].momentNFT.name}
                image={matches[0].momentNFT.image}
              />
            )}
          </div>
        )}
        {currentView === "quests" && (
          <QuestsView
            activeQuests={activeQuests}
            onCompleteQuest={handleCompleteQuest}
          />
        )}
        {currentView === "profile" && <ProfileView user={user} />}
        {currentView === "recommendations" && <RecommendationsView />}
        {currentView === "failstate" && <FailStateView />}
      </div>

      <Navigation
        currentView={currentView}
        setCurrentView={(view: string) =>
          setCurrentView(view as typeof currentView)
        }
        extraViews={["recommendations", "failstate"]}
      />

      <NotificationPanel
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notifications={notifications}
      />

      <MatchDetailModal
        selectedMatch={selectedMatch}
        setSelectedMatch={setSelectedMatch}
      />

      {showNotifications && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default EtherConnect;
