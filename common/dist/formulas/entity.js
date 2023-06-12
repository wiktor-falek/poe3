export function maxHp(base = 20, level, vitality
// increased?: number,
// multiplier?: number
) {
    return base + (level - 1) * 2 + vitality * 1;
}
export function maxMp(base = 10, level, intelligence) {
    return base + (level - 1) * 2 + intelligence * 1;
}
export function evasion(base, evasion, dexterity) {
    return base + evasion + dexterity * 2;
}
export function armor(base = 0, armor, strength) {
    return base + armor + strength * 2;
}
export function accuracy(base, accuracy, dexterity) {
    return base + accuracy + dexterity * 2;
}
