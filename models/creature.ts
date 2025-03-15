export type Creature = {
  [key: string]: unknown;
  id: string;
  name: string;
  level: number;
  ac: string;
  hp: string;
  alignment: string;
  creature_family_markdown: string;
  size: string[];
  trait_markdown: string[];
  count: number;
  challenge_type: ChallengeType;
};

export type ChallengeType = "weak" | "base" | "elite";
