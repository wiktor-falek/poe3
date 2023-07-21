import type { CharacterClass, Attributes } from "@poe3/types";
type BaseCharacterClassAttributes = {
    [key in CharacterClass]: Readonly<Attributes>;
};
export declare const baseCharacterClassAttributes: Readonly<BaseCharacterClassAttributes>;
export {};
