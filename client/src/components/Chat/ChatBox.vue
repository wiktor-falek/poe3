<script lang="ts" setup>
import { ref } from "vue";
import { useMessageStore } from "../../stores/messageStore";
import { usePlayerStore } from "../../stores/playerStore";
import useSocketStore from "../../stores/socketStore";
import Message from "./Message.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();

const messageStore = useMessageStore();

const messages = messageStore.messages;

socket.emit("chat:join");

socket.on("chat:message", (message) => {
  messageStore.push(message);
});

socket.on("error", (message) => {
  console.log(message);
  messageStore.push({ content: message, sender: "ERROR" });
});

const inputMessage = ref("");

function sendMessage() {
  const message = inputMessage.value.trim();

  // TODO: validate length
  if (!message) {
    return;
  }

  inputMessage.value = "";

  if (message.startsWith("/")) {
    const [command, ...args] = message.split(" ");

    switch (command) {
      case "/help":
        messageStore.pushClientSideSystemMessage(
          "List of all commands:\n/help - display this message\n/clear - clear the chat\n/global n - join a chat room number n (1-999)"
        );
        return;

      case "/clear":
        messageStore.clear();
        return;

      case "/global":
        const roomNumber = +args[0];
        if (!roomNumber || roomNumber < 0 || roomNumber > 999) {
          messageStore.pushClientSideSystemMessage(
            "Command requires a number (1-999) as an argument"
          );
          return;
        }

        socket.emit("chat:join", roomNumber);
        break;

      case "/party":
        const targetCharacterName = args[0];
        if (targetCharacterName == null || targetCharacterName.length < 3)
          return messageStore.pushClientSideSystemMessage(
            "Character does not exist"
          );
        socket.emit("party:invite-character", targetCharacterName);
        break;

      case "/partyjoin": {
        const [targetCharacterName, inviteId] = args;
        socket.emit("party:accept-invite", targetCharacterName, inviteId);
        break;
      }

      default:
        messageStore.pushClientSideSystemMessage(
          `Invalid command '${message}'`
        );
    }
    // success
    return;
  }
  socket.emit("chat:message", message);
}
</script>

<template>
  <div class="chat-box">
    <div class="left">
      <div class="messages">
        <Message v-for="message in messages" :message="message" class="message" />
      </div>
      <div class="input-area">
        <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" />
        <button class="button" @click="sendMessage">Send</button>
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
  width: 100%;
  height: 100%;
  padding: 3px;
  gap: 5px;
  font-size: 20px;
}
.messages {
  padding-left: 3px;
  max-height: 172px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
  padding-right: 10%;
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
  border: 1px solid rgb(217, 212, 212);
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
  border: 1px solid white;
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
