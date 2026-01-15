import type jsPDF from "jspdf";
import {
  lineHeight,
  bulletPoint,
  leftIndent,
  rightIdent,
  lineBreak,
} from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { addNewPageIfOverflow, setSectionHeader } from "../utils/export.utils";
import { renderWrappedMarkdown } from "../renderWrappedMarkdown";

/**
 * Adds unique abilities of the creature to the PDF
 *
 * Bullet points for each unique ability
 *
 * @param doc
 * @param creature
 * @param pageWidth
 * @param currentHeight
 * @returns
 */
export function addUniqueAbilities(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  currentHeight: number,
  allowOverflow: boolean = false,
): number {
  if (!creature.unique_abilities?.length) {
    return currentHeight;
  }

  if (allowOverflow) {
    currentHeight = addNewPageIfOverflow(doc, lineHeight, currentHeight);
  }

  setSectionHeader(doc, "Unique Abilities", (currentHeight += lineHeight));

  for (let i = 0; i < creature.unique_abilities.length; i++) {
    const ability = creature.unique_abilities[i];
    const combinedText = [
      bulletPoint,
      ability.name,
      ability.action ? `(${ability.action})` : "",
      ability.description ? `— ${ability.description}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    currentHeight += lineHeight;

    currentHeight = renderWrappedMarkdown(
      doc,
      combinedText,
      leftIndent,
      currentHeight,
      pageWidth - rightIdent,
      allowOverflow,
    );
    currentHeight += lineBreak;
  }
  return currentHeight;
}
