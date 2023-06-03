import { Err, Ok } from "resultat";
import { CronJob } from "cron";
import Lobby from "./lobby.js";
import Client from "../../components/client/client.js";

class LobbyManager {
  static readonly lobbies: { [lobbyId: string]: Lobby } = {};

  static createLobby(name: string): Lobby {
    const lobby = new Lobby(name);
    console.log({ id: lobby.id, lobby });
    this.lobbies[lobby.id] = lobby;
    return lobby;
  }

  static joinLobby(lobbyId: string, client: Client) {
    const lobby = this.lobbies[lobbyId];
    if (lobby === undefined) {
      return Err("Lobby does not exist");
    }

    // TODO: check if client is already in the lobby and return Err

    const result = lobby.join(client);
    if (!result.ok) {
      return result;
    }

    return Ok(lobby);
  }

  static get allLobbies() {
    return this.lobbies;
  }

  static deleteEmptyLobbies() {
    // iterate over lobbies, delete if lobby.size === 0
  }
}

const cronJob = new CronJob("*/5 * * * *", () => {
  LobbyManager.deleteEmptyLobbies();
}).start();

export default LobbyManager;
