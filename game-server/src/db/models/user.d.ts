import type { User as UserDocument } from "../../../../common/types/index.js";
declare class User {
    private static db;
    static collection: import("mongodb").Collection<UserDocument>;
    static findBySessionId(sessionId: string): Promise<import("mongodb").WithId<UserDocument>>;
}
export default User;
//# sourceMappingURL=user.d.ts.map