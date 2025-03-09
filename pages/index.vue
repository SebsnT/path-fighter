<template>
  <div>
    <OptionToolbar />
    <ThresholdInputs />
    <PartyInputs />
    <DifficultyIndicator />
    <FilterBar :creatures="creatures" />

    <div class="slot-container">
      <div class="slot-left">
        <MainTable :creatures="creatures" />
      </div>

      <div class="slot-right">
        <EncounterTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EncounterTable from "~/components/EncounterTable.vue";
import "primeicons/primeicons.css";

const { creatures } = useCreatures();
</script>

<style lang="scss">
@use "../assets/scss/index";
</style>
