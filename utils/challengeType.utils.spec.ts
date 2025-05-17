import { describe, it, expect } from 'vitest'
import { getEliteCreature, getWeakCreature } from './challengeType.utils'
import type { Creature } from '~/models/creature'


describe('Creature adjustments', () => {
  describe('getEliteCreature', () => {
    it('should increase AC by 2, perception by 2, prepend "ELITE" to name, and adjust HP based on level', () => {
      const baseCreature: Creature = {
        ac: 10,
        hp: 50,
        level: 10,
        name: 'Goblin',
        perception: 5,
      } as Creature;

      const elite = getEliteCreature(baseCreature)

      expect(elite.ac).toBe(baseCreature.ac + 2)
      expect(elite.perception).toBe(baseCreature.perception + 2)
      expect(elite.fortitude_save).toBe(baseCreature.fortitude_save + 2)
      expect(elite.reflex_save).toBe(baseCreature.reflex_save + 2)
      expect(elite.will_save).toBe(baseCreature.will_save + 2)
      expect(elite.name).toBe(`ELITE ${baseCreature.name}`)

      // For level 10, getEliteHP adds 20 hp
      expect(elite.hp).toBe(baseCreature.hp + 20)
    })

    it('should add correct HP for different levels', () => {
      const testCases = [
        { level: 1, expectedHpAdd: 10 },
        { level: 2, expectedHpAdd: 15 },
        { level: 4, expectedHpAdd: 15 },
        { level: 5, expectedHpAdd: 20 },
        { level: 19, expectedHpAdd: 20 },
        { level: 20, expectedHpAdd: 30 },
        { level: 30, expectedHpAdd: 30 },
      ]

      testCases.forEach(({ level, expectedHpAdd }) => {
        const creature: Creature = {
          ac: 5,
          hp: 100,
          level,
          name: 'Orc',
          perception: 0,
        } as Creature;
        const elite = getEliteCreature(creature)
        expect(elite.hp).toBe(creature.hp + expectedHpAdd)
      })
    })
  })

  describe('getWeakCreature', () => {
    it('should decrease AC by 2, perception by 2, prepend "WEAK" to name, and adjust HP based on level', () => {
      const baseCreature: Creature = {
        ac: 10,
        hp: 50,
        level: 4,
        name: 'Goblin',
        perception: 5,
      } as Creature;

      const weak = getWeakCreature(baseCreature)

      expect(weak.ac).toBe(baseCreature.ac - 2)
      expect(weak.perception).toBe(baseCreature.perception - 2)
      expect(weak.fortitude_save).toBe(baseCreature.fortitude_save - 2)
      expect(weak.reflex_save).toBe(baseCreature.reflex_save - 2)
      expect(weak.will_save).toBe(baseCreature.will_save - 2)
      expect(weak.name).toBe(`WEAK ${baseCreature.name}`)

      // For level 4, getWeakHP subtracts 15 hp
      expect(weak.hp).toBe(baseCreature.hp - 15)
    })

    it('should subtract correct HP for different levels', () => {
      const testCases = [
        { level: 1, expectedHpSub: 10 },
        { level: 2, expectedHpSub: 10 },
        { level: 3, expectedHpSub: 15 },
        { level: 5, expectedHpSub: 15 },
        { level: 6, expectedHpSub: 20 },
        { level: 20, expectedHpSub: 20 },
        { level: 21, expectedHpSub: 30 },
        { level: 30, expectedHpSub: 30 },
      ]

      testCases.forEach(({ level, expectedHpSub }) => {
        const creature: Creature = {
          ac: 5,
          hp: 100,
          level,
          name: 'Orc',
          perception: 0,
        } as Creature;
        const weak = getWeakCreature(creature)
        expect(weak.hp).toBe(creature.hp - expectedHpSub)

      })
    })
  })
})
