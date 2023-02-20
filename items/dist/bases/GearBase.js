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
    setIlvl(ilvl) {
        if (ilvl > 0 && ilvl <= 100) {
            this.ilvl = ilvl;
        }
        return this;
    }
    normalToMagicRarity(PREFIX_MODIFIER_POOL, SUFFIX_MODIFIER_POOL) {
        if (this.rarity !== "normal") {
            console.error(`Failed to upgrade to magic rarity, item is not of normal rarity`);
            return this;
        }
        // filter out modifiers where ilvl requirement is not met
        const prefix_pool = PREFIX_MODIFIER_POOL.filter(() => false);
        const suffix_pool = PREFIX_MODIFIER_POOL.filter(() => false);
        const amountOfMods = pyrand_1.default.randint(1, 4); // TODO: add weights when pyrand.sample is finished
        {
            const randomPrefix = pyrand_1.default.choice(PREFIX_MODIFIER_POOL);
            const { weight } = randomPrefix, modifier = __rest(randomPrefix, ["weight"]);
            this.affixes.prefixes.push(modifier);
        }
        {
            const randomSuffix = pyrand_1.default.choice(SUFFIX_MODIFIER_POOL);
            const { weight } = randomSuffix, modifier = __rest(randomSuffix, ["weight"]);
            this.affixes.suffixes.push(modifier);
        }
        this.rarity = "magic";
        return this;
    }
}
exports.default = GearBase;
