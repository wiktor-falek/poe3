import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../../modifiers";
import GearBase, { Options } from "../GearBase";

class ChestBase extends GearBase {
  #PREFIX_MODIFIER_POOL = [];
  #SUFFIX_MODIFIER_POOL = [];

  slot: GearSlot;
  constructor(options: Options) {
    super(options);
    this.slot = "chest";
  }
}

export default ChestBase;
