import { User } from "../../../../common/types/user.js";

class UserModel {
  constructor() {}

  async findBySessionId(sessionId: string): Promise<User | null> {
    return null;
  }
}

export default UserModel;
