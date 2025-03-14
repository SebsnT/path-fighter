import type { InputNumberInputEvent } from "primevue/inputnumber";

const { encounterArray } = useEncounterState();
const { thresholds } = useThresholds();
// Reactive state for difficulty indicator
const baseValue = ref(0);
const currentValue = ref(0);
const maxValue = thresholds.value.extremeThreshold;

const partySize = ref(4);
const partyLevel = ref(1);

const manualThresholds = ref(false);

export const useDifficulty = () => {
  /**
   * Resets the difficulty to default value
   */
  function resetDifficulty(): void {
    currentValue.value = 0;
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

  /**
   * Increase the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function increaseDifficulty(level: number, count: number = 1): void {
    const { baseXP, scaledXP } = calculateCreatureXP(
      level,
      partySize.value,
      partyLevel.value,
    );
    baseValue.value += baseXP;
    currentValue.value += scaledXP * count;
  }

  /**
   * Decrease the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function decreaseDifficulty(level: number): void {
    const { baseXP, scaledXP } = calculateCreatureXP(
      level,
      partySize.value,
      partyLevel.value,
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
      let current_xp = 0;
      let current_base_xp = 0;
      if (!manualThresholds.value) {
        adjustThreholds();
      }

      // Calculate the XP for each creature in the encounter, multiply it by the count and sum it up
      encounterArray.value.forEach((element) => {
        if (element.count) {
          const { baseXP, scaledXP } = calculateCreatureXP(
            element.level,
            partySize.value,
            partyLevel.value,
          );
          current_base_xp += baseXP;
          current_xp += scaledXP * element.count;
        }
      });
      baseValue.value = current_base_xp;
      currentValue.value = current_xp;
    }
  }

  function adjustThreholds(): void {
    const partySizeAdjustment = partySize.value - 4;

    // Adjust each threshold dynamically based on the party size adjustment
    thresholds.value.trivialThreshold = 40 + partySizeAdjustment * 10;
    thresholds.value.lowThreshold = 60 + partySizeAdjustment * 15;
    thresholds.value.moderateThreshold = 80 + partySizeAdjustment * 20;
    thresholds.value.severeThreshold = 120 + partySizeAdjustment * 30;
    thresholds.value.extremeThreshold = 160 + partySizeAdjustment * 40;
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
