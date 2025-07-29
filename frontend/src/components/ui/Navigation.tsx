import React from "react";

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  extraViews?: string[];
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setCurrentView,
  extraViews = [],
}) => {
  const navItems = [
    { id: "discover", emoji: "💘", label: "Discover" },
    { id: "matches", emoji: "💑", label: "Matches" },
    { id: "quests", emoji: "🗺️", label: "Quests" },
    { id: "profile", emoji: "👤", label: "Profile" },
    ...(extraViews.includes("recommendations") ? [{ id: "recommendations", emoji: "✨", label: "Recs" }] : []),
    ...(extraViews.includes("failstate") ? [{ id: "failstate", emoji: "💔", label: "Rekt" }] : []),
    ...(extraViews.includes("onboarding") ? [{ id: "onboarding", emoji: "🚀", label: "Start" }] : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-[#FFA7E6] backdrop-blur border-t border-white/20 shadow-lg">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200 group ${
              currentView === item.id
                ? "bg-white/20 scale-105 shadow-sm"
                : "hover:bg-white/10 active:scale-95"
            }`}
            onClick={() => setCurrentView(item.id)}
          >
            {/* Active indicator */}
            {currentView === item.id && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full shadow-sm"></div>
            )}
            
            {/* Emoji with subtle animation */}
            <div className={`text-lg mb-1 transition-transform duration-200 ${
              currentView === item.id ? "scale-110" : "group-hover:scale-105"
            }`}>
              {item.emoji}
            </div>
            
            {/* Label */}
            <span className={`text-xs font-medium transition-colors duration-200 ${
              currentView === item.id 
                ? "text-white font-semibold" 
                : "text-white/80 group-hover:text-white"
            }`}>
              {item.label}
            </span>
            
            {/* Ripple effect overlay */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-white/0 group-active:bg-white/10 transition-colors duration-150 rounded-lg"></div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Bottom safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-[#FFA7E6]/50"></div>
    </nav>
  );
};

export default Navigation;