import Enemy from "./src/game/entities/enemy.ts";
import Player from "./src/game/entities/player.ts";

type Entity = Player | Enemy;

export type DamageType = "fire" | "cold" | "lightning" | "poison" | "physical";

type ActionResult = {
  attacker: Entity;
  target: Entity;
  damage: number;
  damageType: "physical";
  critical: boolean;
};

type TurnStart = {
  entity: Player | Enemy;
};

type Action =
  | "BASIC_ATTACK"
  | "ABILITY_1"
  | "ABILITY_2"
  | "ABILITY_3"
  | "ABILITY_4"
  | "ABILITY_5"
  | "ABILITY_6"
  | "ABILITY_7"
  | "ABILITY_8";
