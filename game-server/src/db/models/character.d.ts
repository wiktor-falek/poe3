import { StaticCharacter } from "../../../../common/types/index.js";
declare class Character {
    private static db;
    static collection: import("mongodb").Collection<StaticCharacter>;
    static findByName(name: string): Promise<import("mongodb").WithId<StaticCharacter>>;
}
export default Character;
//# sourceMappingURL=character.d.ts.map