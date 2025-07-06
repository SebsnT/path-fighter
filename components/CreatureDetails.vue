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
        <span>{{
          Object.entries(props.creature.skill_mod)
            .map(([skill, mod]) => `${skill}: ${mod}`)
            .join(", ")
        }}</span>
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
      <span v-for="(name, index) in props.creature.immunity" :key="index">{{
        name ?? "None"
      }}</span>
    </div>

    <div v-if="props.creature.reactions.length">
      <Divider class="margin"></Divider>

      <div class="row">
        <div class="column">
          <span>Reactions:</span>
          <ul>
            <li
              v-for="({ name, htmlDescription }, index) in renderedReactions"
              :key="index"
            >
              <strong>{{ name }}</strong>
              <span v-if="htmlDescription">: </span>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-if="htmlDescription" v-html="htmlDescription"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="props.creature.attacks.length">
      <Divider class="margin"></Divider>
      <div class="row">
        <div class="column">
          <span> Attacks: </span>
          <ul>
            <li v-for="(attack, index) in props.creature.attacks" :key="index">
              {{ attack }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="props.creature.spell?.length">
      <Divider class="margin"></Divider>

      <div class="row">
        <div class="column">
          <span>Spells:</span>
          <span>
            {{
              props.creature.spell && props.creature.spell.length > 0
                ? props.creature.spell.join(", ")
                : "None"
            }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="props.creature.unique_abilities.length">
      <Divider class="margin"></Divider>

      <div class="row">
        <div class="column">
          <span>Unique Abilities:</span>
          <ul>
            <li
              v-for="(
                { name, action, htmlDescription }, i
              ) in renderedUniqueAbilities"
              :key="i"
            >
              <strong>{{ name }} </strong>
              <span v-if="action">
                &nbsp;<u>{{ action }}</u
                >:
              </span>
              <span v-else>: </span>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="htmlDescription"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Creature } from "~/models/creature";
import { safeMarkdownToHtml } from "~/utils/markdown.utils";

const props = defineProps<{
  creature: Creature;
}>();

async function renderList(items: { description: string }[] = []) {
  return Promise.all(
    items.map(async (item) => ({
      ...item,
      htmlDescription: await safeMarkdownToHtml(item.description),
    })),
  );
}

const renderedReactions = ref<
  Array<{
    description: string;
    name?: string;
    action?: string;
    htmlDescription: string;
  }>
>([]);

const renderedUniqueAbilities = ref<
  Array<{
    description: string;
    name?: string;
    action?: string;
    htmlDescription: string;
  }>
>([]);

watchEffect(async () => {
  renderedReactions.value = await renderList(props.creature.reactions);
  renderedUniqueAbilities.value = await renderList(
    props.creature.unique_abilities,
  );
});
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
