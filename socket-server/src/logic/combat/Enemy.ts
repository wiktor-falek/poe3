import { ActionPoints, Attributes, Level, Resources } from "../../../*";
import Entity from "./Entity";

class Enemy extends Entity {
  constructor(
    name: string,
    level: Level,
    resources: Resources,
    attributes: Attributes,
    actionPoints: ActionPoints
  ) {
    super(name, level, resources, attributes, actionPoints);
  }

  takeAction(allyParty: Array<Entity>, enemyParty: Array<Entity>) {
    if (!this.isAlive) {
      return null;
    }
    const target = allyParty[0];
    return this.basicAttack(target);
  }
}

export default Enemy;
