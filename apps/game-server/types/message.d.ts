export type Group = "SYSTEM" | "GLOBAL" | "PARTY" | "GUILD" | "ERROR";

export interface Message {
  content: string;
  sender: string;
  group: Group;
}
