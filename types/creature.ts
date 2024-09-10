export type Creature = {
  [key: string]: unknown;
  name: string;
  level: string;
  ac: string;
  hp: string;
  alignment: string;
  creature_family_markdown: string;
  size: string[];
  trait_markdown: string[];
  count?: number;
};
