import Enemy from "../../game/entities/enemy.js";
import Player from "../../game/entities/player.js";
import type { TurnStartUpdate } from "../../game/entities/player.js";
export interface ActionData {
    targetId: string;
    attackerId: string;
    damage: number;
    critical: boolean;
    cost?: {
        ap?: number;
        mp?: number;
        hp?: number;
    };
}
export interface StateUpdate {
    actions: Array<ActionData>;
    turnStartUpdate?: TurnStartUpdate;
}
type RoomType = "combat" | "reward";
declare class CombatRoom {
    #private;
    type: RoomType;
    players: Array<Player>;
    enemies: Array<Enemy>;
    currentTurnPlayerName: string;
    constructor(players: Array<Player>, enemies: Array<Enemy>);
    get currentTurnEntity(): Enemy | Player | undefined;
    createTurnOrder(): void;
    nextEntity(): Enemy | Player;
    get playersWon(): boolean;
    get enemiesWon(): boolean;
    get hasConcluded(): boolean;
    playerAction(player: Player, targetId: string, actionId: string): import("resultat").ResultErr | import("resultat").ResultOk<ActionData>;
    continue(): StateUpdate;
    private enemyAction;
    getRewards(player: Player): Array<any> | null;
    claimRewards(player: Player): import("resultat").ResultErr | import("resultat").ResultOk<number>;
}
export default CombatRoom;
