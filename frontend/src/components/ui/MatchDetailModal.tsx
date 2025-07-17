import React from "react";
import { X } from "lucide-react";
import { Match } from "../../types/match";

interface MatchDetailModalProps {
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match | null) => void;
}

const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  selectedMatch,
  setSelectedMatch,
}) =>
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
          <div className="text-xl font-bold text-white">
            {selectedMatch.user.username}
          </div>
          <div className="text-sm text-gray-400">
            Matched on {new Date(selectedMatch.matchedAt).toLocaleDateString()}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Moment NFT</span>
            <span className="text-sm font-medium text-white">
              Level {selectedMatch.momentNFT.level}
            </span>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 text-center border border-purple-500/30">
            <div className="text-3xl mb-2">{selectedMatch.momentNFT.image}</div>
            <div className="text-sm font-medium text-white">
              {selectedMatch.momentNFT.name}
            </div>
          </div>
        </div>
        {selectedMatch.currentQuest && (
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Current Quest</div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="font-medium text-white mb-1">
                {selectedMatch.currentQuest.title}
              </div>
              <div className="text-sm text-gray-400 mb-3">
                {selectedMatch.currentQuest.description}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-medium text-white">
                  {selectedMatch.currentQuest.progress}%
                </span>
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
  );

export default MatchDetailModal;
