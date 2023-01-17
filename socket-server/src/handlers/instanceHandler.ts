import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const joinInstance = (zoneId: number) => {
    const instance = client.joinInstance(zoneId);
    socket.emit("instance:data", instance.instanceData);
  };

  const doesInstanceAlreadyExist = () => {
    const instance = client.instance;
    const instanceAlreadyExists: boolean = instance !== null;
    const emitData: any = { instanceAlreadyExists };
    if (instance !== null) {
      emitData.zoneId = instance.zoneId
    }
    socket.emit("instance:already-exists", emitData);
  };

  const abandonInstance = () => {
    client.abandonInstance();
  }

  socket.on("instance:join", joinInstance);
  socket.on("instance:already-exists?", doesInstanceAlreadyExist);
  socket.on("instance:abandon-run", abandonInstance);
}

export default registerInstanceHandler;
