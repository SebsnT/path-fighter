import { describe, it, expect } from "vitest";
import { useParty } from "./party";

describe("Party composable", () => {
  const { partySize, partyLevel, resetPartySize, resetPartyLevel } = useParty();
  describe("partySize", () => {
    it("should correctly set partySize", () => {
      expect(partySize.value).toStrictEqual(4);
    });
  });

  describe("partyLevel", () => {
    it("should correctly set partyLevel", () => {
      expect(partyLevel.value).toStrictEqual(1);
    });
  });

  describe("resetPartySize", () => {
    it("should correctly reset party size", () => {
      partySize.value = 8;
      expect(partySize.value).toBe(8);

      resetPartySize();

      expect(partySize.value).toBe(4);
    });
  });

  describe("resetPartyLevel", () => {
    it("should correctly reset party level", () => {
      partyLevel.value = 4;
      expect(partyLevel.value).toBe(4);

      resetPartyLevel();

      expect(partyLevel.value).toBe(1);
    });
  });
});
