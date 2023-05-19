<script lang="ts" setup>
import { Ref } from "vue";
import type { CharacterClass } from "../../../common/types/index";
import { ref } from "vue";

interface BannerData {
  name: CharacterClass;
  icon: string;
}

const bannersData: Array<BannerData> = [
  { name: "swordsman", icon: "" },
  { name: "ranger", icon: "" },
  { name: "sorcerer", icon: "" },
  { name: "assassin", icon: "" },
];

const selectedClass: Ref<CharacterClass | null> = ref(null);

// TODO: @click select button show details of the selected class
// const selectedBannerDetail = ref(null);

function createCharacter() {
  fetch("http://localhost:3000/api/characters", {
    method: "POST",
    credentials: "include",
    body: new URLSearchParams({}),
  });
}
</script>

<template>
  <main>
    <h1>Choose your class</h1>
    <div class="wrapper">
      <div class="character-banners">
        <div
          class="banner"
          v-for="banner in bannersData"
          @click="selectedClass = banner.name"
          :class="{ selected: selectedClass === banner.name }"
        >
          <p class="banner__name">{{ banner.name }}</p>
        </div>
      </div>

      <div class="menu">
        <div class="menu__top">
          <RouterLink to="/play" class="button">&lt;</RouterLink>
          <input id="character-name" type="text" placeholder="Character Name" />
          <!-- hidden element -->
          <a class="button flex-hide"></a>
        </div>

        <div class="menu__bottom">
          <button id="select" :disabled="selectedClass === null" @click="">
            Create
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 5px;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2rem;
}

.character-banners {
  display: flex;
  gap: 2%;
  align-items: center;
  justify-content: center;
}
.banner {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border: 2px solid white;
  min-width: 50px;
  max-width: 230px;
  aspect-ratio: 3.5 / 10;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
}

.banner__name {
  font-weight: bold;
  text-transform: capitalize;
  font-size: 0.6rem;
}

@media only screen and (min-width: 500px) {
  .banner__name {
    font-size: 1rem;
  }
}

@media only screen and (min-width: 800px) {
  .banner__name {
    font-size: 1.5rem;
  }
}

@media only screen and (min-width: 1000px) {
  .banner__name {
    font-size: 1.8rem;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
  gap: 15px;
}

.menu__top {
  display: flex;
  justify-content: space-between;
}

.flex-hide {
  display: inline-flex;
  visibility: hidden;
}

.menu__bottom {
  display: flex;
  justify-content: center;
}

.menu__grid a {
  width: 50px;
  height: 50px;
}

#select {
  width: 100%;
  max-width: 200px;
}

#character-name {
  height: 48px;
  border-radius: 10px;
  border: none;
  padding: 10px 15px;
  width: 100%;
  max-width: 200px;
  box-sizing: border-box;
  font-size: 1.1rem;
  text-align: center;
}
</style>
