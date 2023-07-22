// import { nanoid } from "nanoid";
// // import { getDynamicCharacter } from "@poe3/core";
// import { testEnemies } from "./entities/enemy.js";
// import Player from "./entities/player.js";
// import CombatRoom from "./rooms/combatRoom.js";
export {};
// class Dungeon {
//   id: string;
//   room?: CombatRoom;
//   players?: Array<Player>;
//   constructor() {
//     this.id = nanoid(16);
//   }
//   initPlayers() {
//     // const players = Object.values(this.#clients).map(
//     //   (client) => new Player(getDynamicCharacter(client.character))
//     // );
//     // this.players = players;
//     // return players;
//   }
//   initCombatRoom(): CombatRoom {
//     if (this.players === undefined) {
//       this.initPlayers();
//     } else {
//       // this is not the first room, filter out dead players
//       this.players = this.players.filter((player) => player.isAlive);
//     }
//     const enemies = testEnemies();
//     const room = new CombatRoom(this.players!, enemies);
//     this.room = room;
//     return room;
//   }
// }
// export default Dungeon;
