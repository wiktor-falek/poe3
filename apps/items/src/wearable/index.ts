import Ring from "./ring.js";
import Weapon from "./weapon.js";
import Chest from "./chest.js";

export interface Item {
  name: string;
  type: "material" | "wearable";
}

export interface StackableItem extends Item {
  stackable: true;
  stackSize: number;
  maxStackSize: number;
}

export { Ring, Weapon, Chest };
