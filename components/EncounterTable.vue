<template>
  <DataTable class="data-table" :value="encounterArray">
    <Column
      v-for="col in encounterColumns"
      :key="col.key"
      :field="col.key"
      :header="col.label"
      :sortable="col.sortable"
    />
  </DataTable>
</template>

<script setup>
import { encounterArray } from "~/composables/createEncounter.ts";
import { encounterColumns } from "~/config/columnConfig";
</script>
