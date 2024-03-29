import type { Io, IoSocket } from "../index.js";
import LobbyManager from "../game/lobby/lobbyManager.js";
import Client from "../components/client/client.js";
import { Err } from "resultat";

function registerLobbyHandler(io: Io, socket: IoSocket, client: Client) {
  const getAll = () => {
    socket.emit("lobby:all", LobbyManager.visibleLobbies);
  };

  const getCurrent = () => {
    const lobby = LobbyManager.currentLobby(client);
    if (lobby !== undefined) {
      socket.emit("lobby:data", lobby.membersOnlyData);
    } else {
      socket.emit("lobby:data", null);
    }
  };

  const join = (_lobbyId: string) => {
    // TODO: validate
    const lobbyId = _lobbyId; // schema.validate(_lobbyId);
    const result = LobbyManager.joinLobby(client, lobbyId);
    if (!result.ok) {
      // TODO: emit error
      return;
    }

    const lobby = result.val;

    socket.join(lobby.socketRoom);

    io.to(lobby.socketRoom).emit("lobby:data", {
      ...lobby,
      members: lobby.members,
    });
    socket.emit("lobby:set", lobby);
  };

  const leave = () => {
    const lobby = LobbyManager.currentLobby(client);

    if (lobby === undefined) {
      return Err("TODO: Emit 'Lobby not found'");
    }

    const success = lobby.leave(client);

    if (!success) {
      return;
    }

    socket.leave(lobby.socketRoom);
    socket.emit("lobby:data", null);

    // TODO: this could be a separate ServerToClient emit 'lobby:member-leave' => (name: string) => void;
    socket.to(lobby.socketRoom).emit("lobby:data", lobby.membersOnlyData);

    if (lobby.size === 0) {
      LobbyManager.deleteLobby(lobby);
      io.emit("lobby:delete", lobby.id);
    }
  };

  const create = (_lobbyName: string) => {
    // TODO: validate
    const lobbyName = _lobbyName; // schema.validate(_name)

    const existingLobby = LobbyManager.currentLobby(client);
    if (existingLobby !== undefined) {
      return;
      // TODO: emit error
      // socket.emit("error", "")
    }

    const lobby = LobbyManager.createLobby(client, lobbyName);

    join(lobby.id);

    io.emit("lobby:set", lobby);
  };

  const kick = (_characterName: string) => {
    // TODO: validate
    const characterName = _characterName; // schema.validate(_characterName);

    const lobby = LobbyManager.currentLobby(client);

    if (lobby === undefined) {
      // TODO: emit error?
      return;
    }

    const targetClient = lobby.kick(characterName);

    if (targetClient === undefined) {
      // TODO: emit error?
      return;
    }

    targetClient.socket.leave(lobby.socketRoom);

    targetClient.socket.emit("lobby:data", null);

    io.to(lobby.socketRoom).emit("lobby:data", {
      ...lobby,
      members: lobby.members,
    });
  };

  socket.on("lobby:getAll", getAll);
  socket.on("lobby:getCurrent", getCurrent);
  socket.on("lobby:join", join);
  socket.on("lobby:leave", leave);
  socket.on("lobby:create", create);
  socket.on("lobby:kick", kick);
}

export default registerLobbyHandler;
