/*
{
  _id: new ObjectId("63bf3a2ca57b28ff2ba270cc"),
  name: 'Test1',
  class: 'swordsman',
  level: { value: 1, xp: 0, required_xp: 10 },
  resources: { max_hp: 10, hp: 10, max_mp: 10, mp: 10 },
  attributes: { strength: 8, dexterity: 6, intelligence: 5, vitality: 8, speed: 5 },
  equipment: {
    hand: {
      _id: 2000,
      name: 'Broken Sword',
      type: 'gear',
      level_requirement: 1,
      slot: 'hand',
      damage: [Array],
      critical_chance: 5,
      image: 'https://cdn.discordapp.com/attachments/1025408206765301812/1029734642250682438/dagger.png',
      rarity: 'normal'
    },
    offhand: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null
  },
  silver: 0,
  resistances: {
    fire: 0,
    cold: 0,
    lightning: 0,
    physical: 0,
    poison: 0,
    necrotic: 0
  },
  inventory: [
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null
  ]
}
*/

import type { ObjectId } from "mongodb";

interface Level {
  value: number;
  xp?: number;
  required_xp?: number;
  resources: PlayerResources;
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

interface PlayerAttributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  speed: number;
}

interface PlayerResources {
  max_hp: number;
  hp: number;
  max_mp: number;
  mp: number;
}

/*
interface MainHand {}
interface OffHand {}
...

type GearSlot = MainHand | OffHand;
*/

type PlayerInventory = Array<null | any>; // TODO: GearSlot instead of any

interface MainStoryProgression {
  highestFloorId: number;
}

interface CharacterProgression {
  mainStory: MainStoryProgression;
}

interface Character {
  _id: ObjectId;
  name: string;
  class: PlayerClass;
  attributes: PlayerAttributes;
  equipment: Object<any>; // TODO: {hand: GearSlot, offhand: GearSlot,...} instead of any
  silver: number;
  resistances: Resistances;
  inventory: PlayerInventory;
  progression: Progression;
}
