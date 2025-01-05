<template>
  <div>
    <ThresholdSelectors v-bind="thresholds" />

    <OptionToolbar />

    <DifficultyIndicator
      :current-value="currentValue"
      :max-value="maxValue"
      v-bind="thresholds"
    />

    <FilterBar :filters="filters"></FilterBar>

    <!-- Slot Container -->
    <div class="slot-container">
      <!-- Table for all monsters -->
      <div class="slot-left">
        <DataTable
          data-key="id"
          class="data-table"
          :value="data.creatures.value"
          :size="'small'"
          scrollable
          scroll-height="400px"
          :virtual-scroller-options="{ itemSize: 50 }"
          sort-field="name"
          :sort-order="1"
          removable-sort
          :filters="filters"
          selection-mode="single"
        >
          <Column expander style="width: 3rem" />
          <!-- Filters for Each Column -->
          <Column
            v-for="col in columns"
            :key="col.key"
            :field="col.key"
            :header="col.label"
            :sortable="col.sortable"
          >
            <template #body="row">
              <template v-if="col.key != 'action'">
                {{ row.data[col.key] }}</template
              >

              <template v-else>
                <Button
                  icon="pi pi-plus"
                  severity="success"
                  size="small"
                  raised
                  aria-label="Add"
                  @click="addToEncounter(row.data)"
                />
              </template>
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="slot-right">
        <EncounterTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import EncounterTable from "~/components/EncounterTable.vue";
import FilterBar from "~/components/FilterBar.vue";
import "primeicons/primeicons.css";

import { loadCreatures } from "../utils/loadData";

import { columns } from "~/config/columnConfig";

// Load creatures data
const data = await loadCreatures();

// Generate filters for all columns
const filters = useFilters(columns);
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
