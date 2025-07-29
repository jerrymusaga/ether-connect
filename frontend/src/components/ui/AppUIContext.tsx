"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Notification } from "../../types/notification";

interface AppUIContextType {
  mode: "dating" | "friendship";
  setMode: (mode: "dating" | "friendship") => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const AppUIContext = createContext<AppUIContextType | undefined>(undefined);

export const useAppUI = () => {
  const ctx = useContext(AppUIContext);
  if (!ctx) throw new Error("useAppUI must be used within AppUIProvider");
  return ctx;
};

export const AppUIProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"dating" | "friendship">("dating");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <AppUIContext.Provider
      value={{
        mode,
        setMode,
        showNotifications,
        setShowNotifications,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppUIContext.Provider>
  );
};
