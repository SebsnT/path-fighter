import { describe, it, expect } from "vitest";

import { useThresholds } from "./thresholds";
import { useParty } from "./party";

describe("useThresholds", () => {
  const {
    thresholds,
    manualThresholds,
    adjustThreholds,
    resetThresholds,
    resetManualThresholds,
  } = useThresholds();

  const { partySize } = useParty();

  describe("thresholds", () => {
    it("should correctly set inital thresholds", () => {
      expect(thresholds.value).toStrictEqual({
        trivialThreshold: 40,
        lowThreshold: 60,
        moderateThreshold: 80,
        severeThreshold: 120,
        extremeThreshold: 160,
      });
    });
  });

  describe("manualThresholds", () => {
    it("should correctly set manualThreshold flag", () => {
      expect(manualThresholds.value).toBe(false);
    });
  });

  describe("adjustThreholds", () => {
    it("should adjust thresholds correctly", () => {
      partySize.value = 5;
      adjustThreholds();

      expect(thresholds.value).toStrictEqual({
        trivialThreshold: 50,
        lowThreshold: 75,
        moderateThreshold: 100,
        severeThreshold: 150,
        extremeThreshold: 200,
      });
    });
  });

  describe("resetThresholds", () => {
    it("should correctly reset thresholds", () => {
      thresholds.value = {
        trivialThreshold: 1,
        lowThreshold: 2,
        moderateThreshold: 3,
        severeThreshold: 4,
        extremeThreshold: 5,
      };

      expect(thresholds.value).toStrictEqual({
        trivialThreshold: 1,
        lowThreshold: 2,
        moderateThreshold: 3,
        severeThreshold: 4,
        extremeThreshold: 5,
      });
      resetThresholds();

      expect(thresholds.value).toStrictEqual({
        trivialThreshold: 40,
        lowThreshold: 60,
        moderateThreshold: 80,
        severeThreshold: 120,
        extremeThreshold: 160,
      });
    });
  });

  describe("resetManualThresholds", () => {
    it("should correctly reset manualThreshold", () => {
      manualThresholds.value = true;
      expect(manualThresholds.value).toStrictEqual(true);

      resetManualThresholds();

      expect(manualThresholds.value).toStrictEqual(false);
    });
  });
});
