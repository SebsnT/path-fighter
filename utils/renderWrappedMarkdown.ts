import type jsPDF from "jspdf";
import type { TextSegment } from "~/models/textSegment";

export function renderWrappedMarkdown(
  doc: jsPDF,
  text: string,
  startX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = segmentToWords(parseMarkdown(text));

  let x = startX;
  let y = startY;

  for (const { text: word, style } of words) {
    doc.setFont("helvetica", style === "bold" ? "bold" : "normal");

    const wordWidth =
      (doc.getStringUnitWidth(word) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    if (x + wordWidth > startX + maxWidth) {
      x = startX;
      y += lineHeight;
    }

    doc.text(word, x, y);
    x += wordWidth;
  }

  return y;
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
