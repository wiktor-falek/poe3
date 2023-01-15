<script setup>
import { defineAsyncComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePlayerStore } from "../../stores/playerStore";
import { useAuthStore } from "../../stores/authStore";

import TabInventory from "./Tabs/TabInventory.vue";
import TabCharacter from "./Tabs/TabCharacter.vue";
import TabTalents from "./Tabs/TabTalents.vue";
import { computed } from "@vue/reactivity";

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
          return import("./MainViews/TownView.vue");
        case "mainStory":
          return import("./MainViews/MainStoryView.vue");
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
      <div class="panel-left">
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
      <div class="panel-middle">
        <MainView />
      </div>
      <div class="panel-right">
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
    </div>
  </main>
</template>

<style scoped>
main {
  user-select: none;
}

.game {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.panel-left {
  /* width: 250px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.panel-middle {
  width: 100%;
  border: 2px solid orange;
  margin: 15px 0;
}

.panel-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
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
  width: 354px;
}
.tab-buttons button {
  flex: 1;
  border-radius: 0;
}
</style>
