import { vi, expect, describe, it } from "vitest";
import { exportJSON, exportPDF } from "./export.utils";
import type { Creature } from "~/models/creature";
import type jsPDF from "jspdf";

// Mocking browser APIs
global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");
global.document.createElement = vi.fn();

describe("Export Utils", () => {
  const clickSpy = vi.fn();
  const linkMock = {
    href: "",
    download: "",
    click: clickSpy,
  } as unknown as HTMLAnchorElement;

  const createElementSpy = vi
    .spyOn(document, "createElement")
    .mockReturnValue(linkMock);

  const creatures: Creature[] = [
    { name: "Gnoll", level: 3, attacks: ["attack1", "attack2"] } as Creature,
    { name: "Goblin", level: 1, attacks: ["attack3", "attack4"] } as Creature,
  ]; // Example creature objects

  describe("exportJSON", () => {
    it("should export correctly with default filename", () => {
      exportJSON(creatures);

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("pathfighter-encounter.json");
      expect(clickSpy).toHaveBeenCalled();
    });

    it("should export correctly with changed filename", () => {
      exportJSON(creatures, "test-file-name");

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("test-file-name.json");
      expect(clickSpy).toHaveBeenCalled();
    });

    it("should export correctly with empty filename", () => {
      exportJSON(creatures, "");

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("pathfighter-encounter.json");
      expect(clickSpy).toHaveBeenCalled();
    });

    it("should export correctly when no filename is provided", () => {
      exportJSON(creatures);

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("pathfighter-encounter.json");
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe("exportPDF", () => {
    it("should export to PDF correctly", async () => {
      const saveSpy = vi.fn();

      const docMock = {
        internal: {
          pageSize: {
            getWidth: vi.fn().mockReturnValue(210),
            getHeight: vi.fn().mockReturnValue(297),
          },
        },
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setLineDashPattern: vi.fn(),
        line: vi.fn(),
        addPage: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn().mockReturnValue(["Attack 1", "Attack 2"]),
        save: saveSpy,
        getTextWidth: vi.fn().mockReturnValue(30),
      } as unknown as jsPDF;

      vi.spyOn(await import("jspdf"), "jsPDF").mockReturnValue(docMock);

      await exportPDF(creatures, "creature-report");

      expect(docMock.setFont).toHaveBeenCalled();
      expect(docMock.setFontSize).toHaveBeenCalled();
      expect(docMock.setLineDashPattern).toHaveBeenCalledWith([1, 2], 0);
      expect(docMock.text).toHaveBeenCalled();
      expect(docMock.save).toHaveBeenCalledWith("creature-report.pdf");
    });

    it("should handle empty creatures list", async () => {
      const saveSpy = vi.fn();
      const docMock = {
        internal: {
          pageSize: {
            getWidth: vi.fn().mockReturnValue(210),
            getHeight: vi.fn().mockReturnValue(297),
          },
        },
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setLineDashPattern: vi.fn(),
        line: vi.fn(),
        addPage: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn(),
        save: saveSpy,
        getTextWidth: vi.fn().mockReturnValue(30),
      } as unknown as jsPDF;

      vi.spyOn(await import("jspdf"), "jsPDF").mockReturnValue(docMock);

      await exportPDF([], "empty-creature-report");

      expect(docMock.save).toHaveBeenCalledWith("empty-creature-report.pdf");
    });

    it("should handle creatures with no attacks", async () => {
      const creaturesWithNoAttacks: Creature[] = [
        { name: "Gnoll", level: 3, attacks: [] } as unknown as Creature,
        { name: "Goblin", level: 1, attacks: [] } as unknown as Creature,
      ];

      const saveSpy = vi.fn();
      const docMock = {
        internal: {
          pageSize: {
            getWidth: vi.fn().mockReturnValue(210),
            getHeight: vi.fn().mockReturnValue(297),
          },
        },
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setLineDashPattern: vi.fn(),
        line: vi.fn(),
        addPage: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn(),
        save: saveSpy,
        getTextWidth: vi.fn().mockReturnValue(30),
      } as unknown as jsPDF;

      vi.spyOn(await import("jspdf"), "jsPDF").mockReturnValue(docMock);

      await exportPDF(creaturesWithNoAttacks, "creature-no-attacks-report");

      expect(docMock.save).toHaveBeenCalledWith(
        "creature-no-attacks-report.pdf",
      );
    });

    it("should handle creatures with missing optional fields", async () => {
      const creaturesWithMissingFields: Creature[] = [
        {
          name: "Gnoll",
          level: 3,
          attacks: [],
          creature_ability: null,
        } as unknown as Creature,
        {
          name: "Goblin",
          level: 1,
          attacks: [],
          resistance_raw: undefined,
        } as unknown as Creature,
      ];

      const saveSpy = vi.fn();
      const docMock = {
        internal: {
          pageSize: {
            getWidth: vi.fn().mockReturnValue(210),
            getHeight: vi.fn().mockReturnValue(297),
          },
        },
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setLineDashPattern: vi.fn(),
        line: vi.fn(),
        addPage: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn(),
        save: saveSpy,
        getTextWidth: vi.fn().mockReturnValue(30),
      } as unknown as jsPDF;

      vi.spyOn(await import("jspdf"), "jsPDF").mockReturnValue(docMock);

      await exportPDF(
        creaturesWithMissingFields,
        "creature-missing-fields-report",
      );

      expect(docMock.save).toHaveBeenCalledWith(
        "creature-missing-fields-report.pdf",
      );
    });
  });
});
