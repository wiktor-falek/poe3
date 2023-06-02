import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import ClientSideSystemMessage from "../utils/ClientSideSystemMessage";

export type Group = "SYSTEM" | "GLOBAL" | "PARTY" | "GUILD";

interface Message {
  sender: string;
  content: string;
  timestamp?: number;
  group?: Group;
}

const MESSAGE_DISPLAY_LIMIT = 1000; // TODO: limit amount of messages to this value

export const useMessageStore = defineStore("message", () => {
  const messages: Ref<Array<Message>> = ref([]);

  function push(message: Message) {
    messages.value.push({
      sender: message.sender,
      content: message.content,
      group: message.group,
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
