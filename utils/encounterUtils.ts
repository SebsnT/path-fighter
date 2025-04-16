import type { ChallengeType } from "~/models/challengeType";
// Matches [Label](Link)

/**
 *
 *
 * @param markdown
 * @returns
 */
export function hasOneMarkdownEntry(markdown: string): boolean {
  // Matches [Label](Link)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/;
  return regex.exec(markdown) ? true : false;
}

export function hasMutipleMarkdownEntries(markdown: string): boolean {
  // Matches [Label](Link)
  const regex = /^(?:\[[^\]]+\]\([^)]+\),\s*)+\[[^\]]+\]\([^)]+\)$/;
  return regex.exec(markdown) ? true : false;
}

export function calculateCreatureXP(
  partySize: number,
  partyLevel: number,
  creatureLevel: number,
  challengeType: ChallengeType = "base",
): { baseXP: number; scaledXP: number } {
  if (challengeType == "elite") {
    creatureLevel += 1;
  }

  if (challengeType == "weak") {
    creatureLevel -= 1;
  }

  const levelDiff = creatureLevel - partyLevel;

  if (partySize == 0) {
    return { baseXP: 0, scaledXP: 0 };
  }

  // Base XP based on level difference
  let baseXP;
  switch (true) {
    case levelDiff >= 4:
      baseXP = 160;
      break;
    case levelDiff == 3:
      baseXP = 120;
      break;
    case levelDiff == 2:
      baseXP = 80;
      break;
    case levelDiff == 1:
      baseXP = 60;
      break;
    case levelDiff == 0:
      baseXP = 40;
      break;
    case levelDiff == -1:
      baseXP = 30;
      break;
    case levelDiff == -2:
      baseXP = 20;
      break;
    case levelDiff == -3:
      baseXP = 15;
      break;
    case levelDiff <= -4:
      baseXP = 10;
      break;
    default:
      baseXP = 0;
  }

  // Apply scaling based on party size
  const scalingFactor = 4 / partySize;

  // Calculate scaled XP
  const scaledXP = Math.max(Math.floor(baseXP * scalingFactor), 10);

  return { baseXP, scaledXP };
}
