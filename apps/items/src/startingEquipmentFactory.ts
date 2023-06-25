import { Chest, Ring, Weapon } from "./wearable";
import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "./modifiers";
import type { CharacterClass } from "../../common/index";

class StartingEquipmentFactory {
  static createForClass(characterClass: CharacterClass) {
    switch (characterClass) {
      case "swordsman":
        return {
          hand: new Weapon({
            name: "Broken Sword",
            modifiers: {
              base: [
                { ...BASE_MODIFIERS.physical_damage, values: [2, 3] },
                { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
              ],
            },
          }),
          offhand: null,
          helmet: null,
          chest: new Chest({
            name: "Rusted Plate Armor",
            modifiers: {
              base: [{ ...BASE_MODIFIERS.armor, values: [6] }],
            },
          }).magic(),
          gloves: null,
          boots: null,
          ring_1: new Ring({
            name: "Sapphire Ring",
            requirements: { level: 5 },
            modifiers: {
              implicit: [{ ...IMPLICIT_MODIFIERS.to_mana, values: [5] }],
            },
          }).rare(),
          ring_2: new Ring({
            name: "Gold Ring",
            modifiers: {
              implicit: [{ ...IMPLICIT_MODIFIERS.to_life, values: [5] }],
            },
          }).rare(),
          amulet: null,
          belt: null,
        };

      case "ranger":
        return {
          hand: new Weapon({
            name: "Short Bow",
            modifiers: {
              base: [
                { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
                { ...BASE_MODIFIERS.critical_strike_chance, values: [5] },
              ],
            },
          }),
          offhand: null,
          helmet: null,
          chest: new Chest({
            name: "Torn Leather Tunic",
            modifiers: {
              base: [{ ...BASE_MODIFIERS.evasion, values: [6] }],
            },
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
          hand: new Weapon({
            name: "Branch",
            modifiers: {
              base: [
                { ...BASE_MODIFIERS.physical_damage, values: [1, 3] },
                { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
              ],
              implicit: [{ ...IMPLICIT_MODIFIERS.cold_damage_to_spells, values: [1, 2] }],
            },
          }),
          offhand: null,
          helmet: null,
          chest: new Chest({
            name: "Ragged Cloth",
            modifiers: {
              base: [{ ...BASE_MODIFIERS.evasion, values: [3] }],
            },
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
          hand: new Weapon({
            name: "Rusty Dagger",
            modifiers: {
              base: [
                { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
                { ...BASE_MODIFIERS.critical_strike_chance, values: [7] },
              ],
            },
          }),
          offhand: null,
          helmet: null,
          chest: new Chest({
            name: "Leather Harness",
            modifiers: {
              base: [
                { ...BASE_MODIFIERS.evasion, values: [4] },
                { ...BASE_MODIFIERS.armor, values: [2] },
              ],
            },
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
