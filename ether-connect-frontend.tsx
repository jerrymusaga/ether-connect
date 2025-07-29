import React, { useState, useEffect } from 'react';
import { Heart, Users, Trophy, Zap, Wallet, Settings, Bell, Search, Filter, Star, Gift, MessageCircle, X, Check, Clock, Flame, Diamond, Shield, Target, Crown, Sparkles, ChevronRight, ChevronDown, User, Activity, Camera, Edit3, Globe, TrendingUp, Award, Coins, Gamepad2, Map, Calendar, Lock, Unlock, ArrowRight, Plus, Minus, RotateCcw, RefreshCw, Eye, EyeOff, Volume2, VolumeX, Share2, Copy, ExternalLink, Download, Upload, BookOpen, Bookmark, Tag, Hash, AtSign, Link, Mail, Phone, MapPin, Briefcase, GraduationCap, Coffee, Music, Palette, Code, Mountain, Plane, Book, GameController, Headphones, Mic, Image, FileText, MoreHorizontal, ThumbsUp, ThumbsDown, Flag, Info, HelpCircle, LogOut, Menu, Home, Compass, Grid, List, Archive, History, Trash2, Wifi, WifiOff, Battery, BatteryLow, Signal, Bluetooth, Volume1, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Radio, Disc, Video, File, Folder, FolderOpen, Save, SaveAll, Printer, Scissors, Clipboard, ClipboardCheck, ClipboardCopy, ClipboardList, ClipboardX, Calculator, Timer, Stopwatch, AlarmClock, Sunrise, Sunset, Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, Umbrella, Thermometer, Wind, Droplets, Snowflake, Lightbulb, Bulb, Power, PowerOff, Plug, Unplug, Bolt, Flash, Sparkle, StarHalf, StarOff, HeartHandshake, HeartCrack, HeartOff, Smile, Frown, Meh, Angry, Surprised, Confused, Dizzy, Expressionless, Grimace, Grin, Kiss, Laugh, Neutral, Sad, Sleepy, Tired, Wink, Cry, Drool, Hushed, Nerd, Partying, Pleading, Relieved, Sleeping, Smirk, Sneezing, Squinting, Thinking, Unamused, Worried, Yawning, Cool, Hot, Cold, Sick, Injured, Bandage, Pill, Syringe, Stethoscope, Wheelchair, Crutches, Glasses, Sunglasses, Goggles, Mask, Gem, Ring, Necklace, Earring, Watch, Bracelet, Purse, Handbag, Backpack, Suitcase, Notebook, Label, Package, Box, Present, Balloon, Party, Cake, Candle, Confetti, Fireworks, Ribbon, Bow, Medal, Prize, Cup, Wreath, Pennant, Banner, Sign, Signpost, Milestone, Marker, Pin, Pushpin, Paperclip, Clip, Stapler, Ruler, Pencil, Pen, Paintbrush, Crayon, Highlighter, Eraser, Sharpener, Protractor, TriangleRuler, SetSquare, Abacus, Computer, Laptop, Tablet, Smartphone, Earbuds, Speaker, Microphone, Television, Joystick, Dice, Puzzle, Chess, Cards, Dominos, Mahjong, Slot, Roulette, Poker, Blackjack, Bingo, Lottery, Scratch, Arcade, Pinball, Foosball, Pool, Darts, Bowling, Golf, Tennis, Baseball, Basketball, Football, Soccer, Hockey, Rugby, Cricket, Volleyball, Badminton, TableTennis, Boxing, Wrestling, MartialArts, Karate, Judo, Taekwondo, Fencing, Archery, Shooting, Hunting, Fishing, Camping, Hiking, Climbing, Skiing, Snowboarding, Surfing, Swimming, Diving, Sailing, Rowing, Cycling, Running, Walking, Yoga, Gymnastics, Dancing, Singing, Acting, Comedy, Magic, Juggling, Circus, Theatre, Cinema, Concert, Festival, Parade, Fair, Carnival, Amusement, Theme, Water, Adventure, Safari, Zoo, Aquarium, Museum, Gallery, Library, School, University, College, Kindergarten, Nursery, Daycare, Playground, Park, Garden, Forest, Beach, Hill, Valley, Desert, Island, Lake, River, Ocean, Sea, Waterfall, Geyser, Volcano, Cave, Canyon, Cliff, Rock, Stone, Pebble, Sand, Mud, Grass, Leaf, Tree, Flower, Rose, Tulip, Daisy, Sunflower, Lily, Orchid, Carnation, Chrysanthemum, Poppy, Jasmine, Lavender, Herb, Mint, Basil, Rosemary, Thyme, Sage, Parsley, Cilantro, Dill, Oregano, Chive, Garlic, Onion, Ginger, Pepper, Chili, Spice, Salt, Sugar, Honey, Syrup, Jam, Jelly, Butter, Cheese, Milk, Cream, Yogurt, Ice } from 'lucide-react';

