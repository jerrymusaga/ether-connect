import React from "react";
import { Heart, Shield, Trophy } from "lucide-react";
import { Match } from "../../../types/match";

interface MatchesViewProps {
  matches: Match[];
  setSelectedMatch: (match: Match) => void;
}

const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  setSelectedMatch,
}) => (
  <div className="pt-20 pb-24 px-4">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Matches</h2>
        <div className="flex items-center space-x-2">
          <Heart size={20} className="text-pink-400" />
          <span className="text-sm text-gray-400">
            {matches.length} matches
          </span>
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
                    {match.user.id}
                  </div>
                  {match.user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">
                      {match.user.username}
                    </span>
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
                    <span className="text-sm text-white">
                      {match.currentQuest.title}
                    </span>
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

export default MatchesView;
