import { User } from "../common/types/user.js";

declare global {
  namespace Express {
    interface Locals {
      user: User;
    }
  }
}
