import { characterClassAttributes } from "./characterClassAttributes.js";
import type { StaticCharacter, DynamicCharacter } from "../index.js";

function getDynamicCharacter(character: StaticCharacter): DynamicCharacter {
  const baseAttributes = characterClassAttributes[character.class];
  const attributes = { ...baseAttributes }; // calculate attributes

  const dynamicCharacter: DynamicCharacter = {
    ...character,
    resistances: {
      fire: 0,
      cold: 0,
      lightning: 0,
      physical: 0,
      poison: 0,
    },
    attributes,
    resources: {
      maxHp: 10,
      hp: 10,
      maxMp: 10,
      mp: 10,
    },
  };
  return dynamicCharacter;
}

export default getDynamicCharacter;