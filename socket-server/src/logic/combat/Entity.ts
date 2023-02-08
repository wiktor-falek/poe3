import { Attributes, Level, Resources } from "../../../*";

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
}

export default Entity;
