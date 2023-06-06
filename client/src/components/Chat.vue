<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../socket/gameServer";
import useCharacterStore from "../stores/characterStore";

const characterStore = useCharacterStore();

const message: Ref<string> = ref("");

const isCollapsed: Ref<boolean> = ref(false);

function send() {
  if (!message.value) {
    return;
  }
  gameServer.socket.emit("chat:send", message.value);
  message.value = "";
}
</script>

<template>
  <div class="chat">
    <div class="toggle-collapsed" @click="isCollapsed = !isCollapsed"></div>
    <div class="accordion" :class="{ collapsed: isCollapsed }">
      <div class="top">
        <div class="messages">
          <p class="message" v-for="message in gameServer.state.messageEvents">
            <span
              class="message__sender"
              :class="{
                'message__sender--server': message.sender === 'SERVER',
                'message__sender--current-character':
                  message.sender === characterStore.staticCharacter?.name,
              }"
              >{{ message.sender }}</span
            >
            <span class="message__separator">:&nbsp;</span>
            <span class="message__content">{{ message.content }}</span>
          </p>
        </div>
      </div>
      <input
        type="text"
        maxlength="128"
        @keydown.enter="send"
        v-model="message"
      />
    </div>
  </div>
</template>

<style scoped>
.chat {
  width: 100%;
  max-width: 600px;
}

.toggle-collapsed {
  position: relative;
  display: inline-block;
  left: 50%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, 7px);
  background-color: rgb(55, 55, 55);
}

.expand:hover {
  background-color: rgb(80, 80, 80);
}

.top {
  min-height: 200px;
  /* TODO: let user expand height by left click dragging */
  max-height: 200px;
  border: 2px solid gray;
  background-color: rgb(45, 45, 45, 0.4);
  padding: 2px 4px;
  overflow: scroll;
}

input {
  width: 100%;
  height: 36px;
  font-size: 20px;
  box-sizing: border-box;
}

.accordion {
  max-height: 250px;
  -webkit-transition: max-height 0.4s ease-out;
  -moz-transition: max-height 0.4s ease-out;
  -ms-transition: max-height 0.4s ease-out;
  -o-transition: max-height 0.4s ease-out;
  transition: max-height 0.4s ease-out;
  overflow: hidden;
}

.collapsed {
  max-height: 0px !important;
}

.message {
  margin: 0;
}

.message__sender {
  color: rgb(221, 221, 221);
  font-weight: bold;
}

.message__separator {
}

.message__content {
  color: rgb(200, 200, 200);
}

.message__sender--server {
  color: rgb(222, 98, 35);
}
.message__sender--current-character {
  color: rgb(64, 135, 243);
}
</style>
