import type Client from "../helpers/Client";
import type { Socket } from "socket.io";

function registerInventoryHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const addTestItem = () => {
    const item = {
      name: "Gold Ring",
      slot: "ring",
      rarity: "magic",
      requirements: {
        level: 5,
      },
      implicits: [
        {
          modId: "to_life",
          description: "+# to Life",
          values: [5],
        },
      ],
      affixes: {
        prefixes: [
          {
            modId: "to_life",
            description: "+# to Life",
            values: [2],
          },
        ],
        suffixes: [
          {
            modId: "to_dexterity",
            description: "+# to Dexterity",
            values: [2],
          },
        ],
      },
    };

    client.playerModel.addItem(item).then((result) => {
      if (!result.ok) {
        return socket.emit("error", result.reason);
      }
      const index = result.inventoryIndex;
      socket.emit("inventory:add-item", { index, item });
    });
  };

  socket.on("inventory:add-test-item", addTestItem);
}

export default registerInventoryHandler;
