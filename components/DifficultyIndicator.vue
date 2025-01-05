<template class="difficulty">
  <div class="difficulty-label">{{ label }}</div>
  <ProgressBar :value="(currentValue / maxValue) * 100" :class="color">{{
    currentValue
  }}</ProgressBar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThresholds } from "~/composables/thresholds";
import { useDifficulty } from "~/composables/difficulty";

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
@use "~/assets/scss/progress-bar.scss";
</style>
