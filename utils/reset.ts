/**
 * function for resetting the state of the application
 */
export function reset() {
  const { deleteAllFromEncounter } = useEncounter();
  deleteAllFromEncounter();
  clearFilters();
  resetDifficulty();
}
