import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../../modifiers";
import { deepFreeze } from "../../utils";
import GearBase from "../GearBase";

class RingBase extends GearBase {
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
  constructor(
    name: string,
    ilvl: number,
    requirements: Requirements,
    baseMods: Array<ModifierWithValues>,
    implicits: Array<ModifierWithValues>
  ) {
    super(name, ilvl, requirements, baseMods, implicits);
    this.slot = "ring";
  }

  magic() {
    return super.magic(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }
}

export default RingBase;
