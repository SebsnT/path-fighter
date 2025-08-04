import { vi, expect, describe, it } from "vitest";
import { exportPDF } from "./exportPDF.utils";
import type { Creature } from "~/models/creature";
import type jsPDF from "jspdf";

// Mocking browser APIs
global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");
global.document.createElement = vi.fn();

describe("Export Utils", () => {
  const creatures: Creature[] = [
    {
      name: "Gnoll",
      level: 3,
      reactions: [{}],
      attacks: ["attack1", "attack2"],
      unique_abilities: [{}],
      size: ["Large"],
    } as Creature,
    {
      name: "Goblin",
      level: 1,
      reactions: [{}],
      attacks: ["attack3", "attack4"],
      unique_abilities: [{}],
      size: ["Medium"],
    } as Creature,
  ]; // Example creature objects

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
        getStringUnitWidth: vi.fn(),
        getFontSize: vi.fn(),
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
        getStringUnitWidth: vi.fn(),
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
        {
          name: "Gnoll",
          level: 3,
          reactions: [{}],
          attacks: [],
          unique_abilities: [{}],
          size: ["Large"],
        } as unknown as Creature,
        {
          name: "Goblin",
          level: 1,
          reactions: [{}],
          attacks: [],
          unique_abilities: [{}],
          size: ["Medium"],
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
        getStringUnitWidth: vi.fn(),
        getFontSize: vi.fn(),
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setLineDashPattern: vi.fn(),
        line: vi.fn(),
        addPage: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn().mockReturnValue([]),
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
          reactions: [{}],
          attacks: [],
          unique_abilities: [{}],
          size: ["Large"],
        } as unknown as Creature,
        {
          name: "Goblin",
          level: 1,
          reactions: [{}],
          attacks: [],
          unique_abilities: [{}],
          size: ["Medium"],
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
        getStringUnitWidth: vi.fn(),
        getFontSize: vi.fn(),
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setLineDashPattern: vi.fn(),
        line: vi.fn(),
        addPage: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn().mockReturnValue(["Attack1", "Attack2"]),
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
