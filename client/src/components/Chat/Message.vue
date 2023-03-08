<script lang="ts" setup>
import { usePlayerStore } from "../../stores/playerStore";

const props = defineProps(["message"]);

const playerStore = usePlayerStore();

function unixToReadable(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toTimeString().slice(0, 5);
}
</script>

<template>
  <p class="message">
    <span
      class="message__timestamp"
      v-if="message.timestamp && message.sender !== 'SYSTEM'"
    >
      [ {{ unixToReadable(message.timestamp) }} ]
    </span>
    <span v-if="message.sender !== 'SYSTEM'" class="message__sender">
      <!-- TODO: fix color -->
      <span
        class="message__sender__name"
        :class="{
          'this-sender': message.sender === playerStore.character.name,
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
</template>

<style scoped>
.message {
  user-select: text; /* set explicitly, because everywhere else disabled by default */
  white-space: pre-line;
  max-width: 100ch;
  word-wrap: break-word;
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

.this-sender {
  color: rgb(141, 141, 232);
}
</style>
