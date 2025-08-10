import type jsPDF from "jspdf";
import type { Creature } from "~/models/creature";
import { addEntry } from "./utils/export.utils";
import { addBasicStats } from "./sections/addBasicStats";
import { addAttacks } from "./sections/addAttacks";
import { addAttributes } from "./sections/addAttributes";
import { addDefenses } from "./sections/addDefenses";
import { addReactions } from "./sections/addReactions";
import { addSaves } from "./sections/addSaves";
import { addSpells } from "./sections/addSpells";
import { addUniqueAbilities } from "./sections/addUniqueAbilities";
import { getEliteCreature } from "./utils/getEliteCreature";
import { getWeakCreature } from "./utils/getWeakCreature";

/**
 * Adds all information about the creature to the section
 *
 * @param doc current jsPDF
 * @param creature creature
 * @param pageWidth width of the page
 * @param sectionHeight calculated height of the section
 * @param currentHeight current height for the section
 */
export function addCreatureInformation(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  currentHeight: number,
): number {
  if (creature.challenge_type == "elite") {
    creature = getEliteCreature(creature);
  }

  if (creature.challenge_type == "weak") {
    creature = getWeakCreature(creature);
  }

  currentHeight = addEntry(doc, "Name: ", creature.name, currentHeight);

  currentHeight = addBasicStats(doc, creature, currentHeight);

  currentHeight = addSaves(doc, creature, currentHeight);

  currentHeight = addAttributes(doc, creature, currentHeight);

  currentHeight = addDefenses(doc, creature, currentHeight);

  currentHeight = addReactions(doc, creature, pageWidth, currentHeight);

  currentHeight = addAttacks(doc, creature, pageWidth, currentHeight);

  currentHeight = addUniqueAbilities(doc, creature, pageWidth, currentHeight);

  currentHeight = addSpells(doc, creature, pageWidth, currentHeight);

  return currentHeight;
}
