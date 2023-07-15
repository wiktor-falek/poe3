declare global {
  namespace Express {
    interface Locals {
      user: User;
    }
  }
}

interface User {
  id: number;
  username: string;
  email: string;
  hasConfirmedEmail: boolean;
  hash: string;
  registrationTimestamp: number;
  sessionId: string;
  characterLimit: number;
}

export interface CharacterOverview {
  name: string;
  class: "swordsman" | "ranger" | "sorcerer" | "assassin";
  level: number;
}

export type ResponseGetAllCharactersOverview = Array<CharacterOverview>;
