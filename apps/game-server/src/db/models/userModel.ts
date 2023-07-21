import { User } from "@poe3/types";

class UserModel {
  constructor() {}

  async findBySessionId(sessionId: string): Promise<User | null> {
    return null;
  }
}

export default UserModel;
