import * as formulas from "../formulas.js";
export default function getResources(level, attributes) {
    const hp = formulas.maxHp(level, attributes.strength);
    const mp = formulas.maxMp(level, attributes.intelligence);
    const ap = 3;
    return {
        hp: hp,
        maxHp: hp,
        mp: mp,
        maxMp: mp,
        ap: ap,
        maxAp: ap,
    };
}
