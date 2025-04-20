import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useEncounter } from "./encounter";
import { useEncounterState } from "./encounterState";
import type { Creature } from "~/models/creature";

const {
  addOneToEncounter,
  addMultipleToEncounter,
  updateChallengeType,
  deleteOneFromEncounter,
  deleteAllOfOneCreatureFromEncounter,
  clearEncounter,
} = useEncounter();
const { encounter } = useEncounterState();

const testCreature = {
  id: "123",
  name: "Test",
  challenge_type: "base",
  url: "/Traits.aspx?ID=1",
  count: 1,
  xp: 0,
} as Creature;

const testCreature2 = {
  id: "456",
  name: "Test2",
  challenge_type: "base",
  url: "/Traits.aspx?ID=2",
  count: 1,
  xp: 0,
} as Creature;

describe("Encounter composable", () => {
  afterEach(() => {
    clearEncounter();
  });
  describe("addOneToEncounter", () => {
    it("should correctly add creature to encounter", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual(testCreature);
    });

    it("should increment the count of the creature if creature already exists", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);
      addOneToEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual({
        ...testCreature,
        count: 2,
      });
    });
  });

  describe("addMultipleToEncounter", () => {
    it("should correctly add multiple creatures", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);
      expect(encounter.value.get("456:base")).toStrictEqual(undefined);

      addMultipleToEncounter([testCreature, testCreature2]);

      expect(encounter.value.get("123:base")).toStrictEqual(testCreature);
      expect(encounter.value.get("456:base")).toStrictEqual(testCreature2);
    });
  });

  describe("updateChallengeType", () => {
    afterEach(() => {
      clearEncounter();
    });
    it("should update challange_type and url correctly", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);

      updateChallengeType(testCreature, "elite");

      expect(encounter.value.get("123:elite")).toStrictEqual({
        ...testCreature,
        challenge_type: "elite",
        url: "/Traits.aspx?ID=1",
      });
    });

    it("should update challange_type correctly", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);

      updateChallengeType(testCreature, "elite");

      addOneToEncounter(testCreature);

      updateChallengeType(testCreature, "elite");

      expect(encounter.value.get("123:elite")).toStrictEqual({
        ...testCreature,
        challenge_type: "elite",
        url: "/Traits.aspx?ID=1&elite=true",
        count: 2,
      });
    });
  });

  describe("deleteOneFromEncounter", () => {
    it("should correctly delete creature from encounter", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual(testCreature);

      deleteOneFromEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual(undefined);
    });

    it("should correctly decrease count of creature ", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);
      addOneToEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual({
        ...testCreature,
        count: 2,
      });

      deleteOneFromEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual(testCreature);
    });
  });

  describe("deleteAllOfOneCreatureFromEncounter", () => {
    it("should correctly delete all of one creature from encounter", () => {
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);

      addOneToEncounter(testCreature);
      addOneToEncounter(testCreature);

      expect(encounter.value.get("123:base")).toStrictEqual({
        ...testCreature,
        count: 2,
      });

      deleteAllOfOneCreatureFromEncounter(testCreature);
      expect(encounter.value.get("123:base")).toStrictEqual(undefined);
    });
  });
});
