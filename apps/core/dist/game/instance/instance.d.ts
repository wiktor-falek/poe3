import Player from "../../game/entities/player.js";
import CombatRoom from "../../game/rooms/combatRoom.js";
declare class Instance {
    id: string;
    room?: CombatRoom;
    players?: Array<Player>;
    constructor();
    initPlayers(): void;
    initCombatRoom(): CombatRoom;
}
export default Instance;
