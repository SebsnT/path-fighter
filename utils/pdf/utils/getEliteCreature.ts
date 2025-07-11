import type { Creature } from "~/models/creature";
import { getAdjustedCreature } from "../adjustments/getAdjustedCreature";

const adjustment = 2;


/**
 * Gets updated creature data for elite creatures
 *
 * @param creature
 * @returns
 */
export function getEliteCreature(creature: Creature): Creature {
  return getAdjustedCreature(creature, "ELITE", getEliteHP, adjustment);
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
