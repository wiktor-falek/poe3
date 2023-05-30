<script setup lang="ts">
import * as global from "../src/socket/global";
global.socket.connect()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
