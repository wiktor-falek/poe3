<script setup>
import Attributes from './CharacterComponents/Attributes.vue';
import Resistances from './CharacterComponents/Resistances.vue';

const props = defineProps(['characterData']);

console.log(props.characterData);

</script>

<template>
  <div class="tab">
    <Attributes :attributes="characterData.attributes" />
    <Resistances :resistances="characterData.resistances" />
  </div>
</template>

<style scoped>
  .tab {
  }
</style>
