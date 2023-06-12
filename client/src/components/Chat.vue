<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../socket/gameServer";
import useCharacterStore from "../stores/characterStore";

const characterStore = useCharacterStore();

const content: Ref<string> = ref("");

const isCollapsed: Ref<boolean> = ref(false);

type Commands = { [name: string]: Function | undefined };

const clientSideCommands: Commands = {
  help: () => {
    gameServer.state.messages.push({
      sender: "SYSTEM",
      group: "SYSTEM",
      content: "/help - display this message\n" + "/clear - clear all the messages\n",
    });
  },
  clear: () => {
    gameServer.state.messages.splice(0); // same as set to [] but reactive
  },
};

const serverSideCommands: Commands = {
  global: (room: string) => {
    try {
      gameServer.socket.emit("chat:join", parseInt(room));
    } catch (e) {
      console.log("ERROR: expected integer input, got:", room, "instead");
    }
  },
};

function send() {
  const message = content.value.trim();

  if (!message) {
    return;
  }

  if (message.startsWith("/")) {
    const command = message.slice(1).split(" ")[0];
    const args = message.split(" ").slice(1);
    console.log({ command, args });

    const cb = clientSideCommands[`${command}`] ?? serverSideCommands[`${command}`];

    if (cb === undefined) {
      gameServer.state.messages.push({
        sender: "ERROR",
        group: "SYSTEM",
        content: `Invalid command '/${command}'\nUse /help to see the list of commands`,
      });
    } else {
      cb(...args);
    }
  } else {
    gameServer.socket.emit("chat:send", message);
  }

  content.value = "";
}
</script>

<template>
  <div class="chat">
    <div class="toggle-collapsed" @click="isCollapsed = !isCollapsed"></div>
    <div class="accordion" :class="{ collapsed: isCollapsed }">
      <div class="top">
        <div class="messages">
          <p class="message" v-for="message in gameServer.state.messages">
            <span
              class="message__sender"
              :class="{
                'message__sender--server': message.sender === 'SERVER',
                'message__sender--system': message.sender === 'SYSTEM',
                'message__sender--error': message.sender === 'ERROR',
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
      <input type="text" maxlength="128" @keydown.enter="send" v-model="content" />
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
  background-color: rgb(30, 30, 30, 0.95);
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
  white-space: pre;
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
  color: rgb(233, 115, 56);
}

.message__sender--system {
  color: rgb(48, 218, 102);
}

.message__sender--error {
  color: rgb(223, 60, 60);
}
.message__sender--current-character {
  color: var(--current-character);
}
</style>
