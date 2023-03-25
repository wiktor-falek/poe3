import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";
import Player from "../logic/combat/Player";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const createInstance = (zoneId: number) => {
    const { party } = client;

    if (!party.isPartyLeader(client)) {
      return socket.emit("error", {
        message: "Only party leader can create an instance",
      });
    }

    // check if ALL clients can access this zone
    const clientPermissions: { [characterName: string]: boolean } = {};
    for (const client of Object.values(party.clients)) {
      const { highestZoneId } = client.character.progression.mainStory;
      clientPermissions[client.character.name] = highestZoneId >= zoneId;
    }

    // emit if one or more character haven't unlocked access to zoneId
    if (Object.keys(clientPermissions).length < party.size) {
      return io
        .to(party.socketRoomId)
        .emit("instance:unsatisfied-progression", clientPermissions);
    }

    // instantiate the instance
    // have each client join the instance
  };

  const joinMainStoryInstance = (zoneId: number) => {
    const highestZoneId = client.character.progression.mainStory.highestZoneId;
    if (highestZoneId === undefined || highestZoneId === null) {
      logger.error(`could not read progression data`);
      return socket.emit("error", {
        message: "Failed to read character progression data",
      });
    }
    if (highestZoneId < zoneId) {
      return socket.emit("error", {
        message: "You are not permitted to access this zone",
      });
    }

    const instance = client.joinInstance(zoneId);
    if (instance === null) {
      return socket.emit("error", {
        message: "Failed to join instance",
      });
    }

    socket.emit("instance:data", instance.data);
  };

  const doesInstanceAlreadyExist = (): void => {
    const { instance } = client;

    socket.emit("instance:already-exists", {
      instanceAlreadyExists: instance !== null,
      zoneId: instance?.zone?.id,
      roomId: instance?.currentRoom?.id,
    });
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

    // initialize combat instance if doesn't already exist in the room
    if ("combat" in room && !room.combat) {
      const { name, resources, attributes, level } = client.character;

      const actionPoints = { ap: 2, maxAp: 2 };
      const player = new Player(
        client.username,
        name,
        level,
        resources,
        attributes,
        actionPoints
      );

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

  socket.on("instance:join:main-story", joinMainStoryInstance);
  socket.on("instance:already-exists?", doesInstanceAlreadyExist);
  socket.on("instance:abandon-run", abandonInstance);
  socket.on("instance:join-room", joinRoom);
  socket.on("instance:leave-room", leaveRoom);
}

export default registerInstanceHandler;
