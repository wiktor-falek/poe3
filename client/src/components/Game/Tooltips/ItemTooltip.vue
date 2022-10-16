<script setup>
const props = defineProps(["itemData"]);

</script>

<template>
  <div class="tooltip--item" v-if="props">
    <p
      class="tooltip--item__name"
      :class="{
        'color--normal': props.itemData.rarity === 'normal',
        'color--magic': props.itemData.rarity === 'magic',
        'color--rare': props.itemData.rarity === 'rare',
        'color--unique': props.itemData.rarity === 'unique',
      }"
    >
      {{ props.itemData.name }}
    </p>
    
    <hr>
    
    <p
      v-if="props.itemData.level_requirement"
      class="tooltip--item__level-requirement"
    >
      Requires level {{ props.itemData.level_requirement }}
    </p>

    <hr>

    <p v-if="props.itemData.damage" class="tooltip--item__damage">
      Adds {{ props.itemData.damage[0] }} to
      {{ props.itemData.damage[1] }} damage to attacks
    </p>
    <p
      v-if="props.itemData.critical_chance"
      class="tooltip--item__critical-chance"
    >
      {{ props.itemData.critical_chance }}% Critical strike chance
    </p>
  </div>
</template>

<style scoped>
.tooltip--item {
  position: absolute;
  left: -200px;
  top: 125px;
  width: 300px;
  min-height: 150px;
  background-color: rgb(30, 30, 30);
  opacity: 0.95;
  border: 2px solid orange;
  z-index: 10000;
  padding: 15px 10px;
  text-align: center;

  display: flex;
  gap: 20px;
  line-height: 1.2;
  flex-direction: column;
  align-items: center;
}

.tooltip--item__name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
  width: 100%;
}

hr {
  width: 80%;
}

</style>
