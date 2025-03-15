<template>
  <DataTable
    class="data-table"
    :size="'small'"
    :value="encounterArray"
    scrollable
    :scroll-height="manualThresholds ? '57vh' : 'calc(64vh)'"
  >
    <Column
      v-for="col in encounterColumns"
      :key="col.key"
      :field="col.key"
      :header="col.label"
      :sortable="col.sortable"
    >
      <template #body="slotProps">
        <template v-if="col.key == 'action'">
          <div class="action-buttons">
            <Button
              icon="pi pi-plus"
              severity="success"
              size="small"
              raised
              aria-label="Add"
              @click="addOneToEncounter(slotProps.data)"
            />

            <Button
              icon="pi pi-minus"
              severity="danger"
              aria-label="Cancel"
              size="small"
              @click="deleteOneFromEncounter(slotProps.data)"
            />

            <Button
              icon="pi pi-times"
              severity="warn"
              aria-label="Delete"
              size="small"
              @click="deleteAllOfOneCreatureFromEncounter(slotProps.data)"
            />
          </div>
        </template>

        <template v-else-if="col.key == 'challenge_type'">
          <SelectButton
            :model-value="slotProps.data.challenge_type"
            class="challenge-buttons"
            :options="challengeOptions"
            option-value="value"
            option-label="label"
            data-key="value"
            @update:model-value="
              (newType) => updateChallengeType(slotProps.data, newType)
            "
          />
        </template>
        <template v-else> {{ slotProps.data[col.key] }}</template>
      </template>
    </Column>
    <template #empty> No creature selected </template>
  </DataTable>
</template>

<script setup>
import { encounterColumns } from "~/config/columnConfig";

const {
  encounterArray,
  addOneToEncounter,
  updateChallengeType,
  deleteOneFromEncounter,
  deleteAllOfOneCreatureFromEncounter,
} = useEncounter();

const challengeOptions = [
  {
    label: "Weak",
    value: "weak",
  },
  {
    label: "Base",
    value: "base",
  },
  {
    label: "Elite",
    value: "elite",
  },
];

const { manualThresholds } = useDifficulty();
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 0.25rem;
}
</style>
