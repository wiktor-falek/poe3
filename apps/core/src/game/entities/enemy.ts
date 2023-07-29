import { Attributes, Resistances, Resources } from "@poe3/types";
import { nanoid } from "nanoid";
import { choice, randint } from "pyrand";
import Player from "./player.js";
import { DamageType } from "../../../types.js";

class Enemy {
  id: string;
  name: string;
  level: number;
  attributes: Attributes;
  resources: Pick<Resources, "hp" | "maxHp">;
  resistances: Resistances;
  public constructor(name: string, level: number, maxHp: number) {
    this.id = nanoid(12);
    this.name = name;
    this.level = level;
    this.attributes = {
      strength: 1,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
      speed: level * 2,
    };
    this.resources = {
      hp: maxHp,
      maxHp: maxHp,
    };
    this.resistances = {
      fire: 0,
      cold: 0,
      lightning: 0,
      poison: 0,
    };
  }

  get isAlive() {
    return this.resources.hp > 0;
  }

  randomAction(players: Player[]) {
    const alivePlayers = players.filter((player) => player.isAlive);
    const action = { ...this.basicAttack(), target: choice(alivePlayers) };
    action.target.takeDamage(action.damage, action.damageType);
    return action;
  }

  takeDamage(amount: number): number {
    const amountAfterReduction = amount;
    this.resources.hp = Math.max(this.resources.hp - amountAfterReduction, 0);
    return amountAfterReduction;
  }

  basicAttack() {
    const CRIT_CHANCE = 5;
    const CRIT_MULTIPLIER = 1.5;
    const damageType: DamageType = "physical";
    let damage = randint(1, 2);

    const critRoll = randint(1, 100);
    const isCritical = CRIT_CHANCE > critRoll;
    if (isCritical) {
      damage = Math.floor(damage * CRIT_MULTIPLIER);
    }

    const attacker: Enemy = this;
    return { damage, damageType, critical: isCritical, attacker };
  }
}

export default Enemy;