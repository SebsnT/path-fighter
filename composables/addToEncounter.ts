import type { Creature } from "~/types/creature";

// Define the encounter list as a reactive reference
const encounter = ref<Map<string, Creature>>(new Map());
const encounterArray = computed(() => Array.from(encounter.value.values()));

export function addToEncounter(row: Creature) {
  // Check if the creature is already in the map
  if (encounter.value.has(row.name)) {
    // Increment the count of the existing creature
    const existingCreature = encounter.value.get(row.name)!;
    existingCreature.count = (existingCreature.count || 1) + 1;
  } else {
    // Add new creature with count set to 1
    encounter.value.set(row.name, { ...row, count: 1 });
  }
}

// Export encounter so it can be used in the template
export { encounter, encounterArray };
