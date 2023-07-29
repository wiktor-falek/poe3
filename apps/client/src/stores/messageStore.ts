import { defineStore } from "pinia";
import { Ref, ref } from "vue";

type Group = "SYSTEM" | "GLOBAL" | "PARTY" | "GUILD" | "ERROR";

interface Message {
  content: string;
  sender: string;
  group: Group;
}

class BaseMessage implements Message {
  content: string;
  sender: string;
  group: Group;
  constructor(content: string, sender: string, group: Group) {
    this.content = content;
    this.sender = sender;
    this.group = group;
    // console.log(this);
  }
}

class GlobalMessage extends BaseMessage {
  constructor(content: string, sender: string) {
    super(content, sender, "GLOBAL");
  }
}

class SystemMessage extends BaseMessage {
  constructor(content: string) {
    super(content, "SYSTEM", "SYSTEM");
  }
}

class ErrorMessage extends BaseMessage {
  constructor(content: string) {
    super(content, "SYSTEM", "ERROR");
  }
}

const useMessagesStore = defineStore("messages", () => {
  const messages: Ref<Message[]> = ref([]);

  function _push(message: Message) {
    messages.value.push(message);
  }

  function systemMessage(content: string) {
    const message = new SystemMessage(content);
    _push(message);
  }

  function errorMessage(content: string) {
    const message = new ErrorMessage(content);
    _push(message);
  }

  function globalMessage(content: string, sender: string) {
    const message = new GlobalMessage(content, sender);
    _push(message);
  }

  function clear() {
    // splice instead of reassigning to maintain reactivity
    messages.value.splice(0);
  }

  return {
    messages,
    clear,
    globalMessage,
    systemMessage,
    errorMessage,
  };
});

export default useMessagesStore;
