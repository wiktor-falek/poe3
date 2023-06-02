<script setup>
import SpiderChart from "./subcomponents/SpiderChart.vue";
const attributes = {
  strength: 5,
  dexterity: 7,
  intelligence: 7,
  vitality: 5,
  speed: 8,
};
</script>

<template>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

  <SpiderChart />

  <div class="attributes">
    <div class="attribute attribute__strenght">
      <p>Strength</p>
      <div class="attribute-bar attribute-bar__strength">
        <div class="rect strength"></div>
        <div class="rect strength"></div>
        <div class="rect strength"></div>
        <div class="rect strength"></div>
        <div class="rect strength">5</div>
        <div class="rect"></div>
        <div class="rect"></div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__dexterity">
      <p>Dexterity</p>
      <div class="attribute-bar attribute-bar__dexterity">
        <div class="rect dexterity"></div>
        <div class="rect dexterity"></div>
        <div class="rect dexterity"></div>
        <div class="rect dexterity"></div>
        <div class="rect dexterity"></div>
        <div class="rect dexterity"></div>
        <div class="rect dexterity">7</div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__intelligence">
      <p>Intelligence</p>
      <div class="attribute-bar attribute-bar__intelligence">
        <div class="rect intelligence"></div>
        <div class="rect intelligence"></div>
        <div class="rect intelligence"></div>
        <div class="rect intelligence"></div>
        <div class="rect intelligence"></div>
        <div class="rect intelligence"></div>
        <div class="rect intelligence">7</div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__vitality">
      <p>Vitality</p>
      <div class="attribute-bar attribute-bar__vitality">
        <div class="rect vitality"></div>
        <div class="rect vitality"></div>
        <div class="rect vitality"></div>
        <div class="rect vitality"></div>
        <div class="rect vitality">5</div>
        <div class="rect"></div>
        <div class="rect"></div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__speed">
      <p>Speed</p>
      <div class="attribute-bar attribute-bar__speed">
        <div class="rect speed"></div>
        <div class="rect speed"></div>
        <div class="rect speed"></div>
        <div class="rect speed"></div>
        <div class="rect speed"></div>
        <div class="rect speed"></div>
        <div class="rect speed"></div>
        <div class="rect speed">8</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/character-info.css";
</style>
