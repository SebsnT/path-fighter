import type { Action } from "~/models/action";
import { adjustDC } from "./adjustDC";

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
  if (!reactions) return undefined;
  return adjustDC(reactions, adjustment);
}
