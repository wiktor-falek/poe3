<script lang="ts" setup>
import { Ref } from "vue";
import type { CharacterClass, Attributes } from "../../../common/types/index";
import { ref } from "vue";
import AttributesVue from "../components/global/Attributes.vue";
import router from "../router";

interface BannerData {
  name: CharacterClass;
  backgroundUrl: string;
}

const bannersData: Array<BannerData> = [
  { name: "swordsman", backgroundUrl: "" },
  { name: "ranger", backgroundUrl: "" },
  { name: "sorcerer", backgroundUrl: "" },
  { name: "assassin", backgroundUrl: "" },
];

interface ClassData {
  quote: string;
  description: string;
  attributes: Attributes;
}

const classesData: { [key in CharacterClass]: ClassData } = {
  swordsman: {
    quote: "Swordsman quote dolor sit amet.",
    description:
      "Description ipsum dolor sit amet consectetur adipisicing elit. Quo eum omnis quasi tempore odit nesciunt, cum laboriosam nam quae est!",
    attributes: {
      strength: 8,
      dexterity: 6,
      intelligence: 5,
      vitality: 8,
      speed: 5,
    },
  },
  ranger: {
    quote: "Ranger quote dolor sit amet.",
    description:
      "Description ipsum dolor sit amet consectetur adipisicing elit. Quo eum omnis quasi tempore odit nesciunt, cum laboriosam nam quae est!",
    attributes: {
      strength: 6,
      dexterity: 8,
      intelligence: 5,
      vitality: 6,
      speed: 7,
    },
  },
  sorcerer: {
    quote: "Sorcerer quote dolor sit amet.",
    description:
      "Description ipsum dolor sit amet consectetur adipisicing elit. Quo eum omnis quasi tempore odit nesciunt, cum laboriosam nam quae est!",
    attributes: {
      strength: 6,
      dexterity: 6,
      intelligence: 8,
      vitality: 5,
      speed: 7,
    },
  },
  assassin: {
    quote: "Assassin quote dolor sit amet.",
    description:
      "Description ipsum dolor sit amet consectetur adipisicing elit. Quo eum omnis quasi tempore odit nesciunt, cum laboriosam nam quae est!",
    attributes: {
      strength: 5,
      dexterity: 7,
      intelligence: 7,
      vitality: 5,
      speed: 8,
    },
  },
};

const selectedClass: Ref<CharacterClass | null> = ref(null);
const characterName: Ref<string | null> = ref(null);

async function createCharacter(e: Event) {
  e.preventDefault();

  if (selectedClass.value === null || characterName.value == null) {
    // TODO: display error
    return;
  }

  if (characterName.value.length < 3) {
    // TODO: display error
    return;
  }
  if (characterName.value.length > 24) {
    // TODO: display error
    return;
  }

  const response = await fetch("http://localhost:3000/api/characters", {
    method: "POST",
    credentials: "include",
    body: new URLSearchParams({
      class: selectedClass.value,
      name: characterName.value,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    // TODO: display error
    // const error = result.error;
    return;
  }

  router.push("/select")
}
</script>

<template>
  <main>
    <div class="wrapper">
      <div v-if="selectedClass === null" class="character-banners">
        <div
          tabindex="0"
          class="banner"
          v-for="banner in bannersData"
          @click="selectedClass = banner.name"
          @keyup.enter="selectedClass = banner.name"
          @keyup.space="selectedClass = banner.name"
        >
          <p class="banner__name">{{ banner.name }}</p>
        </div>
      </div>

      <div v-else class="character-detail">
        <button @click="selectedClass = null" class="button">Go Back</button>
        <h1 class="character-detail__quote">
          {{ classesData[selectedClass].quote }}
        </h1>

        <p class="character-detail__description">
          {{ classesData[selectedClass].description }}
        </p>

        <div class="character-detail__attributes">
          <div class="character-detail__attributes--strength">
            <AttributesVue
              :attributes="classesData[selectedClass].attributes"
            />
          </div>
        </div>
      </div>

      <form
        class="menu"
        id="create-character"
        action="POST"
        @submit="createCharacter($event)"
      >
        <div class="menu__top">
          <RouterLink to="/select" class="button">&lt;</RouterLink>
          <input
            id="character-name"
            for="create-character"
            type="text"
            minlength="3"
            maxlength="24"
            required
            placeholder="Character Name"
            v-model="characterName"
          />
          <!-- hidden element -->
          <a class="button flex-hide"></a>
        </div>

        <div class="menu__bottom">
          <button type="submit" id="create" :disabled="selectedClass === null">
            Create
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 5px;
  max-width: 900px;
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

.character-detail {
  display: flex;
  flex-direction: column;
  height: 480px;
  box-sizing: border-box;
  min-height: 200px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
}

.banner {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border: 2px solid white;
  min-height: 200px;
  max-height: 480px;
  box-sizing: border-box;
  aspect-ratio: 1 / 3.5;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
}

.banner__name {
  font-weight: bold;
  text-transform: capitalize;
  font-size: 0.4rem;
}

@media only screen and (min-width: 400px) {
  .banner__name {
    font-size: 0.8rem;
  }
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

#create {
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
