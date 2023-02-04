<script lang="ts" setup>
import { isUndefined } from "util";
import { ref } from "vue";
import { usePlayerStore } from "../../stores/playerStore";
import useSocketStore from "../../stores/socketStore";
import ClientSideSystemMessage from "../../utils/ClientSideSystemMessage";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();

const messages = ref([]);

socket.emit("chat:join", 1);

socket.on("chat:message", (message) => {
  messages.value.push({ ...message, timestamp: Date.now() });
});

function timestampToHoursAndMinutes(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
}

const inputMessage = ref("");

function sendMessage() {
  const message = inputMessage.value.trim();
  // TODO: client side validation
  if (!message) {
    return;
  }

  inputMessage.value = "";

  if (message.startsWith("/")) {
    const [command, ...args] = message.split(" ");

    switch (command) {
      case "/clear":
        messages.value = [];
        return;

      case "/global":
        const roomNumber = +args[0];
        if (!roomNumber || roomNumber < 0 || roomNumber > 999) {
          const message = new ClientSideSystemMessage(
            "Command requires a number (1-999) as an argument"
          );

          messages.value.push(message);
          return;
        }

        console.log(roomNumber);
        socket.emit("chat:join", roomNumber);
        break;

      default:
        messages.value.push(
          new ClientSideSystemMessage(`Invalid command '${message}'`)
        );
    }
    return;
  }
  socket.emit("chat:message", message);
}
</script>

<template>
  <div class="chat-box">
    <div class="messages">
      <p class="message" v-for="message in messages">
        <span v-if="message.timestamp && message.sender !== 'SYSTEM'">
          [ {{ timestampToHoursAndMinutes(message.timestamp) }} ]
        </span>
        <span v-if="message.sender !== 'SYSTEM'" class="message__sender">
          <span
            class="message__sender__name"
            :class="{
              'this-sender': message.sender === playerStore.characterData.name,
            }"
            >{{ message.sender }}</span
          >
          <span class="message__sender__separator">:&nbsp;</span>
        </span>
        <span
          class="message__content"
          :class="{ 'message__content--system': message.sender === 'SYSTEM' }"
        >
          {{ message.content }}
        </span>
      </p>
      <div class="input-area">
        <input v-model="inputMessage" type="text" class="input" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
    <div class="status">
      <div class="status__left">
        <div
          class="circle"
          :class="{
            green: socketStore.isConnected,
            red: !socketStore.isConnected,
          }"
        ></div>
        <p class="ping bold" v-if="socketStore.isConnected">
          {{ socketStore.ping }}
        </p>
      </div>
      <div class="status__right">
        <!-- icon -->
        <p class="player-count bold" v-if="socketStore.isConnected">
          {{ socketStore.playerCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bold {
  font-weight: bold;
}
.chat-box {
  border: 2px solid rgb(217, 212, 212);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 5px;
  gap: 5px;
  font-size: 20px;
}
.messages {
  border: 2px solid rgb(217, 212, 212);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.message {
}

.message__sender {
}

.message__sender__name {
  color: white;
  font-weight: bold;
}

.message__content {
}

.message__content--system {
  color: orange;
}

.status {
  padding: 5px;
  border: 2px solid rgb(217, 212, 212);
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.status__left,
.status__right {
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: row;
  height: fit-content;
  font-size: 20px;
  height: 20px;
}

.circle {
  border: 2px solid white;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}

.input-area {
  margin-top: auto;
  font-size: 20px;
  display: flex;
  flex-direction: row;
}

.input-area > input {
  flex-grow: 1;
}

.input-area > button {
  height: 100%;
  width: 140px;
}

.this-sender {
  color: rgb(123, 123, 223);
}
</style>
