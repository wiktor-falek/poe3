import GearBase from "./bases/GearBase";

class UniqueItem {
  base: string;
  constructor(base: GearBase, description: string, affixes: Array<Modifier>) {
    this.base = base.name;
  }
}

export default UniqueItem;
