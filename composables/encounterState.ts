import type { Creature } from "~/models/creature";

// Define the encounter list as a reactive reference
const encounter = ref<Map<string, Creature>>(new Map());
const encounterArray = computed(() => Array.from(encounter.value.values()));

export const useEncounterState = () => {
  return { encounter, encounterArray };
};
