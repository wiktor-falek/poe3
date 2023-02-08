import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";
import Entity from "../logic/combat/Entity";
import { Character } from "../../*";
import Player from "../logic/combat/Player";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const joinMainStoryInstance = (zoneId: number) => {
    const highestZoneId =
      client.playerModel.character.progression.mainStory.highestZoneId;
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

  const doesInstanceAlreadyExist = (): void => {
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
    const room = instance.zone?.currentRoom;
    if (room === undefined || room === null) {
      logger.error("room is null");
      return null;
    }

    if ("combat" in room && !room.combat) {
      const { name, resources, attributes, level } =
        client.playerModel.character;

      const player = new Player(name, level, resources, attributes);

      const party = [player];

      room.startCombat(party);
    }

    // TODO: select individual properties from room or make others private
    const emitData = {
      room,
    };
    socket.emit("instance:room-data", emitData);
  };

  const leaveRoom = () => {
    // TODO: PROCEED
    // check if room is actually completed
    // if (client.instance?.currentRoom?.completed) {}
    const hasLeft = client.instance?.zone?.leaveRoom() ?? false;
    socket.emit("instance:has-left-room", hasLeft);
    if (hasLeft && client.instance) {
      socket.emit("instance:data", client.instance.data);
    }
  };

  const getCombatState = () => {
    const currentRoom = client.instance?.currentRoom;
    if (!currentRoom || currentRoom.type !== "combat") {
      return socket.emit("error");
    }
  };

  socket.on("instance:join:main-story", joinMainStoryInstance);
  socket.on("instance:already-exists?", doesInstanceAlreadyExist);
  socket.on("instance:abandon-run", abandonInstance);
  socket.on("instance:join-room", joinRoom);
  socket.on("instance:leave-room", leaveRoom);
  // socket.on("instance:get-combat-state", getCombatState);
}

export default registerInstanceHandler;
