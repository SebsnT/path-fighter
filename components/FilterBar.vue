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
          <Select
            :id="'filter-' + col.key"
            v-model="filters[col.key].value"
            class="filter-input-field"
            :options="col.options"
            option-label="label"
            option-value="value"
            :placeholder="'Select ' + col.label"
            show-clear
          />
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
import { useFilters } from "~/composables/filter";

const { filters, clearFilters } = useFilters();

// Columns that can be filtered
const filterableColumns = ref(columns.filter((col) => col.filterable));
</script>
