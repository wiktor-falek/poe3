<script lang="ts" setup>
const bannersData = [
  { name: "swordsman", icon: "" },
  { name: "ranger", icon: "" },
  { name: "sorcerer", icon: "" },
  { name: "assassin", icon: "" },
];

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
    <div class="character-banners">
      <div class="banner" v-for="banner in bannersData">
        <p class="banner__name">{{ banner.name }}</p>
      </div>
    </div>
    <button id="select">Select</button>
  </main>
</template>

<style scoped>
main {
  padding: 5px;
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
  max-width: 250px;
  aspect-ratio: 4 / 11;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
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
    font-size: 1.6rem;
  }
}

@media only screen and (min-width: 1000px) {
  .banner__name {
    font-size: 2rem;
  }
}


#select {
  width: 200px;
  display: block;
  margin: 0 auto;
}
</style>
