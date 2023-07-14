import { ObjectId } from "bson";
import pyrand from "pyrand";

export interface Options {
  name: string;
  ilvl?: number;
  requirements?: Requirements;
  modifiers?: {
    base?: Array<ModifierWithValues>;
    implicit?: Array<ModifierWithValues>;
  };
}

class Wearable {
  _id: ObjectId;
  type: string;
  name: string;
  uniqueName?: string | undefined;
  uniqueDescription?: string | undefined;
  ilvl: number;
  rarity: Rarity;
  requirements: Requirements;
  modifiers: {
    base: Array<ModifierWithValues>;
    implicit: Array<ModifierWithValues>;
    affix: {
      prefixes: Array<ModifierWithValues>;
      suffixes: Array<ModifierWithValues>;
    };
  };
  constructor(options: Options) {
    this._id = new ObjectId();
    this.type = "wearable";
    this.rarity = "normal";
    this.name = options.name;
    this.ilvl = options.ilvl ?? 1;
    this.requirements = options.requirements ?? { level: 1 };
    this.modifiers = {
      base: options.modifiers?.base ?? [],
      implicit: options.modifiers?.implicit ?? [],
      affix: { prefixes: [], suffixes: [] },
    };
  }

  setIlvl(ilvl: number) {
    this.ilvl = ilvl;
    return this;
  }

  private rollAmountOfPrefixes(
    amount: number,
    PREFIX_MODIFIER_POOL: Array<ModifierWithWeight>
  ): Array<ModifierWithValues> {
    // filter affix tiers that don't exceed ilvl of item, and filter affixes that have 0 tiers
    const prefixPool = PREFIX_MODIFIER_POOL.map((mod) => {
      const availableTiers: Array<Tier> = Object.values(mod.tiers).filter(
        (tier: Tier) => tier.ilvl <= this.ilvl
      );
      return { ...mod, tiers: availableTiers };
    }).filter((mod) => Object.keys(mod.tiers).length > 0);

    const prefixes: Array<ModifierWithValues> = [];
    for (let i = 0; i < amount; i++) {
      // choose a random modifier from pool
      const idx = pyrand.randint(0, prefixPool.length - 1);

      const prefix = prefixPool[idx];
      prefixPool.splice(idx, 1); // remove from the pool to avoid duplicate modifiers

      const { weight, tiers, ...modifier } = prefix;

      const tier = pyrand.choice(tiers); // choose tier with equal weighting

      const value = pyrand.randint(tier.range[0], tier.range[1]); // roll the value from range

      prefixes.push({ ...modifier, values: [value], tier: tier.tier });
    }

    return prefixes;
  }

  private rollAmountOfSuffixes(
    amount: number,
    SUFFIX_MODIFIER_POOL: Array<ModifierWithWeight>
  ): Array<ModifierWithValues> {
    // filter affix tiers that don't exceed ilvl of item, and filter affixes that have 0 tiers
    const suffixPool = SUFFIX_MODIFIER_POOL.map((mod) => {
      const availableTiers: Array<Tier> = Object.values(mod.tiers).filter(
        (tier: Tier) => tier.ilvl <= this.ilvl
      );
      return { ...mod, tiers: availableTiers };
    }).filter((mod) => Object.keys(mod.tiers).length > 0);

    const suffixes: Array<ModifierWithValues> = [];

    for (let i = 0; i < amount; i++) {
      // choose a random modifier from pool
      const idx = pyrand.randint(0, suffixPool.length - 1);

      const suffix = suffixPool[idx];
      suffixPool.splice(idx, 1); // remove from the pool to avoid duplicate modifiers

      const { weight, tiers, ...modifier } = suffix;

      const tier = pyrand.choice(tiers); // choose tier with equal weighting
      const value = pyrand.randint(tier.range[0], tier.range[1]); // roll the value from range

      suffixes.push({ ...modifier, values: [value], tier: tier.tier });
    }

    return suffixes;
  }

  /**
   * Rolls 1-2 random prefix and 1-2 random suffix modifiers
   */
  magic(
    PREFIX_MODIFIER_POOL: Array<ModifierWithWeight>,
    SUFFIX_MODIFIER_POOL: Array<ModifierWithWeight>
  ) {
    if (PREFIX_MODIFIER_POOL.length < 2 || SUFFIX_MODIFIER_POOL.length < 2) {
      throw new Error(
        "Method requires #PREFIX_MODIFIER_POOL and #SUFFIX_MODIFIER_POOL to have at least two prefix and two suffix modifiers"
      );
    }

    const amountOfPrefixes = pyrand.randint(1, 2);
    const amountOfSuffixes = pyrand.randint(1, 2);

    const prefixes = this.rollAmountOfPrefixes(amountOfPrefixes, PREFIX_MODIFIER_POOL);
    const suffixes = this.rollAmountOfSuffixes(amountOfSuffixes, SUFFIX_MODIFIER_POOL);

    this.modifiers.affix.prefixes = prefixes;
    this.modifiers.affix.suffixes = suffixes;

    this.rarity = "magic";
    return this;
  }

  /**
   * Rolls 2-4 random prefix and 2-4 random suffix modifiers
   */
  rare(
    PREFIX_MODIFIER_POOL: Array<ModifierWithWeight>,
    SUFFIX_MODIFIER_POOL: Array<ModifierWithWeight>
  ) {
    if (PREFIX_MODIFIER_POOL.length < 3 || SUFFIX_MODIFIER_POOL.length < 3) {
      throw new Error(
        "Method requires #PREFIX_MODIFIER_POOL and #SUFFIX_MODIFIER_POOL to have at least two prefix and two suffix modifiers"
      );
    }

    const amountOfPrefixes = pyrand.randint(2, 3);
    const amountOfSuffixes = pyrand.randint(2, 3);

    const prefixes = this.rollAmountOfPrefixes(amountOfPrefixes, PREFIX_MODIFIER_POOL);
    const suffixes = this.rollAmountOfSuffixes(amountOfSuffixes, SUFFIX_MODIFIER_POOL);

    this.modifiers.affix.prefixes = prefixes;
    this.modifiers.affix.suffixes = suffixes;

    this.rarity = "rare";
    return this;
  }
}

export default Wearable;
