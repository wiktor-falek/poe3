export function maxHp(
  base: number = 20,
  level: number,
  vitality: number
  // increased?: number,
  // multiplier?: number
) {
  return base + level * 2 + vitality * 2;
}

export function maxMp(base: number = 20, level: number, intelligence: number) {
  return base + level * 2 + intelligence * 2;
}

export function evasion(base: number = 0, evasion: number, dexterity: number) {
  return base + evasion + dexterity * 2;
}

export function armor(base: number = 0, armor: number, strength: number) {
  return base + armor + strength * 2;
}

export function accuracy(base: 10, accuracy: number, dexterity: number) {
  return base + accuracy + dexterity * 2;
}
