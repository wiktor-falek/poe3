import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import type { ObjectId } from "mongodb";

/**
 * Queries db for an user with username and sessionId from cookie.
 * If unsuccessfull returns status 401 message breaking the middleware chain.
 * If successfull passes { username, sessionId, userId,  } to succeeding middlewares.
 *
 * **EXAMPLE AUTHORIZED ROUTE**
 *
 *   import authorized from "./middlewares/authorized.js"
 *   import apiRouter from "./routes/api.js"
 *   app.use("/api", authorize, apiRouter);
 */
const authorized = async (req: Request, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  interface UserData {
    _id: ObjectId;
    account: {
      username: string;
      sessionId: string;
    };
  }

  const user = await User.collection.findOne<UserData>(
    {
      "account.sessionId": sessionId,
    },
    { projection: { "account.username": 1, "account.sessionId": 1, _id: 1 } }
  );

  if (user === null) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  res.locals.user = user;
  return next();
};

export default authorized;
