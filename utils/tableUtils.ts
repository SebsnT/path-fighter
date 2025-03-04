import type { SelectionOption } from "~/models/column";

export function parseOneMarkdown(markdown: string): {
  label: string;
  link?: string;
} {
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
      value: match[0],
    };
  }
  return { label: "-", value: "" };
}

/**
 * Function to handle multiple markdown links separated by commas
 */
export function parseMultipleMarkdown(
  markdown: string,
): { label: string; link: string }[] {
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
