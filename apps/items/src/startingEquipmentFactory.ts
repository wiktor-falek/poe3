import type { CharacterClass } from "../../common/types/index";
import blueprints from "./wearable/blueprints";
import type { Chest, Ring, Weapon } from "./wearable";

class StartingEquipmentFactory {
  static createForClass(characterClass: CharacterClass): {
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
  } {
    switch (characterClass) {
      case "swordsman":
        return {
          hand: blueprints.hand.brokenSword(),
          offhand: null,
          helmet: null,
          chest: blueprints.chest.rustedPlateArmor().magic(),
          gloves: null,
          boots: null,
          ring_1: blueprints.ring.sapphireRing().rare(),
          ring_2: blueprints.ring.goldRing().rare(),
          amulet: null,
          belt: null,
        };

      case "ranger":
        return {
          hand: blueprints.hand.shortBow(),
          offhand: null,
          helmet: null,
          chest: blueprints.chest.tornLeatherTunic(),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };

      case "sorcerer":
        return {
          hand: blueprints.hand.branch(),
          offhand: null,
          helmet: null,
          chest: blueprints.chest.raggedCloth(),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };

      case "assassin":
        return {
          hand: blueprints.hand.rustyDagger(),
          offhand: null,
          helmet: null,
          chest: blueprints.chest.leatherHarness(),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };
    }
  }
}

export default StartingEquipmentFactory;
