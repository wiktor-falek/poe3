<script lang="ts" setup>
import * as gameServer from "../../../src/socket/gameServer";
</script>

<template>
  <h1>Instance</h1>
  <p>{{ gameServer.state.instance }}</p>
</template>
