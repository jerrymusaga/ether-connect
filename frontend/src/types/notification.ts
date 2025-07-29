export interface Notification {
  id: string;
  type: "match" | "quest" | "message" | "crush" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}
