import type { ObjectId } from "mongodb";

interface Level {
  value: number;
  xp: number;
  requiredXp: number;
}

interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  physical: number;
  poison: number;
  necrotic: number;
}

type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  speed: number;
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

/*
interface MainHand {}
interface OffHand {}
...

type GearSlot = MainHand | OffHand;
*/

type CharacterInventory = Array<null | any>;

interface MainStoryProgression {
  highestZoneId: number;
}

interface CharacterProgression {
  mainStory: MainStoryProgression;
}

// TODO: change any to WeaponBase, RingBase,...
interface CharacterEquipment {
  hand: null | any;
  offhand: null | any;
  helmet: null | any;
  chest: null | any;
  gloves: null | any;
  boots: null | any;
  ring_1: null | any;
  ring_2: null | any;
  amulet: null | any;
  belt: null | any;
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

interface Character {
  _id: ObjectId;
  id: string;
  name: string;
  class: CharacterClass;
  level: Level;
  progression: CharacterProgression;
  silver: number;
  inventory: CharacterInventory;
  equipment: CharacterEquipment;
  resources: Resources;
  attributes: Attributes;
  resistances: Resistances;
}
