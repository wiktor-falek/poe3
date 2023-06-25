<script lang="ts" setup>
import useCharacterStore from "../../stores/characterStore";
import type WearableItem from "../../../../items/src/wearable/wearable";

const props = defineProps<{ item: WearableItem }>();

const characterStore = useCharacterStore();
const characterLvl = characterStore.staticCharacter?.level.value!;

interface Mod {
  description: string;
  values: Array<number>;
}

/**
 * Replaces every '#' in the mod string with a modifier value
 */
function populateTemplateModDescription(mod: Mod) {
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
    v-if="item"
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
      <p v-if="item.rarity === 'unique'" class="item-tooltip__top__unique-name">
        {{ item.uniqueName }}
      </p>

      <p class="item-tooltip__top__name" v-if="item.name">
        {{ item.name }}
      </p>
    </div>

    <!-- Base Mods -->
    <hr v-if="item.modifiers.base.length" />
    <div class="item-tooltip__base-mods">
      <div class="item-tooltip__base-mod" v-for="mod in item.modifiers.base">
        {{ populateTemplateModDescription(mod) }}
      </div>
    </div>

    <!-- Requirements -->
    <hr v-if="item.requirements" />
    <div class="item-tooltip__level-requirement" v-if="item.requirements">
      <!-- TODO: comma signs between each span -->
      <p
        :class="{
          'color--restricted': item.requirements.level > characterLvl,
        }"
      >
        Requires
        <span v-if="item.requirements.level">
          Level
          <span>
            {{ item.requirements.level }}
          </span>
        </span>
        <span v-if="item.requirements.attributes">
          <span v-if="item.requirements.attributes.strength">
            {{ item.requirements.attributes.strength }} STR
          </span>
          <span v-if="item.requirements.attributes.dexterity">
            {{ item.requirements.attributes.dexterity }} DEX
          </span>
          <span v-if="item.requirements.attributes.intelligence">
            {{ item.requirements.attributes.intelligence }} ING
          </span>
        </span>
      </p>
      <p>Item Level {{ item.ilvl }}</p>
    </div>

    <!-- Implicits -->
    <hr v-if="item.modifiers.implicit.length" />
    <div class="item-tooltips__implicits" v-if="item.modifiers.implicit.length">
      <div
        class="item-tooltip__implicits__implicit color--magic"
        v-for="implicit in item.modifiers.implicit"
      >
        {{ populateTemplateModDescription(implicit) }}
      </div>
    </div>

    <!-- Affixes -->
    <hr
      v-if="
        item.rarity !== 'normal' &&
        [...item.modifiers.affix.prefixes, ...item.modifiers.affix.suffixes].length
      "
    />
    <div class="item-tooltip__mods" v-if="item.modifiers.affix">
      <div
        class="item-tooltip__mods__mod color--magic"
        v-for="affix in [...item.modifiers.affix.prefixes, ...item.modifiers.affix.suffixes]"
      >
        {{ populateTemplateModDescription(affix) }}
      </div>
    </div>

    <!-- Description -->
    <hr v-if="item.uniqueDescription" />
    <div class="item-tooltip__description color--unique" v-if="item.uniqueDescription">
      {{ item.uniqueDescription }}
    </div>
  </div>
</template>

<style scoped>
.item-tooltip {
  position: absolute;
  right: 400px;
  top: 20%;
  transform: translate(0, -20%);
  min-height: 150px;
  background-color: rgb(15, 15, 15);
  border: 1px solid;
  /* opacity: 0.95; */
  z-index: 100;
  padding: 15px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.35;
  font-size: 1.1rem;
}

p {
  margin: 0;
}

.item-tooltip__top__name,
.item-tooltip__top__unique-name {
  font-weight: bold;
}

hr {
  border: none;
  background-color: gray;
  height: 1px;
  width: 100%;
  margin: 10px 0;
}

.color--restricted {
  color: rgb(218, 68, 68);
}

.color--normal {
  color: var(--item-rarity--normal);
}
.color--magic {
  color: var(--item-rarity--magic);
}
.color--rare {
  color: var(--item-rarity--rare);
}
.color--unique {
  color: var(--item-rarity--unique);
}
</style>
