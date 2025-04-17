<template>
  <DataTable
    data-key="id"
    class="data-table"
    :value="filteredCreatures"
    :size="'small'"
    show-gridlines
    scrollable
    :scroll-height="manualThresholds ? '52vh' : 'calc(60vh)'"
    :virtual-scroller-options="{ itemSize: 50 }"
    sort-field="name"
    :sort-order="1"
    removable-sort
    :expanded-rows="expandedRows"
    @row-expand="onRowExpand"
  >
    <!-- For the row expansion -->
    <Column expander style="width: 10px" />
    <Column
      v-for="col in columns"
      :key="col.key"
      :field="col.key"
      :header="col.label"
      :sortable="col.sortable"
      :virtual-scroller-options="{ itemSize: 50 }"
      :style="{ width: col.width || '150px' }"
      :filter-field="col.key"
    >
      <template #body="row">
        <template v-if="col.key == 'name'">
          <CreatureLinkName :url="row.data.url" :name="row.data.name" />
        </template>
        <template v-else-if="col.markdownField">
          <MarkdownField :data="row.data[col.markdownField]" />
        </template>
        <template v-else-if="col.key != 'action'">
          {{ row.data[col.key] }}
        </template>

        <template v-else>
          <Button
            icon="pi pi-plus"
            severity="success"
            size="small"
            raised
            aria-label="Add"
            @click="addOneToEncounter(row.data)"
          />
        </template>
      </template>
    </Column>
    <template #expansion="row">
      <CreatureDetails :creature="row.data" />
    </template>
    <!-- Detail view for the expanded row -->
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { columns } from "~/config/columns.config";
import type { Creature } from "~/models/creature";
import type { FilterValue } from "~/models/filterValue";

const props = defineProps({
  creatures: {
    type: Array<Creature>,
    required: true,
  },
});

const { filters } = useFilters();
const { addOneToEncounter } = useEncounter();
const { manualThresholds } = useThresholds();

// Filtered creatures computed property
const filteredCreatures = computed(() => {
  const cleanedFilters = cleanFilters();

  // If all filters are empty, return all creatures
  if (Object.keys(cleanedFilters).length === 0) {
    return props.creatures;
  }

  // Apply custom filtering logic for "trait_raw" column (for example)
  return props.creatures.filter((creature) => {
    return Object.keys(cleanedFilters).every((field) => {
      const filter = cleanedFilters[field];

      const filterValue = toRaw(filter.value);
      const matchMode = filter.matchMode;

      if (filterValue && matchMode) {
        const fieldValue = creature[field]
          ? creature[field].toString().toLowerCase()
          : "";

        switch (matchMode) {
          case "in":
            return inFilter(
              filterValue,
              fieldValue,
              filter.containsMultipleValues ?? false,
            );
          case "contains":
            return containsFilter(filterValue, fieldValue);
          case "gte":
            return gteFilter(filterValue, fieldValue);

          default:
            return true; // If no filter or match mode is applied
        }
      }
    });
  });
});

/**
 *
 * @param field
 * @param filterValue
 * @param fieldValue
 */
function inFilter(
  filterValue: FilterValue,
  fieldValue: string,
  containsMultipleValues: boolean,
) {
  // Custom filter logic for multiple values in one column
  if (Array.isArray(filterValue) && containsMultipleValues) {
    return filterValue.some((filterItem: string) =>
      fieldValue.includes(filterItem.toLowerCase()),
    );
  }

  // Default "in" filtering behavior
  if (Array.isArray(filterValue)) {
    return filterValue.some((filterItem: string) =>
      fieldValue.includes(filterItem.toLowerCase()),
    );
  }
}

/**
 * Contains filter ()
 *
 * @param filterValue
 * @param fieldValue
 */
function containsFilter(filterValue: FilterValue, fieldValue: string) {
  if (typeof filterValue === "string") {
    return fieldValue.includes(filterValue.toLowerCase());
  }
}

/**
 *
 * @param filterValue
 * @param fieldValue
 */
function gteFilter(filterValue: FilterValue, fieldValue: string) {
  if (typeof filterValue === "number") {
    return Number(fieldValue) >= filterValue;
  }
}

/**
 *  Remove filters with empty, null, or empty array values
 */
function cleanFilters() {
  return Object.fromEntries(
    Object.entries(filters.value).filter(([_, filter]) => {
      const filterValue = filter.value;
      return (
        filterValue &&
        (Array.isArray(filterValue) ? filterValue.length > 0 : true)
      );
    }),
  );
}

const expandedRows = ref({});

const onRowExpand = (event: { data: Creature }) => {
  expandedRows.value = { [event.data.id]: true };
};
</script>
