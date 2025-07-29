import React from "react";
import { X } from "lucide-react";
import { Notification } from "../../types/notification";

interface NotificationPanelProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  showNotifications,
  setShowNotifications,
  notifications,
}) => (
  <div
    className={`fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg border-l border-purple-500/20 transform transition-transform z-50 ${
      showNotifications ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-4 border-b border-purple-500/20">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <button
          onClick={() => setShowNotifications(false)}
          className="p-2 hover:bg-purple-500/20 rounded-lg transition-all"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
    <div className="overflow-y-auto h-full pb-20">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 border-b border-purple-500/10 hover:bg-purple-500/5 transition-all ${
            !notification.read ? "bg-purple-500/10" : ""
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-lg">
              {notification.avatar ||
                (notification.type === "match"
                  ? "💕"
                  : notification.type === "quest"
                  ? "🎯"
                  : notification.type === "crush"
                  ? "�"
                  : "📢")}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-sm">
                  {notification.title}
                </span>
                {!notification.read && (
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {notification.message}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {notification.timestamp}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationPanel;
