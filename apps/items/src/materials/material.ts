import type { StackableItem } from "../wearable";

export interface Options {
  name: string;
  id: string;
  description: string;
  maxStackSize: number;
}

class Material implements StackableItem {
  type: "material";
  id: string;
  name: string;
  description: string;
  stackable: true;
  stackSize: number;
  maxStackSize: number;
  constructor(options: Options) {
    this.type = "material";
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.stackable = true;
    this.stackSize = 1;
    this.maxStackSize = options.maxStackSize;
  }
}

export default Material;
