<script lang="ts" setup>
import { ref, watch } from "vue";
import { useMessageStore } from "../../stores/messageStore";
import useSocketStore from "../../stores/socketStore";
import Message from "./Message.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const messageStore = useMessageStore();
const messages = messageStore.messages;

socket.emit("chat:join");

socket.on("chat:message", (message) => {
  messageStore.push(message);
});

socket.on("error", (message) => {
  messageStore.pushClientSideSystemMessage(message)
});

// Persist checked groups
const checkedGroups = ref(
  JSON.parse(localStorage.getItem("checkedGroups")) ?? [
    "GLOBAL",
    "WHISPER",
    "PARTY",
    "GUILD",
  ]
);
watch(checkedGroups, () => {
  // TODO: scroll to bottom on change
  localStorage.setItem("checkedGroups", JSON.stringify(checkedGroups.value));
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
        <Message
          v-for="message in messages"
          :message="message"
          v-show="
            checkedGroups.includes(message.group) || message.group == 'SYSTEM'
          "
          class="message"
        />
      </div>
      <div class="input-area">
        <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" />
        <button class="button" @click="sendMessage">Send</button>
      </div>
    </div>

    <div class="status">
      <div class="status__top">
        <p v-if="socketStore.isConnected">Latency: {{ socketStore.ping }}</p>

        <p v-if="socketStore.isConnected">
          Online: {{ socketStore.playerCount }}
        </p>
      </div>

      <div class="status__bottom">
        <!-- these were meant to be components but shit didn't work so idgaf -->
        <div
          class="checkbox-button"
          :class="{ unchecked: !checkedGroups.includes('GLOBAL') }"
        >
          <label for="global">Global</label>
          <input
            id="global"
            type="checkbox"
            value="GLOBAL"
            v-model="checkedGroups"
            hidden
          />
        </div>
        <div
          class="checkbox-button"
          :class="{ unchecked: !checkedGroups.includes('WHISPER') }"
        >
          <label for="whisper">Whisper</label>
          <input
            id="whisper"
            type="checkbox"
            value="WHISPER"
            v-model="checkedGroups"
            hidden
          />
        </div>
        <div
          class="checkbox-button"
          :class="{ unchecked: !checkedGroups.includes('PARTY') }"
        >
          <label for="party">Party</label>
          <input
            id="party"
            type="checkbox"
            value="PARTY"
            v-model="checkedGroups"
            hidden
          />
        </div>
        <div
          class="checkbox-button"
          :class="{ unchecked: !checkedGroups.includes('GUILD') }"
        >
          <label for="guild">Guild</label>
          <input
            id="guild"
            type="checkbox"
            value="GUILD"
            v-model="checkedGroups"
            hidden
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-button label {
  background-color: rgb(60, 60, 60);
  border: 1px solid rgb(188, 188, 188);
  display: block;
  text-align: center;
}

.unchecked {
  opacity: 0.5;
}

.chat-box {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 3px;
  gap: 5px;
  font-size: 18px;
}
.messages {
  padding-left: 3px;
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
  width: 120px;
  padding: 5px;
  border: 1px solid rgb(217, 212, 212);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.status__top > p {
  font-weight: bold;
  line-height: 1.4em;
}

.status__bottom {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.input-area {
  display: flex;
  gap: 5px;
  flex-direction: row;
}

.input-area > input {
  padding: 0;
  flex-grow: 1;
  font-size: 18px;
  height: 28px;
  padding: 0 4px;
}

.input-area > button {
  height: 100%;
  width: 140px;
}
</style>
