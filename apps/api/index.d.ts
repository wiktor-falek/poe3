import { User } from "types/user.js";

declare global {
  namespace Express {
    interface Locals {
      user: User;
    }
  }
}
