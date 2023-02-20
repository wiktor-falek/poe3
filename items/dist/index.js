"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bases_1 = require("./bases");
const modifiers_1 = require("./modifiers");
const utils_1 = require("./utils");
function SapphireRing() {
    return new bases_1.RingBase("Sapphire Ring", 1, { level: 1 }, [Object.assign(Object.assign({}, modifiers_1.IMPLICIT_MODIFIERS.to_mana), { values: [5] })], []);
}
function GoldRing() {
    return new bases_1.RingBase("Gold Ring", 1, { level: 1 }, [Object.assign(Object.assign({}, modifiers_1.IMPLICIT_MODIFIERS.to_life), { values: [5] })], []);
}
function Branch() {
    return new bases_1.WeaponBase("Branch", 20, { level: 1 }, [Object.assign(Object.assign({}, modifiers_1.BASE_MODIFIERS.physical_damage), { values: [3, 4] })], [Object.assign(Object.assign({}, modifiers_1.IMPLICIT_MODIFIERS.cold_damage_to_spells), { values: [1, 2] })]);
}
const item = Branch().magic();
console.log((0, utils_1.inspect)(item));
