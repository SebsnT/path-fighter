<template>
  <div class="party-inputs">
    <div class="party-entry">
      <label for="partySize">Party Size:</label>
      <InputNumber v-model="partySize" @input="adjustXPGained($event)" />
    </div>
    <div class="party-entry">
      <label for="partyLevel">Party Level:</label>
      <InputNumber v-model="partyLevel" @input="adjustXPGained($event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDifficulty } from "~/composables/difficulty";

const { partySize, partyLevel, adjustXPGained } = useDifficulty();
</script>

<style lang="scss">
.party-inputs {
  display: flex;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
}

.party-entry {
  display: flex;
  flex-direction: column;
}
</style>
