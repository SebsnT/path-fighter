import type jsPDF from "jspdf";
import {
  bulletPoint,
  lineBreak,
  leftIndent,
  lineHeight,
  rightIdent,
  sectionsPerPage,
  spaceIndent,
} from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { getEliteCreature, getWeakCreature } from "./challengeType.utils";

/**
 * Export given creatures to a pdf
 *
 * @param creatures creatures to be exported to the PDF
 */
export async function exportPDF(creatures: Creature[], fileName: string) {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF();

  // width and height of the document (a4)
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // height of each creature section
  const sectionHeight = pageHeight / sectionsPerPage;

  // Set line pattern to dotted
  doc.setLineDashPattern([1, 2], 0);

  // Font size
  doc.setFontSize(12);

  creatures.forEach((creature, index) => {
    const sectionIndexOnPage = index % sectionsPerPage;
    const y = sectionHeight * sectionIndexOnPage;

    // Add information about the creature to its section
    addCreatureInformationPDF(doc, creature, pageWidth, y);

    if (sectionIndexOnPage !== sectionsPerPage - 1) {
      // Draw line at bottom of section
      doc.line(0, y + sectionHeight, pageWidth, y + sectionHeight);
    }

    // After last section on page, add a new page (except after last creature)
    if (
      sectionIndexOnPage === sectionsPerPage - 1 &&
      index !== creatures.length - 1
    ) {
      doc.addPage();

      // Re-apply dotted lines after new page
      doc.setLineDashPattern([1, 2], 0);
    }
  });

  doc.save(`${fileName}.pdf`);
}

/**
 * Adds all information about the creature to the section
 *
 * @param doc current jsPDF
 * @param creature creature
 * @param pageWidth width of the page
 * @param sectionHeight calculated height of the section
 * @param currentHeight current height for the section
 */
function addCreatureInformationPDF(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  currentHeight: number,
): void {
  if (creature.challenge_type == "elite") {
    creature = getEliteCreature(creature);
  }

  if (creature.challenge_type == "weak") {
    creature = getWeakCreature(creature);
  }

  // Name
  addPdfEntry(
    doc,
    "Name: ",
    creature.name,
    leftIndent,
    (currentHeight += lineHeight),
  );

  // HP, AC, Size and Speed
  addPdfEntry(
    doc,
    "HP: ",
    creature.hp,
    leftIndent,
    (currentHeight += lineHeight),
  );

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

  // Fort , Ref, Will, Perception
  addPdfEntry(
    doc,
    "Fortitude: ",
    creature.fortitude_save,
    leftIndent,
    (currentHeight += lineHeight),
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

  // Attributes
  addPdfEntry(
    doc,
    "Attributes: ",
    `Strength ${creature.strength}, Dexterity ${creature.dexterity}, Constitution ${creature.constitution}, Intelligence ${creature.intelligence}, Wisdom ${creature.wisdom}, Charisma ${creature.charisma}`,
    leftIndent,
    (currentHeight += lineHeight),
  );

  if (creature.resistance_raw) {
    // Resistances
    addPdfEntry(
      doc,
      "Resistances: ",
      `${creature.resistance_raw}`,
      leftIndent,
      (currentHeight += lineHeight),
    );
  }

  if (creature.weakness_raw) {
    // Weaknesses
    addPdfEntry(
      doc,
      "Weaknesses: ",
      `${creature.weakness_raw}`,
      leftIndent,
      (currentHeight += lineHeight),
    );
  }

  if (creature.immunity) {
    // Immunities
    addPdfEntry(
      doc,
      "Immunities: ",
      `${creature.immunity}`,
      leftIndent,
      (currentHeight += lineHeight),
    );
  }

  if (creature.reactions?.length) {
    // Reactions
    doc.setFont("helvetica", "bold");
    doc.text("Reactions:", leftIndent, (currentHeight += lineHeight));
    doc.setFont("helvetica", "normal");
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
  }

  if (creature.attacks?.length) {
    // Attacks
    doc.setFont("helvetica", "bold");
    doc.text("Attacks:", leftIndent, (currentHeight += lineHeight));
    doc.setFont("helvetica", "normal");
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
  }

  if (creature.unique_abilities?.length) {
    // Unique abilities
    doc.setFont("helvetica", "bold");
    doc.text("Unique Abilities:", leftIndent, (currentHeight += lineHeight));
    doc.setFont("helvetica", "normal");
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
  }

  if (creature.spell?.length) {
    // Spells
    doc.setFont("helvetica", "bold");
    doc.text("Spells:", leftIndent, (currentHeight += lineHeight));
    doc.setFont("helvetica", "normal");
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
  }
}

/**
 * Adds entry to pdf with {@link name} in bold font weight and {@link value} in normal font weight
 *
 * @param doc the {@link jsPDF}
 * @param name the name of the field
 * @param value the value of the field
 * @param xCoordinate the starting x coordinate of the entry
 * @param yCoordinate the starting y coordinate of the entry
 */
function addPdfEntry(
  doc: jsPDF,
  name: string,
  value: string | string[] | number | number[],
  xCoordinate: number,
  yCoordinate: number,
  maxWidth?: number,
) {
  const nameLength = doc.getTextWidth(name);

  doc.setFont("helvetica", "bold");
  doc.text(name, xCoordinate, yCoordinate);
  doc.setFont("helvetica", "normal");

  doc.text(`${value}`, xCoordinate + nameLength + spaceIndent, yCoordinate, {
    maxWidth: maxWidth ?? 0,
  });
}

function renderWrappedMarkdown(
  doc: jsPDF,
  text: string,
  x: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
) {
  const regex = /(\*\*(.+?)\*\*)/g;

  // Parse text into styled segments
  const rawSegments = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      rawSegments.push({
        text: text.slice(lastIndex, match.index),
        style: "normal",
      });
    }

    if (match[0].startsWith("**")) {
      rawSegments.push({ text: match[2], style: "bold" });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    rawSegments.push({ text: text.slice(lastIndex), style: "normal" });
  }

  // Split segments into words with style info
  const words = [];
  for (const seg of rawSegments) {
    const wordList = seg.text.split(/(\s+)/); // include spaces
    for (const word of wordList) {
      if (word) {
        words.push({ text: word, style: seg.style });
      }
    }
  }

  // Layout words manually
  let currentX = x;
  let currentY = startY;

  for (const word of words) {
    doc.setFont("helvetica", word.style === "bold" ? "bold" : "normal");

    const wordWidth =
      (doc.getStringUnitWidth(word.text) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    // If word would overflow, wrap to next line
    if (currentX + wordWidth > x + maxWidth) {
      currentX = x;
      currentY += lineHeight;
    }

    // Draw word
    doc.text(word.text, currentX, currentY);

    currentX += wordWidth;
  }

  return currentY; // Return final Y position if needed
}
