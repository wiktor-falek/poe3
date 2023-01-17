<script lang="ts" setup>
const props = defineProps({
  name: String,
});
</script>

<template>
  <div class="room">
    {{ props.name }}
  </div>
</template>

<style scoped>
.room {
  width: 150px;
  height: 150px;
  border: 2px solid white;
}
</style>
