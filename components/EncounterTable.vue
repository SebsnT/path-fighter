<template>
  <DataTable
    class="data-table"
    :size="'small'"
    :value="encounterArray"
    scrollable
    :scroll-height="manualThresholds ? '57vh' : 'calc(64vh)'"
  >
    <Column
      v-for="col in encounterColumns"
      :key="col.key"
      :field="col.key"
      :header="col.label"
      :sortable="col.sortable"
    >
      <template #body="slotProps">
        <template v-if="col.key != 'action'">
          {{ slotProps.data[col.key] }}</template
        >

        <template v-else>
          <Button
            icon="pi pi-plus"
            severity="success"
            size="small"
            raised
            aria-label="Add"
            @click="addOneToEncounter(slotProps.data)"
          />

          <Button
            icon="pi pi-minus"
            severity="danger"
            aria-label="Cancel"
            size="small"
            @click="deleteOneFromEncounter(slotProps.data)"
          />

          <Button
            icon="pi pi-times"
            severity="warn"
            aria-label="Delete"
            size="small"
            @click="deleteAllOfOneCreatureFromEncounter(slotProps.data)"
          />
        </template>
      </template>
    </Column>
    <template #empty> No creature selected </template>
  </DataTable>
</template>

<script setup>
import { encounterColumns } from "~/config/columnConfig";

const {
  encounterArray,
  addOneToEncounter,
  deleteOneFromEncounter,
  deleteAllOfOneCreatureFromEncounter,
} = useEncounter();
const { manualThresholds } = useDifficulty();
</script>
