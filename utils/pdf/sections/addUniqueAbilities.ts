import type jsPDF from "jspdf";
import {
  lineHeight,
  bulletPoint,
  leftIndent,
  rightIdent,
  lineBreak,
} from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { setSectionHeader } from "../export.utils";
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
): number {
  if (!creature.unique_abilities?.length) {
    return currentHeight;
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
      lineHeight,
    );
    currentHeight += lineBreak;
  }
  return currentHeight;
}
