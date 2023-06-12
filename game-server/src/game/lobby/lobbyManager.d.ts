import { ResultErr, ResultOk } from "resultat";
import Lobby from "./lobby.js";
import Client from "../../components/client/client.js";
declare class LobbyManager {
    static readonly lobbies: {
        [lobbyId: string]: Lobby;
    };
    static get visibleLobbies(): {
        [lobbyId: string]: Lobby;
    };
    static currentLobby(client: Client): Lobby | undefined;
    static createLobby(client: Client, name: string): Lobby;
    static deleteLobby(lobby: Lobby): void;
    static joinLobby(client: Client, lobbyId: string): ResultOk<Lobby> | ResultErr;
}
export default LobbyManager;
//# sourceMappingURL=lobbyManager.d.ts.map