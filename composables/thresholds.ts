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
  return { thresholds };
};
