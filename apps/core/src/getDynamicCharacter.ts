import { baseCharacterClassAttributes } from "./index.js";
import type { Character, DynamicCharacter } from "@poe3/types";

function getDynamicCharacter(character: Character): DynamicCharacter {
  const baseAttributes = baseCharacterClassAttributes[character.class];
  const attributes = { ...baseAttributes }; // calculate attributes

  const dynamicCharacter: DynamicCharacter = {
    ...character,
    resistances: {
      fire: 0,
      cold: 0,
      lightning: 0,
      poison: 0,
    },
    attributes,
    resources: {
      maxHp: 30,
      hp: 30,
      maxMp: 10,
      mp: 10,
      ap: 3,
      maxAp: 3,
    },
  };
  return dynamicCharacter;
}

export default getDynamicCharacter;
