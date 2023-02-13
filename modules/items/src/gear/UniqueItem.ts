import { GearType, Modifier } from "../*";

class UniqueItem {
  base: string;
  // type: GearTypeName;
  constructor(base: GearType, description: string, affixes: Array<Modifier>) {
    this.base = base.name;
    // this.type = base.type;
  }
}

export default UniqueItem;
