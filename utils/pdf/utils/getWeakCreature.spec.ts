import { describe, it, expect } from "vitest";
import type { Creature } from "~/models/creature";
import { getWeakCreature } from "./getWeakCreature";

const attacks = [
  "Melee Single Action longspear +17 (reach 10 feet), Damage 1d8+11 piercing",
  "Melee Single Action fangs +17, Damage 1d8+11 piercing",
  "Ranged Single Action javelin +16 (range increment 30 feet), Damage 1d6+11 piercing",
];

const spells_dcs = [10, 15];
const decreased_spells_dcs = [8, 13];

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
    expect(weak.fortitude_save).toStrictEqual(baseCreature.fortitude_save - 2);
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
