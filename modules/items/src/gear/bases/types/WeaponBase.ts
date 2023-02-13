import {
  BaseModifier,
  GearImplicits,
  GearTypeName,
  Requirements,
} from "../../../*";
import GearBase from "../GearBase";

class WeaponBase extends GearBase {
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

export default WeaponBase;
