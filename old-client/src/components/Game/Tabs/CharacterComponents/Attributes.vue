<script setup>
const props = defineProps({
  attributes: Object,
});
</script>

<template>
  <div class="attributes">
    <div id="strength" class="attribute">{{ attributes.strength }}</div>
    <div id="dexterity" class="attribute">{{ attributes.dexterity }}</div>
    <div id="intelligence" class="attribute">{{ attributes.intelligence }}</div>
    <div id="vitality" class="attribute">{{ attributes.vitality }}</div>
    <div id="speed" class="attribute">{{ attributes.speed }}</div>
  </div>
</template>

<style scoped>
.attributes {
  width: 122px;
  height: 120px;
}

.attribute {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute !important;
  --size: 42px;
  width: var(--size);
  height: var(--size);
  border-width: 2px;
  border-style: solid;
}

#strength {
  left: 39.94px;
  top: calc(42px - (var(--size)));
  border-color: var(--attribute-strength);
}

#dexterity {
  left: 0px;
  top: calc(71.02px - var(--size));
  border-color: var(--attribute-dexterity);
}

#intelligence {
  left: 79.89px;
  top: calc(71.02px - (var(--size)));
  border-color: var(--attribute-intelligence);
}

#vitality {
  left: 15.26px;
  top: calc(117.98px - (var(--size)));
  border-color: var(--attribute-vitality);
}
#speed {
  left: 64.63px;
  top: calc(117.98px - (var(--size)));
  border-color: var(--attribute-speed);
}
</style>
