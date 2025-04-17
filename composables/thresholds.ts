import { ref } from "vue";
import { useParty } from "./party";

const { partySize } = useParty();

const manualThresholds = ref(false);

// Threshold values in an object
const thresholds = ref({
  trivialThreshold: 40,
  lowThreshold: 60,
  moderateThreshold: 80,
  severeThreshold: 120,
  extremeThreshold: 160,
});

const maxValue = ref(thresholds.value.extremeThreshold);

export const useThresholds = () => {
  /**
   * Adjusts the difficulty thresholds for
   */
  function adjustThreholds(): void {
    const partySizeAdjustment = partySize.value - 4;

    // Adjust each threshold dynamically based on the party size adjustment
    thresholds.value.trivialThreshold = 40 + partySizeAdjustment * 10;
    thresholds.value.lowThreshold = 60 + partySizeAdjustment * 15;
    thresholds.value.moderateThreshold = 80 + partySizeAdjustment * 20;
    thresholds.value.severeThreshold = 120 + partySizeAdjustment * 30;
    thresholds.value.extremeThreshold = 160 + partySizeAdjustment * 40;
    maxValue.value = 160 + partySizeAdjustment * 40;
  }

  function resetThresholds(): void {
    thresholds.value.trivialThreshold = 40;
    thresholds.value.lowThreshold = 60;
    thresholds.value.moderateThreshold = 80;
    thresholds.value.severeThreshold = 120;
    thresholds.value.extremeThreshold = 160;
  }

  /**
   * Resets the manual threshold boolean to default value
   */
  function resetManualThresholds(): void {
    manualThresholds.value = false;
  }

  return {
    thresholds,
    manualThresholds,
    maxValue,
    adjustThreholds,
    resetThresholds,
    resetManualThresholds,
  };
};
