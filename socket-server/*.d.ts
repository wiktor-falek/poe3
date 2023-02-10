import type { ObjectId } from "mongodb";

interface Level {
  value: number;
  xp?: number;
  requiredXp?: number;
}

interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  physical: number;
  poison: number;
  necrotic: number;
}

type PlayerClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

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

type PlayerInventory = Array<null | any>; // TODO: GearSlot instead of any

interface MainStoryProgression {
  highestZoneId: number;
}

interface CharacterProgression {
  mainStory: MainStoryProgression;
}

interface Character {
  _id: ObjectId;
  name: string;
  class: PlayerClass;
  level: Level;
  attributes: Attributes;
  resources: Resources; //
  equipment: Object<any>; // TODO: {hand: GearSlot, offhand: GearSlot,...} instead of any
  silver: number;
  resistances: Resistances;
  inventory: PlayerInventory;
  progression: Progression;
}
