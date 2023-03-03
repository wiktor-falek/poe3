<script lang="ts" setup>
const props = defineProps({
  id: Number,
  name: String,
});
</script>

<template>
  <div class="room">
    {{ props.name }} (id={{ props.id }})
  </div>
</template>

<style scoped>
.room {
  text-align: center;
  width: 150px;
  height: 150px;
  /* default color for unavailable room */
  border: 1px solid gray;
  opacity: 0.5;
}
</style>
