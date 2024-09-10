<template>
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
        <template #actions-data="{ row }">
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
        <template #actions-data="{ row }">
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
</template>

<script setup>
import {
  addToEncounter,
  encounterArray,
} from "~/composables/createEncounter.ts";
import { loadCreatures } from "~/composables/loadData.ts";
import { columns, encounterColumns } from "~/config/columnConfig";
import { usePagination, page, pageCount } from "~/composables/pagination";

const data = await loadCreatures();

const paginatedData = usePagination(data.creatures.value);
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
