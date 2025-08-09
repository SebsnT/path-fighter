import type jsPDF from "jspdf";
import { leftIndent } from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { addEntry, addPdfEntry } from "../export.utils";

export function addBasicStats(
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
