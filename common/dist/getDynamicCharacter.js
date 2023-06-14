import { characterClassAttributes } from "./characterClassAttributes.js";
function getDynamicCharacter(character) {
    const baseAttributes = characterClassAttributes[character.class];
    const attributes = { ...baseAttributes }; // calculate attributes
    const dynamicCharacter = {
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
            maxHp: 20,
            hp: 20,
            maxMp: 10,
            mp: 10,
        },
    };
    return dynamicCharacter;
}
export default getDynamicCharacter;
