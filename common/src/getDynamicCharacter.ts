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
      poison: 0,
    },
    attributes,
    resources: {
      maxHp: 20,
      hp: 20,
      maxMp: 10,
      mp: 10,
      ap: 3,
      maxAp: 3,
    },
  };
  return dynamicCharacter;
}

export default getDynamicCharacter;
