class ClientSideSystemMessage {
  sender: string;
  content: string;
  timestamp: number;
  constructor(content: string) {
    this.sender = "SYSTEM";
    this.content = content;
    this.timestamp = Date.now();
  }
}

export default ClientSideSystemMessage;
