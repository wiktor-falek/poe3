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
}

export default Enemy;
