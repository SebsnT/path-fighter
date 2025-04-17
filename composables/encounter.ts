import type { ChallengeType } from "~/models/challengeType";
import type { Creature } from "~/models/creature";
import { useEncounterState } from "./encounterState";
import { useDifficulty } from "./difficulty";

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
    const key = `${creature.id}:${creature.challenge_type ?? "base"}`;

    if (encounter.value.has(key)) {
      const existingCreature = encounter.value.get(key)!;
      existingCreature.count += 1;
    } else if (encounter.value.get(key)?.challenge_type != "base") {
      addCreature(creature);
    }

    increaseDifficulty(creature.level, 1, creature.challenge_type);
  }

  /**
   * Add new creature with count set to 1
   * and challenge type "base"
   *
   * @param creature
   */
  function addCreature(
    creature: Creature,
    challenge_type: ChallengeType = "base",
  ) {
    encounter.value.set(`${creature.id}:${challenge_type}`, {
      ...creature,
      count: 1,
      challenge_type: challenge_type,
    });
  }

  /**
   * Adds multiple creatures to the encounter and increases the difficulty.
   *
   * @param creatures Array of creatures to add to the encounter.
   */
  function addMultipleToEncounter(creatures: Creature[]): void {
    // Iterate over the array of creatures
    creatures.forEach((creature) => {
      const key = `${creature.id}:${creature.challenge_type}`;
      // Check if the creature is already in the map
      if (encounter.value.has(key)) {
        // Increment the count of the existing creature
        const existingCreature = encounter.value.get(key)!;
        existingCreature.count = creature.count;
      } else {
        // Add new creature with count set to 1
        encounter.value.set(key, {
          ...creature,
          count: creature.count,
        });
      }

      // Increase difficulty based on the creature's level
      increaseDifficulty(
        creature.level,
        creature.count,
        creature.challenge_type,
      );
    });
  }

  /**
   * Deletes one creature from the encounter table and decreases the difficulty
   *
   * @param creature
   */
  function deleteOneFromEncounter(creature: Creature): void {
    const key = `${creature.id}:${creature.challenge_type}`;

    const existingCreature = encounter.value.get(key)!;
    existingCreature.count = (existingCreature.count || 1) - 1;
    if (existingCreature.count == 0) {
      encounter.value.delete(key);
    }
    decreaseDifficulty(creature.level, creature.count, creature.challenge_type);
  }

  /**
   * Deletes all entries of one creature
   *
   * @param creature
   */
  function deleteAllOfOneCreatureFromEncounter(creature: Creature): void {
    const key = `${creature.id}:${creature.challenge_type}`;

    decreaseDifficulty(creature.level, creature.count, creature.challenge_type);

    encounter.value.delete(key);
  }

  /**
   * Merges two entries if they are the same creature and challange type
   *
   * @param oldKey
   * @param newKey
   * @param newType
   */
  function mergeExistingCreatures(
    oldKey: string,
    newKey: string,
    newType: ChallengeType,
  ) {
    const existingCreatureOldCreature = encounter.value.get(oldKey)!;
    const existingCreatureNewCreature = encounter.value.get(newKey)!;

    encounter.value.delete(oldKey);

    encounter.value.set(newKey, {
      ...existingCreatureNewCreature,
      challenge_type: newType,
      count:
        existingCreatureNewCreature.count + existingCreatureOldCreature.count,
    });
  }

  /**
   * Updates the challenge type of an existing creature
   *
   * @param oldKey
   * @param newKey
   * @param newType
   */
  function updateExistingCreature(
    oldKey: string,
    newKey: string,
    newType: ChallengeType,
  ) {
    const existingCreature = encounter.value.get(oldKey)!;

    encounter.value.delete(oldKey);

    encounter.value.set(newKey, {
      ...existingCreature,
      challenge_type: newType,
    });
  }

  /**
   * Updates the challenge type of a creature in the encounter table
   *
   * @param creature
   * @param newType
   */
  function updateChallengeType(creature: Creature, newType: ChallengeType) {
    const oldKey = `${creature.id}:${creature.challenge_type}`;
    const newKey = `${creature.id}:${newType}`;

    adjustedChallengeTypeUrl(creature, newType);

    if (encounter.value.has(oldKey) && encounter.value.has(newKey)) {
      mergeExistingCreatures(oldKey, newKey, newType);
    } else if (encounter.value.has(oldKey)) {
      updateExistingCreature(oldKey, newKey, newType);
    }

    recalculateDifficulty(encounterArray.value);
  }

  /**
   * Adjusts the url to the page of the creature
   *
   * @param creature
   * @param challengeType
   */
  function adjustedChallengeTypeUrl(
    creature: Creature,
    challengeType: ChallengeType,
  ) {
    const typeQuery = `&${challengeType}=true`;

    if (!creature.url.includes("&")) {
      creature.url = creature.url + typeQuery;
    } else {
      creature.url = creature.url.replace(new RegExp(`&\\w+=true`), typeQuery);
    }
  }

  /**
   * Recalculates the difficulty (xp) of the encounter table
   *
   * @param creatures
   */
  function recalculateDifficulty(creatures: Creature[]) {
    deleteAllFromEncounter();
    addMultipleToEncounter(creatures);
  }

  /**
   * Deletes all creatures from the encounter and resets the difficulty
   */
  function deleteAllFromEncounter(): void {
    encounter.value.clear();
    resetDifficulty();
  }

  /**
   * Clears the encounter table
   */
  function clearEncounter() {
    encounter.value.clear();
  }

  return {
    encounterArray,
    addOneToEncounter,
    addMultipleToEncounter,
    updateChallengeType,
    deleteOneFromEncounter,
    deleteAllOfOneCreatureFromEncounter,
    clearEncounter,
  };
};
