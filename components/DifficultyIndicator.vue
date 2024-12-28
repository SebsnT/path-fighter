<template>
  <div></div>
  <!--   <UProgress :value="currentValue" :max="maxValue" :color="color">
    <template #indicator>
      <div :class="textClass">
        {{ label }}
      </div>
    </template>
  </UProgress> -->
</template>

<script>
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
    textClass() {
      return `font-bold ${this.colorClass}`;
    },
    colorClass() {
      if (this.currentValue >= this.extremeThreshold) return "text-red-500";
      if (this.currentValue >= this.severeThreshold) return "text-orange-500";
      if (this.currentValue >= this.moderateThreshold) return "text-yellow-500";
      if (this.currentValue >= this.lowThreshold) return "text-lime-500";
      return "text-green-500";
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
@use "~/assets/scss/index.scss";
</style>
