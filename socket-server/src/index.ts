import { createServer } from "http";
import { Server, Socket } from "socket.io";
import logger from "./logger.js";
import getPlayerData from "./middlewares/getPlayerData.js";
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
  const { username } = socket.data;
  logger.info(`user ${username} connected`);
};

io.on("connection", onConnection);

httpServer.listen(4000);
