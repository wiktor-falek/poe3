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
  const { client } = socket.data;
  client.connect();

  io.emit("player-count", ClientStorage.clientCount);

  logger.info(
    `client ${client.username} connected as character ${client.character.name}`
  );

  // emit to party members
  const partyRoom = client.party.socketRoomId;
  io.to(partyRoom).emit("party:data", client.party.publicData);

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

    // emit to party members
    const partyRoom = client.party.socketRoomId;
    io.to(partyRoom).emit("party:data", client.party.publicData);

    logger.info(`client ${client.username} disconnected (${reason})`);
  });
});

httpServer.listen(4000);

cron.schedule("*/5 * * * * *", () => {
  // every 5 seconds remove inactive clients from ClientStorage
  const removedClients = ClientStorage.deleteInactiveClients();
  if (removedClients.length) {
    console.log("Removed inactive clients", removedClients);
  }
});
