import type { CharacterClass } from "../../common/types/index";
import blueprints from "./wearable/blueprints";
import type { Chest, Ring, Weapon } from "./wearable";

class StartingItemsFactory {
  static createForClass(characterClass: CharacterClass) /*: {
    hand: Weapon | null;
    offhand: null;
    helmet: null;
    chest: Chest | null;
    gloves: null;
    boots: null;
    ring_1: Ring | null;
    ring_2: Ring | null;
    amulet: null;
    belt: null;
  }*/ {
    switch (characterClass) {
      case "swordsman":
        return [
          { ...blueprints.hand.brokenSword(), equipment: "hand" },
          // { ...blueprints.offhand.???(), equipment: "offhand" },
          // { ...blueprints.helmet.???(), equipment: "helmet" },
          { ...blueprints.chest.rustedPlateArmor(), equipment: "chest" },
          // { ...blueprints.gloves.???(), equipment: "gloves" },
          // { ...blueprints.boots.???(), equipment: "boots" },
          { ...blueprints.ring.goldRing(), equipment: "ring_1" },
          { ...blueprints.ring.sapphireRing(), equipment: "ring_2" },
          // { ...blueprints.amulet.???(), equipment: "amulet" },
          // { ...blueprints.belt.???(), equipment: "belt" },
        ];

      case "ranger":
        return [
          { ...blueprints.hand.shortBow(), equipment: "hand" },
          // { ...blueprints.offhand.???(), equipment: "offhand" },
          // { ...blueprints.helmet.???(), equipment: "helmet" },
          { ...blueprints.chest.tornLeatherTunic(), equipment: "chest" },
          // { ...blueprints.gloves.???(), equipment: "gloves" },
          // { ...blueprints.boots.???(), equipment: "boots" },
          // { ...blueprints.ring.???(), equipment: "ring_1" },
          // { ...blueprints.ring.???(), equipment: "ring_2" },
          // { ...blueprints.amulet.???(), equipment: "amulet" },
          // { ...blueprints.belt.???(), equipment: "belt" },
        ];

      case "sorcerer":
        return [
          { ...blueprints.hand.branch(), equipment: "hand" },
          // { ...blueprints.offhand.???(), equipment: "offhand" },
          // { ...blueprints.helmet.???(), equipment: "helmet" },
          { ...blueprints.chest.raggedCloth(), equipment: "chest" },
          // { ...blueprints.gloves.???(), equipment: "gloves" },
          // { ...blueprints.boots.???(), equipment: "boots" },
          // { ...blueprints.ring.???(), equipment: "ring_1" },
          // { ...blueprints.ring.???(), equipment: "ring_2" },
          // { ...blueprints.amulet.???(), equipment: "amulet" },
          // { ...blueprints.belt.???(), equipment: "belt" },
        ];

      case "assassin":
        return [
          { ...blueprints.hand.rustyDagger(), equipment: "hand" },
          // { ...blueprints.offhand.???(), equipment: "offhand" },
          // { ...blueprints.helmet.???(), equipment: "helmet" },
          { ...blueprints.chest.leatherHarness(), equipment: "chest" },
          // { ...blueprints.gloves.???(), equipment: "gloves" },
          // { ...blueprints.boots.???(), equipment: "boots" },
          // { ...blueprints.ring.???(), equipment: "ring_1" },
          // { ...blueprints.ring.???(), equipment: "ring_2" },
          // { ...blueprints.amulet.???(), equipment: "amulet" },
          // { ...blueprints.belt.???(), equipment: "belt" },
        ];
    }
  }
}

export default StartingItemsFactory;
