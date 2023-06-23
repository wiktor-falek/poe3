class Material {
  // constructor() {
  //
  // }
}

// Wearable Item
const ring = {
  // _id: ObjectId("64945dfbabb5d91f254ae8cf"),
  name: "Sapphire Ring",
  type: "wearable",
  ilvl: 1,
  rarity: "magic",
  requirements: { level: 5 },
  modifiers: {
    base: [],
    implicit: [{ modId: "to_mana", description: "+# to Mana", values: [5] }],
    affix: {
      prefix: [],
      suffix: [],
    },
  },
  slot: "ring",
};

// Stackable Material Item
const material = {
  name: "Augmenting Core",
  id: "augmenting_core",
  type: "material",
  description: "Use in the Forge to attempt upgrading existing modifier of an item by one Tier",
  stackable: true,
  stackSize: 1,
  maxStackSize: 20,
};
