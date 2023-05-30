export type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  speed: number;
}

/*
interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  physical: number;
  poison: number;
  necrotic: number;
}

interface Resources {
  maxHp: number;
  hp: number;
  maxMp?: number;
  mp?: number;
}

interface ActionPoints {
  ap: number;
  maxAp: number;
}

type InventorySlot =
  | "hand"
  | "offhand"
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "ring"
  | "amulet"
  | "belt";

type EquipmentSlot =
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
*/

interface Item {}

interface EquipmentBase {}

interface Level {
  value: number;
  xp: number;
  requiredXp: number;
}

interface MainStoryProgression {
  highestZoneId: number;
}

interface CharacterProgression {
  mainStory: MainStoryProgression;
}

interface CharacterEquipment {
  hand: EquipmentBase;
  offhand: EquipmentBase;
  helmet: EquipmentBase;
  chest: EquipmentBase;
  gloves: EquipmentBase;
  boots: EquipmentBase;
  ring_1: EquipmentBase;
  ring_2: EquipmentBase;
  amulet: EquipmentBase;
  belt: EquipmentBase;
}

interface StaticCharacter {
  username: string;
  name: string;
  class: CharacterClass;
  silver: number;
  level: Level;
  attributes: Attributes;
  equipment: CharacterEquipment;
  inventory: Array<Item | null>;
  progression: CharacterProgression;
}

interface DynamicCharacter extends StaticCharacter {
  // resistances
  // actionPoints
}