export type AbilityType = "attack" | "spell" | "passive" | "aura";

export type AbilityTarget = "single" | "random" | "cone" | "all";

export type AbilityTargetParty = "enemy" | "ally" | "both";

export interface AbilityDamageBonuses {
  addedFlat?: number;
  addedFlatEachRank?: EachRank<number>;
  weaponDamageMultiplier?: EachRank<number>;
  weaponDamageMultiplierEachRank?: EachRank<number>;
}

export interface AbilityCost {
  mp?: EachRank<number>;
  hp?: EachRank<number>;
  ap?: number;
}

export type AbilityRank =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export interface EachRank<T> {
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
  11?: T;
  12?: T;
  13?: T;
  14?: T;
  15?: T;
}
