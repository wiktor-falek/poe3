import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cron from "node-cron";
import logger from "./logger.js";
import initClient from "./middlewares/initClient.js";
import ClientStorage from "./helpers/ClientStorage.js";
import registerInstanceHandler from "./handlers/instanceHandler.js";
import registerUtilsHandler from "./handlers/utilsHandler.js";
import registerZoneHandler from "./handlers/zoneHandler.js";
import registerRewardHandler from "./handlers/rewardHandler.js";
import registerCombatHandler from "./handlers/combatHandler.js";
import registerChatHandler from "./handlers/chatHandler.js";
import registerInventoryHandler from "./handlers/inventoryHandler.js";
import registerPartyHandler from "./handlers/partyHandler.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

// MIDDLEWARES
io.use(initClient);

io.on("connection", (socket: Socket) => {
  socket.on("error", (err: Error) => {
    if (err) {
      socket.emit("connection-error", err.message);
      socket.disconnect();
    }
  });

  const { client } = socket.data;
  client.connect();

  socket.emit("character:data", client.character);

  io.emit("player-count", ClientStorage.clientCount);

  logger.info(
    `user ${client.username} connected as character ${client.character.name}`
  );

  // HANDLERS
  registerUtilsHandler(io, socket);
  registerChatHandler(io, socket, client);
  registerInstanceHandler(io, socket, client);
  registerZoneHandler(io, socket, client);
  registerRewardHandler(io, socket, client);
  registerCombatHandler(io, socket, client);
  registerInventoryHandler(io, socket, client);
  registerPartyHandler(io, socket, client);

  socket.on("disconnect", (reason) => {
    client.disconnect();
    io.emit("player-count", ClientStorage.clientCount);
    logger.info(`user ${client.username} disconnected (${reason})`);
  });
});

httpServer.listen(4000);

cron.schedule("*/5 * * * * *", () => {
  const removedClients = ClientStorage.deleteInactiveClients();
  for (const client of removedClients) {
    console.log(`Removed inactive client ${client.username}`);
    client.party.leaveParty(client);
  }
});
