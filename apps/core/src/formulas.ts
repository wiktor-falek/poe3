export function maxHp(
  level: number,
  vitality: number
  // increased?: number,
  // multiplier?: number
) {
  const base = 20;
  return base + (level - 1) * 2 + vitality * 1;
}

export function maxMp(level: number, intelligence: number) {
  const base = 20;
  return base + (level - 1) * 2 + intelligence * 1;
}

export function evasion(base: number, evasion: number, dexterity: number) {
  return base + evasion + dexterity * 2;
}

export function armor(base: number = 0, armor: number, strength: number) {
  return base + armor + strength * 2;
}

export function accuracy(base: 10, accuracy: number, dexterity: number) {
  return base + accuracy + dexterity * 2;
}
