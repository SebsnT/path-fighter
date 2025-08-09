import type { Action } from "~/models/action";

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
  console.log(adjustment);

  return abilities;
}
