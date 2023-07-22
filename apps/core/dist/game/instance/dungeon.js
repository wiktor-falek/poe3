import { nanoid } from "nanoid";
// import { getDynamicCharacter } from "@poe3/core";
import { testEnemies } from "../entities/enemy.js";
import CombatRoom from "../rooms/combatRoom.js";
class Instance {
    id;
    room;
    players;
    constructor() {
        this.id = nanoid(16);
    }
    initPlayers() {
        // const players = Object.values(this.#clients).map(
        //   (client) => new Player(getDynamicCharacter(client.character))
        // );
        // this.players = players;
        // return players;
    }
    initCombatRoom() {
        if (this.players === undefined) {
            this.initPlayers();
        }
        else {
            // this is not the first room, filter out dead players
            this.players = this.players.filter((player) => player.isAlive);
        }
        const enemies = testEnemies();
        const room = new CombatRoom(this.players, enemies);
        this.room = room;
        return room;
    }
}
export default Instance;
