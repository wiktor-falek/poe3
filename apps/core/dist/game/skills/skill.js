class Ability {
    name;
    type;
    target;
    damage;
    cost;
    static MAX_LEVEL;
    constructor(name, type, target, damage, cost) {
        this.name = name;
        this.type = type;
        this.target = target;
        this.damage = damage;
        this.cost = cost;
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
const ability = new Ability("Heavy Strike", "attack", "single_target", {
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
}, {
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
});
export {};
