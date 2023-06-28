<script lang="ts" setup>
import * as gameServer from "../../socket/gameServer";

const rewards = gameServer.state.rewards;
console.log({ ...rewards });
</script>

<template>
  <!-- <Teleport to="body" class=""> -->
  <div class="rewards modal">
    <p>Rewards</p>
    <div class="inventory">
      <div class="inventory-slot" v-for="i in 18">
        <div class="item"><img src="../../assets/item-icons/ring.jpg" alt="" /></div>
      </div>
    </div>
    <div class="buttons">
      <button class="button">Decline</button>
      <button class="button">Accept</button>
    </div>
  </div>
  <!-- </Teleport> -->
</template>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border-left: 1px solid rgb(180, 180, 180);
  border-bottom: 1px solid rgb(180, 180, 180);
}

.modal {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: rgb(50, 50, 50);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttons {
  display: flex;
  /* take all available space evenly for both */
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
