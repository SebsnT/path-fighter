import type { MardownLink } from "~/models/markdownLink";
import type { SelectionOption } from "~/models/selectionOptions";

/**
 *
 *
 * @param markdown
 * @returns
 */
export function hasOneMarkdownEntry(markdown: string): boolean {
  // Matches [Label](Link)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/;
  return regex.exec(markdown) ? true : false;
}

export function hasMutipleMarkdownEntries(markdown: string): boolean {
  // Matches [Label](Link)
  const regex = /^(?:\[[^\]]+\]\([^)]+\),\s*)+\[[^\]]+\]\([^)]+\)$/;
  return regex.exec(markdown) ? true : false;
}

/**
 *
 * @param markdown
 * @returns
 */
export function parseOneMarkdownLink(markdown: string): MardownLink {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/; // Matches [Label](Link)
  const match = regex.exec(markdown);
  if (match) {
    return {
      label: match[1],
      link: match[2],
    };
  } else {
    return { label: "-" };
  }
}

/**
 * Parses one markdown link as {@link SelectionOption}
 *
 * @param markdown
 * @returns
 */
export function parseOneMarkdownStringAsSelectionOption(
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
 * Parses multiple strings seperated by comma to a {@link MardownLink} array
 *
 * @param markdown string that contains
 * @returns
 */
export function parseMultipleMarkdownStrings(markdown: string): MardownLink[] {
  const links = markdown
    .split(",")
    .map((link) => parseOneMarkdownLink(link.trim()))
    .filter(Boolean);
  return links as { label: string; link: string }[];
}
