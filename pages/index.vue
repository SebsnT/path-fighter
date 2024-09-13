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

    <!-- Slot Container -->
    <div class="slot-container">
      <div class="slot-left">
        <div
          class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="data.creatures.value.length"
          />
        </div>
        <UTable :rows="paginatedData" :columns="columns">
          <template #action-data="{ row }">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-plus-20-solid"
              @click="addToEncounter(row)"
            />
          </template>
        </UTable>
      </div>

      <div class="slot-right">
        <UTable :rows="encounterArray" :columns="encounterColumns">
          <template #action-data="{ row }">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-trash-20-solid"
              @click="deleteFromEncounter(row)"
            />
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  addToEncounter,
  encounterArray,
} from "~/composables/createEncounter.ts";
import { loadCreatures } from "~/composables/loadData.ts";
import { columns, encounterColumns } from "~/config/columnConfig";
import { usePagination, page, pageCount } from "~/composables/pagination";

// Load creatures data
const data = await loadCreatures();
const paginatedData = usePagination(data.creatures.value);

// Reactive state for difficulty indicator
const currentValue = ref(20);
const maxValue = ref(160);

// Threshold values in an object
const thresholds = ref({
  trivialThreshold: 40,
  lowThreshold: 60,
  moderateThreshold: 80,
  severeThreshold: 120,
  extremeThreshold: 160,
});

// Handle threshold updates dynamically
const handleThresholdUpdate = ({ type, value }) => {
  if (thresholds.value[type + "Threshold"] !== undefined) {
    thresholds.value[type + "Threshold"] = value;
  }
};
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
