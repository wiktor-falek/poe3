import Joi from "joi";
import type { Io, IoSocket } from "../index.js";
import LobbyManager from "../game/lobby/lobbyManager.js";
import Client from "../components/client/client.js";

function registerLobbyHandler(io: Io, socket: IoSocket, client: Client) {
  const getAll = () => {
    socket.emit("lobby:all", LobbyManager.allLobbies);
  };

  const join = (_lobbyId: string) => {
    // TODO: validate
    const lobbyId = _lobbyId; // schema.validate(_lobbyId);
    const lobby = LobbyManager.joinLobby(lobbyId, client);
    if (lobby === undefined) {
      // socket.emit error
      return; 
    }
    socket.emit("lobby:data", lobby);
  };

  const create = (_lobbyName: string) => {
    // TODO: validate
    const lobbyName = _lobbyName; // schema.validate(_name)

    const lobby = LobbyManager.createLobby(lobbyName);
    io.emit("lobby:new", lobby);
    // put the user in the new lobby and emit it
  };

  socket.on("lobby:getAll", getAll);
  socket.on("lobby:join", join);
  socket.on("lobby:create", create);
}

export default registerLobbyHandler;
