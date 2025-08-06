import type jsPDF from "jspdf";
import { leftIndent, lineHeight, spaceIndent } from "~/constants/pdf.constants";

export function setSectionHeader(doc: jsPDF, title: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.text(`${title}:`, leftIndent, y);
  doc.setFont("helvetica", "normal");
}

export function addEntry(
  doc: jsPDF,
  label: string,
  value: string | string[] | number | number[],
  currentHeight: number,
  x: number = leftIndent,
): number {
  addPdfEntry(doc, label, value, x, (currentHeight += lineHeight));
  return currentHeight;
}

export function addPdfEntry(
  doc: jsPDF,
  name: string,
  value: string | string[] | number | number[],
  x: number,
  y: number,
  maxWidth?: number,
): void {
  const nameWidth = doc.getTextWidth(name);
  doc.setFont("helvetica", "bold");
  doc.text(name, x, y);
  doc.setFont("helvetica", "normal");
  doc.text(`${value}`, x + nameWidth + spaceIndent, y, {
    maxWidth: maxWidth ?? 0,
  });
}

export function addOptionalEntry(
  doc: jsPDF,
  label: string,
  value: string | string[] | number | number[] | undefined,
  currentHeight: number,
): number {
  if (!value) return currentHeight;
  return addEntry(doc, label, value, currentHeight);
}
