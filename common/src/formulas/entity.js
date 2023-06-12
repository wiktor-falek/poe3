"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accuracy = exports.armor = exports.evasion = exports.maxMp = exports.maxHp = void 0;
function maxHp(base, level, vitality
// increased?: number,
// multiplier?: number
) {
    if (base === void 0) { base = 20; }
    return base + (level - 1) * 2 + vitality * 1;
}
exports.maxHp = maxHp;
function maxMp(base, level, intelligence) {
    if (base === void 0) { base = 10; }
    return base + (level - 1) * 2 + intelligence * 1;
}
exports.maxMp = maxMp;
function evasion(base, evasion, dexterity) {
    return base + evasion + dexterity * 2;
}
exports.evasion = evasion;
function armor(base, armor, strength) {
    if (base === void 0) { base = 0; }
    return base + armor + strength * 2;
}
exports.armor = armor;
function accuracy(base, accuracy, dexterity) {
    return base + accuracy + dexterity * 2;
}
exports.accuracy = accuracy;
