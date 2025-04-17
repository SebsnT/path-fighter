<template>
  <div class="filter-bar-container">
    <div class="filter-bar">
      <div
        v-for="filter in filterConfig"
        :key="filter.key"
        class="filter-input"
      >
        <component
          :is="getFilterComponent(filter)"
          :id="`filter-${filter.key}`"
          v-model="filters[filter.key].value"
          class="filter-input-field"
          :placeholder="`Search ${filter.label}`"
          v-bind="getComponentProps(filter)"
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
import { computed, watch } from "vue";
import { onNumberInput } from "~/utils/filter.utils";
import { filterConfig } from "~/config/filters.config";
import type { Creature } from "~/models/creature";
import type { SelectionOption } from "~/models/selectionOptions";
import type { Filter } from "~/models/filter";

const props = defineProps({
  creatures: {
    type: Array<Creature>,
    required: true,
  },
});

const { filters, clearFilters } = useFilters();

const computedOptions = computed(() => {
  return filterConfig.reduce(
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
    filterConfig.forEach((col) => {
      if (col.type === "dropdown") {
        filters.value[col.key].selectionOptions = getSelectionOptions(
          newCreatures,
          col.key,
        );
      }
    });
  },
  { immediate: true },
);

const getFilterComponent = (filter: Filter) => {
  switch (filter.type) {
    case "string":
      return InputText;
    case "number":
      return InputNumber;
    case "dropdown":
      return filter.select === "multiple" ? MultiSelect : Select;
    default:
      return "div";
  }
};

const getComponentProps = (filter: Filter) => {
  if (filter.type === "number") {
    return {
      min: filter.minValue,
      max: filter.maxValue,
      onInput: onNumberInput,
    };
  }
  if (filter.type === "dropdown") {
    return {
      filter: true,
      options: filter.getUniqueValues
        ? computedOptions.value[filter.key]
        : filter.selectionOptions,
      "option-label": "label",
      "option-value": "value",
      "show-clear": true,
      "virtual-scroller-options": { itemSize: 40 },
    };
  }
  return {};
};
</script>
