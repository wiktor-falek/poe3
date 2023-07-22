export function maxHp(level, vitality
// increased?: number,
// multiplier?: number
) {
    const base = 20;
    return base + (level - 1) * 2 + vitality * 1;
}
export function maxMp(level, intelligence) {
    const base = 20;
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
