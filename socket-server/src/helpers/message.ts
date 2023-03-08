type Group = "SYSTEM" | "GLOBAL" | "PARTY";

class Message {
  content: string;
  sender: string;
  constructor(content: string, sender: string, group: Group) {
    this.content = content;
    this.sender = sender;
  }
}

export class SystemMessage extends Message {
  constructor(content: string) {
    super(content, "SYSTEM", "SYSTEM");
  }
}

export class GlobalMessage extends Message {
  constructor(content: string, sender: string) {
    super(content, sender, "GLOBAL");
  }
}

export class PartyMessage extends Message {
  constructor(content: string, sender: string) {
    super(content, sender, "PARTY");
  }
}
