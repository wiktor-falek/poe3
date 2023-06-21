import { RingBase, WeaponBase } from "./bases";
import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "./modifiers";
import StartingEquipmentFactory from "./startingEquipmentFactory";

export { StartingEquipmentFactory };

// export function SapphireRing() {
//   return new RingBase({
//     name: "Sapphire Ring",
//     implicits: [{ ...IMPLICIT_MODIFIERS.to_mana, values: [5] }],
//   });
// }

// export function GoldRing() {
//   return new RingBase({
//     name: "Gold Ring",
//     implicits: [{ ...IMPLICIT_MODIFIERS.to_life, values: [5] }],
//   });
// }

// export function Branch() {
//   return new WeaponBase({
//     name: "Branch",
//     ilvl: 20,
//     baseMods: [
//       { ...BASE_MODIFIERS.physical_damage, values: [1, 3] },
//       { ...BASE_MODIFIERS.critical_strike_chance, values: [4] },
//     ],
//     implicits: [{ ...IMPLICIT_MODIFIERS.cold_damage_to_spells, values: [1, 2] }],
//   });
// }
