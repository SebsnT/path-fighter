<template>
  <div>
    <div class="difficulty-label">{{ label }}</div>
    <div class="difficulty-label-wrapper">
      <div class="difficulty-label-inner">
        <div class="label">Base XP Gained:</div>
        <div class="value">{{ baseValue }}</div>
      </div>

      <div class="difficulty-label-inner">
        <div class="label">Adjusted XP Gained:</div>
        <div class="value">{{ currentValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { baseValue, currentValue } = useDifficulty();
const { thresholds } = useThresholds();

const label = computed(() => {
  if (baseValue.value >= thresholds.value.extremeThreshold.value)
    return "Extreme";
  if (baseValue.value >= thresholds.value.severeThreshold.value)
    return "Severe";
  if (baseValue.value >= thresholds.value.moderateThreshold.value)
    return "Moderate";
  if (baseValue.value >= thresholds.value.lowThreshold.value) return "Low";
  return "Trivial";
});
</script>

<style lang="scss" scoped>
.difficulty-label {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.difficulty-label-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 8px 8px 28px 8px;
}

.difficulty-label-inner {
  display: grid;
  align-items: center;
  justify-content: center;
  width: 200px;
}
</style>
