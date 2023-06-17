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

    const state = room.continue();
    if (state.actions.length !== 0) {
      io.to(instance.socketRoom).emit("instance:enemy-actions", state.actions);
    }
    if (state.currentTurnPlayerName) {
      io.to(instance.socketRoom).emit("instance:player-turn", state.currentTurnPlayerName);
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

  const action = (_targetId: string, _actionId: string) => {
    const instance = InstanceManager.currentInstance(client);
    const room = instance?.room;
    const turn = room?.turn;
    const player = turn?.current;
    if (!instance || !room || !turn || !(player instanceof Player)) {
      return socket.emit("chat:message", new ErrorMessage("Invalid action"));
    }

    // check if client is the player
    if (player.name !== client.characterName) {
      return socket.emit("chat:message", new ErrorMessage("Not your turn"));
    }

    const targetId = _targetId; // TODO: validate type;
    const actionId = _actionId; // TODO: validate type;

    const result = room.playerAction(player, targetId, actionId);
    if (!result.ok) {
      return socket.emit("chat:message", new ErrorMessage(result.err));
    }
    const action = result.val;

    io.to(instance.socketRoom).emit("instance:player-action", action);
  };

  const endTurn = () => {
    const instance = InstanceManager.currentInstance(client);
    const room = instance?.room;
    const turn = room?.turn;
    const player = turn?.current;
    if (!instance || !room || !turn || !(player instanceof Player)) {
      return socket.emit("chat:message", new ErrorMessage("Invalid action"));
    }

    if (client.characterName !== player.name) {
      return socket.emit("chat:message", new ErrorMessage("Not your turn"));
    }

    const state = room.continue();
    if (state.currentTurnPlayerName) {
      io.to(instance.socketRoom).emit("instance:player-turn", state.currentTurnPlayerName);
    }
    if (state.actions.length !== 0) {
      io.to(instance.socketRoom).emit("instance:enemy-actions", state.actions);
    }
  };

  socket.on("instance:create", create);
  socket.on("instance:leave", leave);
  socket.on("instance:action", action);
  socket.on("instance:end-turn", endTurn);
}

export default registerInstanceHandler;
