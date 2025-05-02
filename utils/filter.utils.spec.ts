import { vi, expect, describe, it } from "vitest";
import { getSelectionOptions, onNumberInput, gteFilter, inFilter, lteFilter, containsFilter } from "./filter.utils";
import type { Creature } from "~/models/creature";
import type { InputNumberInputEvent } from "primevue/inputnumber";

describe("Filter Utils", () => {
  describe("onNumberInput", () => {
    it("should call blur() and then focus() on the target element", () => {
      // Create a mock input element
      const mockElement = document.createElement("input");
      const blurSpy = vi.spyOn(mockElement, "blur");
      const focusSpy = vi.spyOn(mockElement, "focus");

      // Simulate the event
      const event = {
        originalEvent: {
          target: mockElement,
        },
      } as unknown as InputNumberInputEvent;

      onNumberInput(event);

      expect(blurSpy).toHaveBeenCalledOnce();
      expect(focusSpy).toHaveBeenCalledOnce();
    });
  });

  describe("selectionOptionsFromKeyAndValue", () => {
    const creatures: Creature[] = [
      {
        name: "Gnoll",
        level: 3,
        trait_markdown: ["test1", "test2"],
      } as Creature,
      {
        name: "Goblin",
        level: 1,
        trait_markdown: ["test3", "test4"],
      } as Creature,
    ];

    it("should return selection options for non existent field", () => {
      expect(getSelectionOptions(creatures, "ac")).toStrictEqual([]);
    });

    it("should return selection options for string field", () => {
      expect(getSelectionOptions(creatures, "name")).toStrictEqual([
        {
          label: "Gnoll",
          value: "Gnoll",
        },
        {
          label: "Goblin",
          value: "Goblin",
        },
      ]);
    });

    it("should return selection options for number field", () => {
      expect(getSelectionOptions(creatures, "level")).toStrictEqual([
        {
          label: 1,
          value: 1,
        },
        {
          label: 3,
          value: 3,
        },
      ]);
    });

    it("should return selection options for string array field", () => { });
    expect(getSelectionOptions(creatures, "trait_markdown")).toStrictEqual([
      {
        label: "test1",
        value: "test1",
      },
      {
        label: "test2",
        value: "test2",
      },
      {
        label: "test3",
        value: "test3",
      },
      {
        label: "test4",
        value: "test4",
      },
    ]);
  });

  describe("Filter functions", () => {
    describe("inFilter", () => {
      it("should return true when filter value contains one of the field's values", () => {
        const result = inFilter(["apple", "banana"], "apple pie", true);
        expect(result).toBe(true);
      });

      it("should return false when filter value doesn't match", () => {
        const result = inFilter(["apple", "banana"], "cherry pie", true);
        expect(result).toBe(false);
      });

      it("should handle empty fieldValue gracefully", () => {
        const result = inFilter(["apple", "banana"], "", true);
        expect(result).toBe(false);
      });

      it("should retrun wrong for false dataType ", () => {
        const result = inFilter("apple", "", false);
        expect(result).toBe(false);
      });
    });

    describe("containsFilter", () => {
      it("should return true when filter value is a substring of field value", () => {
        const result = containsFilter("apple", "apple pie");
        expect(result).toBe(true);
      });

      it("should return false when filter value is not a substring", () => {
        const result = containsFilter("banana", "apple pie");
        expect(result).toBe(false);
      });

      it("should handle empty fieldValue gracefully", () => {
        const result = containsFilter("apple", "");
        expect(result).toBe(false);
      });

      it("should handle wrong data type for field gracefully", () => {
        const result = containsFilter(1, "");
        expect(result).toBe(false);
      });
    });

    describe("gteFilter", () => {
      it("should return true when fieldValue is greater than or equal to filterValue", () => {
        const result = gteFilter(10, "15");
        expect(result).toBe(true);
      });

      it("should return false when fieldValue is less than filterValue", () => {
        const result = gteFilter(20, "15");
        expect(result).toBe(false);
      });
      it("should return false when fieldValue is less than filterValue", () => {
        const result = gteFilter(20, "15");
        expect(result).toBe(false);
      });

      it("should handle wrong data type", () => {
        const result = gteFilter("20", "15");
        expect(result).toBe(false);
      });
    });

    describe("lteFilter", () => {
      it("should return true when fieldValue is less than or equal to filterValue", () => {
        const result = lteFilter(15, "10");
        expect(result).toBe(true);
      });

      it("should return false when fieldValue is greater than filterValue", () => {
        const result = lteFilter(10, "15");
        expect(result).toBe(false);
      });

      it("should handle wrong data type", () => {
        const result = lteFilter("10", "15");
        expect(result).toBe(false);
      });
    });
  });
});
