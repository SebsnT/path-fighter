<template>
  <div>
    <ThresholdSelectors
      v-bind="thresholds"
      @update:threshold="handleThresholdUpdate"
    />

    <DifficultyIndicator
      class="difficulty"
      :current-value="currentValue"
      :max-value="maxValue"
      v-bind="thresholds"
    />

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
          scroll-height="500px"
          sort-field="name"
          :virtual-scroller-options="{ itemSize: 20 }"
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
          </Column>
          <template #expandedRow="{ rowData }">
            <div class="expanded-row-content">
              <!-- Customize the expanded row content here -->
              <p><strong>Name:</strong> {{ rowData.name }}</p>
              <p><strong>Type:</strong> {{ rowData.type }}</p>
              <!-- Add more fields as needed -->
            </div>
          </template>
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
const handleThresholdUpdate = ({ type, value }) => {
  if (thresholds.value[type + "Threshold"] !== undefined) {
    thresholds.value[type + "Threshold"] = value;
  }
};

// Generate filters for all columns
const filters = ref(generateFilters(columns));

// Columns that can be filtered
const filterableColumns = ref(columns.filter((col) => col.filterable));

// Expanded rows state
const expandedRows = ref([]);
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
