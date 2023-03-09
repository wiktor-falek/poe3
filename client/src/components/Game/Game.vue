<script setup>
import { defineAsyncComponent, ref } from "vue";
import { usePlayerStore } from "../../stores/playerStore";

import TabInventory from "./Tabs/TabInventory.vue";
import TabCharacter from "./Tabs/TabCharacter.vue";
import TabStats from "./Tabs/TabPlaceholder.vue";
import { computed } from "@vue/reactivity";
import ChatBox from "../Chat/ChatBox.vue";
import Settings from "../Game/Settings.vue";
import Party from "../Party.vue";

const playerStore = usePlayerStore();
const character = playerStore.character;

const selectedTab = ref("inventory");

const selectedMainView = ref("town");
const MainView = computed(
  () =>
    selectedMainView.value &&
    defineAsyncComponent(() => {
      switch (selectedMainView.value) {
        case "town":
          return import("./MainViews/Town/TownView.vue");
        case "mainStory":
          return import("./MainViews/MainStory/MainStoryView.vue");
      }
    })
);

function changeView(viewName) {
  selectedMainView.value = viewName;
}
</script>

<template>
  <main @contextmenu.prevent="">
    <div class="game">
      <div class="div1">
        <button class="button" @click="changeView('town')">Town</button>
        <button class="button button-disabled">Blacksmith</button>
        <button class="button button-disabled">Alchemist</button>
        <button class="button button-disabled">Something</button>
        <button class="button button-disabled">Stash</button>

        <hr />

        <button class="button button-disabled">Arena</button>
        <button class="button button-disabled">Guild</button>
        <button class="button button-disabled">Hall of Fame</button>
        <button class="button button-disabled">Something</button>

        <hr />

        <button class="button" @click="changeView('mainStory')">
          Main Story
        </button>
        <button class="button button-disabled">Dungeons</button>
        <button class="button button-disabled">Endgame</button>
        <button class="button button-disabled">More Endgame</button>

        <div class="settings">
          <Settings />
        </div>
      </div>

      <div class="div2">
        <MainView />
      </div>

      <div class="div3">
        <ChatBox />
      </div>

      <div class="div4">
        <TabInventory v-if="selectedTab === 'inventory'" />
        <TabCharacter v-if="selectedTab === 'character'" />
        <TabStats v-if="selectedTab === 'placeholder'" />
        <div class="tab-buttons">
          <button
            class="button button--no-min-width"
            @click="selectedTab = 'inventory'"
          >
            Inventory
          </button>
          <button
            class="button button--no-min-width"
            @click="selectedTab = 'character'"
          >
            Character
          </button>
          <button
            class="button button--no-min-width"
            @click="selectedTab = 'placeholder'"
          >
            Placeholder
          </button>
        </div>
        <Party class="party" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  user-select: none;
}

.party {
  width: 100%;
}

/* GRID */
.game {
  display: grid;
  grid-template-columns: 1.2fr 6fr 2fr;
  grid-template-rows: 3fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 3 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 2 / 2 / 3 / 3;
}
.div4 {
  grid-area: 1 / 3 / 3 / 4;
}
/* END GRID */

.game {
  gap: 3px;
  height: calc(100vh - 50px);
}

.game > * {
  border: 1px solid rgb(217, 212, 212);
  overflow: auto;
}

.div1 {
  display: flex;

  padding: 7px 15px;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}

.div2 {
}

.div3 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.div4 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

hr {
  border: none;
  height: 1px;
  margin: 0px px;
  background-color: gray;
}

.tab {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 600px;
  width: fit-content;
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.tab-buttons button {
  height: 40px;
  flex: 1;
  border-radius: 0;
}

.settings {
  height: 85px;
  border-radius: 5px;
  margin-top: auto;
}
</style>
