import { defineStore } from "pinia";
import { ref } from "vue";
import ClientSideSystemMessage from "../utils/ClientSideSystemMessage";

interface Message {
  sender: string;
  content: string;
  timestamp?: number;
}

export const useMessageStore = defineStore("message", () => {
  const messages = ref([]);

  function push(message: Message) {
    messages.value.push({
      sender: message.sender,
      content: message.content,
      timestamp: Date.now(),
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
