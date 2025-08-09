import type jsPDF from "jspdf";
import { leftIndent } from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { addEntry, addPdfEntry } from "../utils/export.utils";

export function addSaves(
  doc: jsPDF,
  creature: Creature,
  currentHeight: number,
): number {
  currentHeight = addEntry(
    doc,
    "Fortitude: ",
    creature.fortitude_save,
    currentHeight,
  );

  addPdfEntry(
    doc,
    "Reflex: ",
    creature.reflex_save,
    leftIndent + 30,
    currentHeight,
  );

  addPdfEntry(
    doc,
    "Will: ",
    creature.will_save,
    leftIndent + 60,
    currentHeight,
  );

  addPdfEntry(
    doc,
    "Perception: ",
    creature.perception,
    leftIndent + 90,
    currentHeight,
  );
  return currentHeight;
}
