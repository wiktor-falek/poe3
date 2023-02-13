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
    hand: null,
    offhand: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  ranger: {
    hand: {
      base: "Short Bow",
      type: "weapon",
      rarity: "normal",
      requirements: {
        level: 1,
      },
      baseMods: [
        {
          modId: "base_crit_chance",
          values: [5],
          description: "Critical Strike Chance: #",
        },
        {
          modId: "base_phys_dmg",
          values: [2, 4],
          description: "Physical damage: # to #",
        },
      ],
    },
    offhand: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring_1: {
      base: "Gold Ring",
      type: "ring",
      rarity: "unique",
      name: "The One Ring",
      description:
        "One ring to rule them all, one ring to find them, One ring to bring them all, and in the darkness bind them; In the Land of Mordor where the shadows lie.",
      requirements: {
        level: 1,
      },
      implicits: [
        {
          modId: "to_life",
          description: "+# to Life",
          values: [5],
        },
      ],
      affixes: [
        { modId: "to_strength", description: "+# to Strength", values: [1] },
        { modId: "to_dexterity", description: "+# to Dexterity", values: [1] },
        {
          modId: "to_intelligence",
          description: "+# to Intelligence",
          values: [1],
        },
        { modId: "to_vitality", description: "+# to Vitality", values: [1] },
        { modId: "to_speed", description: "+# to Speed", values: [1] },
      ],
    },
    ring_2: {
      base: "Sapphire Ring",
      type: "ring",
      rarity: "rare",
      requirements: {
        level: 5,
      },
      implicits: [
        {
          modId: "to_mana",
          description: "+# to Mana",
          values: [10],
        },
      ],
      affixes: {
        prefixes: [
          {
            modId: "to_life",
            description: "+# to Life",
            values: [1],
          },
          {
            modId: "to_mana",
            description: "+# to Mana",
            values: [2],
          },
          {
            modId: "physical_damage_to_attacks",
            description: "Adds # to # Physical Damage to Attacks",
            values: [1, 2],
          },
        ],
        suffixes: [
          {
            modId: "to_intelligence",
            description: "+# to Intelligence",
            values: [2],
          },
        ],
      },
    },
    amulet: null,
    belt: null,
  },

  sorcerer: {
    hand: null,
    offhand: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },

  assassin: {
    hand: null,
    offhand: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  },
};
