import type jsPDF from "jspdf";
import { lineHeight, leftIndent, rightIdent } from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { setSectionHeader, addPdfEntry } from "../export.utils";

/**
 * Adds spells of the creature to the PDF
 *
 * Spell attack, Spell DC, and a list of spells
 *
 * @param doc
 * @param creature
 * @param pageWidth
 * @param currentHeight
 * @returns
 */
export function addSpells(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  currentHeight: number,
): number {
  if (!creature.spell?.length) {
    return currentHeight;
  }

  setSectionHeader(doc, "Spells", (currentHeight += lineHeight));
  if (creature.spell_attack_bonus) {
    // Spell Attack
    addPdfEntry(
      doc,
      "Spell Attack: ",
      creature.spell_attack_bonus[0],
      leftIndent + 40,
      currentHeight,
    );
  }

  if (creature.spell_dc) {
    // Spell DC
    addPdfEntry(
      doc,
      "Spell DC: ",
      creature.spell_dc,
      creature.spell_attack_bonus ? leftIndent + 100 : leftIndent + 40,
      currentHeight,
    );
  }

  const spellsText = creature.spell?.length
    ? creature.spell.join(", ")
    : "None";

  const spellsLines = doc.splitTextToSize(spellsText, pageWidth - rightIdent);

  for (const line of spellsLines) {
    doc.text(line, leftIndent, (currentHeight += lineHeight));
  }

  return currentHeight;
}
