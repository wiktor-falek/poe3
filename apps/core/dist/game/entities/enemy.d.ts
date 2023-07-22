import { Attributes, Resistances, Resources } from "@poe3/types";
declare class Enemy {
    id: string;
    name: string;
    level: number;
    attributes: Attributes;
    resources: Pick<Resources, "hp" | "maxHp">;
    resistances: Resistances;
    constructor(name: string, level: number, maxHp: number);
    get isAlive(): boolean;
    takeDamage(amount: number): number;
    basicAttack(): {
        damage: number;
        critical: boolean;
        attackerId: string;
    };
}
export default Enemy;
