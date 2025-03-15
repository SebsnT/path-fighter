import type { Creature } from "~/models/creature";

const encounter = ref<Map<string, Creature>>(new Map());
const encounterArray = computed(() => Array.from(encounter.value.values()));

export const useEncounterState = () => {
  return { encounter, encounterArray };
};
