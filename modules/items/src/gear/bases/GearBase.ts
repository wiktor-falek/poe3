class GearBase {
  name: string;
  ilvl: number;
  rarity: GearRarity;
  requirements: Requirements;
  baseMods: Array<BaseModifier>;
  implicits: Array<ImplicitModifier>;
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
  }
}

export default GearBase;
