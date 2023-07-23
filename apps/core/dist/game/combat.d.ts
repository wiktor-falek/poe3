import Enemy from "./entities/enemy.js";
import type Player from "./entities/player.js";
declare class Combat {
    #private;
    players: Player[];
    enemies: Enemy[];
    constructor(players: Player[], enemies: Enemy[]);
    get currentTurn(): Player | Enemy;
    get playersWon(): boolean;
    get enemiesWon(): boolean;
    get hasConcluded(): boolean;
    begin(): void;
    continue(): void;
    playerAction(): void;
    nextEntity(): Player | Enemy;
}
export default Combat;
