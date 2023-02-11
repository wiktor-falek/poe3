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
import prettyBytes from "./utils/prettyBytes.js";
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
  const client: Client = socket.data.client;

  // client already connected, multiple connections are not allowed
  if (client.isConnected) {
    return socket.emit("error:connection-already-exists");
  }
  client.isConnected = true;
  io.emit("player-count", ClientStorage.clientCount);

  logger.info(
    `client ${client.username} connected as character ${client.playerModel.character.name}`
  );

  console.log(ClientStorage.clients);

  // HANDLERS
  registerUtilsHandler(io, socket);
  registerChatHandler(io, socket, client);
  registerInstanceHandler(io, socket, client);
  registerZoneHandler(io, socket, client);
  registerRewardHandler(io, socket, client);
  registerCombatHandler(io, socket, client);

  socket.on("disconnect", (reason) => {
    client.isConnected = false;
    logger.info(`client ${client.username} disconnected (${reason})`);
    console.log(ClientStorage.clients);
    io.emit("player-count", ClientStorage.clientCount);
  });
};

io.on("connection", onConnection);

httpServer.listen(4000);

cron.schedule("*/5 * * * * *", () => {
  const memory = process.memoryUsage();
  const heapUsed = prettyBytes(memory.heapUsed);
  const heapTotal = prettyBytes(memory.heapTotal);
  console.log(`HEAP USAGE: ${heapUsed} / ${heapTotal}`);
});