// Types & Interfaces
interface User {
  id: string;
  username: string;
  walletAddress: string;
  avatar: string;
  bio: string;
  interests: string[];
  age: number;
  location: string;
  nftCount: number;
  crushCount: number;
  questsCompleted: number;
  level: number;
  isOnline: boolean;
  lastSeen: string;
  verified: boolean;
  badges: string[];
  compatibility: number;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: string;
  progress: number;
  completed: boolean;
  partner?: string;
  category: 'defi' | 'nft' | 'dao' | 'social' | 'gaming';
}

interface Match {
  id: string;
  user: User;
  matchedAt: string;
  crushNFT: string;
  currentQuest?: Quest;
  momentNFT: {
    level: number;
    image: string;
    name: string;
  };
  status: 'active' | 'completed' | 'expired';
}

interface Notification {
  id: string;
  type: 'match' | 'quest' | 'message' | 'crush' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

// Main App Component
const EtherConnect: React.FC = () => {
  const [currentView, setCurrentView] = useState<'discover' | 'matches' | 'quests' | 'profile' | 'notifications'>('discover');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mode, setMode] = useState<'dating' | 'friendship'>('dating');

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      username: 'CryptoQueen.eth',
      walletAddress: '0x1234...5678',
      avatar: '👸',
      bio: 'DeFi enthusiast & NFT collector. Love exploring new protocols and building onchain relationships! 🚀',
      interests: ['DeFi', 'NFTs', 'Gaming', 'Art', 'Music'],
      age: 25,
      location: 'San Francisco',
      nftCount: 127,
      crushCount: 23,
      questsCompleted: 45,
      level: 8,
      isOnline: true,
      lastSeen: 'now',
      verified: true,
      badges: ['Early Adopter', 'DeFi Master', 'NFT Collector'],
      compatibility: 92
    },
    {
      id: '2',
      username: 'BlockchainBro',
      walletAddress: '0x9876...4321',
      avatar: '🤵',
      bio: 'Smart contract developer by day, yield farmer by night. Looking for someone to share the bull run with! 📈',
      interests: ['Development', 'DeFi', 'Trading', 'Tech', 'Travel'],
      age: 28,
      location: 'New York',
      nftCount: 89,
      crushCount: 31,
      questsCompleted: 67,
      level: 12,
      isOnline: false,
      lastSeen: '2 hours ago',
      verified: true,
      badges: ['Code Wizard', 'Yield Farmer', 'Protocol Pioneer'],
      compatibility: 85
    },
    {
      id: '3',
      username: 'NFTArtist.eth',
      walletAddress: '0x5555...9999',
      avatar: '🎨',
      bio: 'Digital artist creating the future of art on blockchain. Passionate about creative expression & Web3 culture! ✨',
      interests: ['Art', 'NFTs', 'Design', 'Culture', 'Photography'],
      age: 23,
      location: 'Los Angeles',
      nftCount: 203,
      crushCount: 18,
      questsCompleted: 34,
      level: 6,
      isOnline: true,
      lastSeen: 'now',
      verified: false,
      badges: ['Creative Soul', 'Art Collector', 'Trending Artist'],
      compatibility: 78
    }
  ];

  const mockMatches: Match[] = [
    {
      id: '1',
      user: mockUsers[0],
      matchedAt: '2024-01-15T10:30:00Z',
      crushNFT: 'Crush #001',
      currentQuest: {
        id: 'q1',
        title: 'Mint Your First NFT Together',
        description: 'Visit the Etherlink NFT marketplace and mint matching NFTs',
        reward: '50 XP + Rare Badge',
        difficulty: 'easy',
        timeLimit: '24 hours',
        progress: 75,
        completed: false,
        category: 'nft'
      },
      momentNFT: {
        level: 2,
        image: '💎',
        name: 'Diamond Connection #001'
      },
      status: 'active'
    },
    {
      id: '2',
      user: mockUsers[1],
      matchedAt: '2024-01-14T15:45:00Z',
      crushNFT: 'Crush #002',
      momentNFT: {
        level: 4,
        image: '🔥',
        name: 'Blazing Bond #002'
      },
      status: 'completed'
    }
  ];

  const mockQuests: Quest[] = [
    {
      id: 'q1',
      title: 'Liquidity Provider Challenge',
      description: 'Add liquidity to an Etherlink DEX pool',
      reward: '100 XP + LP Master Badge',
      difficulty: 'medium',
      timeLimit: '48 hours',
      progress: 0,
      completed: false,
      category: 'defi'
    },
    {
      id: 'q2',
      title: 'DAO Governance Participation',
      description: 'Vote on a proposal in an Etherlink DAO',
      reward: '75 XP + Governance Badge',
      difficulty: 'easy',
      timeLimit: '72 hours',
      progress: 0,
      completed: false,
      category: 'dao'
    },
    {
      id: 'q3',
      title: 'NFT Trading Master',
      description: 'Successfully trade 3 NFTs on the marketplace',
      reward: '150 XP + Trader Badge',
      difficulty: 'hard',
      timeLimit: '7 days',
      progress: 33,
      completed: false,
      category: 'nft'
    }
  ];

  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'match',
      title: 'New Match! 💕',
      message: 'You and CryptoQueen.eth liked each other!',
      timestamp: '2 minutes ago',
      read: false,
      avatar: '👸'
    },
    {
      id: '2',
      type: 'quest',
      title: 'Quest Completed! 🎉',
      message: 'You completed the DeFi Explorer quest with BlockchainBro',
      timestamp: '1 hour ago',
      read: false,
      avatar: '🤵'
    },
    {
      id: '3',
      type: 'crush',
      title: 'Someone likes you! 😍',
      message: 'You have a new secret admirer',
      timestamp: '3 hours ago',
      read: true
    }
  ];

  useEffect(() => {
    setCurrentUsers(mockUsers);
    setMatches(mockMatches);
    setActiveQuests(mockQuests);
    setNotifications(mockNotifications);
    
    // Mock user data
    setUser({
      id: 'current-user',
      username: 'EtherRomantic.eth',
      walletAddress: '0xabcd...efgh',
      avatar: '💖',
      bio: 'Web3 enthusiast looking for meaningful connections in the metaverse',
      interests: ['DeFi', 'NFTs', 'Gaming', 'Music', 'Art'],
      age: 26,
      location: 'London',
      nftCount: 156,
      crushCount: 42,
      questsCompleted: 89,
      level: 15,
      isOnline: true,
      lastSeen: 'now',
      verified: true,
      badges: ['Pioneer', 'Match Master', 'Quest Warrior'],
      compatibility: 0
    });
  }, []);

  // Navigation Component
  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg border-t border-purple-500/20 z-50">
      <div className="flex justify-around items-center py-3 px-4">
        {[
          { id: 'discover', icon: Compass, label: 'Discover' },
          { id: 'matches', icon: Heart, label: 'Matches' },
          { id: 'quests', icon: Trophy, label: 'Quests' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id as any)}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
              currentView === id
                ? 'text-pink-400 bg-pink-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Header Component
  const Header = () => (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg border-b border-purple-500/20 z-40">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ether-Connect
          </div>
          <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Etherlink</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMode(mode === 'dating' ? 'friendship' : 'dating')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              mode === 'dating' 
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}
          >
            {mode === 'dating' ? '💕 Dating' : '👫 Friends'}
          </button>
          
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-purple-500/20 transition-all"
          >
            <Bell size={18} className="text-gray-300" />
            {notifications.filter(n => !n.read).length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {notifications.filter(n => !n.read).length}
                </span>
              </div>
            )}
          </button>
          
          <button
            onClick={() => setIsWalletConnected(!isWalletConnected)}
            className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all ${
              isWalletConnected
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30'
            }`}
          >
            <Wallet size={16} />
            <span className="text-xs">
              {isWalletConnected ? 'Connected' : 'Connect'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // Discover View (Swipe Cards)
  const DiscoverView = () => {
    const currentUser = currentUsers[currentUserIndex];
    if (!currentUser) return <div className="text-center text-gray-400 mt-20">No more users to discover!</div>;

    const handleSwipe = (direction: 'left' | 'right') => {
      if (direction === 'right') {
        // Simulate match
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'match',
          title: 'New Match! 💕',
          message: `You and ${currentUser.username} liked each other!`,
          timestamp: 'now',
          read: false,
          avatar: currentUser.avatar
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
      
      setCurrentUserIndex(prev => prev + 1);
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
                      <span className="font-semibold text-white">{currentUser.username}</span>
                      {currentUser.verified && (
                        <Shield size={14} className="text-blue-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{currentUser.age} • {currentUser.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-pink-400">{currentUser.compatibility}% Match</div>
                  <div className="text-xs text-gray-400">Level {currentUser.level}</div>
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{currentUser.nftCount}</div>
                  <div className="text-xs text-gray-400">NFTs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{currentUser.questsCompleted}</div>
                  <div className="text-xs text-gray-400">Quests</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{currentUser.crushCount}</div>
                  <div className="text-xs text-gray-400">Crushes</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <p className="text-sm text-gray-300 leading-relaxed">{currentUser.bio}</p>
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
                  onClick={() => handleSwipe('left')}
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
                  onClick={() => handleSwipe('right')}
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

  // Matches View
  const MatchesView = () => (
    <div className="pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Matches</h2>
          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-pink-400" />
            <span className="text-sm text-gray-400">{matches.length} matches</span>
          </div>
        </div>

        <div className="grid gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20 backdrop-blur-lg cursor-pointer hover:border-purple-500/40 transition-all"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                      {match.user.avatar}
                    </div>
                    {match.user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{match.user.username}</span>
                      {match.user.verified && (
                        <Shield size={12} className="text-blue-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Matched {new Date(match.matchedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-medium text-pink-400">
                      {match.momentNFT.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Level {match.momentNFT.level}
                    </div>
                  </div>
                  <div className="text-2xl">{match.momentNFT.image}</div>
                </div>
              </div>
              
              {match.currentQuest && (
                <div className="mt-3 pt-3 border-t border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy size={14} className="text-yellow-400" />
                      <span className="text-sm text-white">{match.currentQuest.title}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {match.currentQuest.progress}% complete
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${match.currentQuest.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Quests View
  const QuestsView = () => (
    <div className="pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Active Quests</h2>
          <div className="flex items-center space-x-2">
            <Trophy size={20} className="text-yellow-400" />
            <span className="text-sm text-gray-400">{activeQuests.length} quests</span>
          </div>
        </div>

        <div className="grid gap-4">
          {activeQuests.map((quest) => (
            <div
              key={quest.id}
              className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20 backdrop-blur-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    quest.category === 'defi' ? 'bg-green-500/20 text-green-400' :
                    quest.category === 'nft' ? 'bg-purple-500/20 text-purple-400' :
                    quest.category === 'dao' ? 'bg-blue-500/20 text-blue-400' :
                    quest.category === 'social' ? 'bg-pink-500/20 text-pink-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {quest.category === 'defi' ? <Coins size={20} /> :
                     quest.category === 'nft' ? <Image size={20} /> :
                     quest.category === 'dao' ? <Users size={20} /> :
                     quest.category === 'social' ? <Heart size={20} /> :
                     <Gamepad2 size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{quest.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        quest.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                        quest.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {quest.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{quest.description}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-yellow-400">{quest.reward}</div>
                  <div className="text-xs text-gray-400">{quest.timeLimit}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-400">Progress:</div>
                  <div className="text-sm font-medium text-white">{quest.progress}%</div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                  {quest.progress === 0 ? 'Start Quest' : 'Continue'}
                </button>
              </div>
              
              <div className="mt-3 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${quest.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile View
  const ProfileView = () => (
    <div className="pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {user && (
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20 backdrop-blur-lg">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
                    {user.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-white">{user.username}</span>
                    {user.verified && (
                      <Shield size={16} className="text-blue-400" />
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{user.walletAddress}</div>
                  <div className="text-sm text-gray-400">{user.age} • {user.location}</div>
                </div>
              </div>
              <button className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all">
                <Edit3 size={18} className="text-purple-400" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-2xl font-bold text-white">{user.level}</div>
                <div className="text-xs text-gray-400">Level</div>
              </div>
              <div className="text-center p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <div className="text-2xl font-bold text-white">{user.crushCount}</div>
                <div className="text-xs text-gray-400">Crushes</div>
              </div>
              <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-white">{user.questsCompleted}</div>
                <div className="text-xs text-gray-400">Quests</div>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-white">{user.nftCount}</div>
                <div className="text-xs text-gray-400">NFTs</div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">About Me</h3>
              <p className="text-gray-300 leading-relaxed">{user.bio}</p>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm border border-yellow-500/30 flex items-center space-x-2"
                  >
                    <Award size={14} />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                Edit Profile
              </button>
              <button className="flex-1 py-3 bg-purple-500/20 text-purple-400 rounded-lg font-medium hover:bg-purple-500/30 transition-all border border-purple-500/30">
                Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Notifications Panel
  const NotificationsPanel = () => (
    <div className={`fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg border-l border-purple-500/20 transform transition-transform z-50 ${
      showNotifications ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-4 border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
          <button
            onClick={() => setShowNotifications(false)}
            className="p-2 hover:bg-purple-500/20 rounded-lg transition-all"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto h-full pb-20">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-purple-500/10 hover:bg-purple-500/5 transition-all ${
              !notification.read ? 'bg-purple-500/10' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-lg">
                {notification.avatar || (
                  notification.type === 'match' ? '💕' :
                  notification.type === 'quest' ? '🎯' :
                  notification.type === 'crush' ? '😍' :
                  '📢'
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white text-sm">{notification.title}</span>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                <div className="text-xs text-gray-500 mt-2">{notification.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Match Detail Modal
  const MatchDetailModal = () => (
    selectedMatch && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Match Details</h3>
            <button
              onClick={() => setSelectedMatch(null)}
              className="p-2 hover:bg-purple-500/20 rounded-lg transition-all"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
              {selectedMatch.user.avatar}
            </div>
            <div className="text-xl font-bold text-white">{selectedMatch.user.username}</div>
            <div className="text-sm text-gray-400">
              Matched on {new Date(selectedMatch.matchedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Moment NFT</span>
              <span className="text-sm font-medium text-white">Level {selectedMatch.momentNFT.level}</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 text-center border border-purple-500/30">
              <div className="text-3xl mb-2">{selectedMatch.momentNFT.image}</div>
              <div className="text-sm font-medium text-white">{selectedMatch.momentNFT.name}</div>
            </div>
          </div>

          {selectedMatch.currentQuest && (
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Current Quest</div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="font-medium text-white mb-1">{selectedMatch.currentQuest.title}</div>
                <div className="text-sm text-gray-400 mb-3">{selectedMatch.currentQuest.description}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-white">{selectedMatch.currentQuest.progress}%</span>
                </div>
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${selectedMatch.currentQuest.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
              Message
            </button>
            <button className="flex-1 py-3 bg-purple-500/20 text-purple-400 rounded-lg font-medium hover:bg-purple-500/30 transition-all border border-purple-500/30">
              View Profile
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Main render
  return (
    <div className={`min-h-screen transition-all ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="relative z-10">
        {currentView === 'discover' && <DiscoverView />}
        {currentView === 'matches' && <MatchesView />}
        {currentView === 'quests' && <QuestsView />}
        {currentView === 'profile' && <ProfileView />}
      </div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Notifications Panel */}
      <NotificationsPanel />
      
      {/* Match Detail Modal */}
      <MatchDetailModal />
      
      {/* Overlay for notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </div>
  );
};

export default EtherConnect;
                