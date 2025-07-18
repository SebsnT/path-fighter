<template>
  <DataTable
    data-key="id"
    class="data-table"
    :value="filteredCreatures"
    :size="'small'"
    show-gridlines
    scrollable
    scroll-height="flex"
    :virtual-scroller-options="{ itemSize: 50 }"
    sort-field="name"
    :sort-order="1"
    removable-sort
    :expanded-rows="expandedRows"
    @row-expand="onRowExpand"
  >
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
            class="add-button"
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
  </DataTable>
</template>

<script setup lang="ts">
import { columns } from "~/config/columns.config";
import type { Creature } from "~/models/creature";
import {
  inFilter,
  containsFilter,
  gteFilter,
  lteFilter,
} from "~/utils/filter.utils";

const props = defineProps({
  creatures: {
    type: Array<Creature>,
    required: true,
  },
});

const { cleanFilters } = useFilters();
const { addOneToEncounter } = useEncounter();

// Filtered creatures computed property
const filteredCreatures = computed(() => {
  const cleanedFilters = cleanFilters();

  // If all filters are empty, return all creatures
  if (Object.keys(cleanedFilters).length === 0) {
    return props.creatures;
  }

  return props.creatures.filter((creature) => {
    return Object.keys(cleanedFilters).every((field) => {
      const filter = cleanedFilters[field];

      const filterValue = toRaw(filter.value);
      const matchMode = filter.matchMode;

      if ((filterValue || filterValue == "0") && matchMode) {
        let fieldValue;

        // Special handling for level_min and level_max
        if (field === "level_min" || field === "level_max") {
          fieldValue = creature.level?.toString().toLowerCase() ?? "";
        } else if (field === "npc") {
          fieldValue = creature.npc?.toString().toLowerCase() ?? "false";
        } else {
          fieldValue = creature[field]
            ? creature[field].toString().toLowerCase()
            : undefined;
        }

        if (!fieldValue) {
          return false;
        }

        switch (matchMode) {
          case "in":
            return inFilter(filterValue, fieldValue);
          case "contains":
            return containsFilter(filterValue, fieldValue);
          case "gte":
            return gteFilter(filterValue, fieldValue);
          case "lte":
            return lteFilter(filterValue, fieldValue);

          default:
            return true; // If no filter or match mode is applied
        }
      }
    });
  });
});

const expandedRows = ref({});

const onRowExpand = (event: { data: Creature }) => {
  expandedRows.value = { [event.data.id]: true };
};
</script>
