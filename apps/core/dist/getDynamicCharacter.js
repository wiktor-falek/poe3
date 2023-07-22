import { baseCharacterClassAttributes } from "./characterClassAttributes.js";
function getDynamicCharacter(character) {
    const baseAttributes = baseCharacterClassAttributes[character.class];
    const attributes = { ...baseAttributes }; // calculate attributes
    const dynamicCharacter = {
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
