<template>
  <DataTable
    class="data-table"
    :size="'small'"
    :value="encounterArray"
    scrollable
    sort-field="name"
    :sort-order="1"
    :scroll-height="manualThresholds ? '56vh' : 'calc(64vh)'"
  >
    <Column
      v-for="col in encounterColumns"
      :key="col.key"
      :field="col.key"
      :header="col.label"
      :sortable="col.sortable"
    >
      <template #body="row">
        <template v-if="col.key == 'name'">
          <CreatureLinkName :url="row.data.url" :name="row.data.name" />
        </template>
        <template v-else-if="col.key == 'action'">
          <ActionButtons :creature="row.data" />
        </template>

        <template v-else-if="col.key == 'challenge_type'">
          <SelectButton
            :key="`${row.data.id}-${row.data.challenge_type}`"
            :model-value="row.data.challenge_type"
            class="challenge-buttons"
            :options="challengeOptions"
            option-value="value"
            option-label="label"
            data-key="value"
            :allow-empty="false"
            @update:model-value="
              (newType) => updateChallengeType(row.data, newType)
            "
          />
        </template>
        <template v-else> {{ row.data[col.key] }}</template>
      </template>
    </Column>
    <template #empty> No creature selected </template>
  </DataTable>
</template>

<script setup>
import { encounterColumns } from "~/config/columns.config";

const { updateChallengeType } = useEncounter();
const { encounterArray } = useEncounterState();

const { manualThresholds } = useThresholds();

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
</script>
