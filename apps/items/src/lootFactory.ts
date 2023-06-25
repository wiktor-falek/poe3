import pyrand from "pyrand";

/*
REQUIREMENTS:
  - loot pool:
    - material
    - wearable
*/

class LootFactory {
  wearableWeights: [number, number, number];
  constructor() {
    this.wearableWeights = [10, 10, 10]; // normal, magic, rare
  }

  generate(ilvl: number) {}
}

// pyrand.choices()
