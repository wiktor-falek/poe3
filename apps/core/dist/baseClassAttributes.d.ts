import type { CharacterClass, Attributes } from "@poe3/types";
type BaseClassAttributes = {
    [key in CharacterClass]: Readonly<Attributes>;
};
export declare const baseClassAttributes: Readonly<BaseClassAttributes>;
export declare function getBaseClassAttributes(characterClass: CharacterClass): {
    strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    speed: number;
};
export {};
