import type jsPDF from "jspdf";
import {
  leftIndent,
  rightIdent,
  bulletPoint,
  lineHeight,
  lineBreak,
} from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import {
  addEntry,
  addOptionalEntry,
  addPdfEntry,
  setSectionHeader,
} from "./export.utils";
import { renderWrappedMarkdown } from "./renderWrappedMarkdown";

export function addAttributes(
  doc: jsPDF,
  creature: Creature,
  currentHeight: number,
): number {
  const attributes = `Strength ${creature.strength}, Dexterity ${creature.dexterity}, Constitution ${creature.constitution}, Intelligence ${creature.intelligence}, Wisdom ${creature.wisdom}, Charisma ${creature.charisma}`;
  currentHeight = addEntry(doc, "Attributes: ", attributes, currentHeight);

  return currentHeight;
}

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
