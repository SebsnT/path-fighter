<template>
  <DataTable
    data-key="id"
    class="data-table"
    :value="props.creatures"
    :size="'small'"
    show-gridlines
    scrollable
    :scroll-height="manualThresholds ? '57vh' : 'calc(64vh)'"
    :virtual-scroller-options="{ itemSize: 50 }"
    sort-field="name"
    :sort-order="1"
    removable-sort
    :filters="filters"
    :expanded-rows="expandedRows"
    @row-expand="onRowExpand"
  >
    <!-- For the row expansion -->
    <!-- <Column expander style="width: 10px" /> -->
    <Column
      v-for="col in columns"
      :key="col.key"
      :field="col.key"
      :header="col.label"
      :sortable="col.sortable"
      :virtual-scroller-options="{ itemSize: 50 }"
      :style="{ width: col.width || '150px' }"
      :filter-field="col.key"
      :filter-match-mode="col.matchMode"
    >
      <template #body="row">
        <template v-if="col.key == 'name'">
          <a :href="baseUrl + row.data.url" target="_blank">
            {{ row.data[col.key] }}
          </a>
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
      <div class="expanded-row-content">
        <p>TODO</p>

        {{ row.data.id }}
      </div>
    </template>
    <!-- Detail view for the expanded row -->
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { columns } from "~/config/columnConfig";
import type { Creature } from "~/models/creature";

const props = defineProps({
  creatures: {
    type: Array<Creature>,
    required: true,
  },
});

const { filters } = useFilters();
const { addOneToEncounter } = useEncounter();
const { manualThresholds } = useDifficulty();

const expandedRows = ref({});

const onRowExpand = (event: { data: Creature }) => {
  expandedRows.value = { [event.data.id]: true };
};

const baseUrl = "https://2e.aonprd.com";
</script>
