"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pyrand_1 = __importDefault(require("pyrand"));
class GearBase {
    constructor(name, ilvl, requirements, baseMods, implicits) {
        this.name = name;
        this.ilvl = ilvl;
        this.rarity = "normal";
        this.requirements = requirements;
        this.baseMods = baseMods;
        this.implicits = implicits;
        this.affixes = { prefixes: [], suffixes: [] };
    }
    magic(PREFIX_MODIFIER_POOL, SUFFIX_MODIFIER_POOL) {
        if (PREFIX_MODIFIER_POOL.length === 0 || SUFFIX_MODIFIER_POOL.length === 0) {
            throw new Error("Method requires #PREFIX_MODIFIER_POOL and #SUFFIX_MODIFIER_POOL to have at least one modifier");
        }
        if (this.rarity !== "normal") {
            console.error(`Failed to upgrade to magic rarity, item is not of normal rarity`);
            return this;
        }
        // filter tiers that don't satisfy ilvl requirement, and filter mods that have no tiers left
        const prefix_pool = PREFIX_MODIFIER_POOL.map((mod) => {
            const availableTiers = Object.values(mod.tiers).filter((tier) => tier.ilvl <= this.ilvl);
            return Object.assign(Object.assign({}, mod), { tiers: availableTiers });
        }).filter((mod) => Object.keys(mod.tiers).length > 0);
        const suffix_pool = SUFFIX_MODIFIER_POOL.map((mod) => {
            const availableTiers = Object.values(mod.tiers).filter((tier) => tier.ilvl <= this.ilvl);
            return Object.assign(Object.assign({}, mod), { tiers: availableTiers });
        }).filter((mod) => Object.keys(mod.tiers).length > 0);
        // {
        //   console.log("************");
        //   console.log("BEFORE");
        //   for (const mod of PREFIX_MODIFIER_POOL) {
        //     console.log(inspect(mod));
        //   }
        // }
        // console.log("************");
        // console.log("AFTER");
        // {
        //   for (const mod of prefix_pool) {
        //     console.log(inspect(mod));
        //   }
        // }
        const amountOfAffixes = pyrand_1.default.randint(1, 4); // TODO: add weights for different amounts once pyrand.sample is ready
        // TODO: unhardcode 1 prefix + 1 suffix
        {
            const randomPrefix = pyrand_1.default.choice(prefix_pool);
            const { weight, tiers } = randomPrefix, modifier = __rest(randomPrefix, ["weight", "tiers"]);
            // assign modifier.
            const randomTier = pyrand_1.default.choice(tiers);
            const value = pyrand_1.default.randint(randomTier.range[0], randomTier.range[1]);
            // assign values array from range(s) in the modifier.tier
            this.affixes.prefixes.push(Object.assign(Object.assign({}, modifier), { values: [value] }));
        }
        {
            const randomSuffix = pyrand_1.default.choice(suffix_pool);
            const { weight, tiers } = randomSuffix, modifier = __rest(randomSuffix, ["weight", "tiers"]);
            // assign modifier.
            const randomTier = pyrand_1.default.choice(tiers);
            const value = pyrand_1.default.randint(randomTier.range[0], randomTier.range[1]);
            // assign values array from range(s) in the modifier.tier
            this.affixes.suffixes.push(Object.assign(Object.assign({}, modifier), { values: [value] }));
        }
        this.rarity = "magic";
        return this;
    }
}
exports.default = GearBase;
