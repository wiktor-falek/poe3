import GearBase from "../GearBase";

class ChestBase extends GearBase {
  slot: GearSlot;
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<BaseModifier>,
    implicits: Array<ImplicitModifier>
  ) {
    super(name, ilvl, requirements, baseMods, implicits);
    this.slot = "chest";
  }
}

export default ChestBase;
