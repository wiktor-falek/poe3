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

  logger.info(
    `client ${client.username} connected as character ${client.player.character.name}`
  );

  console.log(ClientStorage.clients);

  // HANDLERS
  registerUtilsHandler(io, socket);
  registerInstanceHandler(io, socket, client);
  registerZoneHandler(io, socket, client);
  registerRewardHandler(io, socket, client);
  registerCombatHandler(io, socket, client);

  socket.on("disconnect", (reason) => {
    client.isConnected = false;
    logger.info(`client ${client.username} disconnected (${reason})`);
    console.log(ClientStorage.clients);
  });
};

io.on("connection", onConnection);

httpServer.listen(4000);
