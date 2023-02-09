import { Attributes, Level, Resources } from "../../../*";
import logger from "../../logger";

class Entity {
  name: string;
  level: Level;
  resources: Resources;
  attributes: Attributes;
  id: number | null;
  constructor(
    name: string,
    level: Level,
    resources: Resources,
    attributes: Attributes
  ) {
    this.name = name;
    this.level = level;
    this.resources = resources;
    this.attributes = attributes;
    this.id = null;
  }

  public get isAlive(): boolean {
    return this.resources.hp > 0;
  }

  takeDamage(value: number) {
    const newHp = this.resources.hp - value;
    this.resources.hp = Math.max(0, newHp); // Prevent hp going below 0
    logger.info(`id=${this.id} took ${value} damage and now has ${this.resources.hp} hp`)
  }
}

export default Entity;
