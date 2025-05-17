import type { Creature } from "~/models/creature";

/**
 * Gets updated creature data for elite creatures
 *
 * @param creature
 * @returns
 */
export function getEliteCreature(creature: Creature): Creature {
  return {
    ...creature,
    ac: creature.ac + 2,
    hp: getEliteHP(creature.level, creature.hp),
    name: `ELITE ${creature.name}`,
    perception: creature.perception + 2,
    fortitude_save: creature.fortitude_save + 2,
    reflex_save: creature.reflex_save + 2,
    will_save: creature.will_save + 2,
  };
}

/**
 * Gets updated creature data for weak creatures
 *
 * @param creature
 * @returns
 */
export function getWeakCreature(creature: Creature) {
  return {
    ...creature,
    ac: creature.ac - 2,
    hp: getWeakHP(creature.level, creature.hp),
    name: `WEAK ${creature.name}`,
    perception: creature.perception - 2,
    fortitude_save: creature.fortitude_save - 2,
    reflex_save: creature.reflex_save - 2,
    will_save: creature.will_save - 2,
  };
}

/**
 * Returns ajdusted HP for elite challenge type
 *
 * @param creature
 * @param level current level of the creature
 * @param hp current hp of the creature
 * @returns The updated hp
 */
function getEliteHP(level: number, hp: number): number {
  switch (true) {
    // 1 or lower
    case level <= 1:
      return hp + 10;
    // 2-4
    case level >= 2 && level <= 4:
      return hp + 15;
    // 5-19
    case level >= 5 && level <= 19:
      return hp + 20;
    // 20+
    case level >= 20:
      return hp + 30;
    default:
      return hp;
  }
}

/**
 * Returns ajdusted HP for weak challenge type
 *
 * @param creature
 * @param level current level of the creature
 * @param hp current hp of the creature
 * @returns The updated hp
 */
function getWeakHP(level: number, hp: number): number {
  switch (true) {
    // 1-2
    case level >= 1 && level <= 2:
      return hp - 10;
    // 3-5
    case level >= 3 && level <= 5:
      return hp - 15;
    // 6-20
    case level >= 6 && level <= 20:
      return hp - 20;
    // 21+
    case level >= 21:
      return hp - 30;
    default:
      return hp;
  }
}
