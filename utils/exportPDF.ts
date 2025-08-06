import { sectionsPerPage } from "~/constants/pdf.constants";
import type { Creature } from "~/models/creature";
import { addCreatureInformation } from "./addCreatureInformation";

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
    addCreatureInformation(doc, creature, pageWidth, y);

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
