import type {
  AbilityType,
  AbilityTarget,
  AbilityTargetParty,
  AbilityCost,
  AbilityRank,
} from "./index.js";

class BaseAbility {
  rank: AbilityRank;
  constructor(
    public name: string,
    public type: AbilityType,
    public target: AbilityTarget,
    public cost: AbilityCost
  ) {
    this.name = name;
    this.type = type;
    this.target = target;
    this.cost = cost;
    this.rank = 1;
  }

  setRank(rank: AbilityRank): this {
    this.rank = rank;
    return this;
  }
}

export default BaseAbility;
