/**
 * Adjusts attack modifier and attack damage by given adjustment
 *
 * @param attacks is an array of attaks
 * @param adjustment is a number that the modifiers should be ajdusted by
 * @returns the update attacks array
 */
export function adjustAttackModifiers(
  attacks: string[] | undefined,
  adjustment: number,
): string[] {
  if (!attacks) return [];
  return attacks.map((str) => {
    str = adjustAttackModifier(str, adjustment);

    // Adjust the damage modifier in the damage expression
    str = adjustdDamageModifier(str, adjustment);

    return str;
  });
}

function adjustAttackModifier(str: string, adjustment: number): string {
  return str.replace(/\+(\d+)/, (_, num) => {
    const adjusted = Number(num) + adjustment;
    return (adjusted >= 0 ? "+" : "") + adjusted;
  });
}

function adjustdDamageModifier(str: string, adjustment: number): string {
  return str.replace(/(\d+d\d+)([+-])(\d+)/, (_, dice, sign, num) => {
    // keep signed
    let damageMod = Number(sign + num);
    damageMod += adjustment;
    const newSign = damageMod >= 0 ? "+" : "-";
    return dice + newSign + Math.abs(damageMod);
  });
}
