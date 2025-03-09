export function hasOneMarkdownEntry(markdown: string): boolean {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/; // Matches [Label](Link)
  return regex.exec(markdown) ? true : false;
}

export function hasMutipleMarkdownEntries(markdown: string): boolean {
  const regex = /^(?:\[[^\]]+\]\([^)]+\),\s*)+\[[^\]]+\]\([^)]+\)$/; // Matches [Label](Link)
  return regex.exec(markdown) ? true : false;
}

export function calculateCreatureXP(
  creatureLevel: number,
  partySize: number,
  partyLevel: number,
): number {
  const levelDiff = creatureLevel - partyLevel;

  // Base XP based on level difference
  let baseXP;
  switch (levelDiff) {
    case 4:
      baseXP = 160;
      break;
    case 3:
      baseXP = 120;
      break;
    case 2:
      baseXP = 80;
      break;
    case 1:
      baseXP = 60;
      break;
    case 0:
      baseXP = 40;
      break;
    case -1:
      baseXP = 30;
      break;
    case -2:
      baseXP = 20;
      break;
    case -3:
      baseXP = 10;
      break;
    default:
      baseXP = 0;
  }

  // Apply scaling based on party size
  const scalingFactor = Math.min(4 / partySize, 1);

  // Calculate scaled XP
  const scaledXP = Math.round(baseXP * scalingFactor);

  return scaledXP;
}
