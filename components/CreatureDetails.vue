<template>
  <div class="expanded-row-content">
    <div class="row">
      <span>Name: {{ props.creature.name }}</span>
    </div>

    <div class="row">
      <span>HP: {{ props.creature.hp }}</span>
    </div>

    <div class="row">
      <span>AC: {{ props.creature.ac }}</span>
    </div>

    <div class="row">
      <span>Speed: {{ props.creature.speed_raw }}</span>
    </div>

    <div class="row">
      <span>
        Str: {{ props.creature.strength }}, Dex: {{ props.creature.dexterity }},
        Con: {{ props.creature.constitution }}, Int:
        {{ props.creature.intelligence }}, Wis: {{ props.creature.wisdom }},
        Cha: {{ props.creature.charisma }}
      </span>
    </div>

    <div class="row">
      <span>
        Fort: {{ props.creature.fortitude_save }}, Ref:
        {{ props.creature.fortitude_save }}, Wil: {{ props.creature.will_save }}
      </span>
    </div>

    <div class="row">
      <span> Resistance: {{ props.creature.resistance_raw }} </span>
    </div>

    <div class="row">
      <span> Weakness: {{ props.creature.weakness_raw }} </span>
    </div>

    <div class="row">
      <span> Spell: {{ props.creature.spell }} </span>
    </div>

    <div class="row">
      <span> Skills: {{ props.creature.skill_mod }} </span>
    </div>

    <div class="row">
      <span> Attacks: {{ props.creature.attacks }} </span>
    </div>
    <div class="row">
      <span> Creature Abilities: {{ props.creature.creature_ability }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Creature } from "~/models/creature";

const props = defineProps<{
  creature: Creature;
}>();
</script>
