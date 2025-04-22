<template>
  <div class="progress-container">
    <div class="thresholds">
      <div
        v-for="(threshold, name) in thresholds"
        :key="name"
        class="threshold-container"
        :style="{ left: `${(threshold.value / maxValue) * 100}%` }"
      >
        <div class="threshold-label">
          {{ threshold.label }} {{ threshold.value }}
        </div>
      </div>
    </div>

    <ProgressBar
      :value="(baseValue / maxValue) * 100"
      :class="color"
      class="fast-animation-progressbar"
      :show-value="false"
    />

    <div class="threshold-markers">
      <div
        v-for="(threshold, name) in thresholds"
        :key="name"
        class="threshold-marker"
        :style="{ left: `${(threshold.value / maxValue) * 100}%` }"
        :title="name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDifficulty } from "~/composables/difficulty";
import { useThresholds } from "~/composables/thresholds";

const { thresholds } = useThresholds();
const { baseValue } = useDifficulty();

const { maxValue } = useThresholds();

const color = computed(() => {
  if (baseValue.value >= thresholds.value.extremeThreshold.value) return "red";
  if (baseValue.value >= thresholds.value.severeThreshold.value)
    return "orange";
  if (baseValue.value >= thresholds.value.moderateThreshold.value)
    return "yellow";
  if (baseValue.value >= thresholds.value.lowThreshold.value) return "lime";
  return "green";
});
</script>

<style lang="scss">
@use "../assets/scss/progress-bar";
</style>
