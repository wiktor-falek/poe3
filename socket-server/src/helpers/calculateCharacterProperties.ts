import { Character } from "../../*";
import { startingAttributes } from "../constants/attributes";
import * as formulas from "../constants/formulas";
export default function calculateCharacterProperties(
  character: Character
): void {
  character.attributes = startingAttributes[character.class];
  character.resources = {
    hp: character.resources?.hp ?? 0,
    maxHp: formulas.maxHp(
      20,
      character.level.value,
      character.attributes.vitality
    ),
    mp: character.resources?.mp ?? 0,
    maxMp: formulas.maxMp(
      10,
      character.level.value,
      character.attributes.intelligence
    ),
  };

  character.resistances = {
    fire: 0,
    cold: 0,
    lightning: 0,
    physical: 0,
    poison: 0,
    necrotic: 0,
  };
}
