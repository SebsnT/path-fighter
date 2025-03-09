import { ref } from "vue";

// Threshold values in an object
const thresholds = ref({
  trivialThreshold: 40,
  lowThreshold: 60,
  moderateThreshold: 80,
  severeThreshold: 120,
  extremeThreshold: 160,
});

export const useThresholds = () => {
  function resetThresholds(): void {
    thresholds.value.trivialThreshold = 40;
    thresholds.value.lowThreshold = 60;
    thresholds.value.moderateThreshold = 80;
    thresholds.value.severeThreshold = 120;
    thresholds.value.extremeThreshold = 160;
  }

  return { thresholds, resetThresholds };
};
