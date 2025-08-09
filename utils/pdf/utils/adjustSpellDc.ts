/**
 * Adjusts the spell DC values by a given adjustment amount.
 *
 * @param spell_dc
 * @param adjustment
 * @returns
 */
export function adjustSpellDc(
  spell_dc: number[] | undefined,
  adjustment: number,
): number[] | undefined {
  if (!spell_dc) return undefined;
  return spell_dc.map((value) => value + adjustment);
}
