import { ref } from "vue";
import { useParty } from "./party";
import type { Thresholds } from "~/models/thresholds";

const { partySize } = useParty();

const manualThresholds = ref(false);

// Threshold values in an object
const thresholds: Ref<Thresholds> = ref({
  trivialThreshold: {
    label: "Trivial",
    value: 40,
  },
  lowThreshold: {
    label: "Low",
    value: 60,
  },
  moderateThreshold: {
    label: "Moderate",
    value: 80,
  },
  severeThreshold: {
    label: "Severe",
    value: 120,
  },
  extremeThreshold: {
    label: "Extreme",
    value: 160,
  },
});

const maxValue = ref(200);

export const useThresholds = () => {
  /**
   * Adjusts the difficulty thresholds for
   */
  function adjustThreholds(): void {
    const partySizeAdjustment = partySize.value - 4;

    // Adjust each threshold dynamically based on the party size adjustment
    thresholds.value.trivialThreshold.value = 40 + partySizeAdjustment * 10;
    thresholds.value.lowThreshold.value = 60 + partySizeAdjustment * 15;
    thresholds.value.moderateThreshold.value = 80 + partySizeAdjustment * 20;
    thresholds.value.severeThreshold.value = 120 + partySizeAdjustment * 30;
    thresholds.value.extremeThreshold.value = 160 + partySizeAdjustment * 40;
    maxValue.value = 200 + partySizeAdjustment * 40;
  }

  function resetThresholds(): void {
    thresholds.value.trivialThreshold.value = 40;
    thresholds.value.lowThreshold.value = 60;
    thresholds.value.moderateThreshold.value = 80;
    thresholds.value.severeThreshold.value = 120;
    thresholds.value.extremeThreshold.value = 160;
    maxValue.value = 200;
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
