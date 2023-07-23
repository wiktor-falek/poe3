<script lang="ts" setup>
import * as gameServer from "../../socket/gameServer";

function handleDiscard() {
  gameServer.state.rewards = null;
}

function handleAccept() {}
</script>

<template>
  <!-- <Teleport to="body" class=""> -->
  <div class="rewards modal" v-if="gameServer.state.rewards">
    <p>Rewards</p>
    <!-- <p>{{ gameServer.state.rewards }}</p> -->
    <div class="inventory">
      <div class="inventory-slot" v-for="i in 15">
        <div class="item" v-if="gameServer.state.rewards[i]">
          <img src="../../assets/item-icons/ring.jpg" />
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="button" @click="handleDiscard()">Discard</button>
      <button class="button" @click="handleAccept()">Accept</button>
    </div>
  </div>
  <!-- </Teleport> -->
</template>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border-left: 1px solid rgb(180, 180, 180);
  border-bottom: 1px solid rgb(180, 180, 180);
}

.modal {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
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
