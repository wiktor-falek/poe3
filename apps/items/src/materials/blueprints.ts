import Material from "./material";

const blueprints: { [name: string]: () => Material } = {
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

export default blueprints;
