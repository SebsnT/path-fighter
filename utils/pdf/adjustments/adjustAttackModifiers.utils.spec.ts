import { describe, it, expect } from "vitest";
import { adjustAttackModifiers } from "./adjustAttackModifiers.utils";
describe("Creature adjustments", () => {
  describe("adjustAttackAndDamage", () => {
    const baseAttacks = [
      "Melee Single Action longspear +17 (reach 10 feet), Damage 1d8+11 piercing",
      "Melee Single Action fangs +17, Damage 1d8+11 piercing",
      "Ranged Single Action javelin +16 (range increment 30 feet), Damage 1d6+11 piercing",
    ];

    it("should decrease attack and damage modifiers by 2", () => {
      const adjusted = adjustAttackModifiers(baseAttacks, -2);
      expect(adjusted).toStrictEqual([
        "Melee Single Action longspear +15 (reach 10 feet), Damage 1d8+9 piercing",
        "Melee Single Action fangs +15, Damage 1d8+9 piercing",
        "Ranged Single Action javelin +14 (range increment 30 feet), Damage 1d6+9 piercing",
      ]);
    });

    it("should increase attack and damage modifiers by 2", () => {
      const adjusted = adjustAttackModifiers(baseAttacks, 2);
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
      const adjusted = adjustAttackModifiers(attacksWithNegativeDamage, 2);
      expect(adjusted).toStrictEqual([
        "Melee Single Action tail +12, Damage 1d8-1 bludgeoning",
      ]);
    });

    it("should not modify strings without matching patterns", () => {
      const invalidAttacks = [
        "Some ability without attack or damage modifiers",
      ];
      const adjusted = adjustAttackModifiers(invalidAttacks, 2);
      expect(adjusted).toStrictEqual(invalidAttacks);
    });
  });
});
