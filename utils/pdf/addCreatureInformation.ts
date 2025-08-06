import type jsPDF from "jspdf";
import type { Creature } from "~/models/creature";
import { leftIndent } from "~/constants/pdf.constants";
import { addEntry, addPdfEntry } from "./export.utils";
import {
  addSaves,
  addAttributes,
  addDefenses,
  addReactions,
  addAttacks,
  addUniqueAbilities,
  addSpells,
} from "./creaturePdfSections";

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
): void {
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

  addSpells(doc, creature, pageWidth, currentHeight);
}

function addBasicStats(
  doc: jsPDF,
  creature: Creature,
  currentHeight: number,
): number {
  // HP
  currentHeight = addEntry(doc, "HP: ", creature.hp, currentHeight);

  // AC
  addPdfEntry(doc, "AC: ", creature.ac, leftIndent + 20, currentHeight);
  if (creature.hardness) {
    addPdfEntry(
      doc,
      "Hardness: ",
      creature.hardness,
      leftIndent + 40,
      currentHeight,
    );
    addPdfEntry(
      doc,
      "Size: ",
      creature.size[0],
      leftIndent + 80,
      currentHeight,
    );
    addPdfEntry(
      doc,
      "Speed: ",
      creature.speed_raw,
      leftIndent + 110,
      currentHeight,
    );
  } else {
    addPdfEntry(
      doc,
      "Size: ",
      creature.size[0],
      leftIndent + 40,
      currentHeight,
    );
    addPdfEntry(
      doc,
      "Speed: ",
      creature.speed_raw,
      leftIndent + 80,
      currentHeight,
    );
  }

  return currentHeight;
}
