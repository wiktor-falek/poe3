import pyrand from "pyrand";

class GearBase {
  name: string;
  ilvl: number;
  rarity: GearRarity;
  requirements: Requirements;
  baseMods: Array<BaseModifier>;
  implicits: Array<ImplicitModifier>;
  affixes: Affixes;
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<BaseModifier>,
    implicits: Array<ImplicitModifier>
  ) {
    this.name = name;
    this.ilvl = ilvl;
    this.rarity = "normal";
    this.requirements = requirements;
    this.baseMods = baseMods;
    this.implicits = implicits;
    this.affixes = { prefixes: [], suffixes: [] };
  }

  setIlvl(ilvl: number): this {
    if (ilvl > 0 && ilvl <= 100) {
      this.ilvl = ilvl;
    }
    return this;
  }

  normalToMagicRarity(
    PREFIX_MODIFIER_POOL: Array<ModifierWithWeight>,
    SUFFIX_MODIFIER_POOL: Array<ModifierWithWeight>
  ): this {
    if (this.rarity !== "normal") {
      console.error(
        `Failed to upgrade to magic rarity, item is not of normal rarity`
      );
      return this;
    }


    // filter out modifiers where ilvl requirement is not met
    const prefix_pool = PREFIX_MODIFIER_POOL.filter(() => false);
    const suffix_pool = PREFIX_MODIFIER_POOL.filter(() => false);

    const amountOfMods = pyrand.randint(1, 4); // TODO: add weights when pyrand.sample is finished
    {
      const randomPrefix = pyrand.choice(PREFIX_MODIFIER_POOL);
      const { weight, ...modifier } = randomPrefix;
      this.affixes.prefixes.push(modifier);
    }
    {
      const randomSuffix = pyrand.choice(SUFFIX_MODIFIER_POOL);
      const { weight, ...modifier } = randomSuffix;
      this.affixes.suffixes.push(modifier);
    }
    this.rarity = "magic";
    return this;
  }
}

export default GearBase;
