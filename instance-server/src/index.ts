import { createServer } from "http";
import { Server, Socket } from "socket.io";
import getPlayerData from "./middlewares/getPlayerData.js";
import { joinInstance } from "./handlers/instanceHandler.js"
// import InstanceFactory from "./logic/instances/InstanceFactory.js";
// import Player from "./logic/entities/Player.js";


const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.use(getPlayerData);

const onConnection = (socket: Socket) => {
  socket.emit("message", "you connected");
  const { userId, character } = socket.data;

  const availableDungeons: Object[] = [
    { id: 1, name: "Old Cellar" },
    { id: 2, name: "Sample Text" },
  ];
  socket.emit("availableDungeons", availableDungeons); 

  socket.on("selectDungeon", (id) => {
    console.log("selected dungeon", id);
  });

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
  });

};

io.on("connection", onConnection);

httpServer.listen(4000);
