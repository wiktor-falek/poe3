import { Attributes, Resistances, Resources } from "@poe3/types";
import Player from "./player.js";
declare class Enemy {
    id: string;
    name: string;
    level: number;
    attributes: Attributes;
    resources: Pick<Resources, "hp" | "maxHp">;
    resistances: Resistances;
    constructor(name: string, level: number, maxHp: number);
    get isAlive(): boolean;
    randomAction(players: Player[]): {
        target: Player;
        damage: number;
        damageType: "physical";
        critical: boolean;
        attacker: Enemy;
    };
    takeDamage(amount: number): number;
    basicAttack(): {
        damage: number;
        damageType: "physical";
        critical: boolean;
        attacker: Enemy;
    };
}
export default Enemy;
