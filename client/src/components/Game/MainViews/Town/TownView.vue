<script lang="ts" setup>
import useSocketStore from '../../../../stores/socketStore';
import TestModal from '../../../Modals/TestModal.vue';

const socketStore = useSocketStore();
const socket = socketStore.socket;
</script>

<template>
  <h1>Town</h1>
  <TestModal />
</template>

<style scoped></style>
