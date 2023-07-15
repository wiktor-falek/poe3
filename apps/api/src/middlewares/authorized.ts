import { NextFunction, Request, Response } from "express";
import UserModel from "../db/models/userModel.js";
// import type { UserData } from "../../types.js";

const User = new UserModel();

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
 * app.use("/api", authorized, apiRouter);
 */
const authorized = async (req: Request, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  if (!(typeof sessionId === "string") || !sessionId) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  const user = await User.findBySessionId(sessionId);

  if (!user) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  res.locals.user = user;
  return next();
};

export default authorized;
