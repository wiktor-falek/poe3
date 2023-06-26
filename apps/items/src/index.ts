import LootFactory from "./lootFactory";
import StartingEquipmentFactory from "./startingEquipmentFactory";
import { inspect } from "./utils";

const factory = new LootFactory();
const loot = factory.generateLoot(1);
inspect(loot);

export { StartingEquipmentFactory };
