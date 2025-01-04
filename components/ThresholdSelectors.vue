<template>
  <div class="threshold-inputs">
    <div
      v-for="(label, type) in thresholdLabels"
      :key="type"
      class="threshold-entry"
    >
      <label :for="type + 'Threshold'">{{ label }}:</label>
      <input
        :id="type + 'Threshold'"
        v-model="thresholds[type]"
        type="number"
        @input="updateThreshold(type, thresholds[type])"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Define props for thresholds
const props = defineProps({
  trivialThreshold: { type: Number, default: 40 },
  lowThreshold: { type: Number, default: 60 },
  moderateThreshold: { type: Number, default: 80 },
  severeThreshold: { type: Number, default: 120 },
  extremeThreshold: { type: Number, default: 160 },
});

// Emit event to update threshold
const emit = defineEmits(["update:threshold"]);

// Define labels for each threshold type
const thresholdLabels = {
  trivial: "Trivial Threshold",
  low: "Low Threshold",
  moderate: "Moderate Threshold",
  severe: "Severe Threshold",
  extreme: "Extreme Threshold",
};

// Create a computed object for the thresholds
const thresholds = computed(() => ({
  trivial: props.trivialThreshold,
  low: props.lowThreshold,
  moderate: props.moderateThreshold,
  severe: props.severeThreshold,
  extreme: props.extremeThreshold,
}));

// Emit the update event whenever a threshold is modified
const updateThreshold = (type, value) => {
  emit("update:threshold", { type, value });
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
