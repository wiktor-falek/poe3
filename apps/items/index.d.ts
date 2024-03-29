type WearableSlot =
  | "hand"
  | "offhand"
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "ring"
  | "amulet"
  | "belt";

type Rarity = "normal" | "magic" | "rare" | "unique";

interface Tier {
  tier: number;
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

interface ModifierWithValues {
  modId: string;
  description: string;
  values: Array<number>;
  tier?: number;
}

interface ModifierWithWeight {
  modId: string;
  description: string;
  tiers: ModifierTiers;
  weight: number;
}

interface Requirements {
  level: number;
  attributes?: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
}
