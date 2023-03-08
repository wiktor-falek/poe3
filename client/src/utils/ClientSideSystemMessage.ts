import { Group } from "../stores/messageStore";

class ClientSideSystemMessage {
  sender: string;
  content: string;
  timestamp: number;
  group: Group;
  constructor(content: string) {
    this.sender = "SYSTEM";
    this.content = content;
    this.timestamp = Date.now();
    this.group = "SYSTEM"
  }
}

export default ClientSideSystemMessage;
