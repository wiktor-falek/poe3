import { Err, Ok, ResultErr, ResultOk } from "resultat";
import Lobby from "./lobby.js";
import Client from "../../components/client/client.js";

class LobbyManager {
  static readonly lobbies: { [lobbyId: string]: Lobby } = {};

  static get visibleLobbies(): { [lobbyId: string]: Lobby } {
    // returns lobbies excluding ones where isHidden is true;
    const copy = { ...this.lobbies };
    for (const key of Object.keys(copy)) {
      copy[key].isHidden && delete copy[key];
    }
    return copy;
  }

  static currentLobby(client: Client): Lobby | undefined {
    return Object.values(this.lobbies).find(lobby => lobby.clientIsInLobby(client));
  }

  static createLobby(client: Client, name: string): Lobby {
    const lobby = new Lobby(name, client.character.name);
    this.lobbies[lobby.id] = lobby;
    return lobby;
  }

  static deleteLobby(lobby: Lobby) {
    delete this.lobbies[lobby.id];
  }

  static joinLobby(client: Client, lobbyId: string): ResultOk<Lobby> | ResultErr {
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
