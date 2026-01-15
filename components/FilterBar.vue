<template>
  <Panel class="filter-panel" toggleable header="Filters">
    <Button
      class="filter-button"
      type="button"
      icon="pi pi-filter-slash"
      label="Clear"
      size="small"
      outlined
      @click="clearFilters()"
    />
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
          :placeholder="filter.label"
          v-bind="getComponentProps(filter)"
        />
      </div>
    </div>
  </Panel>
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
      maxSelectedLabels: 2,
      "option-value": "value",
      "show-clear": true,
      "virtual-scroller-options": { itemSize: 40 },
    };
  }
  return {};
};
</script>

<style lang="css" scoped>
.filter-panel {
  margin: 8px 8px 0 8px;
}

.filter-bar-container {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 16px;
  row-gap: 8px;
  width: 100%;
  margin-top: 12px;
}

/* Filters */
.filter-bar {
  grid-column: 1 / -1; /* span full width */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin: 0 16px 0 12px;
}

/* Button aligned at the end of the first row */
.filter-button {
  margin-left: 12px;
  width: 100px;
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  margin-bottom: 8px;
}

.filter-input {
  flex: 1 1 200px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
}

.filter-input label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.filter-input-field {
  width: 100%;
}

@media (max-width: 1700px) {
  .filter-bar-container {
    justify-content: center;
  }
  .filter-bar {
    justify-content: start;
  }

  .filter-input {
    flex: 0 0 25% !important;
    max-width: 24% !important;
  }
}

@media (max-width: 800px) {
  .filter-input {
    flex: 0 0 50% !important;
    max-width: 49% !important;
  }
}

@media (max-width: 500px) {
  .filter-input {
    flex: 0 0 100% !important;
    max-width: 99% !important;
  }
}
</style>
