import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const joinMainStoryInstance = (zoneId: number) => {
    const highestZoneId =
      client.player.character.progression.mainStory.highestZoneId;
    if (highestZoneId === undefined || highestZoneId === null) {
      logger.error(`could not read progression data`);
      return socket.emit("error:instance:join", {
        message: "Failed to read character progression data",
      });
    }
    if (highestZoneId < zoneId) {
      return socket.emit("error:instance:join", {
        message: "You are not permitted to access this zone",
      });
    }

    const instance = client.joinInstance(zoneId);
    if (instance === null) {
      return socket.emit("error:instance:data", {
        message: "Failed to join instance",
      });
    }
    socket.emit("instance:data", instance.data);
  };

  const doesInstanceAlreadyExist = () => {
    const instance = client.instance;
    const instanceAlreadyExists: boolean = instance !== null;
    const emitData: any = { instanceAlreadyExists };
    if (instance !== null) {
      emitData.zoneId = instance.zoneId;
    }
    socket.emit("instance:already-exists", emitData);
  };

  const abandonInstance = () => {
    client.abandonInstance();
  };

  const joinRoom = (roomNumber: number) => {
    const instance = client.instance;
    if (instance === null)
      return logger.warn(
        `${client.username} tried to join while not in an instance`
      );
    const room = instance.getCurrentRoom(roomNumber);

    if (!room.initialized) {
      room.init();
    }

    const emitData = {
      room,
    };
    socket.emit("instance:room-data", emitData);
  };

  socket.on("instance:join:main-story", joinMainStoryInstance);
  socket.on("instance:already-exists?", doesInstanceAlreadyExist);
  socket.on("instance:abandon-run", abandonInstance);
  socket.on("instance:join-room", joinRoom);
}

export default registerInstanceHandler;
