import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../../modifiers";
import GearBase from "../GearBase";

class RingBase extends GearBase {
  #PREFIX_MODIFIER_POOL = [
    { ...PREFIX_MODIFIERS.to_life, weight: 1000 },
    { ...PREFIX_MODIFIERS.to_mana, weight: 1000 },
  ];

  #SUFFIX_MODIFIER_POOL = [
    { ...SUFFIX_MODIFIERS.to_strength, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_dexterity, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_intelligence, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_vitality, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_speed, weight: 1000 },
  ];
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

  normalToMagicRarity() {
    return super.normalToMagicRarity(
      this.#PREFIX_MODIFIER_POOL,
      this.#SUFFIX_MODIFIER_POOL
    );
  }
}

export default RingBase;
