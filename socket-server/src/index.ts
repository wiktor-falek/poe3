import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ClientStorage from "./helpers/ClientStorage.js";
import logger from "./logger.js";
import loadClient from "./middlewares/loadClient.js";
import type Client from "./helpers/Client.js";
import registerInstanceHandler from "./handlers/instanceHandler.js";
import registerUtilsHandler from "./handlers/utilsHandler.js";
import registerFloorHandler from "./handlers/floorHandler.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

// MIDDLEWARES
io.use(loadClient);

const onConnection = (socket: Socket) => {
  const client: Client = socket.data.client;

  logger.info(
    `client ${client.username} connected as character ${client.player.character.name}`
  );

  // console.log(ClientStorage.clients);

  // HANDLERS
  registerInstanceHandler(io, socket, client);
  registerUtilsHandler(io, socket);
  registerFloorHandler(io, socket, client);

  socket.on("disconnect", (reason) => {
    logger.info(`client ${client.username} disconnected (${reason})`);
  });
};



io.on("connection", onConnection);

httpServer.listen(4000);
