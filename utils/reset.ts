/**
 * function for resetting the state of the application
 */
export function reset() {
  const { clearEncounter } = useEncounter();
  const { resetDifficulty } = useDifficulty();

  clearEncounter();
  clearFilters();
  resetDifficulty();
}
