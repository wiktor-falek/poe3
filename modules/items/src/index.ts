import RingBase from "./gear/bases/RingBase";
import WeaponBase from "./gear/bases/WeaponBase";
import { BASE_MODIFIERS } from "./modifiers/modifiers";

const goldRing = new RingBase("Gold Ring", { level: 5 }, [], []);
const shortBow = new WeaponBase(
  "Short Bow",
  { level: 1 },
  [
    { ...BASE_MODIFIERS.physical_damage, values: [2, 4] },
    { ...BASE_MODIFIERS.critical_strike_chance, values: [5] },
  ],
  []
);

console.log(shortBow);
