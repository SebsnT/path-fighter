<template>
  <div class="page-container">
    <ThresholdInputs />
    <div class="party-xp-container">
      <div class="party-inputs-position">
        <PartyInputs />
      </div>
      <EncounterXP />
    </div>
    <DifficultyIndicator />
    <FilterBar :creatures="creatures" />
    <div class="slot-container main-table-wrapper">
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

onMounted(() => {
  document.documentElement.classList.add("darkmode");
});

const { creatures } = useCreatures();
</script>

<style lang="scss">
@use "../assets/scss/index";
</style>
