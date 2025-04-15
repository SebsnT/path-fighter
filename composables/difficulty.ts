import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { ChallengeType } from "~/models/challengeType";

const { encounterArray } = useEncounterState();
const { thresholds } = useThresholds();
// Reactive state for difficulty indicator

/** Value not adjusted by party size or party level */
const baseValue = ref(0);

/** Current value based on party size */
const currentValue = ref(0);

const maxValue = ref(thresholds.value.extremeThreshold);

const partySize = ref(4);
const partyLevel = ref(1);

const manualThresholds = ref(false);

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
    challengeType: ChallengeType = "base",
  ): void {
    const { baseXP, scaledXP } = calculateCreatureXP(
      partySize.value,
      partyLevel.value,
      level,
      challengeType,
    );
    baseValue.value -= baseXP;
    currentValue.value -= scaledXP;
  }

  /**
   * Adjust the XP gained when the level of the party changes
   *
   * @param event to update the value immidiatly
   */
  function adjustXPGained(event: InputNumberInputEvent): void {
    // Update value immidiatly
    onNumberInput(event);

    // Only update value if valid values are set
    if (partyLevel.value != null && partySize.value != null) {
      adjustThreholds();
      caclulateEncounterXP();
    }
  }

  /**
   * Calculate the XP for each creature in the encounter, multiply it by the count and sum it up
   */
  function caclulateEncounterXP() {
    let current_xp = 0;
    let current_base_xp = 0;

    encounterArray.value.forEach((element) => {
      if (element.count) {
        const { baseXP, scaledXP } = calculateCreatureXP(
          partySize.value,
          partyLevel.value,
          element.level,
          element.challenge_type,
        );

        current_base_xp += baseXP * element.count;
        current_xp += scaledXP * element.count;
      }
    });
    baseValue.value = current_base_xp;
    currentValue.value = current_xp;
  }

  /**
   * Adjusts the difficulty thresholds for
   */
  function adjustThreholds(): void {
    const partySizeAdjustment = partySize.value - 4;

    // Adjust each threshold dynamically based on the party size adjustment
    thresholds.value.trivialThreshold = 40 + partySizeAdjustment * 10;
    thresholds.value.lowThreshold = 60 + partySizeAdjustment * 15;
    thresholds.value.moderateThreshold = 80 + partySizeAdjustment * 20;
    thresholds.value.severeThreshold = 120 + partySizeAdjustment * 30;
    thresholds.value.extremeThreshold = 160 + partySizeAdjustment * 40;
    maxValue.value = 160 + partySizeAdjustment * 40;
  }

  /**
   * Resets the difficulty to default value
   */
  function resetDifficulty(): void {
    currentValue.value = 0;
    baseValue.value = 0;
  }

  /**
   * Resets the party size to default value
   */
  function resetPartySize(): void {
    partySize.value = 4;
  }

  /**
   * Resets the party level to default value
   */
  function resetPartyLevel(): void {
    partyLevel.value = 1;
  }

  /**
   * Resets the manual threshold boolean to default value
   */
  function resetManualThresholds(): void {
    manualThresholds.value = false;
  }

  return {
    baseValue,
    currentValue,
    maxValue,
    partySize,
    partyLevel,
    manualThresholds,
    resetDifficulty,
    resetPartySize,
    resetPartyLevel,
    resetManualThresholds,
    increaseDifficulty,
    decreaseDifficulty,
    adjustXPGained: adjustXPGained,
  };
};
