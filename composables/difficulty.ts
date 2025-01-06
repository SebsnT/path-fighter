import type { InputNumberInputEvent } from "primevue/inputnumber";

// Reactive state for difficulty indicator
const currentValue = ref(0);
const maxValue = ref(160);

const partySize = ref(4);
const partyLevel = ref(1);

export const useDifficulty = () => {
  /**
   * Resets the difficulty to default the value
   */
  function resetDifficulty() {
    currentValue.value = 0;
  }

  /**
   * Resets the party size to default the value
   */
  function resetPartySize() {
    partySize.value = 4;
  }

  /**
   * Resets the party level to default the value
   */
  function resetPartyLevel() {
    partyLevel.value = 1;
  }

  /**
   * Increase the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function increaseDifficulty(level: number) {
    currentValue.value += calculateCreatureXP(level, partyLevel.value);
  }
  /**
   * Decrease the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function decreaseDifficulty(level: number) {
    currentValue.value -= calculateCreatureXP(level, partyLevel.value);
  }

  /**
   * Adjust the XP gained based on the party size and level
   *
   * @param event to update the value immidiatly
   */
  function adjustXPGained(event: InputNumberInputEvent) {
    // Update value immidiatly
    onNumberInput(event);

    if (partyLevel != null && partySize != null) {
      //TODO adjust currentValue based on
    }
  }

  return {
    currentValue,
    maxValue,
    partySize,
    partyLevel,
    resetDifficulty,
    resetPartySize,
    resetPartyLevel,
    increaseDifficulty,
    decreaseDifficulty,
    adjustXPGained,
  };
};
