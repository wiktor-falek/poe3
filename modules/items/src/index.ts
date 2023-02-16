import {
  SWORDSMAN_STARTING_ITEMS,
  RANGER_STARTING_ITEMS,
  SORCERER_STARTING_ITEMS,
  ASSASSIN_STARTING_ITEMS,
} from "./constants/startingItems";
import { RingBase, WeaponBase } from "./gear/bases";
import parseItem from "./helpers/parseItem";
import { BASE_MODIFIERS, IMPLICIT_MODIFIERS } from "./modifiers/modifiers";

export {
  SWORDSMAN_STARTING_ITEMS,
  RANGER_STARTING_ITEMS,
  SORCERER_STARTING_ITEMS,
  ASSASSIN_STARTING_ITEMS,
};

export { RingBase, WeaponBase };

export const GoldRing = () =>
  new RingBase(
    "Gold Ring",
    1,
    { level: 1 },
    [{ ...IMPLICIT_MODIFIERS.to_life }],
    []
  );

export const SapphireRing = () =>
  new RingBase(
    "Sapphire Ring",
    1,
    { level: 1 },
    [{ ...IMPLICIT_MODIFIERS.to_life }],
    []
  );

// const parseItemTest = {
//   name: "Sapphire Ring",
//   slot: "ring",
//   rarity: "normal",
//   requirements: {
//     level: 5,
//   },
//   implicits: [
//     {
//       modId: "to_mana",
//       description: "+# to Mana",
//       values: [5],
//     },
//   ],
//   affixes: {
//     // hmm yes the floor here is made out of floor
//     prefixes: [] as [],
//     suffixes: [] as [],
//   },
// };
