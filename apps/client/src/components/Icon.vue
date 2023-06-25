<script lang="ts" setup>
import exitDoor from "../assets/game-icons/exit-door.svg";
import playerNext from "../assets/game-icons/player-next.svg";

const props = defineProps<{ imgId: string; keyBind?: string; selected?: boolean }>();

const icons: { [id: string]: string } = {
  0: exitDoor,
  1: playerNext,
};
</script>

<template>
  <div
    class="skill-icon"
    :class="{ selected: selected }"
    :style="{ 'background-image': `url(${icons[imgId]})` }"
  >
    <p v-if="keyBind">{{ keyBind }}</p>
  </div>
</template>

<style scoped>
.skill-icon {
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  border: 2px solid rgb(186, 186, 186);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(42, 42, 42);
}

.skill-icon > p {
  font-size: 16px;
  margin: 0;
  line-height: 1em;
  font-weight: bold;
  font-family: BmCube;
  display: inline-block;
}
.skill-icon:hover {
  border-color: white;
}
.selected {
  border-color: var(--select);
}
</style>
