import type { MardownLink, SelectionOption } from "~/models/column";

export function parseOneMarkdown(markdown: string): MardownLink {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/; // Matches [Label](Link)
  const match = regex.exec(markdown);
  if (match) {
    return {
      label: match[1],
      link: match[2],
    };
  }
  return { label: "-" };
}

export function parseOneMarkdownAsSelectionOption(
  markdown: string,
): SelectionOption {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/; // Matches [Label](Link)
  const match = regex.exec(markdown);
  if (match) {
    return {
      label: match[1],
      value: match[1],
    };
  }
  return { label: "-", value: "" };
}

/**
 *Function to handle multiple markdown links separated by commas
 *
 * @param markdown
 * @returns
 */
export function parseMultipleMarkdown(markdown: string): MardownLink[] {
  const links = markdown
    .split(",")
    .map((link) => parseOneMarkdown(link.trim()))
    .filter(Boolean);
  return links as { label: string; link: string }[];
}

export function parseMultipleMarkdownAsSelection(
  markdown: string,
): SelectionOption[] {
  const selections = markdown
    .split(",")
    .map((value) => parseOneMarkdownAsSelectionOption(value.trim()))
    .filter(Boolean);
  return selections;
}
