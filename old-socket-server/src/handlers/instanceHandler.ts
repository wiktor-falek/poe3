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
      return socket.emit("error", "Only party leader can create an instance");
    }

    // check if all clients can access this zone
    const charactersProgression: { [characterName: string]: boolean } = {};
    for (const client of Object.values(party.clients)) {
      const { highestZoneId } = client.character.progression.mainStory;
      charactersProgression[client.character.name] = highestZoneId >= zoneId;
    }

    // emit to all clients if one or more character haven't progressed to zoneId
    if (Object.keys(charactersProgression).length < party.size) {
      return io
        .to(party.socketRoomId)
        .emit("instance:unsatisfied-progression", charactersProgression);
    }

    const instance = new Instance(zoneId);

    for (const client of Object.values(party.clients)) {
      instance.join(client);
      client.instance = instance;
    }

    // emit instance data to ALL clients
    io.to(instance.socketRoomId).emit("instance:data", instance.data)
    // socket.emit("instance:data", instance.data);
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
    client.instance = null;
    client.party.leave(client);
  };

  const joinRoom = (roomNumber: number) => {
    if (roomNumber == null || typeof roomNumber !== "number") {
      return socket.emit("error", "Invalid input");
    }

    if (client.instance === null) {
      return socket.emit("error", "Instance does not exist");
    }

    const room = client.instance.zone?.currentRoom;

    if (room == null) {
      return socket.emit("error", "Invalid room");
    }

    // initialize combat instance if doesn't already exist in the room
    // TODO: refactor to support multiple clients
    // TODO: move this logic to Room/CombatRoom
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
