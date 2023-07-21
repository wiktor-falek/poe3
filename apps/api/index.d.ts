import { User } from "@poe3/types";

declare global {
  namespace Express {
    interface Locals {
      user: User;
    }
  }
}
