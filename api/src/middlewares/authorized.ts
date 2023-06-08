import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { UserData } from "../*.js";

/**
 * Queries db for a user matching the cookie sessionId
 *
 * *On fail:* return 401 response breaking the middleware chain
 *
 * *On success:* pass user data to res.locals
 *
 * @example
 * import authorized from "./middlewares/authorized.js"
 * import apiRouter from "./routes/api.js"
 * app.use("/api", authorize, apiRouter);
 */
const authorized = async (req: Request, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res.status(401).json({
      message: "Not Authorized",
    });
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
