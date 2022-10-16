import Item from "../db/models/Item.js";

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
    hand: await Item.getBaseById(2000),
    offhand: null,
    helmet: null,
    chest: null,
    // chest: {
    //   id: 0,
    //   name: "Worn Leather Tunic",
    //   type: "gear",
    //   slot: "chest",
    //   level_requirement: 1,
    //   evasion: 4,
    //   image:
    //     "https://cdn.discordapp.com/attachments/1025408206765301812/1029734642250682438/dagger.png",
    //   rarity: "normal",
    // },
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  ranger: {
    hand: await Item.getBaseById(2001),
    offhand: null,
    helmet: null,
    chest: null,
    // chest: {
    //   id: 0,
    //   name: "Worn Leather Tunic",
    //   type: "gear",
    //   slot: "chest",
    //   level_requirement: 1,
    //   evasion: 4,
    //   image:
    //     "https://cdn.discordapp.com/attachments/1025408206765301812/1029734642250682438/dagger.png",
    //   rarity: "normal",
    // },
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  sorcerer: {
    hand: await Item.getBaseById(2002),
    offhand: null,
    helmet: null,
    chest: null,
    // chest: {
    //   id: 0,
    //   name: "Torn Robe",
    //   type: "gear",
    //   slot: "chest",
    //   level_requirement: 1,
    //   armor: 3,
    //   image:
    //     "https://cdn.discordapp.com/attachments/1025408206765301812/1029734642250682438/dagger.png",
    //   rarity: "normal",
    // },
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  assassin: {
    hand: await Item.getBaseById(2003),
    offhand: null,
    helmet: null,
    chest: null,
    // chest: {
    //   id: 0,
    //   name: "Homeless Jacket",
    //   type: "gear",
    //   slot: "chest",
    //   level_requirement: 1,
    //   evasion: 3,
    //   image:
    //     "https://cdn.discordapp.com/attachments/1025408206765301812/1029734642250682438/dagger.png",
    //   rarity: "normal",
    // },
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },
};
