import React from "react";
import { Target, Zap, Calendar, TrendingUp } from "lucide-react";

const RecommendationsView: React.FC = () => {
  const recommendations = [
    {
      icon: <Target size={20} />,
      title: "Complete a DeFi quest",
      description: "Increase your chemistry with BlockchainBro",
      color: "purple",
      priority: "high"
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Stake in protocol Z",
      description: "Unlock higher visibility for your profile",
      color: "blue",
      priority: "medium"
    },
    {
      icon: <Calendar size={20} />,
      title: "Attend an Etherlink event",
      description: "Earn XP and expand your network",
      color: "green",
      priority: "low"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-500',
          title: 'text-purple-700'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          title: 'text-blue-700'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500',
          title: 'text-green-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-500',
          title: 'text-gray-700'
        };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Low Priority</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pl-4 mt-9 sm:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Recommendations Feed</h2>
      </div>
      
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 mb-6">
        <p className="text-gray-700 mb-4 leading-relaxed">
          Here you&apos;ll see personalized suggestions to boost your chemistry,
          visibility, and engagement!
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const colorClasses = getColorClasses(rec.color);
          return (
            <div
              key={index}
              className={`${colorClasses.bg} ${colorClasses.border} rounded-xl p-4 sm:p-5 border hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${colorClasses.icon} mt-1 flex-shrink-0`}>
                  {rec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className={`font-semibold ${colorClasses.title} text-base sm:text-lg`}>
                      {rec.title}
                    </h3>
                    <div className="mt-2 sm:mt-0">
                      {getPriorityBadge(rec.priority)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {rec.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-pink-200">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
        <p className="text-gray-700 text-sm sm:text-base">
          Focus on high-priority recommendations first to maximize your profile growth and engagement rates!
        </p>
      </div>
    </div>
  );
};

export default RecommendationsView;