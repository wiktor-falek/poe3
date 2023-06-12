type Group = "SYSTEM" | "GLOBAL" | "PARTY" | "GUILD";
export interface Message {
    content: string;
    sender: string;
    group: Group;
}
declare class BaseMessage implements Message {
    content: string;
    sender: string;
    group: Group;
    constructor(content: string, sender: string, group: Group);
}
export declare class ServerMessage extends BaseMessage {
    constructor(content: string);
}
export declare class GlobalMessage extends BaseMessage {
    constructor(content: string, sender?: string);
}
export declare class PartyMessage extends BaseMessage {
    constructor(content: string, sender?: string);
}
export declare class GuildMessage extends BaseMessage {
    constructor(content: string, sender?: string);
}
export {};
//# sourceMappingURL=message.d.ts.map