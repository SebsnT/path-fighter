const partySize = ref(4);
const partyLevel = ref(1);

export const useParty = () => {
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

  return {
    partySize,
    partyLevel,
    resetPartySize,
    resetPartyLevel,
  };
};
