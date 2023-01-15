<script setup>
import { defineAsyncComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePlayerStore } from "../../stores/playerStore";
import { useAuthStore } from "../../stores/authStore";

import TabInventory from "./Tabs/TabInventory.vue";
import TabCharacter from "./Tabs/TabCharacter.vue";
import TabTalents from "./Tabs/TabTalents.vue";
import { computed } from "@vue/reactivity";
import ChatBox from "../Chat/ChatBox.vue";
import Settings from "../Game/Settings.vue";

const authStore = useAuthStore();
const playerStore = usePlayerStore();

const characterData = ref();

const fetchCharacter = async () => {
  const validateCharacterId = (id) => {
    if (!id || typeof id !== "string" || id.length !== 24) {
      return false;
    }
    return id;
  };
  const id = validateCharacterId(useRoute().params.characterId);
  if (!id) {
    window.location.href = "/";
    return;
  }

  const url = `http://localhost:3000/api/v1/character/${id}`;
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 304) {
    authStore.setIsAuthenticated(true);
    const character = await response.json();
    return character;
  }
};

fetchCharacter().then((character) => {
  playerStore.loadCharacterData(character);
  characterData.value = character;
});

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
  console.log("changing view to ", viewName);
  selectedMainView.value = viewName;
}
</script>

<template>
  <main v-if="characterData" @contextmenu.prevent="">
    <div class="game">
      <div class="div1">
        <MainView />
      </div>

      <div class="div2">
        <ChatBox />
      </div>

      <div class="div3">
        <TabInventory
          v-if="selectedTab === 'inventory'"
          :characterData="characterData"
        />
        <TabCharacter
          v-if="selectedTab === 'character'"
          :characterData="characterData"
        />
        <TabTalents
          v-if="selectedTab === 'talents'"
          :characterData="characterData"
        />
        <div class="tab-buttons">
          <button @click="selectedTab = 'inventory'">Inventory</button>
          <button @click="selectedTab = 'character'">Character</button>
          <button @click="selectedTab = 'talents'">Talents</button>
        </div>
      </div>

      <div class="div4">
        <button @click="changeView('town')">Town</button>
        <button class="button-disabled">Blacksmith</button>
        <button class="button-disabled">Alchemist</button>
        <button class="button-disabled">Something</button>
        <button class="button-disabled">Stash</button>

        <!-- br go brrr -->
        <br />
        <hr />
        <br />

        <button class="button-disabled">Arena</button>
        <button class="button-disabled">Guild</button>
        <button class="button-disabled">Hall of Fame</button>

        <!-- br go brrr -->
        <br />
        <hr />
        <br />

        <button @click="changeView('mainStory')">Main Story</button>
        <button class="button-disabled">Dungeons</button>
        <button class="button-disabled">Endgame</button>
        <button class="button-disabled">More Endgame</button>
      </div>

      <div class="div5">
        <Settings />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  user-select: none;
}

.game {
  display: grid;
grid-template-columns: 2fr 9fr 3fr;
grid-template-rows: 3fr 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px; 
  gap: 5px;

  width: 100%;
  height: 100%;
}
.div1 {
  grid-area: 1 / 2 / 2 / 3;

  border: 2px solid rgb(217, 212, 212);
  width: 100%;
  height: 100%;
}

.div2 {
  grid-area: 2 / 2 / 3 / 3;
}

.div3 {
  grid-area: 1 / 3 / 2 / 4;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 2px solid rgb(217, 212, 212);
  width: 100%;
  height: 100%;
}

.div4 {
  grid-area: 1 / 1 / 3 / 2;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;

  border: 2px solid rgb(217, 212, 212);
  width: 100%;
  height: 100%;
}

.div5 {
  grid-area: 2 / 3 / 3 / 4;
}

.div1 { grid-area: 1 / 2 / 2 / 3; }
.div2 { grid-area: 2 / 2 / 3 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 1 / 1 / 3 / 2; }
.div5 { grid-area: 2 / 3 / 3 / 4; } 
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
  width: 354px;
}
.tab-buttons button {
  flex: 1;
  border-radius: 0;
}
</style>
