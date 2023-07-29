import { PREFIX_MODIFIERS, SUFFIX_MODIFIERS } from "../modifiers.js";
import Wearable, { Options } from "../wearable/wearable.js";

class Ring extends Wearable {
  #PREFIX_MODIFIER_POOL = [
    { ...PREFIX_MODIFIERS.to_life, weight: 1000 },
    { ...PREFIX_MODIFIERS.to_mana, weight: 1000 },
    { ...PREFIX_MODIFIERS.to_life_regeneration, weight: 1000 },
    { ...PREFIX_MODIFIERS.to_mana_regeneration, weight: 1000 },
  ];

  #SUFFIX_MODIFIER_POOL = [
    { ...SUFFIX_MODIFIERS.to_strength, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_dexterity, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_intelligence, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_vitality, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_speed, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_fire_resistance, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_cold_resistance, weight: 1000 },
    { ...SUFFIX_MODIFIERS.to_lightning_resistance, weight: 1000 },
  ];
  slot: WearableSlot;
  constructor(options: Options) {
    super(options);
    this.slot = "ring";
  }

  magic() {
    return super.magic(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }

  rare() {
    return super.rare(this.#PREFIX_MODIFIER_POOL, this.#SUFFIX_MODIFIER_POOL);
  }
}

export default Ring;
