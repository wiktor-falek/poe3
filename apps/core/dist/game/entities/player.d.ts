import { Result } from "resultat";
import type { Resistances, Attributes, Resources, Character, CharacterClass } from "@poe3/types";
export interface TurnStartUpdate {
    playerId: string;
    resources?: {
        ap?: number;
        mp?: number;
        hp?: number;
    };
}
export interface ActionResult {
    damage: number;
    critical: boolean;
    cost?: {
        ap?: number;
        mp?: number;
        hp?: number;
    };
}
type DamageType = "fire" | "cold" | "lightning" | "poison" | "physical";
declare class Player {
    id: string;
    name: string;
    level: number;
    class: CharacterClass;
    attributes: Attributes;
    resources: Resources;
    resistances: Resistances;
    constructor(character: Character);
    isAlive(): boolean;
    turnStart(): TurnStartUpdate;
    takeDamage(amount: number, damageType: DamageType): number;
    basicAttack(): Result<ActionResult>;
}
export default Player;
