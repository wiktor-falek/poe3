<script setup>
const props = defineProps({
  resistances: Object,
});

// const props = {
//   fire: 78,
//   cold: 75,
//   lightning: 74,
//   physical: 20,
//   necrotic: -10,
//   poison: 102,
// }

const displayWithParenthesis = (resistance) => {
  const displayParenthesis = resistance > 75;
  const realResistance = Math.min(resistance, 75);
  return `${realResistance}` + ( displayParenthesis? ` (${resistance})`: "" ) ;
}
</script>

<template>
  <div class="resistances">
    <div id="fire" class="resistance">
      <img src="../../../../assets/icons/resistances/fire.svg" alt="">
      <p>{{displayWithParenthesis(resistances.fire)}}</p>
    </div>
    <div id="cold" class="resistance">
      <img src="../../../../assets/icons/resistances/cold.svg" alt="">
      <p>{{displayWithParenthesis(resistances.cold)}}</p>
    </div>
    <div id="lightning" class="resistance">
      <img src="../../../../assets/icons/resistances/lightning.svg" alt="">
      <p>{{displayWithParenthesis(resistances.lightning)}}</p>
    </div>
    <div id="physical" class="resistance">
      <img src="../../../../assets/icons/resistances/physical.svg" alt="">
      <p>{{displayWithParenthesis(resistances.physical)}}</p>
    </div>
    <div id="poison" class="resistance">
      <img src="../../../../assets/icons/resistances/poison.svg" alt="">
      <p>{{displayWithParenthesis(resistances.poison)}}</p>
    </div>
    <div id="necrotic" class="resistance">
      <img src="../../../../assets/icons/resistances/necrotic.svg" alt="">
      <p>{{displayWithParenthesis(resistances.necrotic)}}</p>
    </div>
  </div>
</template>

<style scoped>
.resistances {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.resistance {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 45px;
  margin: 5px;
}

.resistance img {
  height: auto;
  width: 30px;
}
</style>
