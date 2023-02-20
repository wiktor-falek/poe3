// @ts-ignore w chuju to mam
import * as pyrand from "../../../../items/build/index.js";

class GearBase {
  PREFIX_MODIFIER_POOL: null | Array<ModifierWithWeight> = null;
  SUFFIX_MODIFIER_POOL: null | Array<ModifierWithWeight> = null;

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

  /**
   * Returns true if item was of normal rarity
   */
  normalToMagicRarity(): this {
    if (
      this.PREFIX_MODIFIER_POOL == null ||
      this.SUFFIX_MODIFIER_POOL == null
    ) {
      console.error(
        `GearBase class needs to be extended by a class that assigns
        PREFIX_MODIFIER_POOL and SUFFIX_MODIFIER_POOL to use this method`
      );
    }
    if (this.rarity !== "normal") {
      console.error(
        `Failed to upgrade to magic rarity, item is not of normal rarity`
      );
      return this;
    }

    const amountOfMods = pyrand.randint(1, 4); // TODO: add weights when pyrand.sample is finished
    {
      const randomPrefix = pyrand.choice(this.PREFIX_MODIFIER_POOL);
      const { weight, ...modifier } = randomPrefix;
      this.affixes.prefixes.push(modifier);
    }
    {
      const randomSuffix = pyrand.choice(this.SUFFIX_MODIFIER_POOL);
      const { weight, ...modifier } = randomSuffix;
      this.affixes.suffixes.push(modifier);
    }
    this.rarity = "magic";
    return this;
  }
}

export default GearBase;
