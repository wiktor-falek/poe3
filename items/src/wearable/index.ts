import Ring from "./ring";
import Weapon from "./weapon";
import Chest from "./chest";

export interface Item {
  name: string;
  uniqueName?: string;
}

export interface StackableItem extends Item {
  stackable: true;
  stackSize: number;
  maxStackSize: number;
}

export { Ring, Weapon, Chest };
