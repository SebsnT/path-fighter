<template class="difficulty">
  <div class="difficulty-label">{{ label }}</div>
  <ProgressBar :value="(currentValue / maxValue) * 100" :class="color">{{
    currentValue
  }}</ProgressBar>
</template>

<script lang="ts">
export default {
  props: {
    currentValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    trivialThreshold: {
      type: Number,
      required: true,
    },
    lowThreshold: {
      type: Number,
      required: true,
    },
    moderateThreshold: {
      type: Number,
      required: true,
    },
    severeThreshold: {
      type: Number,
      required: true,
    },
    extremeThreshold: {
      type: Number,
      required: true,
    },
  },
  computed: {
    color() {
      if (this.currentValue >= this.extremeThreshold) return "red";
      if (this.currentValue >= this.severeThreshold) return "orange";
      if (this.currentValue >= this.moderateThreshold) return "yellow";
      if (this.currentValue >= this.lowThreshold) return "lime";
      return "green";
    },
    label() {
      if (this.currentValue >= this.extremeThreshold) return "Extreme";
      if (this.currentValue >= this.severeThreshold) return "Severe";
      if (this.currentValue >= this.moderateThreshold) return "Moderate";
      if (this.currentValue >= this.lowThreshold) return "Low";
      return "Trivial";
    },
  },
};
</script>

<style lang="scss">
@use "~/assets/scss/progress-bar.scss";
</style>
