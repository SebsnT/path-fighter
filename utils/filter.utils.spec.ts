import { vi, expect, describe, it } from "vitest";
import { getSelectionOptions, onNumberInput } from "./filter.utils";
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

    it("should return selection options for string array field", () => {});
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
});
