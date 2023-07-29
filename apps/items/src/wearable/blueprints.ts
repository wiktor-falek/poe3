import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "../modifiers.js";
import { Weapon, Chest, Ring } from "./index.js";

const hand: { [key: string]: () => Weapon } = {
  brokenSword: () =>
    new Weapon({
      name: "Broken Sword",
      modifiers: {
        base: [
          { ...BASE_MODIFIERS.physical_damage, values: [2, 3] },
          { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
        ],
      },
    }),
  shortBow: () =>
    new Weapon({
      name: "Short Bow",
      modifiers: {
        base: [
          { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
          { ...BASE_MODIFIERS.critical_strike_chance, values: [5] },
        ],
      },
    }),
  branch: () =>
    new Weapon({
      name: "Branch",
      modifiers: {
        base: [
          { ...BASE_MODIFIERS.physical_damage, values: [1, 3] },
          { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
        ],
        implicit: [{ ...IMPLICIT_MODIFIERS.cold_damage_to_spells, values: [1, 2] }],
      },
    }),
  rustyDagger: () =>
    new Weapon({
      name: "Rusty Dagger",
      modifiers: {
        base: [
          { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
          { ...BASE_MODIFIERS.critical_strike_chance, values: [7] },
        ],
      },
    }),
};

const chest: { [key: string]: () => Chest } = {
  rustedPlateArmor: () =>
    new Chest({
      name: "Rusted Plate Armor",
      modifiers: {
        base: [{ ...BASE_MODIFIERS.armor, values: [6] }],
      },
    }),
  tornLeatherTunic: () =>
    new Chest({
      name: "Torn Leather Tunic",
      modifiers: {
        base: [{ ...BASE_MODIFIERS.evasion, values: [6] }],
      },
    }),
  raggedCloth: () =>
    new Chest({
      name: "Ragged Cloth",
      modifiers: {
        base: [{ ...BASE_MODIFIERS.evasion, values: [3] }],
      },
    }),
  leatherHarness: () =>
    new Chest({
      name: "Leather Harness",
      modifiers: {
        base: [
          { ...BASE_MODIFIERS.evasion, values: [4] },
          { ...BASE_MODIFIERS.armor, values: [2] },
        ],
      },
    }),
};

const ring: { [key: string]: () => Ring } = {
  goldRing: () =>
    new Ring({
      name: "Gold Ring",
      modifiers: {
        implicit: [{ ...IMPLICIT_MODIFIERS.to_life, values: [5] }],
      },
      requirements: { level: 5 },
    }),
  sapphireRing: () =>
    new Ring({
      name: "Sapphire Ring",
      modifiers: {
        implicit: [{ ...IMPLICIT_MODIFIERS.to_mana, values: [5] }],
      },
      requirements: { level: 5 },
    }),
};

const blueprints = {
  hand,
  chest,
  ring,
};

export default blueprints;
