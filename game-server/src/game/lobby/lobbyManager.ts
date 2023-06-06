import { Err, Ok } from "resultat";
import Lobby from "./lobby.js";
import Client from "../../components/client/client.js";

class LobbyManager {
  static readonly lobbies: { [lobbyId: string]: Lobby } = {};

  static currentLobby(client: Client) {
    return Object.values(this.lobbies).find((lobby) =>
      lobby.clientIsInLobby(client)
    );
  }

  static createLobby(name: string): Lobby {
    const lobby = new Lobby(name);
    this.lobbies[lobby.id] = lobby;
    return lobby;
  }

  static deleteLobby(lobbyId: string) {
    delete this.lobbies[lobbyId];
  }

  static joinLobby(lobbyId: string, client: Client) {
    const lobby = this.lobbies[lobbyId];
    if (lobby === undefined) {
      return Err("Lobby does not exist");
    }

    const existingLobby = this.currentLobby(client);
    if (existingLobby !== undefined) {
      return Err("Already in a lobby");
    }

    const result = lobby.join(client);
    if (!result.ok) {
      return result;
    }

    return Ok(lobby);
  }
}

export default LobbyManager;
