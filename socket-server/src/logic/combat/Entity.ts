import { ActionPoints, Attributes, Level, Resources } from "../../../*";
import logger from "../../logger";

interface ActionSuccess {
  type: "attack";
  attackerId: number;
  targetId: number;
  damage: number;
  message: string;
}

interface ActionError {
  type: "error";
  message: string;
}

class Entity {
  name: string;
  level: Level;
  resources: Resources;
  attributes: Attributes;
  actionPoints: ActionPoints;
  id: number | null;
  constructor(
    name: string,
    level: Level,
    resources: Resources,
    attributes: Attributes,
    actionPoints: ActionPoints
  ) {
    this.name = name;
    this.level = level;
    this.resources = resources;
    this.attributes = attributes;
    this.actionPoints = actionPoints;
    this.id = null;
  }

  public get isAlive(): boolean {
    return this.resources.hp > 0;
  }

  basicAttack(target: Entity): ActionSuccess | ActionError {
    const attackerId = this.id;
    const targetId = target.id;
    const apCost = 1;

    if (attackerId == null) {
      return { type: "error", message: "Attacker not found" };
    }
    if (targetId == null) {
      return { type: "error", message: "Target not found" };
    }
    if (this.actionPoints.ap < apCost) {
      return { type: "error", message: "Not enough action points" };
    }
    if (!target.isAlive) {
      return { type: "error", message: "Target is already dead" };
    }
    this.actionPoints.ap -= apCost;

    const damage = 1; // TODO: unhardcore damage
    target.takeDamage(damage);

    const message = `${this.name} attacked ${target.name} for ${damage} damage`;

    return { type: "attack", attackerId, targetId, damage, message };
  }

  takeDamage(value: number) {
    const newHp = this.resources.hp - value;
    this.resources.hp = Math.max(0, newHp); // Prevent hp going below 0
  }
}

export default Entity;
