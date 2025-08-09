import type jsPDF from "jspdf";
import type { Creature } from "~/models/creature";
import { addOptionalEntry } from "../utils/export.utils";

/**
 * Adds defenses of the creature to the PDF
 *
 * Resistances, Weaknesses, Immunities
 *
 * @param doc
 * @param creature
 * @param currentHeight
 * @returns
 */
export function addDefenses(
  doc: jsPDF,
  creature: Creature,
  currentHeight: number,
): number {
  // Resistances
  currentHeight = addOptionalEntry(
    doc,
    "Resistances: ",
    creature.resistance_raw,
    currentHeight,
  );

  // Weaknesses
  currentHeight = addOptionalEntry(
    doc,
    "Weaknesses: ",
    creature.weakness_raw,
    currentHeight,
  );

  // Immunities
  currentHeight = addOptionalEntry(
    doc,
    "Immunities: ",
    creature.immunity,
    currentHeight,
  );

  return currentHeight;
}
