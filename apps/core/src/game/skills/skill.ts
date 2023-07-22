type AbilityType = "attack" | "skill";

type AbilityTarget = "single_target" | "around_target" | "random" | "all";

interface EachLevel<T> {
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
}

interface AbilityDamage {
  addedFlat?: number;
  addedFlatEachLevel?: EachLevel<number>;
  weaponDamageMultiplier?: number;
  weaponDamageMultiplierEachLevel?: EachLevel<number>;
}

interface AbilityCost {
  mp?: EachLevel<number>;
  hp?: EachLevel<number>;
  ap?: number;
}

class Ability {
  static MAX_LEVEL: 10;
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

  level() {
    // calculate properties that vary with skill level
    return { ...this, cost: {}, damage: {} };
  }
}

const ability = new Ability(
  "Heavy Strike",
  "attack",
  "single_target",
  {
    addedFlatEachLevel: {
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
