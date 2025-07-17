import React from "react";
import { Shield, Award, Edit3 } from "lucide-react";
import { User } from "../../../types/user";

interface ProfileViewProps {
  user: User | null;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => (
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
                  <span className="text-xl font-bold text-white">
                    {user.username}
                  </span>
                  {user.verified && (
                    <Shield size={16} className="text-blue-400" />
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {user.walletAddress}
                </div>
                <div className="text-sm text-gray-400">
                  {user.age} • {user.location}
                </div>
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
              <div className="text-2xl font-bold text-white">
                {user.crushCount}
              </div>
              <div className="text-xs text-gray-400">Crushes</div>
            </div>
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-white">
                {user.questsCompleted}
              </div>
              <div className="text-xs text-gray-400">Quests</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-white">
                {user.nftCount}
              </div>
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

export default ProfileView;
