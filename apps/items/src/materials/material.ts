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

export const materials: { [name: string]: () => Material } = {
  augmentingCore: () =>
    new Material({
      name: "Augmenting Core",
      id: "augmenting_core",
      description:
        "Use in the Forge to attempt upgrading existing modifier of an item by one Tier.",
      maxStackSize: 20,
    }),
  philosophersStone: () =>
    new Material({
      name: "Philosopher's Stone",
      id: "philosophers_stone",
      description: "Use in the Alchemy Table to Transfigure an item's implicit modifier.",
      maxStackSize: 10,
    }),
  cinnabariteCrystal: () =>
    new Material({
      name: "Cinnabarite Crystal",
      id: "cinnabarite_crystal",
      description:
        "Use in the Alchemy Table to enhance an item with a second Transfigured implicit modifier.",
      maxStackSize: 10,
    }),
};

export default Material;
