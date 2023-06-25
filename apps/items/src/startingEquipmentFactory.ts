import type { CharacterClass } from "../../common/types/index";
import { blueprints } from "./wearable/blueprints";
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
          hand: blueprints.weapons.brokenSword(),
          offhand: null,
          helmet: null,
          chest: blueprints.chests.rustedPlateArmor().magic(),
          gloves: null,
          boots: null,
          ring_1: blueprints.rings.sapphireRing().rare(),
          ring_2: blueprints.rings.goldRing().rare(),
          amulet: null,
          belt: null,
        };

      case "ranger":
        return {
          hand: blueprints.weapons.shortBow(),
          offhand: null,
          helmet: null,
          chest: blueprints.chests.tornLeatherTunic(),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };

      case "sorcerer":
        return {
          hand: blueprints.weapons.branch(),
          offhand: null,
          helmet: null,
          chest: blueprints.chests.raggedCloth(),
          gloves: null,
          boots: null,
          ring_1: null,
          ring_2: null,
          amulet: null,
          belt: null,
        };

      case "assassin":
        return {
          hand: blueprints.weapons.rustyDagger(),
          offhand: null,
          helmet: null,
          chest: blueprints.chests.leatherHarness(),
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
