<script lang="ts" setup>
import useSocketStore from '../../../stores/socketStore';
const socketStore = useSocketStore();
const socket = socketStore.socket;

const props = defineProps({
  zoneId: Number,
});


</script>
<template>
  zone {{ props.zoneId }}
</template>
