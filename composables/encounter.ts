import { currentValue } from "#imports";
import type { Creature } from "~/types/creature";

// Define the encounter list as a reactive reference
const encounter = ref<Map<string, Creature>>(new Map());

export const useEncounter = () => {
  const encounterArray = computed(() => Array.from(encounter.value.values()));

  /**
   * Adds one creature to the encounter and increase the difficulty
   *
   * @param creature
   */
  function addToEncounter(creature: Creature) {
    // Check if the creature is already in the map
    if (encounter.value.has(creature.name)) {
      // Increment the count of the existing creature
      const existingCreature = encounter.value.get(creature.name)!;
      existingCreature.count = (existingCreature.count || 1) + 1;
    } else {
      // Add new creature with count set to 1
      encounter.value.set(creature.name, { ...creature, count: 1 });
    }

    increaseDifficulty(creature.level);
  }

  /**
   * Deletes one creature from the encounter table and decreases the difficulty
   *
   * @param creature
   */
  function deleteOneFromEncounter(creature: Creature) {
    const existingCreature = encounter.value.get(creature.name)!;
    existingCreature.count = (existingCreature.count || 1) - 1;
    if (existingCreature.count == 0) {
      encounter.value.delete(creature.name);
    }
    decreaseDifficulty(creature.level);
  }

  /**
   * Deletes all creatures from the encounter and resets the difficulty
   */
  function deleteAllFromEncounter() {
    encounter.value.clear();
    resetDifficulty();
  }

  return {
    encounterArray,
    addToEncounter,
    deleteOneFromEncounter,
    deleteAllFromEncounter,
  };
};

/**
 * Resets the difficulty shown in the indicator
 */
export function resetDifficulty() {
  currentValue.value = 0;
}

/**
 * Increase the difficulty of the encounter based on player level, party size and monster level
 *
 * @param level of the creature
 */
function increaseDifficulty(level: number) {
  console.log(level);

  //TODO make caluclations
}
/**
 * Decrease the difficulty of the encounter based on player level, party size and monster level
 *
 * @param level of the creature
 */
function decreaseDifficulty(level: number) {
  console.log(level);
  //TODO make caluclations
}
