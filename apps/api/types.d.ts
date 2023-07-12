import type { ObjectId } from "mongodb";

export interface CharacterOverview {
  name: string;
  class: "swordsman" | "ranger" | "sorcerer" | "assassin";
  level: number;
}

export type ResponseGetAllCharactersOverview = Array<CharacterOverview>;

interface UserData {
  id: number;
  username: string;
  email: string;
  has_confirmed_email: boolean;
  hash: string;
  registration_timestamp: number;
  session_id: string;
  character_limit: number;
}

declare global {
  namespace Express {
    interface Locals {
      user: UserData;
    }
  }
}
