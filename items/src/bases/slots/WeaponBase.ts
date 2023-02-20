import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../../modifiers";
import GearBase from "../GearBase";

class WeaponBase extends GearBase {
  #PREFIX_MODIFIER_POOL = [];
  #SUFFIX_MODIFIER_POOL = [];

  slot: GearSlot;
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<BaseModifier>,
    implicits: Array<ImplicitModifier>
  ) {
    super(name, ilvl, requirements, baseMods, implicits);
    this.slot = "hand";
  }
}

export default WeaponBase;
