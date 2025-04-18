<template>
  <div class="party-inputs">
    <div class="party-entry">
      <FloatLabel variant="over">
        <InputNumber
          v-model="partySize"
          :min="1"
          :max="999"
          class="party-input"
          @input="adjustXPGained($event)"
        />
        <label for="partySize">Party Size:</label>
      </FloatLabel>
    </div>
    <div class="party-entry">
      <FloatLabel variant="over">
        <InputNumber
          v-model="partyLevel"
          :min="1"
          :max="999"
          class="party-input"
          @input="adjustXPGained($event)"
        />
        <label for="partyLevel">Party Level</label>
      </FloatLabel>
    </div>

    <!-- TODO later -->
    <!-- <div class="party-entry center">
      <label for="partyLevel">Manual Thresholds</label>
      <div class="checkbox-container">
        <Checkbox v-model="manualThresholds" binary />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import Checkbox from "primevue/checkbox";
import { useParty } from "~/composables/party";
import { useThresholds } from "~/composables/thresholds";
import { useExperiencePoints } from "~/composables/experiencePoints";

const { partySize, partyLevel } = useParty();
const { manualThresholds } = useThresholds();
const { adjustXPGained } = useExperiencePoints();
</script>

<style scoped lang="scss">
.party-inputs {
  display: flex;
  margin-left: 48px;
  gap: 40px;
  padding-top: 10px;
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
  gap: 8px;
  align-items: center;
}
</style>
