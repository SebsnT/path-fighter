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
 * Adds reactions of the creature to the PDF
 *
 * Bullet points for each reaction
 *
 * @param doc
 * @param creature
 * @param pageWidth
 * @param currentHeight
 * @returns
 */
export function addReactions(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  currentHeight: number,
): number {
  if (!creature.reactions?.length) {
    return currentHeight;
  }

  setSectionHeader(doc, "Reactions", (currentHeight += lineHeight));
  for (let i = 0; i < creature.reactions.length; i++) {
    const ability = creature.reactions[i];
    const combinedText = [
      bulletPoint,
      ability.name,
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
