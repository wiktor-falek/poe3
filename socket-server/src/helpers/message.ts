type Group = "SYSTEM" | "GLOBAL" | "PARTY" | "GUILD";

class Message {
  content: string;
  sender: string;
  group: Group;
  constructor(content: string, sender: string, group: Group) {
    this.content = content;
    this.sender = sender;
    this.group = group;
    console.log(this);
  }
}

export class SystemMessage extends Message {
  constructor(content: string) {
    super(content, "SYSTEM", "SYSTEM");
  }
}

export class GlobalMessage extends Message {
  constructor(content: string, sender?: string) {
    super(content, sender ?? "SYSTEM", "GLOBAL");
  }
}

export class PartyMessage extends Message {
  constructor(content: string, sender?: string) {
    super(content, sender ?? "SYSTEM", "PARTY");
  }
}

export class GuildMessage extends Message {
  constructor(content: string, sender?: string) {
    super(content, sender ?? "SYSTEM", "GUILD");
  }
}
