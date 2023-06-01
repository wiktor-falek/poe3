import Joi from "joi";
import type { InstanceNamespace, InstanceSocket } from "../index.js";
import { Err } from "resultat";
import type Lobby from "../game/lobby/lobby.js";
import LobbyManager from "../game/lobby/lobbyManager.js";

function registerLobbyHandler(io: InstanceNamespace, socket: InstanceSocket) {
  const getAll = () => {
    socket.emit("lobby:all", LobbyManager.allLobbies);
  };

  const create = () => {
    const lobby = LobbyManager.createLobby();
  };

  const join = (_lobbyId: string) => {
    // TODO: validate
    const lobbyId = _lobbyId; // schema.validate(_lobbyId);
    LobbyManager.joinLobby(socket, lobbyId);
  };

  socket.on("lobby:getAll", getAll);
}

export default registerLobbyHandler;
