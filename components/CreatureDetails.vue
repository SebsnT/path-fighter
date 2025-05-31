<template>
  <div class="expanded-row-content">
    <div class="row">
      <span>Name: {{ props.creature.name }}</span>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <span>HP: {{ props.creature.hp }}</span>
      <span>AC: {{ props.creature.ac }}</span>
      <span>Speed: {{ props.creature.speed_raw }}</span>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <span> Fort: {{ props.creature.fortitude_save }}</span>
      <span> Ref: {{ props.creature.fortitude_save }}</span>
      <span> Wil: {{ props.creature.will_save }}</span>
      <span> Perception: {{ props.creature.perception }}</span>
    </div>


    <div class="row">
      <span>Attributes:</span>
      <span>Strength: {{ props.creature.strength }}</span>
      <span>Dexterity: {{ props.creature.dexterity }}</span>
      <span>Constitution: {{ props.creature.constitution }}</span>
      <span>Intelligence: {{ props.creature.intelligence }}</span>
      <span>Wisdom: {{ props.creature.wisdom }}</span>
      <span>Charisma: {{ props.creature.charisma }}</span>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <div class="column">
        <span> Skills: </span>
        <span>{{Object.entries(props.creature.skill_mod).map(([skill, mod]) => `${mod}: ${skill}`).join(', ')}}</span>
      </div>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <span>Resistance</span>
      <span>{{ props.creature.resistance_raw ?? "None" }}</span>
    </div>

    <div class="row">
      <span>Weakness:</span>
      <span>{{ props.creature.weakness_raw ?? "None" }}</span>
    </div>

    <div class="row">
      <span>Immunities</span>
      <span>{{ props.creature.immunity ?? "None" }}</span>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <div class="column">
        <span>Reactions:</span>
        <span v-for="({ name, description }, index) in props.creature.reactions" :key="index"> {{ name }} {{ description
        }}</span>
      </div>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <div class="column">
        <span> Attacks: </span>
        <div v-if="props.creature.attacks && props.creature.attacks.length > 0">
          <div v-for="(attack, index) in props.creature.attacks" :key="index">
            {{ attack }}
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
    </div>

    <Divider class="margin"></Divider>

    <div class="row">
      <div class="column">
        <span> Spells:</span>
        <span> {{ props.creature.spell ?? "None" }}</span>
      </div>
    </div>



    <Divider class="margin"></Divider>

    <div class="row">
      <div class="column">
        <span>Unique Abilities:</span>
        <div v-if="props.creature.unique_abilities && props.creature.unique_abilities.length > 0">
          <div v-for="(ability, index) in props.creature.unique_abilities" :key="index" style="margin-bottom: 0.5em;">
            <strong>{{ ability.name }}</strong>: {{ ability.description }}
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
    </div>

    <Divider class="margin"></Divider>
  </div>
</template>

<script setup lang="ts">
import type { Creature } from "~/models/creature";

const props = defineProps<{
  creature: Creature;
}>();
</script>

<style scoped lang="scss">
.row {
  display: flex;
  gap: 16px;
}

.column {
  display: flex;
  flex-direction: column;
}

.margin {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
