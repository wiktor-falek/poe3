export type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  speed: number;
}

interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  physical: number;
  poison: number;
}

interface Resources {
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
  ap: number;
  maxAp: number;
}

/*
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

// character data from the database
interface StaticCharacter {
  userId: string;
  name: string;
  class: CharacterClass;
  silver: number;
  level: Level;
  equipment: CharacterEquipment;
  inventory: Array<Item | null>;
  progression: CharacterProgression;
}

interface User {
  account: {
    username: string;
    email: string;
    confirmedEmail: boolean; // or somethign else idk
    registrationTimestamp: number;
    sessionId: string;
    characterLimit: number;
    hash: string;
  };
  sharedStash: Array<null>;
  characters: Array<StaticCharacter>; // WithId<StaticCharacter> but whatever for now
}

// character data that gets extended with properties that are dynamically calculated
// for example attributes need to be calculated by the base values of the class + all attributes on equipped gear etc
interface DynamicCharacter extends StaticCharacter {
  resistances: Resistances;
  attributes: Attributes;
  resources: Resources;
  // actionPoints
}
