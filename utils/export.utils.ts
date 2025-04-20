import type jsPDF from "jspdf";
import {
  leftIndent,
  lineHeight,
  rightIdent,
  sectionsPerPage,
} from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";

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

    // Draw line at bottom of section
    doc.line(0, y + sectionHeight, pageWidth, y + sectionHeight);

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
) {
  // Name
  addPdfEntry(
    doc,
    "Name: ",
    creature.name,
    leftIndent,
    (currentHeight += lineHeight),
  );

  // HP, AC and Speed
  addPdfEntry(
    doc,
    "HP: ",
    creature.hp,
    leftIndent,
    (currentHeight += lineHeight),
  );
  addPdfEntry(doc, "AC: ", creature.hp, leftIndent + 20, currentHeight);
  addPdfEntry(
    doc,
    "Speed: ",
    creature.speed_raw,
    leftIndent + 40,
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

  // Resistances
  addPdfEntry(
    doc,
    "Resistances: ",
    `${creature.resistance_raw ?? "None"}`,
    leftIndent,
    (currentHeight += lineHeight),
  );

  // Weaknesses
  addPdfEntry(
    doc,
    "Weaknesses: ",
    `${creature.weakness_raw ?? "None"}`,
    leftIndent,
    (currentHeight += lineHeight),
  );

  // Attacks
  doc.setFont("helvetica", "bold");
  doc.text("Attacks:", leftIndent, (currentHeight += lineHeight));
  doc.setFont("helvetica", "normal");
  for (let i = 0; i < creature.attacks.length; i++) {
    const attackLines = doc.splitTextToSize(
      creature.attacks[i],
      pageWidth - rightIdent,
    );
    for (const line of attackLines) {
      doc.text(line, leftIndent, (currentHeight += lineHeight));
    }
  }

  // Spells
  doc.setFont("helvetica", "bold");
  doc.text(`Spells:\n`, leftIndent, (currentHeight += lineHeight));
  doc.setFont("helvetica", "normal");

  doc.text(
    `${creature.spell ?? "None"}`,
    leftIndent,
    (currentHeight += lineHeight),
  );
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
  value: string | string[] | number,
  xCoordinate: number,
  yCoordinate: number,
  maxWidth?: number,
) {
  const nameLength = doc.getTextWidth(name);

  doc.setFont("helvetica", "bold");
  doc.text(name, xCoordinate, yCoordinate);
  doc.setFont("helvetica", "normal");

  doc.text(`${value}`, xCoordinate + nameLength + 2, yCoordinate, {
    maxWidth: maxWidth ?? 0,
  });
}

/**
 * Exports creatures of the encounter to a JSON file
 *
 * @param creatures is an Array of {@link Creature} objects
 */
export function exportJSON(creatures: Creature[]): void {
  // Convert creatures array into a JSON string
  const json = JSON.stringify(creatures, null, 2); // Pretty format with 2 spaces indentation

  // Create a Blob object from the JSON string
  const blob = new Blob([json], { type: "application/json" });

  // Create an anchor element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Set the download filename
  link.download = "pathfighter-encounter.json";

  // Trigger a click event on the link to start the download
  link.click();
}
