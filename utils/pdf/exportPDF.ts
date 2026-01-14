import type { Creature } from "~/models/creature";
import { addCreatureInformation } from "./addCreatureInformation";
import { dividerSpace } from "~/constants/pdf.constants";

/**
 * Export given creatures to a pdf
 *
 * @param creatures creatures to be exported to the PDF
 */
export async function exportPDF(creatures: Creature[], fileName: string) {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setLineDashPattern([1, 2], 0);
  doc.setFontSize(12);

  let currentY = 0;

  let allowOverflow = false;

  for (let i = 0; i < creatures.length; i++) {
    const creature = creatures[i];

    // Simulate height at actual currentY
    const tempDoc = new jsPDF();
    tempDoc.setFontSize(12);
    const { currentHeight: simulatedEndY, entryHeight } =
      addCreatureInformation(tempDoc, creature, pageWidth, currentY);

    if (entryHeight > pageHeight && currentY !== 0) {
      allowOverflow = true;

      doc.addPage();
      currentY = 0;
    }

    if (entryHeight > pageHeight && currentY == 0) {
      allowOverflow = true;
    }

    // If it would overflow the page, start a new page
    if (simulatedEndY > pageHeight && currentY !== 0) {
      doc.addPage();
      doc.setLineDashPattern([1, 2], 0);
      currentY = 0;
    }

    // add the creature
    const { currentHeight: usedHeight } = addCreatureInformation(
      doc,
      creature,
      pageWidth,
      currentY,
      allowOverflow,
    );

    // Divider (if not last)
    if (i !== creatures.length - 1) {
      doc.line(
        0,
        currentY + usedHeight + dividerSpace,
        pageWidth,
        currentY + usedHeight + dividerSpace,
      );
      currentY += dividerSpace;
    }

    currentY += usedHeight;
  }

  doc.save(`${fileName}.pdf`);
}
