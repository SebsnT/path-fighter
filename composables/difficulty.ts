import type { InputNumberInputEvent } from "primevue/inputnumber";

const { encounterArray } = useEncounterState();
const { thresholds } = useThresholds();
// Reactive state for difficulty indicator
const currentValue = ref(0);
const maxValue = thresholds.value.extremeThreshold;
const adjustedValue = ref(0);

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
    currentValue.value +=
      calculateCreatureXP(level, partySize.value, partyLevel.value) * count;
  }

  /**
   * Decrease the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function decreaseDifficulty(level: number): void {
    currentValue.value -= calculateCreatureXP(
      level,
      partySize.value,
      partyLevel.value,
    );
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
      let xp = 0;
      if (!manualThresholds.value) {
        adjustThreholds();
      }

      // Calculate the XP for each creature in the encounter, multiply it by the count and sum it up
      encounterArray.value.forEach((element) => {
        if (element.count) {
          xp +=
            calculateCreatureXP(
              element.level,
              partySize.value,
              partyLevel.value,
            ) * element.count;
        }
      });
      currentValue.value = xp;
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
    currentValue,
    adjustedValue,
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
