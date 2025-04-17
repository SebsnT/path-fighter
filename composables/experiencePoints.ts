import type { InputNumberInputEvent } from "primevue/inputnumber";
import { useThresholds } from "./thresholds";
import { useDifficulty } from "./difficulty";
import { useParty } from "./party";
import { useEncounterState } from "./encounterState";
import { onNumberInput } from "~/utils/filter.utils";
import { calculateCreatureXP } from "~/utils/encounter.utils";

const { baseValue, currentValue } = useDifficulty();
const { partyLevel, partySize } = useParty();
const { encounterArray } = useEncounterState();

export const useExperiencePoints = () => {
  /**
   * Adjust the XP gained when the level of the party changes
   *
   * @param event to update the value immidiatly
   */
  function adjustXPGained(event: InputNumberInputEvent): void {
    const { adjustThreholds } = useThresholds();
    // Update value immidiatly
    onNumberInput(event);

    // Only update value if valid values are set
    if (partyLevel.value != null && partySize.value != null) {
      adjustThreholds();
      caclulateEncounterXP();
    }
  }

  /**
   * Calculate the XP for each creature in the encounter, multiply it by the count and sum it up
   */
  function caclulateEncounterXP() {
    let current_xp = 0;
    let current_base_xp = 0;

    encounterArray.value.forEach((element) => {
      if (element.count) {
        const { baseXP, scaledXP } = calculateCreatureXP(
          partySize.value,
          partyLevel.value,
          element.level,
          element.challenge_type,
        );

        current_base_xp += baseXP * element.count;
        current_xp += scaledXP * element.count;
      }
    });
    baseValue.value = current_base_xp;
    currentValue.value = current_xp;
  }

  return {
    adjustXPGained,
  };
};
