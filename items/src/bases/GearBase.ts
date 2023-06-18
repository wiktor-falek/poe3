import pyrand from "pyrand";

class GearBase {
  name: string;
  ilvl: number;
  rarity: GearRarity;
  requirements: Requirements;
  baseMods: Array<ModifierWithValues>;
  implicits: Array<ModifierWithValues>;
  affixes: Affixes;
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<ModifierWithValues>,
    implicits: Array<ModifierWithValues>
  ) {
    this.name = name;
    this.ilvl = ilvl;
    this.rarity = "normal";
    this.requirements = requirements;
    this.baseMods = baseMods;
    this.implicits = implicits;
    this.affixes = { prefixes: [], suffixes: [] };
  }

  magic(
    PREFIX_MODIFIER_POOL: Array<ModifierWithWeight>,
    SUFFIX_MODIFIER_POOL: Array<ModifierWithWeight>
  ): this {
    if (PREFIX_MODIFIER_POOL.length === 0 || SUFFIX_MODIFIER_POOL.length === 0) {
      throw new Error(
        "Method requires #PREFIX_MODIFIER_POOL and #SUFFIX_MODIFIER_POOL to have at least one modifier"
      );
    }

    if (this.rarity !== "normal") {
      console.error(`Failed to upgrade to magic rarity, item is not of normal rarity`);
      return this;
    }
    // filter tiers that don't satisfy ilvl requirement, and filter mods that have no tiers left
    const prefix_pool = PREFIX_MODIFIER_POOL.map((mod) => {
      const availableTiers = Object.values(mod.tiers).filter((tier) => tier.ilvl <= this.ilvl);
      return { ...mod, tiers: availableTiers };
    }).filter((mod) => Object.keys(mod.tiers).length > 0);

    const suffix_pool = SUFFIX_MODIFIER_POOL.map((mod) => {
      const availableTiers = Object.values(mod.tiers).filter((tier) => tier.ilvl <= this.ilvl);
      return { ...mod, tiers: availableTiers };
    }).filter((mod) => Object.keys(mod.tiers).length > 0);

    // {
    //   console.log("************");
    //   console.log("BEFORE");
    //   for (const mod of PREFIX_MODIFIER_POOL) {
    //     console.log(inspect(mod));
    //   }
    // }

    // console.log("************");
    // console.log("AFTER");

    // {
    //   for (const mod of prefix_pool) {
    //     console.log(inspect(mod));
    //   }
    // }

    const amountOfAffixes = pyrand.randint(1, 4); // TODO: add weights for different amounts once pyrand.sample is ready
    // TODO: unhardcode 1 prefix + 1 suffix
    {
      const randomPrefix = pyrand.choice(prefix_pool);
      const { weight, tiers, ...modifier } = randomPrefix;
      // assign modifier.
      const randomTier = pyrand.choice(tiers);
      const value = pyrand.randint(randomTier.range[0], randomTier.range[1]);
      // assign values array from range(s) in the modifier.tier
      this.affixes.prefixes.push({ ...modifier, values: [value] });
    }
    {
      const randomSuffix = pyrand.choice(suffix_pool);
      const { weight, tiers, ...modifier } = randomSuffix;
      // assign modifier.
      const randomTier = pyrand.choice(tiers);
      const value = pyrand.randint(randomTier.range[0], randomTier.range[1]);
      // assign values array from range(s) in the modifier.tier
      this.affixes.suffixes.push({ ...modifier, values: [value] });
    }
    this.rarity = "magic";
    return this;
  }
}

export default GearBase;
