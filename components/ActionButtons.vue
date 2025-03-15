<template>
  <div class="action-buttons">
    <Button
      icon="pi pi-plus"
      severity="success"
      size="small"
      raised
      aria-label="Add"
      @click="addOneToEncounter(props.creature)"
    />

    <Button
      icon="pi pi-minus"
      severity="danger"
      aria-label="Cancel"
      size="small"
      @click="deleteOneFromEncounter(props.creature)"
    />

    <Button
      icon="pi pi-times"
      severity="warn"
      aria-label="Delete"
      size="small"
      @click="deleteAllOfOneCreatureFromEncounter(props.creature)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Creature } from "~/models/creature";

const {
  addOneToEncounter,
  deleteOneFromEncounter,
  deleteAllOfOneCreatureFromEncounter,
} = useEncounter();

const props = defineProps<{
  creature: Creature;
}>();
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 0.25rem;
}
</style>
