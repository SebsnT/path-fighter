<template>
  <div>
    <!--     <ThresholdSelectors
      v-bind="thresholds"
      @update:threshold="handleThresholdUpdate"
    />

    <DifficultyIndicator
      class="difficulty"
      :current-value="currentValue"
      :max-value="maxValue"
      v-bind="thresholds"
    /> -->

    <OptionToolbar />

    <!-- Full-Width Filter Bar -->
    <div class="filter-bar-container">
      <div class="filter-bar">
        <div
          v-for="col in filterableColumns"
          :key="col.key"
          class="filter-input"
        >
          <label :for="'filter-' + col.key">{{ col.label }}</label>
          <InputText
            :id="'filter-' + col.key"
            v-model="filters[col.key].value"
            :placeholder="'Search ' + col.label"
            class="filter-input-field"
          />
        </div>
      </div>
    </div>

    <!-- Slot Container -->
    <div class="slot-container">
      <!-- Table for all monsters -->
      <div class="slot-left">
        <DataTable
          data-key="id"
          :value="data.creatures.value"
          class="data-table"
          scrollable
          scroll-height="650px"
          sort-field="name"
          :virtual-scroller-options="{ itemSize: 50 }"
          :sort-order="1"
          :filters="filters"
          selection-mode="single"
        >
          <Column expander style="width: 5rem" />
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
                <Button label="Add" @click="addToEncounter(row.data)" />
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
import InputText from "primevue/inputtext";
import EncounterTable from "~/components/EncounterTable.vue";

import { ref } from "vue";
import { loadCreatures } from "~/composables/loadData.ts";
import { columns } from "~/config/columnConfig";
import { generateFilters } from "~/composables/filter";

// Load creatures data
const data = await loadCreatures();

// Handle threshold updates dynamically
/* const handleThresholdUpdate = ({ type, value }) => {
  if (thresholds.value[type + "Threshold"] !== undefined) {
    thresholds.value[type + "Threshold"] = value;
  }
}; */

// Generate filters for all columns
const filters = ref(generateFilters(columns));

// Columns that can be filtered
const filterableColumns = ref(columns.filter((col) => col.filterable));
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
