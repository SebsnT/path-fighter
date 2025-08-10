import { describe, it, expect } from "vitest";
import { adjustValues } from "./adjustValues";

describe("adjustValues", () => {
  it("should adjust each value by the given amount", () => {
    const result = adjustValues([10, 15, 20], 2);
    expect(result).toEqual([12, 17, 22]);
  });

  it("should handle negative adjustments", () => {
    const result = adjustValues([10, 15, 20], -3);
    expect(result).toEqual([7, 12, 17]);
  });

  it("should return undefined if values are undefined", () => {
    const result = adjustValues(undefined, 2);
    expect(result).toBeUndefined();
  });

  it("should return an empty array if input array is empty", () => {
    const result = adjustValues([], 5);
    expect(result).toEqual([]);
  });
});
