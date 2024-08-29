import { baseUrl } from "../composables/loadData";
import type { Column } from "../config/columnConfig";
import type { Creature } from "../types/creature";

// Function to convert markdown-like links to HTML anchor tags
export function convertMarkdownToLinks(
  markdown: string,
  baseUrl: string,
): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `${text} <a href="${baseUrl}${url}" target="_blank"> #</a>`;
  });
}

export function processArray(
  item: { [x: string]: string[] },
  key: keyof Creature,
  column: Column,
) {
  return item[key]
    .map((element: string) => {
      if (column.containsMarkdown) {
        return convertMarkdownToLinks(element, baseUrl);
      }
      return element;
    })
    .join(", ");
}
