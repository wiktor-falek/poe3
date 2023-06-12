import Client from "../../components/client/client.js";
import { CharacterClass } from "../../../../common/types/index.js";
export interface LobbyData {
    name: string;
    ownerName: string;
    id: string;
    size: number;
}
export interface MembersOnlyLobbyData extends LobbyData {
    members: Array<LobbyMember>;
}
export interface LobbyMember {
    name: string;
    class: CharacterClass;
    level: number;
}
declare class Lobby implements LobbyData {
    #private;
    name: string;
    ownerName: string;
    id: string;
    size: number;
    constructor(name: string, ownerName: string);
    get membersOnlyData(): this & {
        members: LobbyMember[];
    };
    get members(): Array<LobbyMember>;
    get isHidden(): boolean;
    set isHidden(hidden: boolean);
    get clients(): Array<Client>;
    get room(): string;
    clientIsInLobby(client: Client): boolean;
    join(client: Client): import("resultat").ResultErr | import("resultat").ResultOk<number>;
    leave(client: Client): boolean;
    kick(characterName: string): Client | undefined;
    clientIsOwner(client: Client): boolean;
}
export default Lobby;
//# sourceMappingURL=lobby.d.ts.map