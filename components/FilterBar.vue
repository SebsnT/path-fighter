<template>
  <div class="filter-bar-container">
    <div class="filter-bar">
      <div v-for="col in filterableColumns" :key="col.key" class="filter-input">
        <component
          :is="getFilterComponent(col)"
          :id="`filter-${col.key}`"
          v-model="filters[col.key].value"
          class="filter-input-field"
          :placeholder="`Search ${col.label}`"
          v-bind="getComponentProps(col)"
        />
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
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import { computed, ref, watch } from "vue";
import { columns } from "../config/columnConfig";
import { onNumberInput } from "~/utils/filterUtils";
import type { Creature } from "~/models/creature";
import type { Column, SelectionOption } from "~/models/column";

const props = defineProps({
  creatures: {
    type: Array<Creature>,
    required: true,
  },
});

const { filters, clearFilters } = useFilters();
const filterableColumns = ref(columns.filter((col) => col.filterable));

const computedOptions = computed(() => {
  return filterableColumns.value.reduce(
    (acc, col) => {
      if (col.type === "dropdown") {
        acc[col.key] = getSelectionOptions(props.creatures, col.key);
      }
      return acc;
    },
    {} as Record<string, SelectionOption[]>,
  );
});

watch(
  () => props.creatures,
  (newCreatures) => {
    filterableColumns.value.forEach((col) => {
      if (col.type === "dropdown") {
        filters.value[col.key].options = getSelectionOptions(
          newCreatures,
          col.key,
        );
      }
    });
  },
  { immediate: true },
);

const getFilterComponent = (col: Column) => {
  switch (col.type) {
    case "string":
      return InputText;
    case "number":
      return InputNumber;
    case "dropdown":
      return col.select === "multiple" ? MultiSelect : Select;
    default:
      return "div";
  }
};

const getComponentProps = (col: Column) => {
  if (col.type === "number") {
    return { min: col.minValue, max: col.maxValue, onInput: onNumberInput };
  }
  if (col.type === "dropdown") {
    return {
      filter: true,
      options: col.getUniqueValues
        ? computedOptions.value[col.key]
        : col.selectionOptions,
      "option-label": "label",
      "option-value": "value",
      "show-clear": true,
      "virtual-scroller-options": { itemSize: 40 },
    };
  }
  return {};
};
</script>
