import type jsPDF from "jspdf";
import { lineHeight } from "~/constants/pdf.constants";
import type { TextSegment } from "~/models/textSegment";

export function segmentToWords(segments: TextSegment[]): TextSegment[] {
  return segments.flatMap(({ text, style }) =>
    text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word) => ({ text: word, style })),
  );
}

export function parseMarkdown(text: string): TextSegment[] {
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

/**
 * Calculates the total height of text segments for jsPDF
 */
export function getTextSegmentsHeight(
  doc: jsPDF,
  segments: TextSegment[],
  maxWidth: number,
): number {
  const fullText = segments.map((segment) => segment.text).join("");

  const lines = doc.splitTextToSize(fullText, maxWidth);

  return lines.length * lineHeight;
}
