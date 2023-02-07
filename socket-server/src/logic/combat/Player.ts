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
}

export default Player;
