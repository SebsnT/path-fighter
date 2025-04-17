<template>
  <div class="difficulty-label">{{ label }}</div>

  <div class="difficulty-label-wrapper">
    <div class="difficulty-label-inner">
      <div class="label">Base XP Gained:</div>
      <div class="value">{{ baseValue }}</div>
    </div>
  </div>

  <div class="difficulty-label-wrapper">
    <div class="difficulty-label-inner">
      <div class="label">Adjusted XP Gained:</div>
      <div class="value">{{ currentValue }}</div>
    </div>
  </div>

  <div class="progress-container">
    <ProgressBar
      :value="(baseValue / maxValue) * 100"
      :class="color"
      class="fast-animation-progressbar"
      :show-value="false"
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
import { useDifficulty } from "~/composables/difficulty";
import { useThresholds } from "~/composables/thresholds";

const { thresholds } = useThresholds();
const { baseValue, currentValue } = useDifficulty();

const { maxValue } = useThresholds();

const color = computed(() => {
  if (baseValue.value >= thresholds.value.extremeThreshold) return "red";
  if (baseValue.value >= thresholds.value.severeThreshold) return "orange";
  if (baseValue.value >= thresholds.value.moderateThreshold) return "yellow";
  if (baseValue.value >= thresholds.value.lowThreshold) return "lime";
  return "green";
});

const label = computed(() => {
  if (baseValue.value >= thresholds.value.extremeThreshold) return "Extreme";
  if (baseValue.value >= thresholds.value.severeThreshold) return "Severe";
  if (baseValue.value >= thresholds.value.moderateThreshold) return "Moderate";
  if (baseValue.value >= thresholds.value.lowThreshold) return "Low";
  return "Trivial";
});
</script>

<style lang="scss">
@use "../assets/scss/progress-bar";
</style>
