import RingBase from "./gear/bases/RingBase";

type GearRarity = "normal" | "magic" | "rare" | "unique";

type GearTypeName =
  | "hand"
  | "offhand"
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "ring"
  | "amulet"
  | "belt";

type GearType = RingBase;

/*
{
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
*/

interface Tier {
  range: Array<number>;
  ilvl: number;
}

interface ModifierTiers {
  10?: Tier;
  9?: Tier;
  8?: Tier;
  7?: Tier;
  6?: Tier;
  5?: Tier;
  4?: Tier;
  3?: Tier;
  2?: Tier;
  1?: Tier;
}

interface BaseModifier {
  modId: string;
  description: string;
  values?: Array<number>;
}

interface Modifier {
  modId: string;
  description: string;
  tiers: ModifierTiers;
}

type GearImplicits = Array<Modifier>;

interface Requirements {
  level?: number;
  attributes?: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
}

interface ImplicitModifier {}
