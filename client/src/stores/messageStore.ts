import { defineStore } from "pinia";
import { ref } from "vue";
import ClientSideSystemMessage from "../utils/ClientSideSystemMessage";

export type Group = "SYSTEM" | "GLOBAL" | "PARTY";

interface Message {
  sender: string;
  content: string;
  timestamp?: number;
  group?: Group;
}

export const useMessageStore = defineStore("message", () => {
  const messages = ref([]);

  function push(message: Message, group?: Group) {
    messages.value.push({
      sender: message.sender,
      content: message.content,
      timestamp: Date.now(),
      group,
    });
  }

  function pushClientSideSystemMessage(message: string) {
    messages.value.push(new ClientSideSystemMessage(message));
  }

  function clear() {
    // 'reassign' to empty array while maintaining reactivity
    messages.value.splice(0);
  }

  return {
    messages,
    push,
    pushClientSideSystemMessage,
    clear,
  };
});
