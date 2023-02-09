import { Attributes, Level, Resources } from "../../../*";
import Entity from "./Entity";

class Player extends Entity {
  constructor(
    name: string,
    level: Level,
    resources: Resources,
    attributes: Attributes
  ) {
    super(name, level, resources, attributes);
  }

  basicAttack(enemyParty: Array<Entity>, target: Entity) {
    const attackerId = this.id;
    const targetId = target.id;
    console.log({targetId});
    const damage = 1;
    return { type: "attack", attackerId, targetId, damage };
  }

}

export default Player;
