<script setup>

const props = defineProps({
  name: String,
  playerClass: String,
  level: Number,
  hp: Number,
  maxHp: Number,
  mp: Number,
  maxMp: Number,
})

</script>

<template>
  <div class="character-overview">
    <p class="name">{{ name }}</p>
    <p>
      <span class="class">{{ playerClass }} &nbsp;</span>
      <span class="level">Lv {{ level }}</span>
    </p>
    <div class="resources">
      <div class="resources__hp">{{ hp }} / {{ maxHp }}</div>
      <div class="resources__mp">{{ mp }} / {{ maxMp }}</div>
    </div>
  </div>
</template>

<style scoped>
.character-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  user-select: none;
}
.class {
  text-transform: capitalize;
}
.resources {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  letter-spacing: 0.05em;
  gap: 2px;
  background-color: grey;
  border: 2px solid grey;
}

.resources > *:not(:last-child) {
  border-bottom: 1px solid rgb(180, 180, 180);
}

.resources > * {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  color: rgb(199, 199, 199);
  font-weight: 600;
}

.resources__hp {
  background-color: #db3f3f;
}

.resources__mp {
  background-color: #483ebe;
}
</style>
