import Client from "components/client/client.js";
import InstanceManager from "@/game/instance/instanceManager.js";
import LobbyManager from "@/game/lobby/lobbyManager.js";
import {
  ErrorMessage,
  GlobalMessage,
  ServerMessage,
} from "components/message.js";
import Player from "@/game/entities/player.js";
import { randint } from "pyrand";
import CharacterModel from "db/models/characterModel.js";
import Instance from "@/game/instance/instance.js";
import type { Io, IoSocket } from "../../socket.js";

const Character = new CharacterModel();

const awardSilverToAlivePlayers = async (instance: Instance) => {
  const players = instance.room?.players!;
  const alivePlayers = players.filter((p) => p.isAlive);
  const namesOfAlivePlayers = alivePlayers.map((p) => p.name);

  const silver = randint(2, 3);

  // TODO: one query for all clients
  for (let i = 0; i < namesOfAlivePlayers.length; i++) {
    const name = namesOfAlivePlayers[i];
    const client = instance.clients.find((c) => c.characterName === name);
    if (client) {
      const result = await Character.addSilver(name, silver);
      if (result.ok) {
        client.socket.emit(
          "chat:message",
          new ServerMessage(`You gained ${silver} silver`)
        );
      }
    }
  }
};

function registerInstanceHandler(io: Io, socket: IoSocket, client: Client) {
  const get = () => {
    const instance = InstanceManager.currentInstance(client);
    socket.emit("instance:set", instance);
  };

  const create = () => {
    // prevent client from creating an instance if in a lobby and is not an owner
    const lobby = LobbyManager.currentLobby(client);
    if (lobby) {
      if (!lobby.clientIsOwner(client)) {
        return socket.emit(
          "chat:message",
          new ErrorMessage("You're not the lobby owner")
        );
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
    console.log({ state });

    io.to(instance.socketRoom).emit("instance:state-update", state);

    if (room.playersWon) {
      /*
        distribute rewards
      */
    }
  };

  const leave = () => {
    // check if instance exists
    const instance = InstanceManager.currentInstance(client);
    if (instance === null) {
      return socket.emit(
        "chat:message",
        new ErrorMessage("Not in an instance")
      );
    }

    // exit the instance
    instance.leave(client);
    client.instanceId = null;

    // delete instance if it became empty
    if (instance.clientCount === 0) {
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
    const player = room?.currentTurnEntity;

    // check if action can be performed, current entity must be a player and it must be this players turn
    if (
      !instance ||
      !room ||
      !(player instanceof Player) ||
      player.name !== client.characterName
    ) {
      return socket.emit("chat:message", new ErrorMessage("Not your turn"));
    }

    const targetId = _targetId; // TODO: validate type;
    const actionId = _actionId; // TODO: validate type;

    const result = room.playerAction(player, targetId, actionId);
    if (!result.ok) {
      return socket.emit("chat:message", new ErrorMessage(result.err));
    }
    const action = result.val;

    io.to(instance.socketRoom).emit("instance:state-update", {
      actions: [action],
    });

    if (room.hasConcluded) {
      if (room.enemiesWon) {
        // io.to(instance.socketRoom).emit("instance:lose")
      } else if (room.playersWon) {
        awardSilverToAlivePlayers(instance);
        // temporarily give rewards to the current player
        // TODO: for each alive player get the rewards and emit to the respective client
        const rewards = room.getRewards(player);
        if (rewards !== null && rewards.length !== 0) {
          client.socket.emit("instance:rewards", rewards);
        }
      }
    }
  };

  const endTurn = async () => {
    const instance = InstanceManager.currentInstance(client);
    const room = instance?.room;
    const player = room?.currentTurnEntity;
    if (!instance || !room || !(player instanceof Player)) {
      return socket.emit("chat:message", new ErrorMessage("Invalid action"));
    }

    if (client.characterName !== player.name) {
      return socket.emit("chat:message", new ErrorMessage("Not your turn"));
    }

    const state = room.continue();

    io.to(instance.socketRoom).emit("instance:state-update", state);

    if (room.hasConcluded) {
      if (room.enemiesWon) {
        // io.to(instance.socketRoom).emit("instance:lose")
      } else if (room.playersWon) {
        awardSilverToAlivePlayers(instance);
      }
    }
  };

  socket.on("instance:get", get);
  socket.on("instance:create", create);
  socket.on("instance:leave", leave);
  socket.on("instance:action", action);
  socket.on("instance:end-turn", endTurn);
}

export default registerInstanceHandler;
