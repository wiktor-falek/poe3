import { RingBase, WeaponBase } from "./bases";
import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "./modifiers";
import { inspect } from "./utils";

export function SapphireRing() {
  return new RingBase(
    "Sapphire Ring",
    1,
    { level: 1 },
    [{ ...IMPLICIT_MODIFIERS.to_mana, values: [5] }],
    []
  );
}

export function GoldRing() {
  return new RingBase(
    "Gold Ring",
    1,
    { level: 1 },
    [{ ...IMPLICIT_MODIFIERS.to_life, values: [5] }],
    []
  );
}

export function Branch() {
  return new WeaponBase(
    "Branch",
    20,
    { level: 1 },
    [{ ...BASE_MODIFIERS.physical_damage, values: [3, 4] }],
    [{ ...IMPLICIT_MODIFIERS.cold_damage_to_spells, values: [1, 2] }]
  );
}

const item = Branch().magic();
// console.log(inspect(item));
