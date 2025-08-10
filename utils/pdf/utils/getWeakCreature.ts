import type { Creature } from "~/models/creature";
import { getAdjustedCreature } from "../adjustments/getAdjustedCreature";

const adjustment = -2;

/**
 * Gets updated creature data for weak creatures
 *
 * @param creature
 * @returns
 */
export function getWeakCreature(creature: Creature): Creature {
  return getAdjustedCreature(creature, "WEAK", getWeakHP, adjustment);
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
