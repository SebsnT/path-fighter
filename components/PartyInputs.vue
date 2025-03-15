<template>
  <div class="party-inputs">
    <div class="party-entry">
      <label for="partySize">Party Size:</label>
      <InputNumber
        v-model="partySize"
        class="party-input"
        @input="adjustXPGained($event)"
      />
    </div>
    <div class="party-entry">
      <label for="partyLevel">Party Level:</label>
      <InputNumber
        v-model="partyLevel"
        class="party-input"
        @input="adjustXPGained($event)"
      />
    </div>

    <div class="party-entry center">
      <label for="partyLevel">Manual Thresholds</label>
      <div class="checkbox-container">
        <Checkbox v-model="manualThresholds" binary />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "primevue/checkbox";

const { partySize, partyLevel, manualThresholds, adjustXPGained } =
  useDifficulty();
</script>

<style scoped lang="scss">
.party-inputs {
  display: flex;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
}
.center {
  align-items: center;
  padding-left: 10px;
}

.checkbox-container {
  display: flex;
  flex: 1;
  align-items: center;
}

.party-entry {
  display: flex;
  flex-direction: column;
}

.party-input {
  .p-inputnumber-input {
    max-width: 100px;
  }
}
</style>
