<template>
  <div class="slot-container">
    <div class="slot-left">
      <UTable
        :rows="data.creatures.value"
        :columns="columns"
        @select="addToEncounter"
      />
    </div>
    <div class="slot-right">
      <div>Encounter</div>
      <UTable :rows="encounterArray" :columns="encounterColumns" />
    </div>
  </div>
</template>

<script setup>
import {
  addToEncounter,
  encounterArray,
} from "~/composables/addToEncounter.ts";
import { loadCreatures } from "~/composables/loadData.ts";
import { columns, encounterColumns } from "~/config/columnConfig";
const data = await loadCreatures();

console.log(encounterArray.value);
</script>
