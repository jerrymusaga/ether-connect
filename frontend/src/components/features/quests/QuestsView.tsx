import React from "react";
import { Trophy, Coins, Image, Users, Heart, Gamepad2 } from "lucide-react";
import { Quest } from "../../../types/quest";

interface QuestsViewProps {
  activeQuests: Quest[];
  onCompleteQuest?: (questId: string) => void;
}

const QuestsView: React.FC<QuestsViewProps> = ({
  activeQuests,
  onCompleteQuest,
}) => (
  <div className="pt-20 pb-24 px-4">
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-100/80 to-purple-100/80 rounded-xl border border-pink-200 flex items-center gap-3 shadow">
        <span className="text-2xl">🎯</span>
        <span className="text-base text-pink-700 font-semibold">
          Complete quests with your match to earn XP, rewards, and evolve your{" "}
          <span className="font-bold text-purple-700">MomentNFT</span>!
        </span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Active Quests</h2>
        <div className="flex items-center space-x-2">
          <Trophy size={20} className="text-yellow-600" />
          <span className="text-sm text-gray-600">
            {activeQuests.length} quests
          </span>
        </div>
      </div>
      <div className="grid gap-4">
        {activeQuests.map((quest) => (
          <div
            key={quest.id}
            className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border-2 border-pink-200/50 shadow-lg hover:shadow-pink-200/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    quest.category === "defi"
                      ? "bg-green-100 text-green-600 border-2 border-green-200"
                      : quest.category === "nft"
                      ? "bg-purple-100 text-purple-600 border-2 border-purple-200"
                      : quest.category === "dao"
                      ? "bg-blue-100 text-blue-600 border-2 border-blue-200"
                      : quest.category === "social"
                      ? "bg-pink-100 text-pink-600 border-2 border-pink-200"
                      : "bg-yellow-100 text-yellow-600 border-2 border-yellow-200"
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
                    <span className="font-medium text-gray-800">
                      {quest.title}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        quest.difficulty === "easy"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : quest.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {quest.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {quest.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-yellow-600">
                  {quest.reward}
                </div>
                <div className="text-xs text-gray-500">{quest.timeLimit}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-600">Progress:</div>
                <div className="text-sm font-medium text-gray-800">
                  {quest.progress}%
                </div>
              </div>
              <button
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                disabled={quest.completed}
                onClick={() => {
                  if (!quest.completed && onCompleteQuest)
                    onCompleteQuest(quest.id);
                }}
              >
                {quest.completed
                  ? "Completed"
                  : quest.progress < 100
                  ? "Complete Quest"
                  : "Completed"}
              </button>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2 shadow-inner">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all shadow-sm"
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
