import { ref } from "vue";

// Reactive state for difficulty indicator
export const currentValue = ref(20);
export const maxValue = ref(160);

// Threshold values in an object
export const thresholds = ref({
  trivialThreshold: 40,
  lowThreshold: 60,
  moderateThreshold: 80,
  severeThreshold: 120,
  extremeThreshold: 160,
});
