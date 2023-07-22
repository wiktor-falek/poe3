import Player from "./game/entities/player.js";
import Enemy from "./game/entities/enemy.js";
const mockCharacter = {
    id: 1,
    userId: 1,
    name: "Apdo",
    class: "ranger",
    level: 1,
    xp: 0,
    reqXp: 0,
    silver: 20,
};
const players = [new Player(mockCharacter)];
const enemies = [new Enemy("Rat", 1, 10), new Enemy("Rat", 1, 10)];
class Combat {
    players;
    enemies;
    constructor(players, enemies) {
        this.players = players;
        this.enemies = enemies;
    }
    begin() {
        // set turnOrder
        // have enemies take actions
        // wait for player
    }
}
const combat = new Combat(players, enemies);
console.log(combat);
