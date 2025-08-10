/**
 * Adjusts an array of numeric values (e.g., spell attack or DC) by a given adjustment amount.
 *
 * @param values Array of numbers to adjust
 * @param adjustment Amount to add to each value
 * @returns Adjusted array, or undefined if input is undefined
 */
export function adjustValues(
  values: number[] | undefined,
  adjustment: number,
): number[] | undefined {
  if (!values) return undefined;
  return values.map((value) => value + adjustment);
}
