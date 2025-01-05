// Reactive state for difficulty indicator
const currentValue = ref(20);
const maxValue = ref(160);

export const useDifficulty = () => {
  /**
   * Resets the difficulty shown in the indicator
   */
  function resetDifficulty() {
    currentValue.value = 0;
  }

  /**
   * Increase the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function increaseDifficulty(level: number) {
    console.log(level);

    //TODO make caluclations
  }
  /**
   * Decrease the difficulty of the encounter based on player level, party size and monster level
   *
   * @param level of the creature
   */
  function decreaseDifficulty(level: number) {
    console.log(level);
    //TODO make caluclations
  }

  return {
    currentValue,
    maxValue,
    resetDifficulty,
    increaseDifficulty,
    decreaseDifficulty,
  };
};
