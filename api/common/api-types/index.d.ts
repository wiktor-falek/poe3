export interface CharacterOverview {
  name: string;
  class: "swordsman" | "ranger" | "sorcerer" | "assassin";
  level: number;
}

export type ResponseGetAllCharactersOverview = Array<CharacterOverview>;
