import type { ChallengeType } from "./challengeType";

export type Creature = {
  [key: string]: unknown;
  id: string;
  ac: number;
  alignment: string;
  attacks: string[];
  charisma: number;
  constitution: number;
  count: number;
  challenge_type: ChallengeType;
  creature_ability: string[];
  creature_familiy: string;
  creature_family_markdown: string;
  dexterity: number;
  fortitude_save: number;
  hp: number;
  intelligence: number;
  immunity: string[];
  level: number;
  name: string;
  perception: number;
  reflex_save: number;
  resistance_raw: string;
  size: string[];
  skill_mod: NumberObject;
  speed_raw: string;
  spell: string[];
  spell_attack_bonus: number[];
  spell_dc: number[];
  strength: number;
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
