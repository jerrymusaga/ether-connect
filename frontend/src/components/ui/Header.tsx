"use client";
import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import ConnectWalletButton from "../common/ConnectWalletButton";
import { useAppUI } from "./AppUIContext";

const Header: React.FC = () => {
  const {
    mode,
    setMode,
    showNotifications,
    setShowNotifications,
    notifications,
  } = useAppUI();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#FFF0F7] backdrop-blur-lg z-40">
      <div className="flex flex-row justify-between items-center px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ether-Connect
          </div>
          <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Notification Bell - always visible */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-purple-500/20 transition-all"
          >
            <Bell size={18} className="text-gray-300" />
            {notifications.filter((n) => !n.read).length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </div>
            )}
          </button>
          {/* Desktop: Mode and Wallet visible */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() =>
                setMode(mode === "dating" ? "friendship" : "dating")
              }
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                mode === "dating"
                  ? "bg-white text-pink-400 border border-pink-500/30"
                  : "bg-white text-blue-400 border border-blue-500/30"
              }`}
            >
              {mode === "dating" ? "💕 Dating" : "👫 Friends"}
            </button>
            <ConnectWalletButton className="bg-pink-500 text-white min-w-[120px] sm:min-w-0" />
          </div>
          {/* Mobile: Hamburger menu */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 rounded-full hover:bg-purple-500/20 transition-all"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-gray-300" />
            </button>
            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-2 top-14 bg-white rounded-lg shadow-lg border border-purple-200 z-50 w-48 flex flex-col p-2 space-y-2 animate-fade-in">
                <button
                  onClick={() => {
                    setMode(mode === "dating" ? "friendship" : "dating");
                    setMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap text-left ${
                    mode === "dating"
                      ? "bg-pink-100 text-pink-600 border border-pink-300"
                      : "bg-blue-100 text-blue-600 border border-blue-300"
                  }`}
                >
                  {mode === "dating" ? "💕 Dating" : "👫 Friends"}
                </button>
                <ConnectWalletButton className="bg-pink-500 text-white w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
