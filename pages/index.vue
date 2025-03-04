<template>
  <div>
    <OptionToolbar />
    <ThresholdInputs />
    <PartyInputs />
    <DifficultyIndicator />
    <FilterBar />

    <div class="slot-container">
      <div class="slot-left">
        <MainTable />
      </div>

      <div class="slot-right">
        <EncounterTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EncounterTable from "~/components/EncounterTable.vue";
import FilterBar from "~/components/FilterBar.vue";
import "primeicons/primeicons.css";
</script>

<style lang="scss">
@use "../assets/scss/index";
</style>
