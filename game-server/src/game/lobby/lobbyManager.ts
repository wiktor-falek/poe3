import { Err } from "resultat";
import { CronJob } from "cron";
import Lobby from "./lobby.js";
import { IoSocket } from "../../index.js";

class LobbyManager {
  static readonly lobbies: Map<string, Lobby> = new Map();

  static createLobby(): Lobby {
    const lobby = new Lobby();
    return lobby;
  }

  static joinLobby(socket: IoSocket, lobbyId: string) {
    const targetLobby = this.lobbies.get(lobbyId);
    if (targetLobby === undefined) {
      return Err("Lobby does not exist");
    }
    targetLobby.join(socket);
  }

  static get allLobbies(): Array<Lobby> {
    return Array.from(this.lobbies.values());
  }

  static deleteEmptyLobbies() {
    // iterate over lobbies, delete if lobby.size === 0
  }
}

const cronJob = new CronJob("*/5 * * * *", () => {
  LobbyManager.deleteEmptyLobbies();
}).start();

export default LobbyManager;
