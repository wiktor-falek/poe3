import "express";
import type { ObjectId } from "mongodb";

interface UserData {
  _id: ObjectId;
  account: {
    username: string;
    sessionId: string;
  };
}

declare global {
  namespace Express {
    interface Locals {
      user: UserData;
    }
  }
}
