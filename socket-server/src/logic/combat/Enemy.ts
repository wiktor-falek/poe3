import { Attributes, Level, Resources } from "../../../*";
import Entity from "./Entity";

class Enemy extends Entity {
  constructor(
    name: string,
    level: Level,
    resources: Resources,
    attributes: Attributes
  ) {
    super(name, level, resources, attributes);
  }

  attack(allyParty: Array<Entity>) {
    const target = allyParty[0];

    const attackerId = this.id;
    const targetId = target.id;
    const damage = 1;
    return { type: "attack", attackerId, targetId, damage };
  }

  takeAction(allyParty: Array<Entity>) {
    return this.attack(allyParty);
  }
}

export default Enemy;
