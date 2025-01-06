/**
 * function for resetting the state of the application
 */
export function reset() {
  const { clearEncounter } = useEncounter();
  const { clearFilters } = useFilters();
  const {
    resetDifficulty,
    resetPartyLevel,
    resetPartySize,
    resetManualThresholds,
  } = useDifficulty();
  const { resetThresholds } = useThresholds();

  clearEncounter();
  clearFilters();
  resetDifficulty();
  resetPartyLevel();
  resetPartySize();
  resetThresholds();
  resetManualThresholds();
}
