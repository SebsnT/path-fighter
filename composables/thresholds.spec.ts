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
        trivialThreshold: {
          label: "Trivial",
          value: 40,
        },
        lowThreshold: {
          label: "Low",
          value: 60,
        },
        moderateThreshold: {
          label: "Moderate",
          value: 80,
        },
        severeThreshold: {
          label: "Severe",
          value: 120,
        },
        extremeThreshold: {
          label: "Extreme",
          value: 160,
        },
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
        trivialThreshold: {
          label: "Trivial",
          value: 50,
        },
        lowThreshold: {
          label: "Low",
          value: 75,
        },
        moderateThreshold: {
          label: "Moderate",
          value: 100,
        },
        severeThreshold: {
          label: "Severe",
          value: 150,
        },
        extremeThreshold: {
          label: "Extreme",
          value: 200,
        },
      });
    });
  });

  describe("resetThresholds", () => {
    it("should correctly reset thresholds", () => {
      thresholds.value = {
        trivialThreshold: {
          label: "Trivial",
          value: 1,
        },
        lowThreshold: {
          label: "Low",
          value: 2,
        },
        moderateThreshold: {
          label: "Moderate",
          value: 3,
        },
        severeThreshold: {
          label: "Severe",
          value: 4,
        },
        extremeThreshold: {
          label: "Extreme",
          value: 5,
        },
      };

      expect(thresholds.value).toStrictEqual({
        trivialThreshold: {
          label: "Trivial",
          value: 1,
        },
        lowThreshold: {
          label: "Low",
          value: 2,
        },
        moderateThreshold: {
          label: "Moderate",
          value: 3,
        },
        severeThreshold: {
          label: "Severe",
          value: 4,
        },
        extremeThreshold: {
          label: "Extreme",
          value: 5,
        },
      });
      resetThresholds();

      expect(thresholds.value).toStrictEqual({
        trivialThreshold: {
          label: "Trivial",
          value: 40,
        },
        lowThreshold: {
          label: "Low",
          value: 60,
        },
        moderateThreshold: {
          label: "Moderate",
          value: 80,
        },
        severeThreshold: {
          label: "Severe",
          value: 120,
        },
        extremeThreshold: {
          label: "Extreme",
          value: 160,
        },
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
