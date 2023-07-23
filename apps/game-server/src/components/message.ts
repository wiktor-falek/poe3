export type Group = "SYSTEM" | "GLOBAL" | "PARTY" | "GUILD" | "ERROR";

export interface Message {
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

export class ServerMessage extends BaseMessage {
  constructor(content: string) {
    super(content, "SERVER", "SYSTEM");
  }
}

export class GlobalMessage extends BaseMessage {
  constructor(content: string, sender?: string) {
    super(content, sender ?? "SERVER", "GLOBAL");
  }
}

export class PartyMessage extends BaseMessage {
  constructor(content: string, sender?: string) {
    super(content, sender ?? "SERVER", "PARTY");
  }
}

export class GuildMessage extends BaseMessage {
  constructor(content: string, sender?: string) {
    super(content, sender ?? "SERVER", "GUILD");
  }
}

export class ErrorMessage extends BaseMessage {
  constructor(content: string) {
    super(content, "SERVER", "ERROR");
  }
}
