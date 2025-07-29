export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: string;
  progress: number;
  completed: boolean;
  partner?: string;
  category: "defi" | "nft" | "dao" | "social" | "gaming";
}
