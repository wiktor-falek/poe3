import { Err } from "resultat";
import { CronJob } from "cron";
import Lobby from "./lobby.js";
import { IoSocket } from "../../index.js";

class LobbyManager {
  static readonly lobbies: Map<string, Lobby> = new Map();

  static createLobby(name: string): Lobby {
    const lobby = new Lobby(name);
    this.lobbies.set(lobby.id, lobby);
    return lobby;
  }

  static joinLobby(lobbyId: string) {
    const targetLobby = this.lobbies.get(lobbyId);
    if (targetLobby === undefined) {
      return undefined;
    }
    targetLobby.join();
    return targetLobby;
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
