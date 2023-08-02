import AttackAbility from "./attackAbility.js";

interface Abilities {
  attacks: { [key: string]: () => AttackAbility };
}

const shared: Abilities = {
  attacks: {
    basicAttack: () =>
      new AttackAbility(
        "Attack",
        "attack",
        "single",
        {
          ap: 1,
        },
        {
          addedFlat: 1,
        }
      ),
  },
};

const swordsman: Abilities = {
  attacks: {
    heavyStrike: () =>
      new AttackAbility(
        "Heavy Strike",
        "attack",
        "single",
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
        },
        {
          addedFlat: 10,
          // addedFlatEachRank,
          // weaponDamageMultiplier,
          weaponDamageMultiplierEachRank: {
            1: 2.1,
            2: 2.2,
            3: 2.3,
            4: 2.4,
            5: 2.5,
            6: 2.6,
            7: 2.7,
            8: 2.8,
            9: 2.9,
            10: 3,
          },
        }
      ),
  },
};

export default {
  shared,
  swordsman,
};
