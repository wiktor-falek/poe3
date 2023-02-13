"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GearBase {
    constructor(name, requirements, baseMods, implicits) {
        this.name = name;
        this.rarity = "normal";
        this.requirements = requirements;
        this.baseMods = baseMods;
        this.implicits = implicits;
    }
}
exports.default = GearBase;
