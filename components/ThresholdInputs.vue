<template>
  <div v-if="manualThresholds" class="threshold-inputs">
    <div
      v-for="(label, type) in thresholdLabels"
      :key="type"
      class="threshold-entry"
    >
      <label :for="type + 'Threshold'">{{ label }}:</label>
      <InputNumber
        :id="type + 'Threshold'"
        v-model="thresholds[type]"
        @input="onNumberInput($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThresholds } from "~/composables/thresholds";

const { thresholds } = useThresholds();
const { manualThresholds } = useDifficulty();

// Define labels for each threshold type
const thresholdLabels = {
  trivialThreshold: "Trivial Threshold",
  lowThreshold: "Low Threshold",
  moderateThreshold: "Moderate Threshold",
  severeThreshold: "Severe Threshold",
  extremeThreshold: "Extreme Threshold",
};
</script>

<style scoped>
.threshold-inputs {
  display: flex;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
}
.threshold-entry {
  display: flex;
  flex-direction: column;
}
</style>
