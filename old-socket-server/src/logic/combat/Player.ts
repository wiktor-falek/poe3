import { ActionPoints, Attributes, Level, Resources } from "../../../*";
import Entity from "./Entity";

class Player extends Entity {
  username: string;
  constructor(
    username: string,
    name: string,
    level: Level,
    resources: Resources,
    attributes: Attributes,
    actionPoints: ActionPoints
  ) {
    super(name, level, resources, attributes, actionPoints);
    this.username = username;
  }
}

export default Player;
