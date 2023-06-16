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
    // prevent client from creating an instance if in a lobby and is not an owner
    const lobby = LobbyManager.currentLobby(client);
    if (lobby) {
      if (!lobby.clientIsOwner(client)) {
        return socket.emit("chat:message", new ErrorMessage("You're not the lobby owner"));
      }
      lobby.isHidden = true;
    }

    // initialize instance
    const instance = InstanceManager.createInstance();

    // have each client in lobby (or the sole client) join instance 
    const clients = lobby === undefined ? [client] : [...lobby.clients];
    for (const client of clients) {
      instance.join(client);
      client.instanceId = instance.id;
      // subscribe to socket room after joining
      client.socket.join(instance.socketRoom);
    }

    // temporarily hardcode a combat room before rooms are generated randomly
    const room = instance.initCombatRoom();

    // emit the instance after everything has been set up
    io.to(instance.socketRoom).emit("instance:set", instance);

    // TODO: move this to Combat.continue()
    // TODO: emit result of Combat.continue()
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
        // actionQueue.push({ ...action }); // queue actions of all enemies to send at once
      }
    }
  };

  const leave = () => {
    // check if instance exists
    const instance = InstanceManager.currentInstance(client);
    if (instance === undefined) {
      return socket.emit("chat:message", new ErrorMessage("Not in an instance"));
    }

    // exit the instance
    instance.leave(client);
    client.instanceId = null;

    // delete instance if it became empty
    if (instance.clientCount) {
      InstanceManager.deleteInstance(instance);
    }

    // unsubscribe from instance events
    socket.leave(instance.socketRoom);

    // delete instance from clients state
    socket.emit("instance:set", null);

    // emit leave message to remaining instance members
    io.to(instance.socketRoom).emit(
      "chat:message",
      new GlobalMessage(`${client.characterName} has left the instance`)
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
