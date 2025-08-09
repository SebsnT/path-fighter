import type { Action } from "~/models/action";

/**
 * Adjusts the reaction modifiers of a creature by a given adjustment value.
 *
 * @param reactions
 * @param adjustment
 * @returns
 */
export function adjustReactionsModifier(
  reactions: Action[] | undefined,
  adjustment: number,
): Action[] | undefined {
  console.log(adjustment);
  if (!reactions) return undefined;
}
