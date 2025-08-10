import type jsPDF from "jspdf";
import type { Creature } from "~/models/creature";
import { addEntry } from "../utils/export.utils";

/**
 * Adds attributes of the creature to the PDF
 *
 * Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma
 *
 * @param doc
 * @param creature
 * @param currentHeight
 * @returns
 */
export function addAttributes(
  doc: jsPDF,
  creature: Creature,
  currentHeight: number,
): number {
  const attributes = `Strength ${creature.strength}, Dexterity ${creature.dexterity}, Constitution ${creature.constitution}, Intelligence ${creature.intelligence}, Wisdom ${creature.wisdom}, Charisma ${creature.charisma}`;
  currentHeight = addEntry(doc, "Attributes: ", attributes, currentHeight);

  return currentHeight;
}
