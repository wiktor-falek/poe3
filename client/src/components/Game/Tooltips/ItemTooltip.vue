<script lang="ts" setup>
const props = defineProps(["item"]);

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

  let renderedDescription = "";
  let idx = 0;
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
  <div class="item-tooltip" v-if="props">
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
      <p>
        Requires
        <span v-if="item.requirements.level">
          Level {{ item.requirements.level }}
        </span>
        <!-- <span v-if="item.requirements.attributes"></span> -->
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
  background-color: rgb(30, 30, 30);
  opacity: 0.95;
  border: 2px solid orange;
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
