import {
  BaseModifier,
  GearImplicits,
  GearTypeName,
  Requirements,
} from "../../*";
import GearBase from "./GearBase";

class RingBase extends GearBase {
  type: GearTypeName;
  constructor(
    name: string,
    requirements: Requirements,
    baseMods: Array<BaseModifier>,
    implicits: GearImplicits
  ) {
    super(name, requirements, baseMods, implicits);
    this.type = "ring";
  }
}

export default RingBase;
