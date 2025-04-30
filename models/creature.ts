import type { ChallengeType } from "./challengeType";

export type Creature = {
  [key: string]: unknown;
  id: string;
  ac: string;
  alignment: string;
  attacks: string[];
  charisma: number;
  constitution: number;
  count: number;
  challenge_type: ChallengeType;
  creature_ability: string[];
  creature_familiy: string;
  creature_family_markdown: string;
  dexterity: string;
  fortitude_save: number;
  hp: string;
  intelligence: number;
  level: number;
  name: string;
  reflex_save: number;
  resistance_raw: string;
  size: string[];
  skill_mod: NumberObject;
  speed_raw: string;
  spell: string[];
  strength: string;
  trait: string;
  trait_markdown: string[];
  url: string;
  wisdom: number;
  weakness_raw: string;
  will_save: number;
  xp: number;
};

type NumberObject = {
  [key: string]: number;
};
