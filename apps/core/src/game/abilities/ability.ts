type AbilityType = "attack" | "skill";

type AbilityTarget = "target" | "random" | "cone" | "all";

interface EachRank<T> {
  1: T;
  2: T;
  3: T;
  4: T;
  5: T;
  6: T;
  7: T;
  8: T;
  9: T;
  10: T;
  // 11: T;
  // 12: T;
  // 13: T;
  // 14: T;
  // 15: T;
  // 16: T;
  // 17: T;
  // 18: T;
  // 19: T;
  // 20: T;
  // 21: T;
  // 22: T;
  // 23: T;
  // 24: T;
  // 25: T;
  // 26: T;
  // 27: T;
  // 28: T;
  // 29: T;
  // 30: T;
}

interface AbilityDamage {
  addedFlat?: number;
  addedFlatEachRank?: EachRank<number>;
  weaponDamageMultiplier?: EachRank<number>;
  weaponDamageMultiplierEachRank?: EachRank<number>;
}

interface AbilityCost {
  mp?: EachRank<number>;
  hp?: EachRank<number>;
  ap?: number;
}

class Ability {
  constructor(
    public name: string,
    public type: AbilityType,
    public target: AbilityTarget,
    public damage: AbilityDamage,
    public cost?: AbilityCost
  ) {
    this.name = name;
    this.type = type;
    this.target = target;
    this.cost = cost;
  }

  Rank() {
    // calculate properties that vary with skill Rank
    return { ...this, cost: {}, damage: {} };
  }
}

const ability = new Ability(
  "Heavy Strike",
  "attack",
  "target",
  {
    addedFlatEachRank: {
      1: 2,
      2: 4,
      3: 7,
      4: 12,
      5: 18,
      6: 26,
      7: 37,
      8: 52,
      9: 70,
      10: 95,
    },
  },
  {
    mp: {
      1: 4,
      2: 5,
      3: 6,
      4: 7,
      5: 8,
      6: 10,
      7: 12,
      8: 15,
      9: 18,
      10: 20,
    },
    ap: 2,
  }
);
console.log(ability);
