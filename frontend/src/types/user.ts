export interface User {
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
