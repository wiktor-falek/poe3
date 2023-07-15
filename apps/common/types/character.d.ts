import { Attributes, Resistances, Resources } from "./unorganized.js";

export type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

export interface Character {
  id: number;
  userId: number;
  name: string;
  class: CharacterClass;
  silver: number;
  level: number;
  xp: number;
  reqXp: number;
}

// character data that gets extended with properties that are dynamically calculated
// for example attributes need to be calculated by the base values of the class + all attributes on equipped gear etc
export interface DynamicCharacter extends Character {
  resistances: Resistances;
  attributes: Attributes;
  resources: Resources;
}

export interface CharacterOverview {
  name: string;
  class: CharacterClass;
  level: number;
}
