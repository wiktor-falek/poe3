import type { CharacterClass } from "../../common/index";
import { ChestBase, RingBase, WeaponBase } from "./bases";
import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "./modifiers";

class StartingEquipmentFactory {
  static createForClass(characterClass: CharacterClass) {
    switch (characterClass) {
      case "swordsman":
        return {
          hand: new WeaponBase({
            name: "Broken Sword",
            baseMods: [
              { ...BASE_MODIFIERS.physical_damage, values: [2, 3] },
              { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
            ],
          }),
          offhand: null,
          helmet: null,
          chest: new ChestBase({
            name: "Rusted Plate Armor",
            baseMods: [{ ...BASE_MODIFIERS.armor, values: [6] }],
          }),
          gloves: null,
          boots: null,
          ring_1: new RingBase({
            name: "Sapphire Ring",
            requirements: { level: 5 },
            baseMods: [{ ...BASE_MODIFIERS.to_mana, values: [5] }],
          }).magic(),
          ring_2: new RingBase({
            name: "Gold Ring",
            baseMods: [{ ...BASE_MODIFIERS.to_life, values: [5] }],
          }).rare(),
          amulet: null,
          belt: null,
        };

      case "ranger":
        return {
          hand: new WeaponBase({
            name: "Short Bow",
            baseMods: [
              { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
              { ...BASE_MODIFIERS.critical_strike_chance, values: [5] },
            ],
          }),
          offhand: null,
          helmet: null,
          chest: new ChestBase({
            name: "Torn Leather Tunic",
            baseMods: [{ ...BASE_MODIFIERS.evasion, values: [6] }],
          }),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };

      case "sorcerer":
        return {
          hand: new WeaponBase({
            name: "Branch",
            baseMods: [
              { ...BASE_MODIFIERS.physical_damage, values: [1, 3] },
              { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
            ],
            implicits: [{ ...IMPLICIT_MODIFIERS.cold_damage_to_spells, values: [1, 2] }],
          }),
          offhand: null,
          helmet: null,
          chest: new ChestBase({
            name: "Ragged Cloth",
            baseMods: [{ ...BASE_MODIFIERS.evasion, values: [3] }],
          }),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };

      case "assassin":
        return {
          hand: new WeaponBase({
            name: "Rusty Dagger",
            baseMods: [
              { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
              { ...BASE_MODIFIERS.critical_strike_chance, values: [7] },
            ],
          }),
          offhand: null,
          helmet: null,
          chest: new ChestBase({
            name: "Leather Harness",
            baseMods: [
              { ...BASE_MODIFIERS.evasion, values: [4] },
              { ...BASE_MODIFIERS.armor, values: [2] },
            ],
          }),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };
    }
  }
}

export default StartingEquipmentFactory;
