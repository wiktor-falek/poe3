import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import { choice } from "pyrand";
import { EquipmentSlot } from "../../*";
import isEquipmentSlot from "../helpers/isEquipmentSlot";
import { Branch, GoldRing, SapphireRing } from "items";

function registerInventoryHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const addTestItem = () => {
    console.log(GoldRing().magic());
    const itemPool = [
      Branch(),
      Branch().magic(),
      GoldRing(),
      GoldRing().magic(),
      SapphireRing(),
      SapphireRing().magic(),
      {
        base: "Gold Ring",
        slot: "ring",
        rarity: "unique",
        name: "The One Ring",
        description:
          "One ring to rule them all, one ring to find them, One ring to bring them all, and in the darkness bind them; In the Land of Mordor where the shadows lie.",
        requirements: {
          level: 2,
        },
        implicits: [
          {
            modId: "to_life",
            description: "+# to Life",
            values: [5],
          },
        ],
        affixes: [
          { modId: "to_strength", description: "+# to Strength", values: [1] },
          {
            modId: "to_dexterity",
            description: "+# to Dexterity",
            values: [1],
          },
          {
            modId: "to_intelligence",
            description: "+# to Intelligence",
            values: [1],
          },
          { modId: "to_vitality", description: "+# to Vitality", values: [1] },
          { modId: "to_speed", description: "+# to Speed", values: [1] },
        ],
      },
    ];

    const item = choice(itemPool);

    client.characterModelProxy.addItem(item).then((result) => {
      if (!result.ok) {
        return socket.emit("error", result.reason);
      }
      const index = result.inventoryIndex;
      socket.emit("inventory:add-item", { index, item });
    });
  };

  const swapInventoryIncides = (firstIndex: any, secondIndex: any) => {
    if (typeof firstIndex !== "number" || typeof secondIndex !== "number") {
      return socket.emit("error", "Invalid parameters");
    }
    client.characterModelProxy
      .swapInventoryIncides(firstIndex, secondIndex)
      .then((result) => {
        if (!result.ok) {
          return socket.emit("error", result.reason ?? "Action failed");
        }
        socket.emit("inventory:swap-inventory-indices", {
          swappedIndices: result.swappedIndices,
        });
      });
  };

  const deleteItem = (index: any) => {
    if (typeof index !== "number") {
      return socket.emit("error", "Invalid parameter");
    }
    client.characterModelProxy.deleteItem(index).then((result) => {
      if (!result.ok) {
        return socket.emit("error", result.reason ?? "Action failed");
      }
      socket.emit("inventory:delete-item", result.data);
    });
  };

  const equipItem = (index: any) => {
    if (typeof index !== "number") {
      return socket.emit("error", "Invalid parameter");
    }
    client.characterModelProxy.equipItem(index).then((result) => {
      if (!result.ok) {
        return socket.emit("error", result.reason ?? "Action failed");
      }
      return socket.emit("inventory:equip-item", result.data);
    });
  };

  const unequipItem = (equipmentSlot: any) => {
    if (typeof equipmentSlot !== "string" || !isEquipmentSlot(equipmentSlot)) {
      return socket.emit("error", "Invalid parameter");
    }
    client.characterModelProxy
      .unequipItem(equipmentSlot as EquipmentSlot)
      .then((result) => {
        if (!result.ok) {
          return socket.emit("error", result.reason ?? "Action failed");
        }
        return socket.emit("inventory:unequip-item", result.data);
      });
  };

  socket.on("inventory:add-test-item", addTestItem);
  socket.on("inventory:swap-inventory-indices", swapInventoryIncides);
  socket.on("inventory:delete-item", deleteItem);
  socket.on("inventory:equip-item", equipItem);
  socket.on("inventory:unequip-item", unequipItem);
}

export default registerInventoryHandler;
