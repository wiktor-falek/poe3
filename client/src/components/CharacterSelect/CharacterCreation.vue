<script setup>
import { ref } from "vue";
import CharacterInfoRanger from "./CharacterInfos/CharacterInfoRanger.vue";
import CharacterInfoSwordsman from "./CharacterInfos/CharacterInfoSwordsman.vue";
import CharacterInfoSorcerer from "./CharacterInfos/CharacterInfoSorcerer.vue";
import CharacterInfoAssassin from "./CharacterInfos/CharacterInfoAssassin.vue";

const nickname = ref("");
const banners = ref();

const selectedCharacter = ref(null);

const selectCharacter = (e, playerClass) => {
  selectedCharacter.value = playerClass;

  [...banners.value.children].forEach((banner) => {
    banner.classList.remove("focus");
  });
  e.target.parentElement.classList.add("focus");
};

const createCharacter = () => {
  const characterClass = selectedCharacter.value;
  const characterNickname = nickname.value;

  if (
    !["swordsman", "ranger", "sorcerer", "assassin"].includes(characterClass)
  ) {
    // TODO: toast
    return;
  }

  if (characterNickname.length < 3) {
    // TODO: toast
    return;
  }
  if (characterNickname.length > 24) {
    // TODO: toast
    return;
  }

  // fetch POST
  const postCharacter = async () => {
    const url = "http://localhost:3000/api/v1/character";
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: characterNickname,
        class: characterClass,
      }),
    };
    fetch(url, options).then(async (response) => {
      // if (response.status === 200) {
      // }
      const data = await response.json();
      window.location.href = "/";
    });
  };

  postCharacter();

  // cleanup
  [...banners.value.children].forEach((banner) => {
    banner.classList.remove("focus");
  });

  selectedCharacter.value = null;
};
</script>

<template>
  <div class="center">
    <div class="banners" ref="banners">
      <div class="banner">
        <img
          src="@/assets/icons/class-icons/swordsman.jpg"
          class="banner__image"
        />
        <p class="banner__class-name">Swordsman</p>
        <p class="banner__flavor-text">Lorem ipsum</p>
        <div class="banner__skill-icons">
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
        </div>
        <p class="banner__description">Playstyle description</p>
        <button class="select" @click="selectCharacter($event, 'swordsman')">
          Select
        </button>
      </div>
      <div class="banner">
        <img
          src="@/assets/icons/class-icons/ranger.jpg"
          class="banner__image"
        />
        <p class="banner__class-name">Ranger</p>
        <p class="banner__flavor-text">Lorem ipsum</p>
        <div class="banner__skill-icons">
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
        </div>
        <p class="banner__description">Playstyle description</p>
        <button class="select" @click="selectCharacter($event, 'ranger')">
          Select
        </button>
      </div>
      <div class="banner">
        <img
          src="@/assets/icons/class-icons/sorcerer.jpg"
          class="banner__image"
        />
        <p class="banner__class-name">Sorcerer</p>
        <p class="banner__flavor-text">Master of arcane energy and elements</p>
        <div class="banner__skill-icons">
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
        </div>
        <p class="banner__description">Playstyle description</p>
        <button class="select" @click="selectCharacter($event, 'sorcerer')">
          Select
        </button>
      </div>
      <div class="banner">
        <img
          src="@/assets/icons/class-icons/assassin.jpg"
          class="banner__image"
        />
        <p class="banner__class-name">Assassin</p>
        <p class="banner__flavor-text">Lorem ipsum</p>
        <div class="banner__skill-icons">
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="banner__skill-icon">
            <!-- <img src="" alt=""> -->
          </div>
        </div>
        <p class="banner__description">Playstyle description</p>
        <button class="select" @click="selectCharacter($event, 'assassin')">
          Select
        </button>
      </div>
    </div>
  </div>

  <div class="character-info" v-if="selectedCharacter">
    <div class="character-info__top">
      <button class="button-close hidden"></button>
      <h2 class="character-info__name">
        {{ selectedCharacter }}
      </h2>
      <button class="button-close" @click="selectedCharacter = null"></button>
    </div>
    <CharacterInfoSwordsman v-if="selectedCharacter === 'swordsman'" />
    <CharacterInfoRanger v-if="selectedCharacter === 'ranger'" />
    <CharacterInfoSorcerer v-if="selectedCharacter === 'sorcerer'" />
    <CharacterInfoAssassin v-if="selectedCharacter === 'assassin'" />
    <input
      class="nickname"
      type="text"
      placeholder="Nickname"
      v-model="nickname"
      min="4"
      required
    />
    <button id="create" class="margin-vertical" @click="createCharacter">
      Create Character
    </button>
  </div>
</template>

<style scoped>
.character-info {
  --width: 350px;
  width: var(--width);
  position: absolute;
  left: calc(100% - var(--width));
  width: 350px;
  border: 2px solid #3c454b;
  z-index: 100;
  background-color: rgb(30, 30, 30);
}

.character-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5px 15px;
}

.character-info > .button-close {
  position: relative;
  margin-left: auto;
}

.character-info__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.character-info__name::first-letter {
  text-transform: uppercase;
}

.hidden {
  visibility: hidden;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banners {
  display: flex;
  gap: 20px;
}

.banner {
  text-align: center;
  box-sizing: border-box;
  border: 2px solid #3c454b;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 600px;
  width: 240px;
  background-color: rgb(20, 20, 20);
}

.banner__image {
  margin-top: 30px;
  width: 128px;
  height: 128px;
  border: 2px solid #3c454b;
  border-radius: 50%;
}

.banner__class-name {
  font-weight: 600;
  font-size: 24px;
  color: rgb(240, 231, 231);
}

.banner__flavor-text {
  height: 84px;
  margin-top: 20px;
  padding: 0px 15px;
}

.banner__skill-icons {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.banner__skill-icon {
  box-sizing: content-box;
  width: 48px;
  height: 48px;
  border: 2px solid rgb(211, 211, 211);
  background-color: transparent;
}

.banner__description {
  margin-top: 20px;
}

.select {
  bottom: 20px;
  position: absolute;
  border: 2px solid lightblue;
}

.nickname {
  height: 30px;
  font-size: 16px;
  text-align: center;
  width: 170px;
  margin-top: 10px;
}

.banner__skill-icon {
  box-sizing: border-box;
  background-image: none;
}
</style>
