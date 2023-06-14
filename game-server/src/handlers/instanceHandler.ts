import type { Io, IoSocket } from "../index.js";
import Client from "../components/client/client.js";
import InstanceManager from "../game/instance/instanceManager.js";
import LobbyManager from "../game/lobby/lobbyManager.js";
import { ErrorMessage, GlobalMessage } from "../components/message.js";
import Player from "../game/entities/player.js";
import Enemy from "../game/entities/enemy.js";
import ClientManager from "../components/client/clientManager.js";
import { choice } from "pyrand";

function registerInstanceHandler(io: Io, socket: IoSocket, client: Client) {
  const create = () => {
    // if lobby exists prevent non-owner from creating a lobby
    const lobby = LobbyManager.currentLobby(client);

    if (lobby && !lobby.clientIsOwner(client)) {
      return;
    }

    if (lobby) {
      lobby.isHidden = true;
    }

    // initialize instance
    const instance = InstanceManager.createInstance();

    const clients = lobby === undefined ? [client] : [...lobby.clients];
    // handle instance join for each client
    for (const client of clients) {
      instance.join(client);
      client.instanceId = instance.id;
      client.socket.join(instance.socketRoom);
    }

    // temporarily init combat before everything is ready
    const room = instance.createCombatRoom();

    io.to(instance.socketRoom).emit("instance:set", instance);

    // TODO: move this to a class
    while (true) {
      const entity = room.turn.next();

      if (entity === null) {
        room.turn.startTurn();
        continue;
      }

      if (entity instanceof Player) {
        // emit to this client to take action
        // broadcast emit to clients in the room?
        // entity.dynamicCharacter
        const client = ClientManager.getClientByCharacterName(entity.name);
        if (client === undefined) {
          // shouldn't be possible
          console.error("Client is undefined");
          break;
        }
        client.socket.emit("instance:your-turn");

        break;
      }

      if (entity instanceof Enemy) {
        const action = entity.basicAttack();
        const target = choice(room.players);
        target.takeDamage(action.damage);

        io.to(instance.socketRoom).emit("instance:enemy-action", {
          ...action,
          targetId: target.id,
        });
        // select target and add attacker and target to action
        // actionLog.push({ ...action }); // queue actions of all enemies to send at once
      }
    }
  };

  const leave = () => {
    const instance = InstanceManager.currentInstance(client);
    if (instance === undefined) {
      // TODO: emit error
      return;
    }

    instance.leave(client);
    client.instanceId = null;

    if (Object.keys(instance).length === 0) {
      // all clients left
      InstanceManager.deleteInstance(instance);
    }

    socket.emit("instance:set", null);

    socket.leave(instance.socketRoom);
    io.to(instance.socketRoom).emit(
      "chat:message",
      new GlobalMessage(`${client.characterName} has left the instance`, "SYSTEM")
    );
  };

  const selectRoom = () => {
    // make sure client is the instance owner
  };

  const playerAction = (_targetId: string) => {
    const instance = InstanceManager.currentInstance(client);
    const room = instance?.room;
    const turn = room?.turn;
    const player = turn?.current;
    if (!instance || !room || !turn || !(player instanceof Player)) {
      return socket.emit("chat:message", new ErrorMessage("Invalid action"));
    }

    const action = player.basicAttack();
    const target = room.enemies.find(enemy => enemy.id === _targetId);

    if (!target) {
      return socket.emit("chat:message", new ErrorMessage("Invalid action"));
    }

    target.takeDamage(action.damage);
    io.to(instance.socketRoom).emit("instance:player-action", { ...action, targetId: target.id });

    // TODO: move this to a class
    while (true) {
      const entity = room.turn.next();

      if (entity === null) {
        room.turn.startTurn();
        continue;
      }

      if (entity instanceof Player) {
        // emit to this client to take action
        // broadcast emit to clients in the room?
        // entity.dynamicCharacter
        const client = ClientManager.getClientByCharacterName(entity.name);
        if (client === undefined) {
          // shouldn't be possible
          console.error("Client is undefined");
          break;
        }
        client.socket.emit("instance:your-turn");

        break;
      }

      if (entity instanceof Enemy) {
        const action = entity.basicAttack();
        const target = choice(room.players);
        target.takeDamage(action.damage);

        io.to(instance.socketRoom).emit("instance:enemy-action", {
          ...action,
          targetId: target.id,
        });
        // select target and add attacker and target to action
        // actionLog.push({ ...action }); // queue actions of all enemies to send at once
      }
    }
  };

  socket.on("instance:create", create);
  socket.on("instance:leave", leave);
  socket.on("instance:action", playerAction);
}

export default registerInstanceHandler;
