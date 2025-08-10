import type { Creature } from "~/models/creature";
import { adjustAttackModifiers } from "./adjustAttackModifiers.utils";
import { adjustReactionsModifier } from "./adjustReaction";
import { adjustValues } from "./adjustValues";
import { adjustUniqueAbilitiesModifier } from "./adjustUniqueAbilitiesModifier";

export function getAdjustedCreature(
  creature: Creature,
  namePrefix: string,
  hpAdjustFn: (level: number, hp: number) => number,
  adjustment: number,
): Creature {
  return {
    ...creature,
    name: `${namePrefix} ${creature.name}`,
    hp: hpAdjustFn(creature.level, creature.hp),
    ac: creature.ac + adjustment,
    perception: creature.perception + adjustment,
    fortitude_save: creature.fortitude_save + adjustment,
    reflex_save: creature.reflex_save + adjustment,
    will_save: creature.will_save + adjustment,
    spell_attack_bonus: adjustValues(creature.spell_attack_bonus, adjustment),
    spell_dc: adjustValues(creature.spell_dc, adjustment),
    reactions: adjustReactionsModifier(creature.reactions, adjustment),
    attacks: adjustAttackModifiers(creature.attacks, adjustment),
    unique_abilities: adjustUniqueAbilitiesModifier(
      creature.unique_abilities,
      adjustment,
    ),
  };
}
