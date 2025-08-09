import type jsPDF from "jspdf";
import {
  lineHeight,
  bulletPoint,
  rightIdent,
  leftIndent,
  lineBreak,
} from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { setSectionHeader } from "../utils/export.utils";

/**
 *  Adds attacks of the creature to the PDF
 *
 *  Bullet points for each attack
 *
 * @param doc
 * @param creature
 * @param pageWidth
 * @param currentHeight
 * @returns
 */
export function addAttacks(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  currentHeight: number,
): number {
  if (!creature.attacks?.length) {
    return currentHeight;
  }

  setSectionHeader(doc, "Attacks", (currentHeight += lineHeight));

  for (let i = 0; i < creature.attacks.length; i++) {
    const attackLines = doc.splitTextToSize(
      `${bulletPoint} ${creature.attacks[i]}`,
      pageWidth - rightIdent,
    );
    for (const line of attackLines) {
      doc.text(line, leftIndent, (currentHeight += lineHeight));
      currentHeight += lineBreak;
    }
  }
  return currentHeight;
}
