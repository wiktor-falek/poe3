<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as chat from "../socket/chat";

const message: Ref<string> = ref("");

function send() {
  chat.socket.emit("send", message.value)
  message.value = "";
}
</script>

<template>
  <div class="chat">
    <div class="top">
      <div class="messages">
        <div class="message" v-for="message in chat.state.messageEvents">
          {{ message.sender }}: {{ message.content }}
        </div>
      </div>
    </div>
    <input
      type="text"
      maxlength="128"
      @keydown.enter="send"
      v-model="message"
    />
  </div>
</template>

<style scoped>
.chat {
  width: 100%;
  max-width: 600px;
}

.chat > * {
  box-sizing: border-box;
}

.top {
  min-height: 200px;
  border: 2px solid gray;
  background-color: rgb(45, 45, 45, 0.4);
  padding: 2px 4px;
}

input {
  width: 100%;
  height: 36px;
  font-size: 20px;
}
</style>
