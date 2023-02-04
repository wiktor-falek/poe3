class SystemMessage {
  sender: string;
  content: string;
  constructor(content: string) {
    this.sender = "SYSTEM";
    this.content = content;
  }
}

export default SystemMessage;