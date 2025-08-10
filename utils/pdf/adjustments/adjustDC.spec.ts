import { describe, it, expect } from "vitest";
import { adjustDC } from "./adjustDC";
import type { Action } from "~/models/action";

describe("adjustDC", () => {
  it("should increase DC values by the adjustment", () => {
    const actions: Action[] = [
      { name: "Strike", action: "1", description: "Make an attack. DC 15" },
    ];
    const result = adjustDC(actions, 2);
    expect(result[0].description).toBe("Make an attack. DC 17");
  });

  it("should decrease DC values by the adjustment", () => {
    const actions: Action[] = [
      { name: "Trip", action: "1", description: "Attempt to trip. DC 20" },
    ];
    const result = adjustDC(actions, -5);
    expect(result[0].description).toBe("Attempt to trip. DC 15");
  });

  it("should adjust multiple DC occurrences in one description", () => {
    const actions: Action[] = [
      {
        name: "Complex",
        action: "2",
        description: "First check DC 10, then DC 15",
      },
    ];
    const result = adjustDC(actions, 3);
    expect(result[0].description).toBe("First check DC 13, then DC 18");
  });

  it("should not change descriptions without a DC", () => {
    const actions: Action[] = [
      { name: "No DC", action: "1", description: "No difficulty here" },
    ];
    const result = adjustDC(actions, 5);
    expect(result[0].description).toBe("No difficulty here");
  });

  it("should return a new array without mutating the original", () => {
    const actions: Action[] = [
      { name: "Strike", action: "1", description: "Make an attack. DC 15" },
    ];
    const copy = [...actions];
    const result = adjustDC(actions, 2);

    expect(result).not.toBe(actions);
    expect(actions).toEqual(copy);
  });
});
