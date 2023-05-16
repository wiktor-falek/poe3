import { createServer } from "http";
import { Server } from "socket.io";
import type { IoWithEventTypes } from "..";

import registerTestHandler from "./handlers/testHandler";

const httpServer = createServer();
const io: IoWithEventTypes = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  // handle errors

  // init

  // register handlers
  registerTestHandler(io, socket);
  
  socket.on("disconnect", () => {});
});

httpServer.listen(4000, () => {
  console.log("listening on port 4000");
})