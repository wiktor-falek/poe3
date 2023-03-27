import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";
import Player from "../logic/combat/Player";
import Instance from "../logic/Instance";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const createInstance = (zoneId: number) => {
    if (zoneId == null || typeof zoneId !== "number") {
      return socket.emit("error", "Invalid input");
    }

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

    const instance = new Instance(zoneId, client.party);
    client.instance = instance;

    // emit instance data to ALL clients
    // io.to(instance.socketRoomId).emit("instance:data", instance.data)
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

  const leaveInstance = () => {
    const instance = client.instance;
    instance?.party.leaveParty(client);
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
    const room = client.instance?.zone?.currentRoom;
    if (!room) return socket.emit("error", "Room does not exist");

    const hasLeft = room.completed;
    socket.emit("instance:has-left-room", hasLeft);
    if (hasLeft && client.instance) {
      socket.emit("instance:data", client.instance.data);
    }
  };

  socket.on("instance:create-instance", createInstance);
  socket.on("instance:leave-instance", leaveInstance);

  socket.on("instance:already-exists?", doesInstanceAlreadyExist);
  socket.on("instance:join-room", joinRoom);
  socket.on("instance:leave-room", leaveRoom);
}

export default registerInstanceHandler;
