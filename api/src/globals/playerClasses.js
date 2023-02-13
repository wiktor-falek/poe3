import {
  SWORDSMAN_STARTING_ITEMS,
  RANGER_STARTING_ITEMS,
  SORCERER_STARTING_ITEMS,
  ASSASSIN_STARTING_ITEMS,
} from "items";

export const startingAttributes = {
  swordsman: {
    strength: 8,
    dexterity: 6,
    intelligence: 5,
    vitality: 8,
    speed: 5,
  },

  ranger: {
    strength: 6,
    dexterity: 8,
    intelligence: 5,
    vitality: 6,
    speed: 7,
  },

  sorcerer: {
    strength: 6,
    dexterity: 6,
    intelligence: 8,
    vitality: 5,
    speed: 7,
  },

  assassin: {
    strength: 5,
    dexterity: 7,
    intelligence: 7,
    vitality: 5,
    speed: 8,
  },
};

export const startingGear = {
  swordsman: {
    hand: SWORDSMAN_STARTING_ITEMS.hand,
    offhand: null,
    helmet: null,
    chest: SWORDSMAN_STARTING_ITEMS.chest,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  ranger: {
    hand: RANGER_STARTING_ITEMS.hand,
    offhand: null,
    helmet: null,
    chest: RANGER_STARTING_ITEMS.chest,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  sorcerer: {
    hand: SORCERER_STARTING_ITEMS.hand,
    offhand: null,
    helmet: null,
    chest: SORCERER_STARTING_ITEMS.chest,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  assassin: {
    hand: ASSASSIN_STARTING_ITEMS.hand,
    offhand: null,
    helmet: null,
    chest: ASSASSIN_STARTING_ITEMS.chest,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },
};
