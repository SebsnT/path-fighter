<template class="difficulty">
  <div class="difficulty-label">{{ label }} {{ currentValue }}</div>
  <div class="progress-container">
    <ProgressBar
      :value="(currentValue / maxValue) * 100"
      :class="color"
      class="fast-animation-progressbar"
    />
    <div class="thresholds">
      <div
        v-for="(threshold, name) in thresholds"
        :key="name"
        class="threshold-marker"
        :style="{ left: `${(threshold / maxValue) * 100}%` }"
        :title="name"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { thresholds } = useThresholds();
const { currentValue, maxValue } = useDifficulty();

const color = computed(() => {
  if (currentValue.value >= thresholds.value.extremeThreshold) return "red";
  if (currentValue.value >= thresholds.value.severeThreshold) return "orange";
  if (currentValue.value >= thresholds.value.moderateThreshold) return "yellow";
  if (currentValue.value >= thresholds.value.lowThreshold) return "lime";
  return "green";
});

const label = computed(() => {
  if (currentValue.value >= thresholds.value.extremeThreshold) return "Extreme";
  if (currentValue.value >= thresholds.value.severeThreshold) return "Severe";
  if (currentValue.value >= thresholds.value.moderateThreshold)
    return "Moderate";
  if (currentValue.value >= thresholds.value.lowThreshold) return "Low";
  return "Trivial";
});
</script>

<style lang="scss">
@use "../assets/scss/progress-bar";
</style>
