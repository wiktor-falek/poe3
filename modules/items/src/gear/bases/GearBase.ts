import { BaseModifier, GearImplicits, GearRarity, Requirements } from "../../*";

class GearBase {
  name: string;
  rarity: GearRarity;
  requirements: Requirements;
  baseMods: Array<BaseModifier>;
  implicits: GearImplicits;
  constructor(
    name: string,
    requirements: Requirements,
    baseMods: Array<BaseModifier>,
    implicits: GearImplicits
  ) {
    this.name = name;
    this.rarity = "normal";
    this.requirements = requirements;
    this.baseMods = baseMods;
    this.implicits = implicits;
  }
}

export default GearBase;
