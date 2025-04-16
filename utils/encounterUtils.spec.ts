import { describe, expect, it, test } from "vitest";
import {
  calculateCreatureXP,
  hasMutipleMarkdownEntries,
  hasOneMarkdownEntry,
} from "./encounterUtils";
import type { ChallengeType } from "~/models/challengeType";

type TestCase = {
  partySize: number;
  partyLevel: number;
  creatureLevel: number;
  challengeType: ChallengeType;
  expected: {
    baseXP: number;
    scaledXP: number;
  };
};

describe("Encounter Utils", () => {
  describe("hasOneMarkdownEntry", () => {
    it("should return false for non markdownEntry", () => {
      const testString = "Test 123";
      expect(hasOneMarkdownEntry(testString)).toBe(false);
    });

    it("should return true for a markdownEntry", () => {
      const testString = "lorem ipsum [Test](/Traits.aspx?ID=1) lorem ipsum";
      expect(hasOneMarkdownEntry(testString)).toStrictEqual(true);
    });
  });

  describe("hasMutipleMarkdownEntries", () => {
    it("should return false for non if it contains no markdown entries", () => {
      const testString = "Test 123";
      expect(hasMutipleMarkdownEntries(testString)).toStrictEqual(false);
    });

    it("should return false for non if it contains one markdown entries", () => {
      const testString = "[Test](/Traits.aspx?ID=1)";
      expect(hasMutipleMarkdownEntries(testString)).toStrictEqual(false);
    });

    it("should return false for non if it contains two markdown entries", () => {
      const testString =
        "[Test1](/Traits.aspx?ID=1), [Test2](/Traits.aspx?ID=2)";
      expect(hasMutipleMarkdownEntries(testString)).toStrictEqual(true);
    });
  });

  describe("calculateCreatureXP", () => {
    const testCases: TestCase[] = [
      {
        partySize: 4,
        partyLevel: 5,
        creatureLevel: 1,
        challengeType: "base",
        expected: { baseXP: 10, scaledXP: 10 },
      },
      {
        partySize: 4,
        partyLevel: 4,
        creatureLevel: 1,
        challengeType: "base",
        expected: { baseXP: 15, scaledXP: 15 },
      },
      {
        partySize: 4,
        partyLevel: 3,
        creatureLevel: 1,
        challengeType: "base",
        expected: { baseXP: 20, scaledXP: 20 },
      },
      {
        partySize: 4,
        partyLevel: 2,
        creatureLevel: 1,
        challengeType: "base",
        expected: { baseXP: 30, scaledXP: 30 },
      },
      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 1,
        challengeType: "base",
        expected: { baseXP: 40, scaledXP: 40 },
      },
      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 2,
        challengeType: "base",
        expected: { baseXP: 60, scaledXP: 60 },
      },
      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 3,
        challengeType: "base",
        expected: { baseXP: 80, scaledXP: 80 },
      },
      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 4,
        challengeType: "base",
        expected: { baseXP: 120, scaledXP: 120 },
      },

      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 5,
        challengeType: "base",
        expected: { baseXP: 160, scaledXP: 160 },
      },
      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 6,
        challengeType: "base",
        expected: { baseXP: 160, scaledXP: 160 },
      },

      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 3,
        challengeType: "elite",
        expected: { baseXP: 120, scaledXP: 120 },
      },
      {
        partySize: 4,
        partyLevel: 1,
        creatureLevel: 3,
        challengeType: "weak",
        expected: { baseXP: 60, scaledXP: 60 },
      },
      {
        partySize: 0,
        partyLevel: 1,
        creatureLevel: 1,
        challengeType: "base",
        expected: { baseXP: 0, scaledXP: 0 },
      },
    ];
    test.each(testCases)(
      "should calculate XP correctly for party size $partySize, level $partyLevel, creature level $creatureLevel, challenge type $challengeType",
      ({ partySize, partyLevel, creatureLevel, challengeType, expected }) => {
        expect(
          calculateCreatureXP(
            partySize,
            partyLevel,
            creatureLevel,
            challengeType,
          ),
        ).toStrictEqual(expected);
      },
    );
  });
});
