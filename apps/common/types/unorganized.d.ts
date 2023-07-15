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