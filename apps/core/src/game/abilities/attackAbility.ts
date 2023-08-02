import BaseAbility from "./baseAbility.js";
import {
  AbilityCost,
  AbilityDamageBonuses,
  AbilityTarget,
  AbilityType,
} from "./index.js";

class AttackAbility extends BaseAbility {
  constructor(
    public name: string,
    public type: AbilityType,
    public target: AbilityTarget,
    public cost: AbilityCost,
    public damageBonuses: AbilityDamageBonuses
  ) {
    super(name, type, target, cost);
    this.damageBonuses = damageBonuses;
  }

  get damage() {
    const flat = this.damageBonuses.addedFlat ?? 0;
    const flatFromRank = this.damageBonuses.addedFlatEachRank
      ? this.damageBonuses.addedFlatEachRank[this.rank] ?? 0
      : 0;

    // const weaponDamageMultiplier =
    //   this.damageBonuses.weaponDamageMultiplier ?? 1;
    // const weaponDamageMultiplierFromRank = this.damageBonuses
    //   .weaponDamageMultiplierEachRank
    //   ? this.damageBonuses.weaponDamageMultiplierEachRank[this.rank] ?? 1
    //   : 1;

    return {
      flat: flat + flatFromRank,
    };
  }
}

export default AttackAbility;
