import { Attributes, Level, Resources } from "../../../*";

class Entity {
  name: string;
  level: Level;
  resources: Resources;
  attributes: Attributes;
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
  }
}

export default Entity;
