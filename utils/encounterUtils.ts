export function calculateCreatureXP(
  creatureLevel: number,
  partyLevel: number,
): number {
  const levelDiff = creatureLevel - partyLevel;

  switch (levelDiff) {
    case 4:
      return 160;
    case 3:
      return 120;
    case 2:
      return 80;
    case 1:
      return 60;
    case 0:
      return 40;
    case -1:
      return 30;
    case -2:
      return 20;
    case -3:
      return 10;
    default:
      return 0;
  }
}
