<script lang="ts" setup>
// import useCharacterStore from "../../stores/characterStore";
// const characterStore = useCharacterStore();
// const inventory: Array<any> | undefined = characterStore.character?.inventory;
const inventory: Array<unknown> = [];
</script>

<template>
  <div class="inventory">
    <div class="inventory-slot" v-for="(item, index) in inventory">
      <div class="item">
        <img src="../../assets/item-icons/ring.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  border-left: 1px solid rgb(180, 180, 180);
  border-bottom: 1px solid rgb(180, 180, 180);
}

.inventory-slot {
  width: 53px;
  height: 53px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 1px solid rgb(180, 180, 180);
  border-right: 1px solid rgb(180, 180, 180);
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
}

.item > img {
  width: 48px;
  height: 48px;
}
</style>
../../stores/playerStore