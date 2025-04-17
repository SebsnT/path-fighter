import { describe, it, expect } from "vitest";

import { useDifficulty } from "./difficulty";

describe("Description", () => {
  const {
    baseValue,
    currentValue,
    increaseDifficulty,
    decreaseDifficulty,
    resetDifficulty,
  } = useDifficulty();

  describe("init", () => {
    it("should initiate the values correctly", () => {
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
    });
  });

  describe("increaseDifficulty", () => {
    it("should correctly increase difficulty when only given level", () => {
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
      increaseDifficulty(1);
      expect(baseValue.value).toStrictEqual(40);
      expect(currentValue.value).toStrictEqual(40);
      resetDifficulty();
    });

    it("should correctly increase difficulty when given level and count", () => {
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
      increaseDifficulty(1, 3);
      expect(baseValue.value).toStrictEqual(120);
      expect(currentValue.value).toStrictEqual(120);
      resetDifficulty();
    });

    it("should correctly increase difficulty when given level, count and challengeType", () => {
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
      increaseDifficulty(1, 3, "elite");
      expect(baseValue.value).toStrictEqual(180);
      expect(currentValue.value).toStrictEqual(180);
      resetDifficulty();
    });
  });

  describe("decreaseDifficulty", () => {
    it("should correctly decrease difficulty when only given level", () => {
      baseValue.value = 80;
      currentValue.value = 80;
      decreaseDifficulty(1);
      expect(baseValue.value).toStrictEqual(40);
      expect(currentValue.value).toStrictEqual(40);
      resetDifficulty();
    });

    it("should correctly decrease difficulty when given level and count", () => {
      baseValue.value = 120;
      currentValue.value = 120;
      decreaseDifficulty(1, 3);
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
      resetDifficulty();
    });

    it("should correctly decrease difficulty when given level, count and challengeType", () => {
      baseValue.value = 180;
      currentValue.value = 180;
      decreaseDifficulty(1, 3, "elite");
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
      resetDifficulty();
    });
  });

  describe("resetDifficulty", () => {
    it("should reset difficulty", () => {
      baseValue.value = 120;
      currentValue.value = 120;
      resetDifficulty();
      expect(baseValue.value).toStrictEqual(0);
      expect(currentValue.value).toStrictEqual(0);
    });
  });
});
