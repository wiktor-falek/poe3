import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ClientStorage from "./helpers/ClientStorage.js";
import logger from "./logger.js";
import initClient from "./middlewares/initClient.js";
import type Client from "./helpers/Client.js";
import registerInstanceHandler from "./handlers/instanceHandler.js";
import registerUtilsHandler from "./handlers/utilsHandler.js";
import registerZoneHandler from "./handlers/zoneHandler.js";

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

  logger.info(
    `client ${client.username} connected as character ${client.player.character.name}`
  );

  console.log(ClientStorage.clients);

  // HANDLERS
  registerInstanceHandler(io, socket, client);
  registerUtilsHandler(io, socket);
  registerZoneHandler(io, socket, client);

  socket.on("disconnect", (reason) => {
    logger.info(`client ${client.username} disconnected (${reason})`);
    console.log(ClientStorage.clients);
  });
};

io.on("connection", onConnection);

httpServer.listen(4000);
