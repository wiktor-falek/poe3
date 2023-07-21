export interface User {
  id: number;
  username: string;
  email: string;
  hasConfirmedEmail: boolean;
  hash: string;
  registrationTimestamp: number;
  sessionId: string;
  characterLimit: number;
}

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

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  speed: number;
}

export interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  poison: number;
}

export interface Resources {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  ap: number;
  maxAp: number;
}

export type EquipmentSlot =
  | "hand"
  | "offhand"
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "ring_1"
  | "ring_2"
  | "amulet"
  | "belt";

// interface Item {}

// interface EquipmentBase {}

// interface CharacterEquipment {
//   hand: EquipmentBase;
//   offhand: EquipmentBase;
//   helmet: EquipmentBase;
//   chest: EquipmentBase;
//   gloves: EquipmentBase;
//   boots: EquipmentBase;
//   ring_1: EquipmentBase;
//   ring_2: EquipmentBase;
//   amulet: EquipmentBase;
//   belt: EquipmentBase;
// }
