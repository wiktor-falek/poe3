<script lang="ts" setup>
import { ref } from "vue";
import { usePlayerStore } from "../../stores/playerStore";
import useSocketStore from "../../stores/socketStore";
import ClientSideSystemMessage from "../../utils/ClientSideSystemMessage";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();

const messages = ref([]);

socket.emit("chat:join");

socket.on("chat:message", (message) => {
  messages.value.push({ ...message, timestamp: Date.now() });
});

function unixToReadable(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toTimeString().slice(0, 5);
}

const inputMessage = ref("");

function sendMessage() {
  const message = inputMessage.value.trim();
  console.log(message);
  // TODO: validate length
  if (!message) {
    return;
  }

  inputMessage.value = "";

  if (message.startsWith("/")) {
    const [command, ...args] = message.split(" ");

    switch (command) {
      case "/help":
        messages.value.push(
          new ClientSideSystemMessage(
            "List of all commands:\n/help - display this message\n/clear - clear the chat\n/global n - join a chat room number n (1-999)"
          )
        );
        return;

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
    <div class="left">
      <div class="messages">
        <p class="message" v-for="message in messages">
          <span
            class="message__timestamp"
            v-if="message.timestamp && message.sender !== 'SYSTEM'"
          >
            [ {{ unixToReadable(message.timestamp) }} ]
          </span>
          <span v-if="message.sender !== 'SYSTEM'" class="message__sender">
            <span
              class="message__sender__name"
              :class="{
                'this-sender':
                  message.sender === playerStore.characterData.name,
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
      </div>
      <div class="input-area">
          <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" />
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
        <!-- TODO: users icon -->
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
  display: flex;
  border: 2px solid rgb(217, 212, 212);
  width: 100%;
  height: 100%;
  padding: 5px;
  gap: 5px;
  font-size: 20px;
}
.messages {
  max-height: 167px;
  overflow: scroll;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
  padding-right: 10%;
}

.message {
  user-select: text; /* set explicitly, because everywhere else disabled by default */
  white-space: pre-line;
  font-size: 17px;
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

.left {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.status {
  min-width: 150px;
  width: 150px;
  padding: 5px;
  border: 2px solid rgb(217, 212, 212);
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
  font-size: 20px;
  display: flex;
  gap: 5px;
  flex-direction: row;
}

.input-area > input {
  padding: 0;
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
