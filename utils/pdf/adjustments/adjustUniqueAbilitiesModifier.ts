import type { Action } from "~/models/action";
import { adjustDC } from "./adjustDC";

/**
 * Adjusts the unique abilities modifiers of a creature by a given adjustment value.
 *
 * @param abilities
 * @param adjustment
 * @returns
 */
export function adjustUniqueAbilitiesModifier(
  abilities: Action[] | undefined,
  adjustment: number,
): Action[] | undefined {
  if (!abilities || adjustment === 0) return abilities;

  return adjustDC(abilities, adjustment);
}
