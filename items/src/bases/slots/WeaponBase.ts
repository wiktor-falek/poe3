import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../../modifiers";
import { deepFreeze } from "../../utils";
import GearBase, { Options } from "../GearBase";

class WeaponBase extends GearBase {
  #PREFIX_MODIFIER_POOL = deepFreeze([
    { ...PREFIX_MODIFIERS.to_life, weight: 1000 },
    { ...PREFIX_MODIFIERS.to_mana, weight: 1000 },
  ]);

  #SUFFIX_MODIFIER_POOL = deepFreeze([
    { ...SUFFIX_MODIFIERS.to_strength, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_dexterity, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_intelligence, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_vitality, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_speed, weight: 1000 },
  ]);

  slot: GearSlot;
  constructor(options: Options) {
    super(options);
    this.slot = "hand";
  }

  magic() {
    return super.magic(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }

  rare() {
    return super.rare(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }
}

export default WeaponBase;
