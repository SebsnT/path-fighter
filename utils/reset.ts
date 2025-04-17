import { useDifficulty } from "~/composables/difficulty";
import { useEncounter } from "~/composables/encounter";
import { useFilters } from "~/composables/filter";
import { useParty } from "~/composables/party";
import { useThresholds } from "~/composables/thresholds";

/**
 * function for resetting the state of the application
 */
export function reset(): void {
  const { clearEncounter } = useEncounter();
  const { clearFilters } = useFilters();
  const { resetDifficulty } = useDifficulty();
  const { resetPartyLevel, resetPartySize } = useParty();
  const { resetThresholds, resetManualThresholds } = useThresholds();

  clearEncounter();
  clearFilters();
  resetDifficulty();
  resetPartyLevel();
  resetPartySize();
  resetThresholds();
  resetManualThresholds();
}
