import { resetDifficulty } from "./createEncounter";

/**
 * function for resetting the state of the application
 */
export function reset() {
  deleteAllFromEncounter();
  clearFilters();
  resetDifficulty();
}
