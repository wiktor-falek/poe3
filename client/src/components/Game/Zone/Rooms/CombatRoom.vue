<script lang="ts" setup>
const props = defineProps(["room"]);

const emit = defineEmits(["leaveRoom"]);

console.log(props.room);

// TODO: render enemies
// TODO: render player party
// TODO: basic combat ui
</script>

<template>
  <div class="combat">
    <div class="party party--enemy">
      <div class="entity" v-for="enemy in room.enemies">
        {{ enemy.name }} (Lvl {{ enemy.lvl }})
      </div>
    </div>

    <div class="party party--ally">
      <div class="entity">Player</div>
    </div>

    <div class="hud">
    </div>
  </div>
</template>

<style scoped>
.combat {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: px;
  grid-row-gap: 0px;
  height: 100%;
}

.party--enemy {
}
.party--ally {
}
.hud {
}

.party {
  display: flex;
  justify-content: center;
  border: 2px solid gray;
  box-sizing: content-box;
}

.entity {
  display: flex;
  justify-content: center;
  height: 80px;
  border: 2px solid gray;
  width: calc(100% / 8);
}
</style>
