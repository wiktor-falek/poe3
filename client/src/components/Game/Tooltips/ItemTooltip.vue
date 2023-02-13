<script lang="ts" setup>
import { usePlayerStore } from "../../../stores/playerStore";

const props = defineProps(["item"]);

const playerStore = usePlayerStore();
const characterLvl = playerStore.characterData.level.value;

interface Mod {
  description: string;
  values: Array<number>;
}
/**
 * Replaces every '#' in the *mod* string
 */
function renderTemplateModDescription(mod: Mod) {
  const { description, values } = mod;
  const parts: Array<string> = description.split("#");

  let idx = 0;
  let renderedDescription = "";
  for (let i = 0; i < parts.length; i++) {
    const s = parts[i];
    renderedDescription += s;

    const value: number = values[idx];
    if (value != null) {
      renderedDescription += value;
      idx++;
    }
  }
  return renderedDescription;
}
</script>

<template>
  <div
    class="item-tooltip"
    v-if="props"
    :style="{
      'border-color': `var(--item-rarity--${item.rarity})`,
    }"
  >
    <!-- Name -->
    <div
      class="item-tooltip__top"
      :class="{
        'color--normal': item.rarity === 'normal',
        'color--magic': item.rarity === 'magic',
        'color--rare': item.rarity === 'rare',
        'color--unique': item.rarity === 'unique',
      }"
    >
      <p v-if="item.rarity === 'unique'" class="item-tooltip__top__name">
        {{ item.name }}
      </p>

      <p class="item-tooltip__base" v-if="item.base">
        {{ item.base }}
      </p>
    </div>

    <!-- Base Mods -->
    <hr v-if="item.baseMods" />
    <div class="item-tooltip__base-mods">
      <div class="item-tooltip__base-mod" v-for="mod in item.baseMods">
        {{ renderTemplateModDescription(mod) }}
      </div>
    </div>

    <!-- Requirements -->
    <hr v-if="item.requirements" />
    <div class="item-tooltip__level-requirement" v-if="item.requirements">
      <!-- TODO: comma signs between each span -->
      <p>
        Requires
        <span v-if="item.requirements.level">
          Level
          <span
            :class="{
              'color--disabled': item.requirements.level > characterLvl,
            }"
          >
            {{ item.requirements.level }}
          </span>
        </span>
        <span v-if="item.requirements.attributes">
          <span v-if="item.requirements.attributes.strength">
            {{ item.requirements.attributes.strength }} STR
          </span>
          <span v-if="item.requirements.attributes.dexterity">
            {{ item.requirements.attributes.dexterity }} STR
          </span>
          <span v-if="item.requirements.attributes.intelligence">
            {{ item.requirements.attributes.intelligence }} STR
          </span>
        </span>
      </p>
    </div>

    <!-- Implicits -->
    <hr v-if="item.implicits" />
    <div class="item-tooltips__implicits" v-if="item.implicits">
      <div
        class="item-tooltip__implicits__implicit color--magic"
        v-for="implicit in item.implicits"
      >
        {{ renderTemplateModDescription(implicit) }}
      </div>
    </div>

    <!-- Affixes -->
    <hr v-if="item.affixes" />
    <div class="item-tooltip__mods" v-if="item.affixes">
      <div
        v-if="item.affixes.prefixes || item.affixes.suffixes"
        class="item-tooltip__mods__mod color--magic"
        v-for="affix in [...item.affixes.prefixes, ...item.affixes.suffixes]"
      >
        {{ renderTemplateModDescription(affix) }}
      </div>
      <div
        v-else
        class="item-tooltip__mods__mod color--magic"
        v-for="affix in item.affixes"
      >
        {{ renderTemplateModDescription(affix) }}
      </div>
    </div>

    <!-- Description -->
    <hr v-if="item.description" />
    <div
      class="item-tooltip__description color--unique"
      v-if="item.description"
    >
      {{ item.description }}
    </div>
  </div>
</template>

<style scoped>
.item-tooltip {
  position: absolute;
  right: 300px;
  top: 130px;
  width: 300px;
  min-height: 150px;
  background-color: rgb(40, 40, 40);
  border: 1px solid;
  opacity: 0.95;
  z-index: 10000;
  padding: 15px 20px;
  text-align: center;

  display: flex;
  line-height: 1.2;
  flex-direction: column;
  align-items: center;
}

hr {
  width: 100%;
  margin: 10px 0;
}
</style>
