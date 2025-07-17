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
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-3xl text-white">
                  {user.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">
                    {user.username}
                  </span>
                  {user.verified && (
                    <Shield size={16} className="text-blue-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {user.walletAddress}
                </div>
                <div className="text-sm text-gray-600">
                  {user.age} • {user.location}
                </div>
              </div>
            </div>
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all self-start sm:self-auto">
              <Edit3 size={18} className="text-gray-600" />
            </button>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">{user.level}</div>
              <div className="text-xs text-gray-600">Level</div>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded-lg border border-pink-200">
              <div className="text-2xl font-bold text-pink-700">
                {user.crushCount}
              </div>
              <div className="text-xs text-gray-600">Crushes</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {user.questsCompleted}
              </div>
              <div className="text-xs text-gray-600">Quests</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {user.nftCount}
              </div>
              <div className="text-xs text-gray-600">NFTs</div>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
          
          {/* Interests */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200 hover:bg-purple-200 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          {/* Badges */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges</h3>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm border border-yellow-200 flex items-center space-x-2 hover:bg-yellow-200 transition-colors"
                >
                  <Award size={14} />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-md">
              Edit Profile
            </button>
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all border border-gray-300">
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ProfileView;