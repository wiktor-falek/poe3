import { choice, choices } from "pyrand";
import materialBlueprints from "./materials/blueprints.js";
import wearableBlueprints from "./wearable/blueprints.js";
import { Chest, Ring, Weapon } from "./wearable/index.js";

// export interface Options {}

class LootFactory {
  static generateMaterials(amount: number, ilvl: number) {
    // TODO: filter out materials that cannot drop at given ilvl

    const materials = choices(Object.values(materialBlueprints), amount, {
      weights: [55, 30, 15],
    }).map((blueprint) => blueprint());

    return materials;
  }

  static generateWearables(amount: number, ilvl: number) {
    // TODO: change to WearableSlot once all wearables are implemented aswell as blueprints
    const equipmentSlotWeights: {
      [slot in /*WearableSlot*/ "hand" | "chest" | "ring"]: number;
    } = {
      hand: 10,
      chest: 5,
      ring: 3,
    };

    type Wearables = () => Weapon | Chest | Ring;
    const blueprints: Array<Wearables> = []; // TODO: not any for gods sake, () => Weapon | Chest | Ring ...
    for (let i = 0; i < amount; i++) {
      const slot = choices(Object.keys(equipmentSlotWeights), amount, {
        weights: Object.values(equipmentSlotWeights),
      })[0] as "hand" | "chest" | "ring";

      const pool = wearableBlueprints[slot];
      const blueprint = choice(Object.values(pool));
      blueprints.push(blueprint);
    }

    const wearables = blueprints.map((bp) => {
      const wearable = bp();
      const rarity = choices(["normal", "magic", "rare"], 1, {
        weights: [45, 35, 20],
      })[0];
      if (rarity === "magic") {
        wearable.magic();
      } else if (rarity === "rare") {
        wearable.rare();
      }

      return wearable.setIlvl(ilvl);
    });

    return wearables;
  }

  static generateLoot(ilvl: number, playerCount?: number, enemyCount?: number) {
    const amountOfMaterials = choices([0, 1, 2], 1, {
      weights: [40, 50, 10],
    })[0];
    const amountOfWearables = choices([0, 1, 2, 3], 1, {
      weights: [10, 20, 30, 40],
    })[0];

    const materials = this.generateMaterials(amountOfMaterials, ilvl);
    const wearables = this.generateWearables(amountOfWearables, ilvl);
    return [...materials, ...wearables];
  }
}

export default LootFactory;
