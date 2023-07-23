import Enemy from "./src/game/entities/enemy.ts";
import Player from "./src/game/entities/player.ts";

export type DamageType = "fire" | "cold" | "lightning" | "poison" | "physical";
export interface Action {
  target: Player | Enemy;
  damage: number;
  damageType: DamageType;
  critical: boolean;
  attacker: Player | Enemy;
}
