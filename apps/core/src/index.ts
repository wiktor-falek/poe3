import { Character } from "@poe3/types";
import Player from "./game/entities/player.js";
import Enemy from "./game/entities/enemy.js";
import Combat from "./game/combat.js";

const mockCharacter: Character = {
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

const combat = new Combat(players, enemies);
console.log(combat);
