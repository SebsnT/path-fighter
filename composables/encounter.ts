import { useDifficulty } from "~/composables/difficulty";
import type { Creature } from "~/models/creature";

const { encounterArray, encounter } = useEncounterState();

const { increaseDifficulty, decreaseDifficulty, resetDifficulty } =
  useDifficulty();

export const useEncounter = () => {
  /**
   * Adds one creature to the encounter and increase the difficulty
   *
   * @param creature
   */
  function addOneToEncounter(creature: Creature): void {
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
   * Adds multiple creatures to the encounter and increases the difficulty.
   *
   * @param creatures Array of creatures to add to the encounter.
   */
  function addMultipleToEncounter(creatures: Creature[]): void {
    // Iterate over the array of creatures
    creatures.forEach((creature) => {
      // Check if the creature is already in the map
      if (encounter.value.has(creature.name)) {
        // Increment the count of the existing creature
        const existingCreature = encounter.value.get(creature.name)!;
        existingCreature.count = creature.count;
      } else {
        // Add new creature with count set to 1
        encounter.value.set(creature.name, {
          ...creature,
          count: creature.count,
        });
      }

      // Increase difficulty based on the creature's level
      increaseDifficulty(creature.level, creature.count);
    });
  }

  /**
   * Deletes one creature from the encounter table and decreases the difficulty
   *
   * @param creature
   */
  function deleteOneFromEncounter(creature: Creature): void {
    const existingCreature = encounter.value.get(creature.name)!;
    existingCreature.count = (existingCreature.count || 1) - 1;
    if (existingCreature.count == 0) {
      encounter.value.delete(creature.name);
    }
    decreaseDifficulty(creature.level);
  }

  /**
   * Deletes all entries of one creature
   *
   * @param creature
   */
  function deleteAllOfOneCreatureFromEncounter(creature: Creature): void {
    const existingCreature = encounter.value.get(creature.name)!;

    for (let i = 0; i < existingCreature.count; i++) {
      decreaseDifficulty(creature.level);
    }

    encounter.value.delete(creature.name);
  }

  /**
   * Deletes all creatures from the encounter and resets the difficulty
   */
  function deleteAllFromEncounter(): void {
    encounter.value.clear();
    resetDifficulty();
  }

  function clearEncounter() {
    encounter.value.clear();
  }

  return {
    encounterArray,
    addOneToEncounter,
    addMultipleToEncounter,
    deleteOneFromEncounter,
    deleteAllFromEncounter,
    deleteAllOfOneCreatureFromEncounter,
    clearEncounter,
  };
};
