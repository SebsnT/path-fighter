import { describe, it, expect } from "vitest";
import type { Creature } from "~/models/creature";
import { getEliteCreature } from "./getEliteCreature";

const attacks = [
  "Melee Single Action longspear +17 (reach 10 feet), Damage 1d8+11 piercing",
  "Melee Single Action fangs +17, Damage 1d8+11 piercing",
  "Ranged Single Action javelin +16 (range increment 30 feet), Damage 1d6+11 piercing",
];

const spells_dcs = [10, 15];
const increased_spells_dcs = [12, 17];

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
    expect(elite.fortitude_save).toStrictEqual(baseCreature.fortitude_save + 2);
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
