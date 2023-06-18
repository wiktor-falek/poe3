import type { ObjectId } from "mongodb";

export interface CharacterOverview {
  name: string;
  class: "swordsman" | "ranger" | "sorcerer" | "assassin";
  level: number;
}

export type ResponseGetAllCharactersOverview = Array<CharacterOverview>;

interface UserData {
  _id: ObjectId;
  account: {
    username: string;
    sessionId: string;
  };
}

declare global {
  namespace Express {
    interface Locals {
      user: UserData;
    }
  }
}
