"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GearBase_1 = require("./GearBase");
class WeaponBase extends GearBase_1.default {
    constructor(name, requirements, baseMods, implicits) {
        super(name, requirements, baseMods, implicits);
        this.type = "ring";
    }
}
exports.default = WeaponBase;
