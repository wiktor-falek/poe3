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

  magic() {
    return super.magic(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }

  rare() {
    return super.rare(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }
}

export default ChestBase;
