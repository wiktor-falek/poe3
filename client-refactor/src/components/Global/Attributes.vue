<script lang="ts" setup>
import type { Attributes } from "../../../../common/types";
const props = defineProps<{ attributes: Attributes }>();

console.log(props.attributes);
</script>

<template>
  <div class="attributes">
    <div class="attribute-bar">
      <p>STR</p>
      <div
        class="attribute"
        v-for="index in 8"
        :class="{ 'attribute--strength': attributes.strength >= index }"
      >
      </div>
      <p>{{ attributes.strength }}/8</p>
    </div>

    <div class="attribute-bar">
      <p>DEX</p>
      <div
        class="attribute"
        v-for="index in 8"
        :class="{ 'attribute--dexterity': attributes.dexterity >= index }"
      ></div>
      <p>{{ attributes.dexterity }}/8</p>
    </div>

    <div class="attribute-bar">
      <p>INT</p>
      <div
        class="attribute"
        v-for="index in 8"
        :class="{ 'attribute--intelligence': attributes.intelligence >= index }"
      ></div>
      <p>{{ attributes.intelligence }}/8</p>
    </div>

    <div class="attribute-bar">
      <p>VIT</p>
      <div
        class="attribute"
        v-for="index in 8"
        :class="{ 'attribute--vitality': attributes.vitality >= index }"
      ></div>
      <p>{{ attributes.vitality }}/8</p>
    </div>

    <div class="attribute-bar">
      <p>SPD</p>
      <div
        class="attribute"
        v-for="index in 8"
        :class="{ 'attribute--speed': attributes.speed >= index }"
      ></div>
      <p>{{ attributes.speed }}/8</p>
    </div>
  </div>
</template>

<style scoped>
.attributes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attribute-bar {
  display: flex;
  gap: 5px;
  align-items: center;
}

.attribute-bar p {
  margin: 0;
  line-height: 1em;
  padding-top: 1.5px;
}

.attribute {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: inline-block;
  background-color: gray;
}

.attribute--strength {
  background-color: var(--attribute-strength);
}

.attribute--dexterity {
  background-color: var(--attribute-dexterity);
}

.attribute--intelligence {
  background-color: var(--attribute-intelligence);
}

.attribute--vitality {
  background-color: var(--attribute-vitality);
}

.attribute--speed {
  background-color: var(--attribute-speed);
}
</style>
