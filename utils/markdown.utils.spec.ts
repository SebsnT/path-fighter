import { describe, expect, it } from "vitest";
import {
  hasOneMarkdownEntry,
  hasMutipleMarkdownEntries,
  parseOneMarkdownLink,
  parseOneMarkdownStringAsSelectionOption,
  parseMultipleMarkdownStrings,
  safeMarkdownToHtml,
} from "./markdown.utils";

describe("Markdown Utils", () => {
  describe("hasOneMarkdownEntry", () => {
    it("should return false for non markdownEntry", () => {
      const testString = "Test 123";
      expect(hasOneMarkdownEntry(testString)).toBe(false);
    });

    it("should return true for a markdownEntry", () => {
      const testString = "lorem ipsum [Test](/Traits.aspx?ID=1) lorem ipsum";
      expect(hasOneMarkdownEntry(testString)).toStrictEqual(true);
    });
  });

  describe("hasMutipleMarkdownEntries", () => {
    it("should return false for non if it contains no markdown entries", () => {
      const testString = "Test 123";
      expect(hasMutipleMarkdownEntries(testString)).toStrictEqual(false);
    });

    it("should return false for non if it contains one markdown entries", () => {
      const testString = "[Test](/Traits.aspx?ID=1)";
      expect(hasMutipleMarkdownEntries(testString)).toStrictEqual(false);
    });

    it("should return false for non if it contains two markdown entries", () => {
      const testString =
        "[Test1](/Traits.aspx?ID=1), [Test2](/Traits.aspx?ID=2)";
      expect(hasMutipleMarkdownEntries(testString)).toStrictEqual(true);
    });
  });

  describe("parseOneMarkdownLink", () => {
    it("should return '-' if no valid markdown link is provided ", () => {
      expect(parseOneMarkdownLink("Test 123")).toStrictEqual({ label: "-" });
    });

    it("should correctly parse markdown link to label and link", () => {
      expect(parseOneMarkdownLink("[Test](/Traits.aspx?ID=1)")).toStrictEqual({
        label: "Test",
        link: "/Traits.aspx?ID=1",
      });
    });
  });

  describe("parseOneMarkdownStringAsSelectionOption", () => {
    it("should return '-' and empty string if no valid markdown link is provided ", () => {
      expect(parseOneMarkdownStringAsSelectionOption("Test 123")).toStrictEqual(
        {
          label: "-",
          value: "",
        },
      );
    });
    it("should correctly parse markdown strings to selection option", () => {
      expect(
        parseOneMarkdownStringAsSelectionOption("[Test](/Traits.aspx?ID=1)"),
      ).toStrictEqual({
        label: "Test",
        value: "Test",
      });
    });
  });

  describe("parseMultipleMarkdownStrings", () => {
    it("should return '-' when no valid string is provided", () => {
      expect(parseMultipleMarkdownStrings("Test 123")).toStrictEqual([
        { label: "-" },
      ]);
    });

    it("should parse multiple markdown strings correctly", () => {
      expect(
        parseMultipleMarkdownStrings(
          "[Test1](/Traits.aspx?ID=1), [Test2](/Traits.aspx?ID=2)",
        ),
      ).toStrictEqual([
        {
          label: "Test1",
          link: "/Traits.aspx?ID=1",
        },
        {
          label: "Test2",
          link: "/Traits.aspx?ID=2",
        },
      ]);
    });
    it("should return an array with one invalid markdown link object when input is invalid", () => {
      const result = parseMultipleMarkdownStrings("invalid string");
      expect(result).toHaveLength(1);
      expect(result[0].label).toBe("-");
      expect(result[0].link).toBeUndefined();
    });
  });

  describe("safeMarkdownToHtml", () => {
    it("should convert markdown to sanitized HTML with only allowed tags", async () => {
      const markdown = "**Bold** [Link](https://example.com)";

      const result = await safeMarkdownToHtml(markdown);

      // It should keep <strong> but sanitize <script> and remove <a> (not allowed)
      expect(result).toContain("<strong>Bold</strong>");
      expect(result).not.toContain("<a href=");
    });

    it("should return empty string if empty input is given", async () => {
      const result = await safeMarkdownToHtml("");
      expect(result).toBe("");
    });
  });
});
