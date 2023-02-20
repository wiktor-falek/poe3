import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../../modifiers";
import GearBase from "../GearBase";

class ChestBase extends GearBase {
  #PREFIX_MODIFIER_POOL = [];
  #SUFFIX_MODIFIER_POOL = [];

  slot: GearSlot;
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<ModifierWithValues>,
    implicits: Array<ModifierWithValues>
  ) {
    super(name, ilvl, requirements, baseMods, implicits);
    this.slot = "chest";
  }
}

export default ChestBase;
