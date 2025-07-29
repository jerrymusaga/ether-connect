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
        <h2 className="text-2xl font-bold text-gray-800">Your Matches</h2>
        <div className="flex items-center space-x-2">
          <Heart size={20} className="text-pink-600" />
          <span className="text-sm text-gray-600">
            {matches.length} matches
          </span>
        </div>
      </div>
      <div className="grid gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border-2 border-pink-200/50 shadow-lg cursor-pointer hover:border-pink-300/70 hover:shadow-pink-200/30 transition-all duration-300"
            onClick={() => setSelectedMatch(match)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                    {match.user.id}
                  </div>
                  {match.user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      {match.user.username}
                    </span>
                    {match.user.verified && (
                      <Shield size={12} className="text-blue-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Matched {new Date(match.matchedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-pink-600">
                    {match.momentNFT.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Level {match.momentNFT.level}
                  </div>
                </div>
                <div className="text-2xl">{match.momentNFT.image}</div>
              </div>
            </div>
            {match.currentQuest && (
              <div className="mt-3 pt-3 border-t border-pink-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy size={14} className="text-yellow-600" />
                    <span className="text-sm text-gray-800">
                      {match.currentQuest.title}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {match.currentQuest.progress}% complete
                  </div>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all shadow-sm"
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