type GearRarity = "normal" | "magic" | "rare" | "unique";

type GearSlot =
  | "hand"
  | "offhand"
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "ring"
  | "amulet"
  | "belt";

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

interface ImplicitModifier {
  modId: string;
  description: string;
  values?: Array<number>;
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

interface Requirements {
  level?: number;
  attributes?: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
}
