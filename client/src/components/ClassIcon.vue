<script lang="ts" setup>
const props = defineProps(["playerClass"]);

console.log(props.playerClass);
</script>

<template>
   <img
      v-if="props.playerClass === 'swordsman'"
      class="character__icon"
      src="@/assets/icons/class-icons/swordsman.jpg"
    />
    <img
      v-if="props.playerClass === 'ranger'"
      class="character__icon"
      src="@/assets/icons/class-icons/ranger.jpg"
    />
    <img
      v-if="props.playerClass === 'sorcerer'"
      class="character__icon"
      src="@/assets/icons/class-icons/sorcerer.jpg"
    />
    <img
      v-if="props.playerClass === 'assassin'"
      class="character__icon"
      src="@/assets/icons/class-icons/assassin.jpg"
    />
</template>

<style scoped>
</style>
