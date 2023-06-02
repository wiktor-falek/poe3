<script setup>
import SpiderChart from "./subcomponents/SpiderChart.vue";

</script>

<template>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

  <SpiderChart />

  <div class="attributes">
    <div class="attribute attribute__strenght">
      <p>Strength</p>
      <div class="attribute-bar attribute-bar__strength">
        <div class="rect strength light"></div>
        <div class="rect strength light"></div>
        <div class="rect strength light"></div>
        <div class="rect strength light"></div>
        <div class="rect strength light"></div>
        <div class="rect strength light">6</div>
        <div class="rect"></div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__dexterity">
      <p>Dexterity</p>
      <div class="attribute-bar attribute-bar__dexterity">
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light"></div>
        <div class="rect dexterity light">8</div>
      </div>
    </div>

    <div class="attribute attribute__intelligence">
      <p>Intelligence</p>
      <div class="attribute-bar attribute-bar__intelligence">
        <div class="rect intelligence light"></div>
        <div class="rect intelligence light"></div>
        <div class="rect intelligence light"></div>
        <div class="rect intelligence light"></div>
        <div class="rect intelligence light">5</div>
        <div class="rect"></div>
        <div class="rect"></div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__vitality">
      <p>Vitality</p>
      <div class="attribute-bar attribute-bar__vitality">
        <div class="rect vitality light"></div>
        <div class="rect vitality light"></div>
        <div class="rect vitality light"></div>
        <div class="rect vitality light"></div>
        <div class="rect vitality light"></div>
        <div class="rect vitality light">6</div>
        <div class="rect"></div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="attribute attribute__speed">
      <p>Speed</p>
      <div class="attribute-bar attribute-bar__speed">
        <div class="rect speed light"></div>
        <div class="rect speed light"></div>
        <div class="rect speed light"></div>
        <div class="rect speed light"></div>
        <div class="rect speed light"></div>
        <div class="rect speed light"></div>
        <div class="rect speed light">7</div>
        <div class="rect"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/character-info.css";
</style>
