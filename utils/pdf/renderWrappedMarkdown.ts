import type jsPDF from "jspdf";
import type { TextSegment } from "~/models/textSegment";
import { getTextSegmentsHeight as getTextSegmentsHeight } from "./utils/markdown.utils";
import { addNewPageIfOverflow } from "./utils/export.utils";
import { lineHeight } from "~/constants/pdf.constants";

export function renderWrappedMarkdown(
  doc: jsPDF,
  text: string,
  startX: number,
  startY: number,
  maxWidth: number,
  allowOverflow: boolean = false,
): number {
  const words = segmentToWords(parseMarkdown(text));

  const blockHeight = getTextSegmentsHeight(doc, words, maxWidth);

  let currentWidth = startX;
  let currentHeight = startY;

  if (allowOverflow) {
    currentHeight = addNewPageIfOverflow(doc, blockHeight, currentHeight);
  }

  for (const { text: word, style } of words) {
    doc.setFont("helvetica", style === "bold" ? "bold" : "normal");

    const wordWidth =
      (doc.getStringUnitWidth(word) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    if (currentWidth + wordWidth > startX + maxWidth) {
      currentWidth = startX;
      currentHeight += lineHeight;
    }

    doc.text(word, currentWidth, currentHeight);
    currentWidth += wordWidth;
  }

  return currentHeight;
}

function segmentToWords(segments: TextSegment[]): TextSegment[] {
  return segments.flatMap(({ text, style }) =>
    text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word) => ({ text: word, style })),
  );
}

function parseMarkdown(text: string): TextSegment[] {
  const regex = /\*\*(.+?)\*\*/g;
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        style: "normal",
      });
    }

    segments.push({ text: match[1], style: "bold" });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), style: "normal" });
  }

  return segments;
}
