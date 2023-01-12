import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ClientStorage from "./helpers/ClientStorage.js";
import logger from "./logger.js";
import getPlayerData from "./middlewares/loadClient.js";
// import InstanceFactory from "./logic/instances/InstanceFactory.js";
// import Player from "./logic/entities/Player.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

io.use(getPlayerData);

const onConnection = (socket: Socket) => {
  const { client } = socket.data;
  logger.info(`user ${client.username} connected`);
};

io.on("connection", onConnection);

httpServer.listen(4000);
