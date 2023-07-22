import type { CharacterClass, Attributes } from "@poe3/types";

type BaseClassAttributes = {
  [key in CharacterClass]: Readonly<Attributes>;
};

export const baseClassAttributes: Readonly<BaseClassAttributes> = {
  swordsman: {
    strength: 8,
    dexterity: 6,
    intelligence: 5,
    vitality: 8,
    speed: 5,
  },
  ranger: {
    strength: 6,
    dexterity: 8,
    intelligence: 5,
    vitality: 6,
    speed: 7,
  },
  sorcerer: {
    strength: 6,
    dexterity: 6,
    intelligence: 8,
    vitality: 5,
    speed: 7,
  },
  assassin: {
    strength: 5,
    dexterity: 7,
    intelligence: 7,
    vitality: 5,
    speed: 8,
  },
};

export function getBaseClassAttributes(characterClass: CharacterClass) {
  return { ...baseClassAttributes[characterClass] };
}
