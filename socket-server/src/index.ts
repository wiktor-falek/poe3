import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ClientStorage from "./helpers/ClientStorage.js";
import logger from "./logger.js";
import initClient from "./middlewares/initClient.js";
import type Client from "./helpers/Client.js";
import registerInstanceHandler from "./handlers/instanceHandler.js";
import registerUtilsHandler from "./handlers/utilsHandler.js";
import registerZoneHandler from "./handlers/zoneHandler.js";
import registerRewardHandler from "./handlers/rewardHandler.js";
import registerCombatHandler from "./handlers/combatHandler.js";
import registerChatHandler from "./handlers/chatHandler.js";
import registerInventoryHandler from "./handlers/inventoryHandler.js";
import cron from "node-cron";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

// MIDDLEWARES
io.use(initClient);

const onConnection = (socket: Socket) => {
  const { client } = socket.data;
  client.connect();

  io.emit("player-count", ClientStorage.clientCount);

  logger.info(
    `client ${client.username} connected as character ${client.characterModelProxy.character.name}`
  );
  console.log("New Connection", ClientStorage.clients);

  // HANDLERS
  registerUtilsHandler(io, socket);
  registerChatHandler(io, socket, client);
  registerInstanceHandler(io, socket, client);
  registerZoneHandler(io, socket, client);
  registerRewardHandler(io, socket, client);
  registerCombatHandler(io, socket, client);
  registerInventoryHandler(io, socket, client);

  socket.on("disconnect", (reason) => {
    client.disconnect();

    io.emit("player-count", ClientStorage.clientCount);

    logger.info(`client ${client.username} disconnected (${reason})`);
    console.log("Disconnect", ClientStorage.clients);
  });
};

io.on("connection", onConnection);

httpServer.listen(4000);

cron.schedule("*/5 * * * * *", () => {
  // every 5 seconds remove inactive clients from ClientStorage
  const removedClients = ClientStorage.deleteInactiveClients();
  if (removedClients.length) {
    console.log("Removed inactive clients", removedClients);
  }
});
