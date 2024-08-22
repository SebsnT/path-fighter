<template>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu
        v-model="selectedColumns"
        :options="columns"
        multiple
        placeholder="Columns"
      />
      <UInput v-model="filterQuery" placeholder="Filter creatures" />
    </div>
    <div>
      <UTable
        class="w-full"
        :rows="filteredRows"
        :loading="loading"
        :columns="selectedColumns"
      >
        <template
          v-for="column in selectedColumns"
          :key="column.key"
          #[`${column.key}-data`]="{ row }"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="row[column.key]"></span>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadData } from "../composables/loadData";

const { filteredRows, columns, selectedColumns, filterQuery, loading } =
  loadData();
</script>
