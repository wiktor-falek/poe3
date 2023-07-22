import Player from "../entities/player.js";
import CombatRoom from "../rooms/combatRoom.js";
declare class Instance {
    id: string;
    room?: CombatRoom;
    players?: Array<Player>;
    constructor();
    initPlayers(): void;
    initCombatRoom(): CombatRoom;
}
export default Instance;
