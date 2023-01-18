<script lang="ts" setup>
import { onMounted } from 'vue';
import useSocketStore from '../../../../stores/socketStore';

const socketStore = useSocketStore();
const socket = socketStore.socket;


// onMounted(() => {
//   socket.emit("")
// })

</script>

<template>

</template>