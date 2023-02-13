import GearBase from "../GearBase";

class RingBase extends GearBase {
  slot: GearSlot;
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<BaseModifier>,
    implicits: Array<ImplicitModifier>
  ) {
    super(name, ilvl, requirements, baseMods, implicits);
    this.slot = "ring";
  }
}

export default RingBase;
