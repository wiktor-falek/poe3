"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RingBase_1 = require("./gear/bases/RingBase");
const WeaponBase_1 = require("./gear/bases/WeaponBase");
const modifiers_1 = require("./modifiers/modifiers");
const goldRing = new RingBase_1.default("Gold Ring", { level: 5 }, [], []);
const shortBow = new WeaponBase_1.default("Short Bow", { level: 1 }, [
    Object.assign(Object.assign({}, modifiers_1.BASE_MODIFIERS.physical_damage), { values: [2, 4] }),
    Object.assign(Object.assign({}, modifiers_1.BASE_MODIFIERS.critical_strike_chance), { values: [5] }),
], []);
console.log(shortBow);
