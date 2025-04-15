import type { MardownLink } from "~/models/markdownLink";
import type { SelectionOption } from "~/models/selectionOptions";

export class TableUtils {
  /**
   *
   * @param markdown
   * @returns
   */
  static parseOneMarkdownLink(markdown: string): MardownLink {
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

  /**
   * Parses one markdown link as {@link SelectionOption}
   *
   * @param markdown
   * @returns
   */
  static parseOneMarkdownStringAsSelectionOption(
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
  static parseMultipleMarkdownStrings(markdown: string): MardownLink[] {
    const links = markdown
      .split(",")
      .map((link) => this.parseOneMarkdownLink(link.trim()))
      .filter(Boolean);
    return links as { label: string; link: string }[];
  }
}
