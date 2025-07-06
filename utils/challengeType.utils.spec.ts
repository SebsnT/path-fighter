import { describe, it, expect } from "vitest";
import {
  adjustAttackAndDamage,
  getEliteCreature,
  getWeakCreature,
} from "./challengeType.utils";
import type { Creature } from "~/models/creature";

const attacks = [
  "Melee Single Action longspear +17 (reach 10 feet), Damage 1d8+11 piercing",
  "Melee Single Action fangs +17, Damage 1d8+11 piercing",
  "Ranged Single Action javelin +16 (range increment 30 feet), Damage 1d6+11 piercing",
];

const spells_dcs = [10, 15];
const increased_spells_dcs = [12, 17];
const decreased_spells_dcs = [8, 13];

describe("Creature adjustments", () => {
  describe("getEliteCreature", () => {
    it('should increase AC by 2, perception by 2, prepend "ELITE" to name, and adjust HP based on level', () => {
      const baseCreature: Creature = {
        ac: 10,
        hp: 50,
        level: 10,
        name: "Goblin",
        perception: 5,
        fortitude_save: 10,
        reflex_save: 10,
        will_save: 10,
        attacks: attacks,
        spell_dc: spells_dcs,
      } as Creature;

      const elite = getEliteCreature(baseCreature);

      expect(elite.name).toStrictEqual(`ELITE ${baseCreature.name}`);
      expect(elite.ac).toStrictEqual(baseCreature.ac + 2);
      expect(elite.perception).toStrictEqual(baseCreature.perception + 2);
      expect(elite.fortitude_save).toStrictEqual(
        baseCreature.fortitude_save + 2,
      );
      expect(elite.reflex_save).toStrictEqual(baseCreature.reflex_save + 2);
      expect(elite.will_save).toStrictEqual(baseCreature.will_save + 2);
      expect(elite.spell_dc).toStrictEqual(increased_spells_dcs);

      // For level 10, getEliteHP adds 20 hp
      expect(elite.hp).toStrictEqual(baseCreature.hp + 20);
    });

    it("should add correct HP for different levels", () => {
      const testCases = [
        { level: 1, expectedHpAdd: 10 },
        { level: 2, expectedHpAdd: 15 },
        { level: 4, expectedHpAdd: 15 },
        { level: 5, expectedHpAdd: 20 },
        { level: 19, expectedHpAdd: 20 },
        { level: 20, expectedHpAdd: 30 },
        { level: 30, expectedHpAdd: 30 },
      ];

      testCases.forEach(({ level, expectedHpAdd }) => {
        const creature: Creature = {
          ac: 5,
          hp: 100,
          level,
          name: "Orc",
          perception: 0,
          fortitude_save: 10,
          reflex_save: 10,
          will_save: 10,
          attacks: attacks,
          spell_dc: spells_dcs,
        } as Creature;
        const elite = getEliteCreature(creature);
        expect(elite.hp).toStrictEqual(creature.hp + expectedHpAdd);
      });
    });
  });

  describe("getWeakCreature", () => {
    it('should decrease AC by 2, perception by 2, prepend "WEAK" to name, and adjust HP based on level', () => {
      const baseCreature: Creature = {
        ac: 10,
        hp: 50,
        level: 4,
        name: "Goblin",
        perception: 5,
        fortitude_save: 10,
        reflex_save: 10,
        will_save: 10,
        attacks: attacks,
        spell_dc: spells_dcs,
      } as Creature;

      const weak = getWeakCreature(baseCreature);

      expect(weak.name).toStrictEqual(`WEAK ${baseCreature.name}`);
      expect(weak.ac).toStrictEqual(baseCreature.ac - 2);
      expect(weak.perception).toStrictEqual(baseCreature.perception - 2);
      expect(weak.fortitude_save).toStrictEqual(
        baseCreature.fortitude_save - 2,
      );
      expect(weak.reflex_save).toStrictEqual(baseCreature.reflex_save - 2);
      expect(weak.will_save).toStrictEqual(baseCreature.will_save - 2);
      expect(weak.spell_dc).toStrictEqual(decreased_spells_dcs);

      // For level 4, getWeakHP subtracts 15 hp
      expect(weak.hp).toStrictEqual(baseCreature.hp - 15);
    });

    it("should subtract correct HP for different levels", () => {
      const testCases = [
        { level: 1, expectedHpSub: 10 },
        { level: 2, expectedHpSub: 10 },
        { level: 3, expectedHpSub: 15 },
        { level: 5, expectedHpSub: 15 },
        { level: 6, expectedHpSub: 20 },
        { level: 20, expectedHpSub: 20 },
        { level: 21, expectedHpSub: 30 },
        { level: 30, expectedHpSub: 30 },
      ];

      testCases.forEach(({ level, expectedHpSub }) => {
        const creature: Creature = {
          ac: 5,
          hp: 100,
          level,
          name: "Orc",
          perception: 0,
          fortitude_save: 10,
          reflex_save: 10,
          will_save: 10,
          attacks: attacks,
          spell_dc: spells_dcs,
        } as Creature;
        const weak = getWeakCreature(creature);
        expect(weak.hp).toStrictEqual(creature.hp - expectedHpSub);
      });
    });
  });

  describe("adjustAttackAndDamage", () => {
    const baseAttacks = [
      "Melee Single Action longspear +17 (reach 10 feet), Damage 1d8+11 piercing",
      "Melee Single Action fangs +17, Damage 1d8+11 piercing",
      "Ranged Single Action javelin +16 (range increment 30 feet), Damage 1d6+11 piercing",
    ];

    it("should decrease attack and damage modifiers by 2", () => {
      const adjusted = adjustAttackAndDamage(baseAttacks, -2);
      expect(adjusted).toStrictEqual([
        "Melee Single Action longspear +15 (reach 10 feet), Damage 1d8+9 piercing",
        "Melee Single Action fangs +15, Damage 1d8+9 piercing",
        "Ranged Single Action javelin +14 (range increment 30 feet), Damage 1d6+9 piercing",
      ]);
    });

    it("should increase attack and damage modifiers by 2", () => {
      const adjusted = adjustAttackAndDamage(baseAttacks, 2);
      expect(adjusted).toStrictEqual([
        "Melee Single Action longspear +19 (reach 10 feet), Damage 1d8+13 piercing",
        "Melee Single Action fangs +19, Damage 1d8+13 piercing",
        "Ranged Single Action javelin +18 (range increment 30 feet), Damage 1d6+13 piercing",
      ]);
    });

    it("should handle negative damage modifiers correctly", () => {
      const attacksWithNegativeDamage = [
        "Melee Single Action tail +10, Damage 1d8-3 bludgeoning",
      ];
      const adjusted = adjustAttackAndDamage(attacksWithNegativeDamage, 2);
      expect(adjusted).toStrictEqual([
        "Melee Single Action tail +12, Damage 1d8-1 bludgeoning",
      ]);
    });

    it("should not modify strings without matching patterns", () => {
      const invalidAttacks = [
        "Some ability without attack or damage modifiers",
      ];
      const adjusted = adjustAttackAndDamage(invalidAttacks, 2);
      expect(adjusted).toStrictEqual(invalidAttacks);
    });
  });
});
