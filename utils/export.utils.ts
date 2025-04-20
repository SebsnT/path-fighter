import type jsPDF from "jspdf";
import { sectionsPerPage } from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";

export async function exportPDF(creatures: Creature[]) {
  const { jsPDF } = await import("jspdf"); // dynamic import

  const doc = new jsPDF();

  // width and height of the document (a4)
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // height of each creature section
  const sectionHeight = pageHeight / sectionsPerPage;

  doc.setLineDashPattern([1, 2], 0); // Dotted lines

  creatures.forEach((creature, index) => {
    const sectionIndexOnPage = index % sectionsPerPage;
    const y = sectionHeight * sectionIndexOnPage;

    // Add information about the creature to its section
    addCreatureInformationPDF(doc, creature, pageWidth, sectionHeight, y);

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

  doc.save("path-fighter-encounter.pdf");
}

/**
 * Adds all information about the creature to the section
 *
 * @param doc current jsPDF
 * @param creature
 * @param pageWidth
 * @param sectionHeight
 * @param currentHeight
 */
function addCreatureInformationPDF(
  doc: jsPDF,
  creature: Creature,
  pageWidth: number,
  sectionHeight: number,
  currentHeight: number,
) {
  doc.text(creature.name, pageWidth / 2, currentHeight + sectionHeight / 2, {
    align: "center",
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
