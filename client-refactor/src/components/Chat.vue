<script lang="ts" setup>
import * as chat from "../socket/chat";
</script>

<template>
  <div class="chat">
    <div class="messages">
      <div class="message" v-for="message in chat.state.messageEvents">
        {{ message.sender }}: {{ message.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat {
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  border: 2px solid gray;
  position: absolute;
  background-color: rgb(45, 45, 45, 0.4);
  padding: 5px;
}
</style>
