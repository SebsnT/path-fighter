<template>
  <div class="filter-bar-container">
    <div class="filter-bar">
      <div v-for="col in filterableColumns" :key="col.key" class="filter-input">
        <template v-if="col.type === 'string'">
          <InputText
            :id="'filter-' + col.key"
            v-model="filters[col.key].value as string | null"
            class="filter-input-field"
            :placeholder="'Search ' + col.label"
          />
        </template>

        <template v-else-if="col.type === 'number'">
          <InputNumber
            :id="'filter-' + col.key"
            v-model="filters[col.key].value as number | null"
            class="filter-input-field"
            :placeholder="'Search ' + col.label"
            :min="col.minValue"
            :max="col.maxValue"
            @input="onNumberInput($event)"
          />
        </template>

        <template v-else-if="col.type === 'dropdown'">
          <template v-if="col.select === 'multiple'">
            <MultiSelect
              :id="'filter-' + col.key"
              v-model="filters[col.key].value"
              filter
              class="filter-input-field"
              :options="
                col.getUniqueValues
                  ? filters[col.key].options
                  : col.selectionOptions
              "
              :placeholder="'Select ' + col.label"
              option-label="label"
              option-value="value"
              variant="filled"
              show-clear
            />
          </template>
          <template v-else>
            <Select
              :id="'filter-' + col.key"
              v-model="filters[col.key].value"
              class="filter-input-field"
              filter
              :options="
                col.getUniqueValues
                  ? filters[col.key].options
                  : col.selectionOptions
              "
              option-label="label"
              option-value="value"
              :placeholder="'Select ' + col.label"
              show-clear
            />
          </template>
        </template>
      </div>
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        size="small"
        outlined
        @click="clearFilters()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from "primevue/select";
import { columns } from "../config/columnConfig";
import { onNumberInput } from "~/utils/filterUtils";
import type { Creature } from "~/models/creature";

const props = defineProps({
  creatures: {
    type: Array<Creature>,
    required: true,
  },
});

const { filters, clearFilters } = useFilters();

// Columns that can be filtered
const filterableColumns = ref(columns.filter((col) => col.filterable));

// Watch `props.creatures` and update dropdown options when data changes
watch(
  () => props.creatures,
  (newCreatures) => {
    filterableColumns.value.forEach((col) => {
      if (col.type === "dropdown") {
        const options = getSelectionOptions(newCreatures, col.key);
        // Store options in the filters object
        filters.value[col.key].options = options;
      }
    });
  },
  { immediate: true },
); // Run immediately on component mount
</script>
