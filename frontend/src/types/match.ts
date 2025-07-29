import { User } from "./user";
import { Quest } from "./quest";

export interface Match {
  id: string;
  user: User;
  matchedAt: string;
  crushNFT: string;
  currentQuest?: Quest;
  momentNFT: {
    level: number;
    image: string;
    name: string;
  };
  status: "active" | "completed" | "expired";
}
