import { WeaponBase, ChestBase } from "../gear/bases";
import GearBase from "../gear/bases/GearBase";
import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "../modifiers/modifiers";

export const SWORDSMAN_STARTING_ITEMS: { [key in GearSlot]?: GearBase } = {
  hand: new WeaponBase(
    "Broken Sword",
    1,
    { level: 1 },
    [
      { ...BASE_MODIFIERS.physical_damage, values: [2, 3] },
      { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
    ],
    []
  ),
  chest: new ChestBase(
    "Rusted Plate Armor",
    1,
    { level: 1 },
    [{ ...BASE_MODIFIERS.armor, values: [6] }],
    []
  ),
};

export const RANGER_STARTING_ITEMS: { [key in GearSlot]?: GearBase } = {
  hand: new WeaponBase(
    "Short Bow",
    1,
    { level: 1 },
    [
      { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
      { ...BASE_MODIFIERS.critical_strike_chance, values: [5] },
    ],
    []
  ),
  chest: new ChestBase(
    "Torn Leather Tunic",
    1,
    { level: 1 },
    [{ ...BASE_MODIFIERS.evasion, values: [6] }],
    []
  ),
};

export const SORCERER_STARTING_ITEMS: { [key in GearSlot]?: GearBase } = {
  hand: new WeaponBase(
    "Branch",
    1,
    { level: 1 },
    [
      { ...BASE_MODIFIERS.physical_damage, values: [1, 3] },
      { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
    ],
    [{ ...IMPLICIT_MODIFIERS.cold_damage_to_spells, values: [1, 2] }]
  ),
  chest: new ChestBase(
    "Ragged Cloth",
    1,
    { level: 1 },
    [{ ...BASE_MODIFIERS.evasion, values: [3] }],
    []
  ),
};

export const ASSASSIN_STARTING_ITEMS: { [key in GearSlot]?: GearBase } = {
  hand: new WeaponBase(
    "Rusty Dagger",
    1,
    { level: 1 },
    [
      { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
      { ...BASE_MODIFIERS.critical_strike_chance, values: [7] },
    ],
    []
  ),
  chest: new ChestBase(
    "Leather Harness",
    1,
    { level: 1 },
    [
      { ...BASE_MODIFIERS.evasion, values: [4] },
      { ...BASE_MODIFIERS.armor, values: [2] },
    ],
    []
  ),
};
