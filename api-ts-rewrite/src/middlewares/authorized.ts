import { NextFunction, Request, Response } from "express";
import User from "../models/user";

/**
 * Queries db for an user with username and sessionId from cookie.
 * If unsuccessfull returns status 401 message breaking the middleware chain.
 * If successfull passes { username, sessionId, userId,  } to succeeding middlewares.
 *
 * **EXAMPLE AUTHORIZED ROUTE**
 * 
 *   import authorized from "./middlewares/authorized.ts"
 *   import apiRouter from "./routes/api"
 *   app.use("/api", authorize, apiRouter);
 *
 * **ACCESSING PASSED DATA IN SUCCEEDING MIDDLEWARE**
 * 
 *   function someController() {
 *     const { username, sessionId, userId, user } = res.locals;
 *   }
 */
const authorized = async (req: Request, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  const user = await User.collection.findOne({
    "account.sessionId": sessionId,
  });

  if (user === null) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  // pass session data and userId to succeeding middlewares
  res.locals.username = user.account.username;
  res.locals.sessionId = user.account.sessionId;
  res.locals.userId = user._id.toString();
  res.locals.user = user;
  return next();
};

export default authorized;
