import type { ChallengeType } from "~/models/challengeType";
import { useParty } from "./party";
import { calculateCreatureXP } from "~/utils/encounter.utils";

// Reactive state for difficulty indicator

/** Value not adjusted by party size or party level */
const baseValue = ref(0);

/** Current value based on party size */
const currentValue = ref(0);

const { partySize, partyLevel } = useParty();

export const useDifficulty = () => {
  /**
   * Increase the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function increaseDifficulty(
    level: number,
    count: number = 1,
    challengeType: ChallengeType = "base",
  ): void {
    const { baseXP, scaledXP } = calculateCreatureXP(
      partySize.value,
      partyLevel.value,
      level,
      challengeType,
    );

    baseValue.value += baseXP * count;
    currentValue.value += scaledXP * count;
  }

  /**
   * Decrease the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function decreaseDifficulty(
    level: number,
    count: number = 1,
    challengeType: ChallengeType = "base",
  ): void {
    const { baseXP, scaledXP } = calculateCreatureXP(
      partySize.value,
      partyLevel.value,
      level,
      challengeType,
    );
    baseValue.value -= baseXP * count;
    currentValue.value -= scaledXP * count;
  }

  /**
   * Resets the difficulty to default value
   */
  function resetDifficulty(): void {
    currentValue.value = 0;
    baseValue.value = 0;
  }

  return {
    baseValue,
    currentValue,
    increaseDifficulty,
    decreaseDifficulty,
    resetDifficulty,
  };
};
