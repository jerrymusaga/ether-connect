import React from "react";
import { Trophy, Coins, Image, Users, Heart, Gamepad2 } from "lucide-react";
import { Quest } from "../../../types/quest";

interface QuestsViewProps {
  activeQuests: Quest[];
}

const QuestsView: React.FC<QuestsViewProps> = ({ activeQuests }) => (
  <div className="pt-20 pb-24 px-4">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Quests</h2>
        <div className="flex items-center space-x-2">
          <Trophy size={20} className="text-yellow-400" />
          <span className="text-sm text-gray-400">
            {activeQuests.length} quests
          </span>
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
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    quest.category === "defi"
                      ? "bg-green-500/20 text-green-400"
                      : quest.category === "nft"
                      ? "bg-purple-500/20 text-purple-400"
                      : quest.category === "dao"
                      ? "bg-blue-500/20 text-blue-400"
                      : quest.category === "social"
                      ? "bg-pink-500/20 text-pink-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {quest.category === "defi" ? (
                    <Coins size={20} />
                  ) : quest.category === "nft" ? (
                    <Image size={20} />
                  ) : quest.category === "dao" ? (
                    <Users size={20} />
                  ) : quest.category === "social" ? (
                    <Heart size={20} />
                  ) : (
                    <Gamepad2 size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">
                      {quest.title}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        quest.difficulty === "easy"
                          ? "bg-green-500/20 text-green-400"
                          : quest.difficulty === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {quest.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {quest.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-yellow-400">
                  {quest.reward}
                </div>
                <div className="text-xs text-gray-400">{quest.timeLimit}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-400">Progress:</div>
                <div className="text-sm font-medium text-white">
                  {quest.progress}%
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                {quest.progress === 0 ? "Start Quest" : "Continue"}
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

export default QuestsView;
